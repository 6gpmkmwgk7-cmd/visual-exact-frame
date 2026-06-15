import { useState, useRef, useEffect } from "react";
import { useTranslation } from "react-i18next";
import { MessageCircle, X, Send, Bot, User, Sparkles, Minimize2 } from "lucide-react";

interface Message {
  id: string;
  role: "user" | "assistant";
  content: string;
  ts: number;h
}

const SYSTEM_PROMPT = `You are Ellie, the AI assistant for Elevate Social — an AI-powered marketing and automation agency for small businesses. You are warm, professional, knowledgeable, and concise.

You help visitors:
- Learn about Elevate Social services (Social Media Management, Content Creation, Branding, Website Design, AI Automation, Growth Consulting)
- Understand pricing (Business Presence Launch $99, Content Growth $199/mo, AI Growth System $499/mo)
- Book free AI growth audits or strategy calls
- Answer questions about AI-powered marketing and automation

Keep responses short and helpful (2-4 sentences max). Be conversational. If someone wants to book a call or get an audit, guide them to the contact or free-audit page. Always be encouraging and solution-focused.

Never make up specific case studies or client results. If asked something outside your scope, suggest booking a free call.`;

const TOPIC_KEYWORDS = [
  "marketing","social media","content","brand","branding","website","design",
  "seo","automation","ai","growth","business","instagram","facebook","tiktok",
  "linkedin","ads","advertising","email","leads","clients","customers",
  "pricing","price","cost","package","plan","audit","strategy","consulting",
  "logo","video","post","caption","schedule","analytics","campaign","elevate",
  "ellie","service","help","hi","hello","hey","thanks","thank","book",
  "call","contact","start","small business","restaurant","contractor",
  "plumber","landscap","clean","revenue","sales","online","digital","local",
  "quote","question","info","what","how","when","where","who","can","do you",
];

function isTopicRelevant(msg: string): boolean {
  const lower = msg.toLowerCase().trim();
  if (lower.split(/\s+/).length <= 3) return true;
  return TOPIC_KEYWORDS.some((kw) => lower.includes(kw));
}

const OFF_TOPIC_REPLY =
  "That's a bit outside my lane! 😊 I'm Ellie, Elevate Social's AI assistant — I help with marketing, AI automation, website design, and business growth for small businesses. Want to chat about any of those, or book a free strategy call?";
const RATE_LIMIT_DELAY_MS = 3_000;
const RATE_LIMIT_MAX = 8;
const RATE_LIMIT_WINDOW_MS = 60_000;

export function ChatBot() {
  const { t, i18n } = useTranslation();
  const [open, setOpen] = useState(false);
  const [minimized, setMinimized] = useState(false);
  const [messages, setMessages] = useState<Message[]>([
    {
      id: "welcome",
      role: "assistant",
      content: t("chat.welcome"),
      ts: Date.now(),
    },
  ]);

  // Keep the welcome message in sync with the active language until the user
  // sends their first message.
  useEffect(() => {
    setMessages((prev) =>
      prev.length === 1 && prev[0].id === "welcome"
        ? [{ ...prev[0], content: t("chat.welcome") }]
        : prev,
    );
  }, [i18n.language, t]);
  const [input, setInput] = useState("");
  const [loading, setLoading] = useState(false);
  const bottomRef = useRef<HTMLDivElement>(null);
  const inputRef = useRef<HTMLInputElement>(null);
  const rateLimitLastRef = useRef<number>(0);
    const rateLimitCountRef = useRef<number>(0);
      const rateLimitWindowRef = useRef<number>(0);

  useEffect(() => {
    bottomRef.current?.scrollIntoView({ behavior: "smooth" });
  }, [messages, open]);

  useEffect(() => {
    if (open && !minimized) {
      setTimeout(() => inputRef.current?.focus(), 100);
    }
  }, [open, minimized]);

  const sendMessage = async () => {
    const text = input.trim();
    if (!text || loading) return;
    // Client-side rate limiting
    const now = Date.now();
    if (now - rateLimitLastRef.current < RATE_LIMIT_DELAY_MS) {
    setMessages((prev) => [...prev, { id: now.toString(), role: "assistant" as const, content: "⏳ Please wait a moment before sending another message.", ts: now }]);
    return;
    }
    if (now - rateLimitWindowRef.current > RATE_LIMIT_WINDOW_MS) {
    rateLimitWindowRef.current = now;
    rateLimitCountRef.current = 0;
    }
    rateLimitCountRef.current += 1;
    if (rateLimitCountRef.current > RATE_LIMIT_MAX) {
    setMessages((prev) => [...prev, { id: now.toString(), role: "assistant" as const, content: "🚫 Too many messages — please wait a minute before trying again.", ts: now }]);
    return;
    }
    rateLimitLastRef.current = now;

    // Offline guard — preserve input so user can retry
    if (!navigator.onLine) {
      setMessages((prev) => [...prev, {
        id: Date.now().toString(), role: "assistant" as const,
        content: "You appear to be offline. Please check your connection and try again! 📡",
        ts: Date.now(),
      }]);
      return;
    }

    // Topic filter — reply without API call
    if (!isTopicRelevant(text)) {
      setInput("");
      setMessages((prev) => [...prev,
        { id: Date.now().toString(), role: "user" as const, content: text, ts: Date.now() },
        { id: (Date.now() + 1).toString(), role: "assistant" as const, content: OFF_TOPIC_REPLY, ts: Date.now() },
      ]);
      return;
    }

    setInput("");

    const userMsg: Message = { id: Date.now().toString(), role: "user", content: text, ts: Date.now() };
    setMessages((prev) => [...prev, userMsg]);
    setLoading(true);

    const ctrl = new AbortController();
    const timer = setTimeout(() => ctrl.abort(), 35000);

    try {
      let sessionId = "";
      if (typeof window !== "undefined") {
        sessionId = window.localStorage.getItem("elevate_session") ?? "";
        if (!sessionId) {
          sessionId = "web_" + Date.now() + "_" + Math.random().toString(36).slice(2, 10);
          window.localStorage.setItem("elevate_session", sessionId);
        }
      }

      const res = await fetch(import.meta.env.VITE_N8N_CHAT_WEBHOOK_URL || "https://elevatedsocial111.app.n8n.cloud/webhook/elevate-social-frontend-agent", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
          signal: ctrl.signal,
        body: JSON.stringify({
          message: text,
          sessionId,
          channel: "lovable_website",
          language: (typeof window !== "undefined" && window.localStorage.getItem("site_translate_lang")) || i18n.language || "en",
            referrer: document.referrer,
            timezone: Intl.DateTimeFormat().resolvedOptions().timeZone,
            timestamp: new Date().toISOString(),
        }),
      });

      clearTimeout(timer);
    const raw = await res.text();
      let reply = t("chat.error");
      try {
        const data = JSON.parse(raw);
        reply = data.reply ?? data.output ?? data.message ?? data.text ?? data.response ?? reply;
        if (data.sessionId && typeof window !== "undefined") {
          window.localStorage.setItem("elevate_session", data.sessionId);
        }
      } catch {
        if (raw) reply = raw;
      }

      setMessages((prev) => [
        ...prev,
        { id: (Date.now() + 1).toString(), role: "assistant", content: reply, ts: Date.now() },
      ]);
    } catch (err: unknown) {
      const isAbort = err instanceof Error && err.name === "AbortError";
      setMessages((prev) => [
        ...prev,
        { id: (Date.now() + 1).toString(), role: "assistant", content: isAbort ? "That took a bit too long — please try again in a moment! ⏱️" : t("chat.error"), ts: Date.now() },
      ]);
    } finally {
      setLoading(false);
    }
  };

  const onKey = (e: React.KeyboardEvent) => {
    if (e.key === "Enter" && !e.shiftKey) { e.preventDefault(); sendMessage(); }
  };

  return (
    <>
      {/* Floating button */}
      {!open && (
        <button
          onClick={() => { setOpen(true); setMinimized(false); }}
          className="fixed bottom-6 right-6 z-50 flex items-center gap-2 rounded-full bg-gradient-to-r from-[#06B6D4] to-[#8B5CF6] px-5 py-3.5 text-sm font-semibold text-white shadow-[0_0_30px_rgba(139,92,246,0.5)] transition hover:scale-105 active:scale-95"
          aria-label="Open AI Chat"
        >
          <div className="relative">
            <MessageCircle className="h-5 w-5 text-white" />
            <span className="absolute -right-1 -top-1 flex h-2.5 w-2.5">
              <span className="absolute inline-flex h-full w-full animate-ping rounded-full bg-cyan opacity-75" />
              <span className="relative inline-flex h-2.5 w-2.5 rounded-full bg-cyan" />
            </span>
          </div>
          <span>{t("chat.button")}</span>
        </button>
      )}

      {/* Chat window */}
      {open && (
        <div
          className={`fixed bottom-6 right-6 z-50 flex w-[370px] flex-col overflow-hidden rounded-3xl border border-white/10 bg-navy shadow-[0_0_60px_rgba(6,182,212,0.25)] transition-all duration-300 ${
            minimized ? "h-16" : "h-[520px]"
          }`}
          style={{ maxWidth: "calc(100vw - 32px)" }}
        >
          {/* Header */}
          <div className="flex items-center justify-between bg-gradient-hero px-5 py-4 shrink-0">
            <div className="flex items-center gap-3">
              <div className="relative flex h-9 w-9 items-center justify-center rounded-full bg-gradient-gold shadow-glow">
                <Sparkles className="h-4 w-4 text-white" />
                <span className="absolute -right-0.5 -bottom-0.5 h-3 w-3 rounded-full border-2 border-navy bg-green-400" />
              </div>
              <div>
                <p className="text-sm font-semibold text-white">{t("chat.title")}</p>
                <p className="text-[10px] text-cyan">{t("chat.subtitle")}</p>
              </div>
            </div>
            <div className="flex items-center gap-2">
              <button
                aria-label="Minimize chat" onClick={() => setMinimized(!minimized)}
                className="flex h-7 w-7 items-center justify-center rounded-full bg-white/10 text-white/70 transition hover:bg-white/20"
              >
                <Minimize2 className="h-3.5 w-3.5" />
              </button>
              <button
                aria-label="Close chat" onClick={() => setOpen(false)}
                className="flex h-7 w-7 items-center justify-center rounded-full bg-white/10 text-white/70 transition hover:bg-white/20"
              >
                <X className="h-3.5 w-3.5" />
              </button>
            </div>
          </div>

          {!minimized && (
            <>
              {/* Messages */}
              <div className="flex-1 overflow-y-auto px-4 py-4 space-y-3 scrollbar-thin">
                {messages.map((m) => (
                  <div key={m.id} className={`flex gap-2.5 ${m.role === "user" ? "flex-row-reverse" : ""}`}>
                    <div className={`flex h-7 w-7 shrink-0 items-center justify-center rounded-full ${
                      m.role === "assistant" ? "bg-gradient-gold" : "bg-gradient-accent"
                    }`}>
                      {m.role === "assistant"
                        ? <Bot className="h-3.5 w-3.5 text-white" />
                        : <User className="h-3.5 w-3.5 text-white" />
                      }
                    </div>
                    <div
                      className={`max-w-[78%] rounded-2xl px-4 py-2.5 text-sm leading-relaxed ${
                        m.role === "assistant"
                          ? "rounded-tl-sm bg-white/8 text-white/90 border border-white/10"
                          : "rounded-tr-sm bg-gradient-gold text-white"
                      }`}
                      style={m.role === "assistant" ? { background: "rgba(255,255,255,0.07)" } : {}}
                    >
                      {m.content}
                    </div>
                  </div>
                ))}

                {loading && (
                  <div className="flex gap-2.5">
                    <div className="flex h-7 w-7 shrink-0 items-center justify-center rounded-full bg-gradient-gold">
                      <Bot className="h-3.5 w-3.5 text-white" />
                    </div>
                    <div className="flex items-center gap-1.5 rounded-2xl rounded-tl-sm px-4 py-3" style={{ background: "rgba(255,255,255,0.07)", border: "1px solid rgba(255,255,255,0.1)" }}>
                      {[0, 1, 2].map((i) => (
                        <span key={i} className="h-2 w-2 rounded-full bg-cyan/60 animate-bounce" style={{ animationDelay: `${i * 0.15}s` }} />
                      ))}
                    </div>
                  </div>
                )}
                <div ref={bottomRef} />
              </div>

              {/* Input */}
              <div className="border-t border-white/10 px-4 py-3 shrink-0">
                <div className="flex items-center gap-2 rounded-full border border-white/15 bg-white/5 px-4 py-2">
                  <input
                    ref={inputRef}
                    value={input}
                    onChange={(e) => setInput(e.target.value)}
                    onKeyDown={onKey}
                    placeholder={t("chat.placeholder")}
                    className="flex-1 bg-transparent text-sm text-white placeholder-white/40 outline-none"
                  />
                  <button
                    onClick={sendMessage}
                    disabled={!input.trim() || loading}
                    className="flex h-8 w-8 shrink-0 items-center justify-center rounded-full bg-gradient-gold text-white transition hover:opacity-90 disabled:opacity-40"
                  >
                    <Send className="h-3.5 w-3.5" />
                  </button>
                </div>
                <p className="mt-2 text-center text-[10px] text-white/40">{t("chat.language_note")}</p>
              </div>
            </>
          )}
        </div>
      )}
    </>
  );
}
