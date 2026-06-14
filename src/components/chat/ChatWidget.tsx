"use client";

import { useCallback, useEffect, useRef, useState } from "react";
import Image from "next/image";
import { MessageCircle, X, Send, Volume2, VolumeX, Loader2 } from "lucide-react";
import { PROACTIVE_GREETING, WELCOME_MESSAGE } from "@/lib/chat/knowledge";

// Chat avatar — the ITD Global mark. Drop a square (~1:1) logo here; until the
// file exists the Avatar falls back to an "ITD" monogram (so it never looks
// broken). The repo's itd-global-logo.webp is a wide lockup that's illegible at
// avatar size, so this uses a dedicated square mark.
const AVATAR_SRC = "/logos/itd/itd-chat-avatar.png";

function Avatar({ className = "" }: { className?: string }) {
  const [ok, setOk] = useState(true);
  return (
    <span
      className={`flex items-center justify-center overflow-hidden rounded-full border border-border bg-white ${className}`}
    >
      {ok ? (
        <Image
          src={AVATAR_SRC}
          alt="ITD Global"
          width={40}
          height={40}
          onError={() => setOk(false)}
          className="h-full w-full object-contain p-0.5"
        />
      ) : (
        <span className="text-[11px] font-extrabold tracking-tight text-bg-dark">ITD</span>
      )}
    </span>
  );
}

// ── Connexx Assistant: Intercom-style AI chat concierge ──────────────────────
// Floating launcher (bottom-right) → slide-up panel. Proactively shows a teaser
// after a short dwell (with a notification sound), answers prospect questions via
// the streaming /api/chat endpoint, and captures leads to /api/chat/lead.
// Motion is CSS-only and gated by prefers-reduced-motion; nothing here renders
// server-side (mounted client component), so there is no SSR blank-page risk.

type Role = "user" | "assistant";
interface Msg {
  id: string;
  role: Role;
  content: string;
}

const PROACTIVE_DELAY_MS = 18_000;
const LEAD_AFTER_USER_MSGS = 3;
const STORE_KEY = "itd_chat_v1";
const MUTE_KEY = "itd_chat_muted";
const SEEN_KEY = "itd_chat_seen"; // proactive teaser already shown/dismissed this session

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
  const [teaser, setTeaser] = useState(false);
  const [unread, setUnread] = useState(false);
  const [muted, setMuted] = useState(false);
  const [messages, setMessages] = useState<Msg[]>([]);
  const [input, setInput] = useState("");
  const [streaming, setStreaming] = useState(false);
  const [showLead, setShowLead] = useState(false);
  const [leadDone, setLeadDone] = useState(false);

  const sessionId = useRef<string>("");
  const audioRef = useRef<HTMLAudioElement | null>(null);
  const audioPrimed = useRef(false);
  const scrollRef = useRef<HTMLDivElement | null>(null);
  const messagesRef = useRef<Msg[]>([]);
  messagesRef.current = messages;

  // ── Restore persisted state ──
  useEffect(() => {
    try {
      const muteSaved = localStorage.getItem(MUTE_KEY);
      if (muteSaved === "1") setMuted(true);
      const saved = localStorage.getItem(STORE_KEY);
      if (saved) {
        const data = JSON.parse(saved) as { sessionId?: string; messages?: Msg[] };
        if (data.sessionId) sessionId.current = data.sessionId;
        if (Array.isArray(data.messages) && data.messages.length) setMessages(data.messages);
      }
    } catch {
      /* ignore */
    }
    if (!sessionId.current) {
      sessionId.current =
        (typeof crypto !== "undefined" && "randomUUID" in crypto
          ? crypto.randomUUID()
          : `s${Date.now()}_${Math.floor(performance.now())}`) as string;
    }
    // Prepare the notification sound (loaded but not played until allowed).
    audioRef.current = new Audio("/audio/notification.wav");
    audioRef.current.volume = 0.35;
    audioRef.current.preload = "auto";
  }, []);

  // ── Persist messages ──
  useEffect(() => {
    try {
      localStorage.setItem(
        STORE_KEY,
        JSON.stringify({ sessionId: sessionId.current, messages }),
      );
    } catch {
      /* ignore */
    }
  }, [messages]);

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
    if (!audioPrimed.current) return; // would be blocked; skip silently
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
  }, [messages, streaming, showLead]);

  const userMsgCount = messages.filter((m) => m.role === "user").length;
  useEffect(() => {
    if (!leadDone && userMsgCount >= LEAD_AFTER_USER_MSGS) setShowLead(true);
  }, [userMsgCount, leadDone]);

  const openPanel = useCallback(() => {
    setOpen(true);
    setTeaser(false);
    setUnread(false);
    try {
      sessionStorage.setItem(SEEN_KEY, "1");
    } catch {
      /* ignore */
    }
    setMessages((prev) =>
      prev.length === 0
        ? [{ id: newId(), role: "assistant", content: WELCOME_MESSAGE }]
        : prev,
    );
    track("chat_open");
  }, []);

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

  // ── Send a message and stream the reply ──
  const send = useCallback(
    async (text: string) => {
      const trimmed = text.trim();
      if (!trimmed || streaming) return;
      const userMsg: Msg = { id: newId(), role: "user", content: trimmed };
      const assistantId = newId();
      setInput("");
      setMessages((prev) => [
        ...prev,
        userMsg,
        { id: assistantId, role: "assistant", content: "" },
      ]);
      setStreaming(true);
      track("chat_message");

      // Build the upstream history (exclude the canned welcome + the empty placeholder).
      const history = [...messagesRef.current, userMsg]
        .filter((m) => m.content && m.content !== WELCOME_MESSAGE)
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
            prev.map((m) =>
              m.id === assistantId ? { ...m, content: m.content + chunk } : m,
            ),
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
    },
    [streaming],
  );

  // Close on Escape
  useEffect(() => {
    if (!open) return;
    const onKey = (e: KeyboardEvent) => {
      if (e.key === "Escape") setOpen(false);
    };
    window.addEventListener("keydown", onKey);
    return () => window.removeEventListener("keydown", onKey);
  }, [open]);

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
      {open && (
        <div
          role="dialog"
          aria-label="Connexx Assistant chat"
          className="fixed inset-0 z-[95] flex flex-col bg-white shadow-2xl motion-safe:animate-[chatpop_220ms_ease-out] sm:inset-auto sm:bottom-24 sm:right-6 sm:h-[600px] sm:max-h-[calc(100vh-7rem)] sm:w-[380px] sm:rounded-2xl sm:border sm:border-border"
        >
          {/* Header */}
          <div className="relative flex items-center gap-3 overflow-hidden rounded-t-2xl bg-bg-dark px-4 py-4 text-white">
            <div className="bg-noise pointer-events-none absolute inset-0 opacity-30 mix-blend-soft-light" aria-hidden />
            <Avatar className="relative h-10 w-10 flex-shrink-0" />
            <div className="relative flex-1">
              <p className="text-sm font-semibold leading-tight">ITD Global</p>
              <p className="flex items-center gap-1.5 text-xs text-white/70">
                <span className="inline-block h-2 w-2 rounded-full bg-green-400" />
                Typically replies in a few minutes
              </p>
            </div>
            <button
              onClick={toggleMute}
              aria-label={muted ? "Unmute notification sound" : "Mute notification sound"}
              className="relative rounded-md p-1.5 text-white/70 transition-colors hover:bg-white/10 hover:text-white"
            >
              {muted ? <VolumeX className="h-4 w-4" /> : <Volume2 className="h-4 w-4" />}
            </button>
            <button
              onClick={() => setOpen(false)}
              aria-label="Close chat"
              className="relative rounded-md p-1.5 text-white/70 transition-colors hover:bg-white/10 hover:text-white"
            >
              <X className="h-5 w-5" />
            </button>
          </div>

          {/* Messages */}
          <div ref={scrollRef} className="flex-1 space-y-3 overflow-y-auto bg-bg-secondary/40 px-4 py-4">
            {messages.map((m) => (
              <div
                key={m.id}
                className={`flex ${m.role === "user" ? "justify-end" : "justify-start"}`}
              >
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
            ))}

            {showLead && !leadDone && (
              <LeadCard
                sessionId={sessionId.current}
                transcript={messages
                  .filter((m) => m.content && m.content !== WELCOME_MESSAGE)
                  .map((m) => ({ role: m.role, content: m.content }))}
                onDone={() => {
                  setLeadDone(true);
                  track("chat_lead");
                  setMessages((prev) => [
                    ...prev,
                    {
                      id: newId(),
                      role: "assistant",
                      content:
                        "Brilliant — thank you! Someone from the ITD Global team will reach out shortly to talk through how we can help. Anything else I can answer in the meantime?",
                    },
                  ]);
                }}
              />
            )}
          </div>

          {/* Composer */}
          <form
            onSubmit={(e) => {
              e.preventDefault();
              send(input);
            }}
            className="border-t border-border bg-white px-3 py-3"
          >
            <div className="flex items-end gap-2">
              <textarea
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
            {!showLead && !leadDone && (
              <button
                type="button"
                onClick={() => setShowLead(true)}
                className="mt-2 text-xs text-text-tertiary underline-offset-2 hover:text-accent hover:underline"
              >
                Prefer a callback? Leave your details for the team →
              </button>
            )}
          </form>
        </div>
      )}

      {/* ── Launcher ── */}
      <button
        onClick={() => (open ? setOpen(false) : openPanel())}
        aria-label={open ? "Close chat" : "Open chat"}
        aria-expanded={open}
        className={`fixed bottom-5 right-4 z-[95] h-14 w-14 items-center justify-center rounded-full bg-accent text-white shadow-lg transition-transform hover:scale-105 active:scale-95 sm:right-6 sm:flex ${
          open ? "hidden sm:flex" : "flex"
        }`}
      >
        {open ? <X className="h-6 w-6" /> : <MessageCircle className="h-6 w-6" />}
        {unread && !open && (
          <span className="absolute -right-0.5 -top-0.5 flex h-4 w-4 items-center justify-center rounded-full bg-red-500 text-[10px] font-bold ring-2 ring-white">
            1
          </span>
        )}
      </button>

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

function LeadCard({
  sessionId,
  transcript,
  onDone,
}: {
  sessionId: string;
  transcript: { role: Role; content: string }[];
  onDone: () => void;
}) {
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [company, setCompany] = useState("");
  const [pain, setPain] = useState("");
  const [consent, setConsent] = useState(false);
  const [website, setWebsite] = useState(""); // honeypot
  const [submitting, setSubmitting] = useState(false);
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
          pain,
          transcript,
          consent,
          website,
        }),
      });
      if (!res.ok) throw new Error("failed");
      onDone();
    } catch {
      setError("Something went wrong — please try again.");
    } finally {
      setSubmitting(false);
    }
  };

  const field =
    "w-full rounded-lg border border-border bg-white px-3 py-2 text-sm text-text-primary placeholder-text-tertiary focus:outline-none focus:ring-2 focus:ring-accent";

  return (
    <form onSubmit={submit} className="rounded-2xl border border-accent/30 bg-accent-light/40 p-3.5">
      <p className="mb-3 text-sm font-medium text-text-primary">
        Leave your details and the ITD Global team will be in touch.
      </p>
      <div className="space-y-2">
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
          value={company}
          onChange={(e) => setCompany(e.target.value)}
          placeholder="Company (optional)"
          className={field}
          autoComplete="organization"
        />
        <textarea
          value={pain}
          onChange={(e) => setPain(e.target.value)}
          placeholder="What do you ship, and what's the challenge?"
          rows={2}
          className={`${field} resize-none`}
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
          I agree to ITD Global contacting me about my enquiry.
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
