// Multi-conversation store for the ITD Global chat widget.
//
// PURE data + logic — no React, no server-only imports — mirroring funnel.ts.
// The widget now behaves like Messenger: a menu home, several conversations
// kept side-by-side, and a "recent" inbox. This module owns the persisted
// shape (localStorage key `itd_chat_v3`) and migrates the legacy single-blob
// `itd_chat_v2` into conversation #1 on first load.

import type { FunnelAnswers, StepId, RoutingResult } from "./funnel";

// ── Message + card shape (the persisted unit; shared with the widget) ──
export type Role = "user" | "assistant";
export type CardKind =
  | "entry"
  | "choices"
  | "outcome"
  | "capture"
  | "callback"
  | "booking"
  | "support";

export interface Card {
  kind: CardKind;
  stepId?: StepId;
  choices?: { label: string; value: string }[];
  multi?: boolean;
  skippable?: boolean;
  /** Position in the current step path (1-based) + path length, for the progress bar. */
  pos?: number;
  len?: number;
  /** Routing result attached to outcome/capture cards. */
  outcome?: RoutingResult;
  /** Once answered, a choices/entry card renders inert (the user's pick follows as a bubble). */
  answered?: boolean;
}

export interface Msg {
  id: string;
  role: Role;
  content: string;
  card?: Card;
}

export type Flow = "idle" | "guided" | "captured";

// ── A single saved conversation ──
export interface Conversation {
  id: string; // also used as the lead sessionId for this thread
  title: string; // seed title (menu option label); display prefers first user msg
  createdAt: number;
  updatedAt: number;
  messages: Msg[];
  answers: FunnelAnswers;
  flow: Flow;
  leadDone: boolean;
}

export interface ChatStore {
  conversations: Conversation[];
  activeId: string | null;
}

const STORE_KEY = "itd_chat_v3";
const LEGACY_KEY = "itd_chat_v2";
const MAX_CONVERSATIONS = 20;

export function uid(): string {
  if (typeof crypto !== "undefined" && "randomUUID" in crypto) return crypto.randomUUID();
  return `s${Date.now()}_${Math.floor(Math.random() * 1e9)}`;
}

export function createConversation(seedTitle = "", messages: Msg[] = [], flow: Flow = "idle"): Conversation {
  const now = Date.now();
  return {
    id: uid(),
    title: seedTitle,
    createdAt: now,
    updatedAt: now,
    messages,
    answers: {},
    flow,
    leadDone: false,
  };
}

/** Display title: first non-empty user message, else the seed title, else "New chat". */
export function titleFor(c: Conversation): string {
  const firstUser = c.messages.find((m) => m.role === "user" && m.content.trim());
  const raw = firstUser?.content.trim() || c.title.trim() || "New chat";
  return raw.length > 42 ? `${raw.slice(0, 41).trimEnd()}…` : raw;
}

/** A compact relative timestamp for the recent-conversations inbox. */
export function relativeTime(ts: number): string {
  const diff = Date.now() - ts;
  const m = Math.floor(diff / 60000);
  if (m < 1) return "just now";
  if (m < 60) return `${m}m ago`;
  const h = Math.floor(m / 60);
  if (h < 24) return `${h}h ago`;
  const d = Math.floor(h / 24);
  if (d < 7) return `${d}d ago`;
  return `${Math.floor(d / 7)}w ago`;
}

function isConversation(v: unknown): v is Conversation {
  return (
    !!v &&
    typeof v === "object" &&
    typeof (v as Conversation).id === "string" &&
    Array.isArray((v as Conversation).messages)
  );
}

/** Load the store, migrating a legacy v2 blob into conversation #1 if present. */
export function load(): ChatStore {
  if (typeof localStorage === "undefined") return { conversations: [], activeId: null };
  try {
    const raw = localStorage.getItem(STORE_KEY);
    if (raw) {
      const parsed = JSON.parse(raw) as ChatStore;
      if (parsed && Array.isArray(parsed.conversations)) {
        const conversations = parsed.conversations.filter(isConversation);
        const activeId =
          parsed.activeId && conversations.some((c) => c.id === parsed.activeId)
            ? parsed.activeId
            : null;
        return { conversations, activeId };
      }
    }
    // Migration: import the legacy single conversation.
    const legacy = localStorage.getItem(LEGACY_KEY);
    if (legacy) {
      const d = JSON.parse(legacy) as {
        sessionId?: string;
        messages?: Msg[];
        answers?: FunnelAnswers;
        flow?: Flow;
        leadDone?: boolean;
      };
      if (Array.isArray(d.messages) && d.messages.length) {
        const now = Date.now();
        const convo: Conversation = {
          id: d.sessionId || uid(),
          title: "",
          createdAt: now,
          updatedAt: now,
          messages: d.messages,
          answers: d.answers || {},
          flow: d.flow || "idle",
          leadDone: !!d.leadDone,
        };
        return { conversations: [convo], activeId: convo.id };
      }
    }
  } catch {
    /* ignore corrupt storage */
  }
  return { conversations: [], activeId: null };
}

/** Persist the store, keeping only the most-recent MAX_CONVERSATIONS threads. */
export function save(store: ChatStore): void {
  if (typeof localStorage === "undefined") return;
  try {
    const conversations = [...store.conversations]
      .sort((a, b) => b.updatedAt - a.updatedAt)
      .slice(0, MAX_CONVERSATIONS);
    const activeId =
      store.activeId && conversations.some((c) => c.id === store.activeId) ? store.activeId : null;
    localStorage.setItem(STORE_KEY, JSON.stringify({ conversations, activeId }));
  } catch {
    /* ignore quota / serialization errors */
  }
}

/** Remove a conversation by id; clears activeId if it was the deleted thread. */
export function deleteConversation(store: ChatStore, id: string): ChatStore {
  return {
    conversations: store.conversations.filter((c) => c.id !== id),
    activeId: store.activeId === id ? null : store.activeId,
  };
}
