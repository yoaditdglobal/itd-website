"use client";

import { useCallback, useEffect, useRef, useState } from "react";
import {
  MessageCircle,
  X,
  Send,
  Volume2,
  VolumeX,
  Loader2,
  ArrowRight,
  ArrowLeft,
  Sparkles,
  CalendarClock,
  Maximize2,
  Minimize2,
  Minus,
  LifeBuoy,
  Clock,
} from "lucide-react";
import { PROACTIVE_GREETING, WELCOME_MESSAGE, MENU_GREETING } from "@/lib/chat/knowledge";
import {
  STEPS,
  FIRST_STEP,
  nextStep,
  stepPath,
  choiceLabel,
  routeLead,
  type FunnelAnswers,
  type StepId,
  type Lane,
  type RoutingResult,
} from "@/lib/chat/funnel";
import {
  load as loadStore,
  save as saveStore,
  uid,
  titleFor,
  relativeTime,
  type Conversation,
  type Msg,
  type Card,
  type Role,
  type Flow,
} from "@/lib/chat/conversations";
import IntegrationLogo from "@/components/ui/IntegrationLogo";

// Chat avatar — the ITD Global mark. Drop a square (~1:1) logo here; until the
// file exists the Avatar falls back to an "ITD" monogram (so it never looks
// broken). The repo's itd-global-logo.webp is a wide lockup that's illegible at
// avatar size, so this uses a dedicated square mark.
const AVATAR_SRC = "/logos/itd/favicon-chat.png";

function Avatar({ className = "" }: { className?: string }) {
  const [ok, setOk] = useState(true);
  return (
    <span
      className={`flex items-center justify-center overflow-hidden rounded-full border border-white/15 bg-gradient-to-br from-bg-dark via-bg-dark-card to-bg-dark ${className}`}
    >
      {ok ? (
        // eslint-disable-next-line @next/next/no-img-element
        <img
          src={AVATAR_SRC}
          alt="ITD Global"
          width={40}
          height={40}
          onError={() => setOk(false)}
          className="h-3/5 w-3/5 object-contain"
        />
      ) : (
        <span className="text-[11px] font-extrabold tracking-tight text-white">ITD</span>
      )}
    </span>
  );
}

// ── Connexx Assistant: Intercom-style AI chat concierge + guided sales funnel ──
// Floating launcher (bottom-right) → slide-up panel. Proactively shows a teaser
// after a short dwell. Two paths share one launcher (SPEC §1, hybrid): a guided
// qualifier (chip cards → ICP routing → matched proof → lead capture) and a
// free-text AI assistant (streaming /api/chat). Both create a routed lead via
// /api/chat/lead. CSS-only motion, gated by prefers-reduced-motion; nothing here
// renders server-side (mounted client component), so no SSR blank-page risk.

type View = "menu" | "chat";
type PanelSize = "default" | "expanded";

const PROACTIVE_DELAY_MS = 18_000;
const FREE_TEXT_BEFORE_OFFER = 3;
const MUTE_KEY = "itd_chat_muted";
const SEEN_KEY = "itd_chat_seen"; // proactive teaser already shown/dismissed this session

const ANSWER_KEY: Record<Exclude<StepId, "lanes">, keyof FunnelAnswers> = {
  product: "productType",
  direction: "direction",
  trade: "tradeDirection",
  volume: "volumeBand",
  segment: "segment",
};

let idCounter = 0;
const newId = () => `m${Date.now()}_${idCounter++}`;

function track(event: string, params?: Record<string, unknown>) {
  if (typeof window !== "undefined") {
    const w = window as unknown as { gtag?: (...a: unknown[]) => void };
    w.gtag?.("event", event, params ?? {});
  }
}

export default function ChatWidget() {
  const [open, setOpen] = useState(false);
  const [minimised, setMinimised] = useState(false);
  const [size, setSize] = useState<PanelSize>("default");
  const [view, setView] = useState<View>("menu");
  const [teaser, setTeaser] = useState(false);
  const [unread, setUnread] = useState(false);
  const [muted, setMuted] = useState(false);
  const [input, setInput] = useState("");
  const [streaming, setStreaming] = useState(false);
  const [freeTextCount, setFreeTextCount] = useState(0);

  // Multi-conversation store (the inbox) + the active thread's working state.
  const [conversations, setConversations] = useState<Conversation[]>([]);
  const [activeId, setActiveId] = useState<string | null>(null);
  const [messages, setMessages] = useState<Msg[]>([]);
  const [answers, setAnswers] = useState<FunnelAnswers>({});
  const [flow, setFlow] = useState<Flow>("idle");
  const [leadDone, setLeadDone] = useState(false);

  const sessionId = useRef<string>("");
  const audioRef = useRef<HTMLAudioElement | null>(null);
  const audioPrimed = useRef(false);
  const scrollRef = useRef<HTMLDivElement | null>(null);
  const inputRef = useRef<HTMLTextAreaElement | null>(null);
  const messagesRef = useRef<Msg[]>([]);
  messagesRef.current = messages;
  const answersRef = useRef<FunnelAnswers>({});
  answersRef.current = answers;
  const flowRef = useRef<Flow>(flow);
  flowRef.current = flow;
  const leadDoneRef = useRef(leadDone);
  leadDoneRef.current = leadDone;
  const conversationsRef = useRef<Conversation[]>([]);
  conversationsRef.current = conversations;
  const activeIdRef = useRef<string | null>(null);
  activeIdRef.current = activeId;
  const skipSave = useRef(true); // don't clobber storage before the first load() resolves

  // ── Restore persisted state (multi-conversation store + migration) ──
  useEffect(() => {
    try {
      const muteSaved = localStorage.getItem(MUTE_KEY);
      if (muteSaved === "1") setMuted(true);
    } catch {
      /* ignore */
    }
    const store = loadStore();
    setConversations(store.conversations);
    setActiveId(store.activeId);
    if (store.activeId) {
      const active = store.conversations.find((c) => c.id === store.activeId);
      if (active) {
        sessionId.current = active.id;
        setMessages(active.messages);
        setAnswers(active.answers);
        setFlow(active.flow);
        setLeadDone(active.leadDone);
      }
    }
    audioRef.current = new Audio("/audio/notification.wav");
    audioRef.current.volume = 0.35;
    audioRef.current.preload = "auto";
  }, []);

  // ── Sync the active thread's working state back into its conversation ──
  useEffect(() => {
    const id = activeIdRef.current;
    if (!id) return;
    setConversations((prev) => {
      let found = false;
      const next = prev.map((c) => {
        if (c.id !== id) return c;
        found = true;
        return { ...c, messages, answers, flow, leadDone, updatedAt: Date.now() };
      });
      return found ? next : prev;
    });
  }, [messages, answers, flow, leadDone]);

  // ── Persist the store (skip the first run so we never overwrite before load) ──
  useEffect(() => {
    if (skipSave.current) {
      skipSave.current = false;
      return;
    }
    saveStore({ conversations, activeId });
  }, [conversations, activeId]);

  // ── Prime audio on first user gesture (browsers block autoplay otherwise) ──
  useEffect(() => {
    const prime = () => {
      audioPrimed.current = true;
      window.removeEventListener("pointerdown", prime);
      window.removeEventListener("keydown", prime);
    };
    window.addEventListener("pointerdown", prime, { once: true });
    window.addEventListener("keydown", prime, { once: true });
    return () => {
      window.removeEventListener("pointerdown", prime);
      window.removeEventListener("keydown", prime);
    };
  }, []);

  const playPing = useCallback(() => {
    if (muted) return;
    if (typeof document !== "undefined" && document.visibilityState !== "visible") return;
    if (!audioPrimed.current) return;
    audioRef.current?.play().catch(() => {
      /* autoplay blocked — visual badge still shows */
    });
  }, [muted]);

  // ── Proactive teaser after a short dwell (once per session, only if unopened) ──
  useEffect(() => {
    if (typeof sessionStorage !== "undefined" && sessionStorage.getItem(SEEN_KEY)) return;
    const t = setTimeout(() => {
      if (open) return;
      setTeaser(true);
      setUnread(true);
      playPing();
      try {
        sessionStorage.setItem(SEEN_KEY, "1");
      } catch {
        /* ignore */
      }
      track("chat_proactive_shown");
    }, PROACTIVE_DELAY_MS);
    return () => clearTimeout(t);
  }, [open, playPing]);

  // ── Auto-scroll to newest message ──
  useEffect(() => {
    scrollRef.current?.scrollTo({ top: scrollRef.current.scrollHeight, behavior: "smooth" });
  }, [messages, streaming]);

  const append = useCallback((...msgs: Msg[]) => {
    setMessages((prev) => [...prev, ...msgs]);
  }, []);

  const markAnswered = useCallback((msgId: string) => {
    setMessages((prev) =>
      prev.map((m) => (m.id === msgId && m.card ? { ...m, card: { ...m.card, answered: true } } : m)),
    );
  }, []);

  // ── Build a step card message (question + chips) with progress metadata ──
  const stepMsg = useCallback((stepId: StepId, ans: FunnelAnswers): Msg => {
    const s = STEPS[stepId];
    const path = stepPath(ans);
    const idx = path.indexOf(stepId);
    return {
      id: newId(),
      role: "assistant",
      content: s.question,
      card: {
        kind: "choices",
        stepId,
        choices: s.choices,
        multi: s.multi,
        skippable: s.skippable,
        pos: idx >= 0 ? idx + 1 : 1,
        len: path.length,
      },
    };
  }, []);

  const finish = useCallback(
    (finalAnswers: FunnelAnswers) => {
      const result = routeLead(finalAnswers);
      setFlow("captured");
      append(
        { id: newId(), role: "assistant", content: result.outcome, card: { kind: "outcome", outcome: result } },
        { id: newId(), role: "assistant", content: "", card: { kind: "capture", outcome: result } },
      );
      track("chat_qualified", {
        journey: result.icpJourney,
        journey_name: result.journeyName,
        intent: result.intentGrade,
      });
    },
    [append],
  );

  const advance = useCallback(
    (fromStep: StepId, ans: FunnelAnswers) => {
      const ns = nextStep(fromStep, ans);
      if (ns) append(stepMsg(ns, ans));
      else finish(ans);
    },
    [append, stepMsg, finish],
  );

  const startGuided = useCallback(() => {
    setMessages((prev) =>
      prev.map((m) => (m.card?.kind === "entry" ? { ...m, card: { ...m.card, answered: true } } : m)),
    );
    append({ id: newId(), role: "user", content: "Get a tailored rate review" }, stepMsg(FIRST_STEP, {}));
    setFlow("guided");
    track("chat_guided_start");
  }, [append, stepMsg]);

  const answerStep = useCallback(
    (msgId: string, stepId: StepId, value: string) => {
      if (stepId === "lanes") return;
      const nextAnswers = { ...answersRef.current, [ANSWER_KEY[stepId]]: value } as FunnelAnswers;
      setAnswers(nextAnswers);
      markAnswered(msgId);
      append({ id: newId(), role: "user", content: choiceLabel(stepId, value) });
      track("chat_step", { step: stepId, value });
      advance(stepId, nextAnswers);
    },
    [append, markAnswered, advance],
  );

  const answerLanes = useCallback(
    (msgId: string, values: Lane[]) => {
      const nextAnswers = { ...answersRef.current, lanes: values };
      setAnswers(nextAnswers);
      markAnswered(msgId);
      const label = values.length
        ? values.map((v) => choiceLabel("lanes", v)).join(" · ")
        : "Not sure yet";
      append({ id: newId(), role: "user", content: label });
      advance("lanes", nextAnswers);
    },
    [append, markAnswered, advance],
  );

  const skipStep = useCallback(
    (msgId: string, stepId: StepId) => {
      markAnswered(msgId);
      append({ id: newId(), role: "user", content: "Skip" });
      advance(stepId, answersRef.current);
    },
    [append, markAnswered, advance],
  );

  const dismissEntry = useCallback(
    (msgId: string) => {
      markAnswered(msgId);
      append({
        id: newId(),
        role: "assistant",
        content:
          "Of course — ask me anything about rates, customs, integrations or returns, and I'll point you the right way.",
      });
      track("chat_entry_freetext");
      setTimeout(() => inputRef.current?.focus(), 50);
    },
    [append, markAnswered],
  );

  const addCallbackCard = useCallback(
    (withUserBubble: boolean) => {
      if (
        messagesRef.current.some((m) => m.card?.kind === "capture" || m.card?.kind === "callback")
      )
        return;
      const msgs: Msg[] = [];
      if (withUserBubble) msgs.push({ id: newId(), role: "user", content: "I'd rather talk to someone" });
      msgs.push({
        id: newId(),
        role: "assistant",
        content: "No problem — leave your details and the right person will be in touch shortly.",
        card: { kind: "callback" },
      });
      append(...msgs);
      setFlow("captured");
      track("chat_talk_to_person");
    },
    [append],
  );

  const addBookingCard = useCallback(
    (withUserBubble: boolean) => {
      if (messagesRef.current.some((m) => m.card?.kind === "booking")) return;
      const msgs: Msg[] = [];
      if (withUserBubble)
        msgs.push({ id: newId(), role: "user", content: "I'd like to book a call" });
      msgs.push({
        id: newId(),
        role: "assistant",
        content: "Great — grab a slot that suits you and we'll be ready for you.",
        card: { kind: "booking" },
      });
      append(...msgs);
      track("chat_booking_open");
    },
    [append],
  );

  // ── Hydrate the working state from a stored conversation ──
  const hydrate = useCallback((c: Conversation) => {
    sessionId.current = c.id;
    setActiveId(c.id);
    setMessages(c.messages);
    setAnswers(c.answers);
    setFlow(c.flow);
    setLeadDone(c.leadDone);
    setFreeTextCount(0);
  }, []);

  // ── Start a fresh conversation seeded with its opening messages ──
  const newConversation = useCallback(
    (seedTitle: string, initial: Msg[], initialFlow: Flow) => {
      const id = uid();
      const now = Date.now();
      const convo: Conversation = {
        id,
        title: seedTitle,
        createdAt: now,
        updatedAt: now,
        messages: initial,
        answers: {},
        flow: initialFlow,
        leadDone: false,
      };
      sessionId.current = id;
      setConversations((prev) => [convo, ...prev]);
      setActiveId(id);
      setMessages(initial);
      setAnswers({});
      setFlow(initialFlow);
      setLeadDone(false);
      setFreeTextCount(0);
      setView("chat");
    },
    [],
  );

  // ── Main-menu options (each opens a NEW conversation in that mode) ──
  const menuRateReview = useCallback(() => {
    newConversation(
      "Get a tailored rate review",
      [
        { id: newId(), role: "user", content: "Get a tailored rate review" },
        stepMsg(FIRST_STEP, {}),
      ],
      "guided",
    );
    track("chat_guided_start", { from: "menu" });
  }, [newConversation, stepMsg]);

  const menuAsk = useCallback(() => {
    newConversation("Ask a question", [{ id: newId(), role: "assistant", content: WELCOME_MESSAGE }], "idle");
    setTimeout(() => inputRef.current?.focus(), 80);
    track("chat_ask_start");
  }, [newConversation]);

  const menuTalk = useCallback(() => {
    newConversation(
      "Talk to the team",
      [
        {
          id: newId(),
          role: "assistant",
          content:
            "Happy to connect you with the team — leave your details and the right person will be in touch shortly.",
          card: { kind: "callback" },
        },
      ],
      "captured",
    );
    track("chat_talk_to_person", { from: "menu" });
  }, [newConversation]);

  const menuTrack = useCallback(() => {
    newConversation(
      "Existing customer",
      [
        {
          id: newId(),
          role: "assistant",
          content:
            "If you already ship with ITD Global, our support team can help you fastest from the contact page — drop your query in and the right desk will pick it up.",
          card: { kind: "support" },
        },
      ],
      "captured",
    );
    track("chat_existing_customer");
  }, [newConversation]);

  // ── Resume a past conversation from the recent list ──
  const resume = useCallback(
    (id: string) => {
      const c = conversationsRef.current.find((x) => x.id === id);
      if (!c) return;
      hydrate(c);
      setView("chat");
      track("chat_resume");
    },
    [hydrate],
  );

  const openPanel = useCallback(() => {
    setOpen(true);
    setMinimised(false);
    setTeaser(false);
    setUnread(false);
    try {
      sessionStorage.setItem(SEEN_KEY, "1");
    } catch {
      /* ignore */
    }
    // Resume the active thread if it's mid-conversation; otherwise land on the menu.
    const active = conversationsRef.current.find((c) => c.id === activeIdRef.current);
    if (active && active.messages.length) {
      hydrate(active);
      setView("chat");
    } else {
      setView("menu");
    }
    track("chat_open");
  }, [hydrate]);

  const toggleMute = () => {
    setMuted((m) => {
      const next = !m;
      try {
        localStorage.setItem(MUTE_KEY, next ? "1" : "0");
      } catch {
        /* ignore */
      }
      return next;
    });
  };

  // ── Free-text: send a message and stream the reply ──
  const send = useCallback(
    async (text: string) => {
      const trimmed = text.trim();
      if (!trimmed || streaming) return;
      const lc = trimmed.toLowerCase();
      const meetingIntent =
        /\b(book|meeting|demo|schedule|appointment|call me|speak to|talk to)\b/.test(lc);
      const commercialSignal =
        /\b(quote|pricing|price|cost|saving|switch|tender|rfp|royal\s?mail|evri|dpd|parcelforce|hermes|fedex|ups|dhl|shopify|magento|amazon|ebay|linnworks|netsuite)\b/.test(
          lc,
        ) || /\d{2,}/.test(lc);
      const userMsg: Msg = { id: newId(), role: "user", content: trimmed };
      const assistantId = newId();
      setInput("");
      setFreeTextCount((c) => c + 1);
      // Tidy the entry card if the visitor jumped straight to free-text.
      setMessages((prev) => [
        ...prev.map((m) =>
          m.card?.kind === "entry" && !m.card.answered ? { ...m, card: { ...m.card, answered: true } } : m,
        ),
        userMsg,
        { id: assistantId, role: "assistant", content: "" },
      ]);
      setStreaming(true);
      track("chat_message");

      const history = [...messagesRef.current, userMsg]
        .filter((m) => m.content && m.content !== WELCOME_MESSAGE && !m.card)
        .map((m) => ({ role: m.role, content: m.content }));

      try {
        const res = await fetch("/api/chat", {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify({ sessionId: sessionId.current, messages: history }),
        });
        if (!res.body) throw new Error("No response body");
        const reader = res.body.getReader();
        const decoder = new TextDecoder();
        // eslint-disable-next-line no-constant-condition
        while (true) {
          const { done, value } = await reader.read();
          if (done) break;
          const chunk = decoder.decode(value, { stream: true });
          setMessages((prev) =>
            prev.map((m) => (m.id === assistantId ? { ...m, content: m.content + chunk } : m)),
          );
        }
      } catch {
        setMessages((prev) =>
          prev.map((m) =>
            m.id === assistantId
              ? {
                  ...m,
                  content:
                    "Sorry — I couldn't reach the assistant. Please try again, or leave your details below and the team will follow up.",
                }
              : m,
          ),
        );
      } finally {
        setStreaming(false);
      }

      // Smart next step: turn shared meeting/commercial intent into a booking or a captured lead.
      if (
        flowRef.current === "idle" &&
        !leadDoneRef.current &&
        !messagesRef.current.some(
          (m) =>
            m.card?.kind === "capture" ||
            m.card?.kind === "callback" ||
            m.card?.kind === "booking",
        )
      ) {
        if (meetingIntent) addBookingCard(false);
        else if (commercialSignal) addCallbackCard(false);
      }
    },
    [streaming, addBookingCard, addCallbackCard],
  );

  // ── After a few free-text turns with no lead in motion, offer a callback ──
  useEffect(() => {
    if (flow === "idle" && !leadDone && freeTextCount >= FREE_TEXT_BEFORE_OFFER) {
      addCallbackCard(false);
    }
  }, [freeTextCount, flow, leadDone, addCallbackCard]);

  // Close on Escape
  useEffect(() => {
    if (!open) return;
    const onKey = (e: KeyboardEvent) => {
      if (e.key === "Escape") setOpen(false);
    };
    window.addEventListener("keydown", onKey);
    return () => window.removeEventListener("keydown", onKey);
  }, [open]);

  const onLeadDone = useCallback(
    (routing?: RoutingResult) => {
      setLeadDone(true);
      track("chat_lead", { journey: routing?.icpJourney, intent: routing?.intentGrade });
      const hot = routing?.intentGrade === "hot";
      append({
        id: newId(),
        role: "assistant",
        content: hot
          ? "Brilliant — thank you. I've flagged this as a priority, so expect to hear from the team very shortly. Anything else I can help with in the meantime?"
          : "Brilliant — thank you! Someone from the ITD Global team will be in touch shortly. Anything else I can answer in the meantime?",
      });
    },
    [append],
  );

  const transcript = messages
    .filter((m) => m.content && m.content !== WELCOME_MESSAGE && !m.card)
    .map((m) => ({ role: m.role, content: m.content }));

  return (
    <>
      {/* ── Proactive teaser bubble ── */}
      {teaser && !open && (
        <div className="fixed bottom-24 right-4 z-[90] max-w-[300px] motion-safe:animate-[chatpop_220ms_ease-out] sm:right-6">
          <button
            onClick={openPanel}
            className="group flex items-start gap-3 rounded-2xl border border-border bg-white p-4 text-left shadow-lg transition-shadow hover:shadow-xl"
          >
            <Avatar className="h-9 w-9 flex-shrink-0" />
            <span className="text-sm leading-snug text-text-primary">{PROACTIVE_GREETING}</span>
          </button>
          <button
            onClick={() => {
              setTeaser(false);
              setUnread(false);
            }}
            aria-label="Dismiss"
            className="absolute -right-2 -top-2 flex h-6 w-6 items-center justify-center rounded-full border border-border bg-white text-text-tertiary shadow-sm hover:text-text-primary"
          >
            <X className="h-3.5 w-3.5" aria-hidden />
          </button>
        </div>
      )}

      {/* ── Panel ── */}
      {open && !minimised && (
        <div
          role="dialog"
          aria-label="ITD Global assistant chat"
          className={`fixed inset-0 z-[95] flex flex-col bg-white shadow-2xl motion-safe:animate-[chatpop_220ms_ease-out] sm:inset-auto sm:right-6 sm:rounded-2xl sm:border sm:border-border ${
            size === "expanded"
              ? "sm:bottom-6 sm:h-[calc(100vh-3rem)] sm:max-h-[calc(100vh-3rem)] sm:w-[440px]"
              : "sm:bottom-24 sm:h-[600px] sm:max-h-[calc(100vh-7rem)] sm:w-[380px]"
          }`}
        >
          {/* Header */}
          <div className="relative flex items-center gap-2 overflow-hidden rounded-t-2xl bg-bg-dark px-3 py-4 text-white">
            <div className="bg-noise pointer-events-none absolute inset-0 opacity-30 mix-blend-soft-light" aria-hidden />
            {view === "chat" && (
              <button
                onClick={() => setView("menu")}
                aria-label="Back to menu"
                className="relative -ml-1 rounded-md p-1.5 text-white/80 transition-colors hover:bg-white/10 hover:text-white"
              >
                <ArrowLeft className="h-5 w-5" />
              </button>
            )}
            <Avatar className="relative h-9 w-9 flex-shrink-0" />
            <div className="relative flex-1">
              <p className="text-sm font-semibold leading-tight">ITD Global</p>
              <p className="flex items-center gap-1.5 text-xs text-white/70">
                <span className="inline-block h-2 w-2 rounded-full bg-green-400" />
                Typically replies in a few minutes
              </p>
            </div>
            <button
              onClick={() => setSize((s) => (s === "expanded" ? "default" : "expanded"))}
              aria-label={size === "expanded" ? "Shrink chat" : "Expand chat"}
              className="relative hidden rounded-md p-1.5 text-white/70 transition-colors hover:bg-white/10 hover:text-white sm:block"
            >
              {size === "expanded" ? <Minimize2 className="h-4 w-4" /> : <Maximize2 className="h-4 w-4" />}
            </button>
            <button
              onClick={() => setMinimised(true)}
              aria-label="Minimise chat"
              className="relative rounded-md p-1.5 text-white/70 transition-colors hover:bg-white/10 hover:text-white"
            >
              <Minus className="h-5 w-5" />
            </button>
            <button
              onClick={() => setOpen(false)}
              aria-label="Close chat"
              className="relative rounded-md p-1.5 text-white/70 transition-colors hover:bg-white/10 hover:text-white"
            >
              <X className="h-5 w-5" />
            </button>
          </div>

          {view === "menu" ? (
            <MenuView
              conversations={conversations}
              muted={muted}
              onToggleMute={toggleMute}
              onRateReview={menuRateReview}
              onAsk={menuAsk}
              onTalk={menuTalk}
              onTrack={menuTrack}
              onResume={resume}
            />
          ) : (
            <>
          {/* Messages */}
          <div ref={scrollRef} className="flex-1 space-y-3 overflow-y-auto bg-bg-secondary/40 px-4 py-4">
            {messages.map((m) => {
              const kind = m.card?.kind;

              if (kind === "entry") {
                return (
                  <EntryCard
                    key={m.id}
                    done={!!m.card?.answered}
                    onGuided={startGuided}
                    onAsk={() => dismissEntry(m.id)}
                  />
                );
              }

              if (kind === "capture" || kind === "callback") {
                return (
                  <LeadCard
                    key={m.id}
                    mode={kind === "callback" ? "callback" : "qualified"}
                    routing={m.card?.outcome}
                    answers={answers}
                    sessionId={sessionId.current}
                    transcript={transcript}
                    done={leadDone}
                    onDone={() => onLeadDone(m.card?.outcome)}
                  />
                );
              }

              if (kind === "booking") {
                return (
                  <div key={m.id} className="space-y-2.5">
                    {m.content && (
                      <div className="flex justify-start">
                        <div className="max-w-[85%] rounded-2xl rounded-bl-sm border border-border bg-white px-3.5 py-2.5 text-sm leading-relaxed text-text-primary">
                          {m.content}
                        </div>
                      </div>
                    )}
                    <BookingCard />
                  </div>
                );
              }

              if (kind === "support") {
                return (
                  <div key={m.id} className="space-y-2.5">
                    {m.content && (
                      <div className="flex justify-start">
                        <div className="max-w-[85%] rounded-2xl rounded-bl-sm border border-border bg-white px-3.5 py-2.5 text-sm leading-relaxed text-text-primary">
                          {m.content}
                        </div>
                      </div>
                    )}
                    <a
                      href="/contact"
                      className="inline-flex items-center gap-1.5 rounded-lg bg-bg-dark px-4 py-2.5 text-sm font-medium text-white transition-colors hover:bg-bg-dark-card"
                    >
                      <LifeBuoy className="h-4 w-4" aria-hidden /> Go to contact &amp; support
                      <ArrowRight className="h-3.5 w-3.5" aria-hidden />
                    </a>
                  </div>
                );
              }

              // Text bubble (plain text, the step question, or the outcome line)
              return (
                <div key={m.id} className="space-y-2.5">
                  {(m.content || (kind === undefined && streaming)) && (
                    <div className={`flex ${m.role === "user" ? "justify-end" : "justify-start"}`}>
                      <div
                        className={`max-w-[85%] whitespace-pre-wrap rounded-2xl px-3.5 py-2.5 text-sm leading-relaxed ${
                          m.role === "user"
                            ? "rounded-br-sm bg-accent text-white"
                            : "rounded-bl-sm border border-border bg-white text-text-primary"
                        }`}
                      >
                        {m.content || (streaming ? <TypingDots /> : "")}
                      </div>
                    </div>
                  )}

                  {kind === "choices" && !m.card?.answered && m.card && (
                    <ChoiceCard
                      card={m.card}
                      onPick={(v) => answerStep(m.id, m.card!.stepId!, v)}
                      onPickLanes={(vals) => answerLanes(m.id, vals)}
                      onSkip={() => skipStep(m.id, m.card!.stepId!)}
                    />
                  )}

                  {kind === "outcome" && (
                    <>
                      {m.card?.outcome?.proof && <ProofBox proof={m.card.outcome.proof} />}
                      <button
                        type="button"
                        onClick={() => addBookingCard(true)}
                        className="inline-flex items-center gap-1.5 rounded-lg border border-border bg-white px-3 py-2 text-xs font-medium text-text-primary transition-colors hover:border-accent/40 hover:text-accent"
                      >
                        <CalendarClock className="h-3.5 w-3.5" aria-hidden /> Or book a call now
                      </button>
                    </>
                  )}
                </div>
              );
            })}
          </div>

          {/* Composer — free-text AI is always live (SPEC §6) */}
          <form
            onSubmit={(e) => {
              e.preventDefault();
              send(input);
            }}
            className="border-t border-border bg-white px-3 py-3"
          >
            <div className="flex items-end gap-2">
              <textarea
                ref={inputRef}
                value={input}
                onChange={(e) => setInput(e.target.value)}
                onKeyDown={(e) => {
                  if (e.key === "Enter" && !e.shiftKey) {
                    e.preventDefault();
                    send(input);
                  }
                }}
                rows={1}
                placeholder="Ask about rates, customs, integrations…"
                className="max-h-28 flex-1 resize-none rounded-xl border border-border bg-bg-secondary/50 px-3 py-2.5 text-sm text-text-primary placeholder-text-tertiary focus:outline-none focus:ring-2 focus:ring-accent"
              />
              <button
                type="submit"
                disabled={streaming || !input.trim()}
                aria-label="Send message"
                className="flex h-10 w-10 flex-shrink-0 items-center justify-center rounded-xl bg-accent text-white transition-colors hover:bg-bg-dark disabled:opacity-40 active:scale-95"
              >
                {streaming ? (
                  <Loader2 className="h-4 w-4 animate-spin" aria-hidden />
                ) : (
                  <Send className="h-4 w-4" aria-hidden />
                )}
              </button>
            </div>
            {/* Contextual footer affordance */}
            {!leadDone && (
              <div className="mt-2 text-xs">
                {flow === "idle" ? (
                  <button
                    type="button"
                    onClick={startGuided}
                    className="inline-flex items-center gap-1 font-medium text-accent underline-offset-2 hover:underline"
                  >
                    <Sparkles className="h-3.5 w-3.5" aria-hidden /> Get a tailored rate review
                  </button>
                ) : flow === "guided" ? (
                  <button
                    type="button"
                    onClick={() => addCallbackCard(true)}
                    className="text-text-tertiary underline-offset-2 hover:text-accent hover:underline"
                  >
                    I&apos;d rather just talk to someone →
                  </button>
                ) : null}
              </div>
            )}
          </form>
            </>
          )}
        </div>
      )}

      {/* ── Minimised slim bar ── */}
      {open && minimised && (
        <div className="fixed bottom-5 right-4 z-[95] sm:right-6">
          <button
            onClick={() => setMinimised(false)}
            aria-label="Restore chat"
            className="flex items-center gap-2.5 rounded-full bg-bg-dark py-2.5 pl-2.5 pr-4 text-white shadow-lg transition-colors hover:bg-bg-dark-card"
          >
            <Avatar className="h-8 w-8 flex-shrink-0" />
            <span className="text-sm font-semibold">ITD Global</span>
            <Maximize2 className="h-4 w-4 text-white/70" aria-hidden />
          </button>
          <button
            onClick={() => setOpen(false)}
            aria-label="Close chat"
            className="absolute -right-1.5 -top-1.5 flex h-6 w-6 items-center justify-center rounded-full border border-border bg-white text-text-tertiary shadow-sm hover:text-text-primary"
          >
            <X className="h-3.5 w-3.5" aria-hidden />
          </button>
        </div>
      )}

      {/* ── Launcher ── */}
      {!open && (
        <button
          onClick={openPanel}
          aria-label="Open chat"
          aria-expanded={false}
          className="fixed bottom-5 right-4 z-[95] flex h-14 w-14 items-center justify-center rounded-full bg-accent text-white shadow-lg transition-transform hover:scale-105 active:scale-95 sm:right-6"
        >
          <MessageCircle className="h-6 w-6" />
          {unread && (
            <span className="absolute -right-0.5 -top-0.5 flex h-4 w-4 items-center justify-center rounded-full bg-red-500 text-[10px] font-bold ring-2 ring-white">
              1
            </span>
          )}
        </button>
      )}

      <style jsx global>{`
        @keyframes chatpop {
          from {
            opacity: 0;
            transform: translateY(12px) scale(0.98);
          }
          to {
            opacity: 1;
            transform: translateY(0) scale(1);
          }
        }
      `}</style>
    </>
  );
}

// ── Main menu (home) — short greeting, option buttons, recent-conversations inbox ──
function MenuView({
  conversations,
  muted,
  onToggleMute,
  onRateReview,
  onAsk,
  onTalk,
  onTrack,
  onResume,
}: {
  conversations: Conversation[];
  muted: boolean;
  onToggleMute: () => void;
  onRateReview: () => void;
  onAsk: () => void;
  onTalk: () => void;
  onTrack: () => void;
  onResume: (id: string) => void;
}) {
  const recent = [...conversations].sort((a, b) => b.updatedAt - a.updatedAt);
  return (
    <>
      <div className="flex-1 overflow-y-auto bg-bg-secondary/40 px-4 py-5">
        <h3 className="text-base font-semibold text-text-primary">{MENU_GREETING}</h3>
        <p className="mt-1 text-sm text-text-secondary">
          Pick an option below, or just start typing — we usually reply in a few minutes.
        </p>

        <div className="mt-4 flex flex-col gap-2">
          <MenuOption
            icon={<Sparkles className="h-4 w-4" aria-hidden />}
            title="Get a tailored rate review"
            subtitle="Three quick questions — we'll match you to the right team."
            onClick={onRateReview}
            primary
          />
          <MenuOption
            icon={<MessageCircle className="h-4 w-4" aria-hidden />}
            title="Ask a question"
            subtitle="Rates, customs, integrations, returns — anything."
            onClick={onAsk}
          />
          <MenuOption
            icon={<CalendarClock className="h-4 w-4" aria-hidden />}
            title="Talk to the team"
            subtitle="Leave your details and we'll be in touch shortly."
            onClick={onTalk}
          />
          <MenuOption
            icon={<LifeBuoy className="h-4 w-4" aria-hidden />}
            title="Track or existing customer"
            subtitle="Support for current ITD Global customers."
            onClick={onTrack}
          />
        </div>

        {recent.length > 0 && (
          <div className="mt-6">
            <p className="px-1 text-[11px] font-semibold uppercase tracking-wide text-text-tertiary">
              Recent conversations
            </p>
            <div className="mt-2 flex flex-col gap-1.5">
              {recent.map((c) => (
                <button
                  key={c.id}
                  onClick={() => onResume(c.id)}
                  className="group flex items-center gap-2.5 rounded-xl border border-border bg-white px-3 py-2.5 text-left transition-colors hover:border-accent/40"
                >
                  <span className="flex h-7 w-7 flex-shrink-0 items-center justify-center rounded-full bg-bg-secondary text-text-tertiary">
                    <MessageCircle className="h-3.5 w-3.5" aria-hidden />
                  </span>
                  <span className="min-w-0 flex-1">
                    <span className="block truncate text-sm font-medium text-text-primary">
                      {titleFor(c)}
                    </span>
                    <span className="flex items-center gap-1 text-[11px] text-text-tertiary">
                      <Clock className="h-3 w-3" aria-hidden /> {relativeTime(c.updatedAt)}
                    </span>
                  </span>
                  <ArrowRight className="h-4 w-4 flex-shrink-0 text-text-tertiary transition-transform group-hover:translate-x-0.5 group-hover:text-accent" aria-hidden />
                </button>
              ))}
            </div>
          </div>
        )}
      </div>

      {/* Menu footer — mute toggle + device note */}
      <div className="flex items-center justify-between border-t border-border bg-white px-4 py-2.5">
        <span className="text-[11px] text-text-tertiary">Saved on this device</span>
        <button
          onClick={onToggleMute}
          aria-label={muted ? "Unmute notification sound" : "Mute notification sound"}
          className="rounded-md p-1.5 text-text-tertiary transition-colors hover:bg-bg-secondary hover:text-text-primary"
        >
          {muted ? <VolumeX className="h-4 w-4" /> : <Volume2 className="h-4 w-4" />}
        </button>
      </div>
    </>
  );
}

function MenuOption({
  icon,
  title,
  subtitle,
  onClick,
  primary = false,
}: {
  icon: React.ReactNode;
  title: string;
  subtitle: string;
  onClick: () => void;
  primary?: boolean;
}) {
  return (
    <button
      onClick={onClick}
      className={`group flex items-center gap-3 rounded-2xl border p-3.5 text-left transition-colors ${
        primary
          ? "border-accent/30 bg-accent-light/40 hover:border-accent/50 hover:bg-accent-light/60"
          : "border-border bg-white hover:border-accent/30"
      }`}
    >
      <span
        className={`flex h-9 w-9 flex-shrink-0 items-center justify-center rounded-full ${
          primary ? "bg-accent text-white" : "bg-bg-secondary text-accent"
        }`}
      >
        {icon}
      </span>
      <span className="flex-1">
        <span className="block text-sm font-semibold text-text-primary">{title}</span>
        <span className="block text-xs text-text-secondary">{subtitle}</span>
      </span>
      <ArrowRight className="h-4 w-4 flex-shrink-0 text-accent transition-transform group-hover:translate-x-0.5" aria-hidden />
    </button>
  );
}

function TypingDots() {
  return (
    <span className="inline-flex items-center gap-1 py-1" aria-label="Assistant is typing">
      {[0, 1, 2].map((i) => (
        <span
          key={i}
          className="h-1.5 w-1.5 animate-bounce rounded-full bg-text-tertiary"
          style={{ animationDelay: `${i * 0.15}s` }}
        />
      ))}
    </span>
  );
}

// ── Entry: offer the guided funnel or free-text, both always available ──
function EntryCard({
  done,
  onGuided,
  onAsk,
}: {
  done: boolean;
  onGuided: () => void;
  onAsk: () => void;
}) {
  if (done) return null;
  return (
    <div className="flex flex-col gap-2">
      <button
        onClick={onGuided}
        className="group flex items-center gap-3 rounded-2xl border border-accent/30 bg-accent-light/40 p-3.5 text-left transition-colors hover:border-accent/50 hover:bg-accent-light/60"
      >
        <span className="flex h-9 w-9 flex-shrink-0 items-center justify-center rounded-full bg-accent text-white">
          <Sparkles className="h-4 w-4" aria-hidden />
        </span>
        <span className="flex-1">
          <span className="block text-sm font-semibold text-text-primary">
            Get a tailored rate review
          </span>
          <span className="block text-xs text-text-secondary">
            Three quick questions — we&apos;ll match you to the right team.
          </span>
        </span>
        <ArrowRight className="h-4 w-4 flex-shrink-0 text-accent transition-transform group-hover:translate-x-0.5" aria-hidden />
      </button>
      <button
        onClick={onAsk}
        className="rounded-2xl border border-border bg-white p-3 text-left text-sm font-medium text-text-secondary transition-colors hover:border-accent/30 hover:text-text-primary"
      >
        💬 Just ask a question
      </button>
    </div>
  );
}

const chipClass =
  "rounded-full border border-border bg-white px-3.5 py-2 text-sm font-medium text-text-primary transition-colors hover:border-accent/50 hover:bg-accent-light/40 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-accent/40 disabled:opacity-50";

// ── A guided step: single-select chips, or multi-select lanes with confirm ──
function ChoiceCard({
  card,
  onPick,
  onPickLanes,
  onSkip,
}: {
  card: Card;
  onPick: (value: string) => void;
  onPickLanes: (values: Lane[]) => void;
  onSkip: () => void;
}) {
  const [selected, setSelected] = useState<string[]>([]);
  const choices = card.choices ?? [];
  const pct = card.pos && card.len ? Math.round((card.pos / card.len) * 100) : 0;

  return (
    <div className="space-y-2.5">
      {/* Progress */}
      {pct > 0 && (
        <div className="flex items-center gap-2" aria-hidden>
          <div className="h-1 flex-1 overflow-hidden rounded-full bg-border">
            <div className="h-full rounded-full bg-accent transition-all" style={{ width: `${pct}%` }} />
          </div>
          <span className="text-[10px] font-medium text-text-tertiary">
            {card.pos}/{card.len}
          </span>
        </div>
      )}

      <div className="flex flex-wrap gap-2">
        {choices.map((c) =>
          card.multi ? (
            <button
              key={c.value}
              type="button"
              aria-pressed={selected.includes(c.value)}
              onClick={() =>
                setSelected((s) =>
                  s.includes(c.value) ? s.filter((v) => v !== c.value) : [...s, c.value],
                )
              }
              className={`${chipClass} ${
                selected.includes(c.value) ? "border-accent bg-accent text-white hover:bg-accent" : ""
              }`}
            >
              {c.label}
            </button>
          ) : (
            <button key={c.value} type="button" onClick={() => onPick(c.value)} className={chipClass}>
              {c.label}
            </button>
          ),
        )}
      </div>

      {card.multi && (
        <div className="flex items-center gap-3 pt-0.5">
          <button
            type="button"
            onClick={() => onPickLanes(selected as Lane[])}
            disabled={selected.length === 0}
            className="inline-flex items-center gap-1 rounded-lg bg-bg-dark px-3.5 py-2 text-sm font-medium text-white transition-colors hover:bg-bg-dark-card disabled:opacity-40"
          >
            Continue <ArrowRight className="h-3.5 w-3.5" aria-hidden />
          </button>
          <button
            type="button"
            onClick={onSkip}
            className="text-xs text-text-tertiary underline-offset-2 hover:text-accent hover:underline"
          >
            Skip
          </button>
        </div>
      )}

      {!card.multi && card.skippable && (
        <button
          type="button"
          onClick={onSkip}
          className="text-xs text-text-tertiary underline-offset-2 hover:text-accent hover:underline"
        >
          Skip this
        </button>
      )}
    </div>
  );
}

// ── Matched proof shown before we ask for any contact details (SPEC §6) ──
function ProofBox({ proof }: { proof: NonNullable<RoutingResult["proof"]> }) {
  return (
    <a
      href={proof.href}
      className="group flex items-start gap-2.5 rounded-2xl border border-border bg-white p-3 transition-colors hover:border-accent/40"
    >
      <span className="flex flex-shrink-0 flex-col items-center gap-1.5">
        <span className="inline-flex h-5 items-center rounded-full bg-accent-light px-2 text-[10px] font-semibold uppercase tracking-wide text-accent">
          Proof
        </span>
        <IntegrationLogo name={proof.client} logo={proof.logo} size="sm" />
      </span>
      <span className="flex-1 text-xs leading-snug text-text-secondary">
        <span className="font-semibold text-text-primary">{proof.client}</span> {proof.line}.{" "}
        <span className="whitespace-nowrap font-medium text-accent group-hover:underline">
          Read their story →
        </span>
      </span>
    </a>
  );
}

// ── In-chat booking — embeds the configured scheduler (Calendly / Cal.com /
//    Zoho Bookings via NEXT_PUBLIC_BOOKING_URL); falls back to a contact prompt
//    until the URL is set. ──
function BookingCard() {
  const url = process.env.NEXT_PUBLIC_BOOKING_URL;
  if (url) {
    return (
      <div className="overflow-hidden rounded-2xl border border-border bg-white">
        <iframe
          src={url}
          title="Book a meeting with ITD Global"
          loading="lazy"
          className="h-[460px] w-full"
        />
      </div>
    );
  }
  return (
    <div className="rounded-2xl border border-accent/30 bg-accent-light/40 p-3.5">
      <p className="flex items-center gap-1.5 text-sm font-medium text-text-primary">
        <CalendarClock className="h-4 w-4 text-accent" aria-hidden /> Let&apos;s get a call in the
        diary.
      </p>
      <p className="mt-1 text-xs text-text-secondary">
        Tell us a time that suits and we&apos;ll send a calendar invite to confirm.
      </p>
      <a
        href="/contact?enquiry=meeting"
        className="mt-3 inline-flex items-center gap-1 rounded-lg bg-bg-dark px-4 py-2 text-sm font-medium text-white transition-colors hover:bg-bg-dark-card"
      >
        Request a time <ArrowRight className="h-3.5 w-3.5" aria-hidden />
      </a>
    </div>
  );
}

// ── Lead capture — shared by the guided ("qualified") and escape ("callback")
//    paths. PII is collected only after value has been shown above it. ──
function LeadCard({
  mode,
  routing,
  answers,
  sessionId,
  transcript,
  done,
  onDone,
}: {
  mode: "qualified" | "callback";
  routing?: RoutingResult;
  answers: FunnelAnswers;
  sessionId: string;
  transcript: { role: Role; content: string }[];
  done: boolean;
  onDone: () => void;
}) {
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [company, setCompany] = useState("");
  const [phone, setPhone] = useState("");
  const [postcode, setPostcode] = useState("");
  const [consent, setConsent] = useState(false);
  const [website, setWebsite] = useState(""); // honeypot
  const [submitting, setSubmitting] = useState(false);
  const [submitted, setSubmitted] = useState(false);
  const [error, setError] = useState("");

  const submit = async (e: React.FormEvent) => {
    e.preventDefault();
    setError("");
    if (!name.trim() || !email.trim() || !consent) {
      setError("Please add your name, email, and tick consent.");
      return;
    }
    setSubmitting(true);
    try {
      const res = await fetch("/api/chat/lead", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          sessionId,
          name,
          email,
          company,
          phone,
          postcode,
          transcript,
          consent,
          website,
          productType: answers.productType,
          direction: answers.direction,
          tradeDirection: answers.tradeDirection,
          lanes: answers.lanes,
          volumeBand: answers.volumeBand,
          segment: answers.segment,
          requestedHuman: mode === "callback",
        }),
      });
      if (!res.ok) throw new Error("failed");
      setSubmitted(true);
      onDone();
    } catch {
      setError("Something went wrong — please try again.");
    } finally {
      setSubmitting(false);
    }
  };

  const field =
    "w-full rounded-lg border border-border bg-white px-3 py-2 text-sm text-text-primary placeholder-text-tertiary focus:outline-none focus:ring-2 focus:ring-accent";

  if (done || submitted) return null;

  const heading =
    mode === "qualified" && routing
      ? `${routing.ctaLabel} — add your details and the right specialist will follow up.`
      : "Leave your details and the ITD Global team will be in touch.";

  return (
    <form onSubmit={submit} className="rounded-2xl border border-accent/30 bg-accent-light/40 p-3.5">
      <p className="mb-3 text-sm font-medium text-text-primary">{heading}</p>
      <div className="space-y-2">
        <input
          value={company}
          onChange={(e) => setCompany(e.target.value)}
          placeholder="Company"
          className={field}
          autoComplete="organization"
        />
        <input
          value={name}
          onChange={(e) => setName(e.target.value)}
          placeholder="Name *"
          className={field}
          autoComplete="name"
        />
        <input
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          placeholder="Work email *"
          type="email"
          className={field}
          autoComplete="email"
        />
        <input
          value={phone}
          onChange={(e) => setPhone(e.target.value)}
          placeholder="Phone (optional)"
          type="tel"
          className={field}
          autoComplete="tel"
        />
        <input
          value={postcode}
          onChange={(e) => setPostcode(e.target.value)}
          placeholder="Collection postcode (optional)"
          className={field}
          autoComplete="postal-code"
        />
        {/* Honeypot — hidden from humans */}
        <input
          value={website}
          onChange={(e) => setWebsite(e.target.value)}
          tabIndex={-1}
          autoComplete="off"
          aria-hidden
          className="hidden"
        />
        <label className="flex items-start gap-2 text-xs text-text-secondary">
          <input
            type="checkbox"
            checked={consent}
            onChange={(e) => setConsent(e.target.checked)}
            className="mt-0.5 h-3.5 w-3.5 accent-accent"
          />
          I agree to ITD Global contacting me about my enquiry. We&apos;ll only use your details to
          respond — see our privacy policy.
        </label>
      </div>
      {error && <p className="mt-2 text-xs text-red-600">{error}</p>}
      <button
        type="submit"
        disabled={submitting}
        className="mt-3 inline-flex w-full items-center justify-center gap-2 rounded-lg bg-bg-dark px-4 py-2.5 text-sm font-medium text-white transition-colors hover:bg-bg-dark-card disabled:opacity-60"
      >
        {submitting && <Loader2 className="h-4 w-4 animate-spin" aria-hidden />}
        {submitting ? "Sending…" : "Send my details"}
      </button>
    </form>
  );
}
