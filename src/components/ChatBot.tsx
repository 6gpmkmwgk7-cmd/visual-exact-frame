import { useState, useRef, useEffect, useCallback } from "react";
import { useTranslation } from "react-i18next";
import { MessageCircle, X, Send, Bot, User, Sparkles, Minimize2 } from "lucide-react";
import { N8N_WEBHOOK_URL, SITE_NAME } from "@/lib/siteConfig";

interface Message {
  id: string;
  role: "user" | "assistant";
  content: string;
  ts: number;
}

const CHAT_TIMEOUT_MS = 25_000;
const MAX_CHARS = 500;

function uid(): string {
  return Math.random().toString(36).slice(2) + Date.now().toString(36);
}

function getOrCreate(key: string, gen: () => string): string {
  try {
    const v = localStorage.getItem(key);
    if (v) return v;
    const nv = gen();
    localStorage.setItem(key, nv);
    return nv;
  } catch {
    return gen();
  }
}

export function ChatBot() {
  const { i18n } = useTranslation();
  const [open, setOpen] = useState(false);
  const [minimized, setMinimized] = useState(false);
  const [messages, setMessages] = useState<Message[]>([]);
  const [input, setInput] = useState("");
  const [sending, setSending] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const bottomRef = useRef<HTMLDivElement>(null);
  const inputRef = useRef<HTMLTextAreaElement>(null);
  const abortRef = useRef<AbortController | null>(null);
  const sessionId = useRef(getOrCreate("elevate_session_id", uid)).current;
  const visitorId = useRef(getOrCreate("elevate_visitor_id", uid)).current;

  useEffect(() => {
    if (open && messages.length === 0) {
      setMessages([{
        id: uid(),
        role: "assistant",
        content: `👋 Hi! I'm Ellie, your AI assistant for ${SITE_NAME}. How can I help you today?`,
        ts: Date.now(),
      }]);
    }
  }, [open]);

  useEffect(() => { bottomRef.current?.scrollIntoView({ behavior: "smooth" }); }, [messages]);
  useEffect(() => { if (open && !minimized) inputRef.current?.focus(); }, [open, minimized]);

  const sendMessage = useCallback(async () => {
    const text = input.trim();
    if (!text || sending) return;

    setMessages(prev => [...prev, { id: uid(), role: "user", content: text, ts: Date.now() }]);
    setInput("");
    setSending(true);
    setError(null);

    const ctrl = new AbortController();
    abortRef.current = ctrl;
    const timer = setTimeout(() => ctrl.abort(), CHAT_TIMEOUT_MS);

    try {
      if (!N8N_WEBHOOK_URL) throw new Error("Chat unavailable. Please email us directly.");

      const res = await fetch(N8N_WEBHOOK_URL, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        signal: ctrl.signal,
        body: JSON.stringify({
          message: text,
          latestMessage: text,
          sessionId,
          visitorId,
          channel: "website",
          language: i18n.language || "en",
          selectedLanguage: i18n.language || "en",
          sourcePage: typeof window !== "undefined" ? window.location.pathname : "/",
          campaign: typeof window !== "undefined" ? new URLSearchParams(window.location.search).get("utm_campaign") || "" : "",
          referrer: typeof document !== "undefined" ? document.referrer : "",
          timezone: Intl.DateTimeFormat().resolvedOptions().timeZone,
        }),
      });

      if (!res.ok) throw new Error(`Server error (${res.status}). Please try again.`);

      const rawText = await res.text();
      let data: Record<string, unknown> = {};
      if (rawText.trim()) {
        try { data = JSON.parse(rawText); } catch { /* ignore parse error */ }
      }

      const reply: string =
        typeof data.reply === "string" ? data.reply :
        typeof data.message === "string" ? data.message :
        typeof data.text === "string" ? data.text :
        typeof data.output === "string" ? data.output :
        "Thanks for your message! Our team will follow up with you shortly. You can also reach us at socialselavates@gmail.com";

      setMessages(prev => [...prev, { id: uid(), role: "assistant", content: reply, ts: Date.now() }]);
    } catch (err: unknown) {
      if (err instanceof Error && err.name === "AbortError") {
        setError("Request timed out. Please try again.");
      } else {
        setError(err instanceof Error ? err.message : "Something went wrong.");
      }
    } finally {
      clearTimeout(timer);
      setSending(false);
      abortRef.current = null;
    }
  }, [input, sending, sessionId, visitorId, i18n.language]);

  const handleKeyDown = (e: React.KeyboardEvent<HTMLTextAreaElement>) => {
    if (e.key === "Enter" && !e.shiftKey) { e.preventDefault(); sendMessage(); }
  };

  if (!open) {
    return (
      <button
        onClick={() => { setOpen(true); setMinimized(false); }}
        className="fixed bottom-4 right-4 sm:bottom-6 sm:right-6 z-50 w-14 h-14 rounded-full bg-gradient-to-br from-purple-600 to-indigo-600 text-white shadow-lg hover:shadow-xl hover:scale-105 transition-all duration-200 flex items-center justify-center"
        aria-label="Open chat with Ellie"
      >
        <MessageCircle className="w-6 h-6" />
      </button>
    );
  }

  return (
    <div
      role="dialog"
      aria-label="Chat with Ellie"
      className={`fixed bottom-4 right-4 sm:bottom-6 sm:right-6 z-50 w-[360px] max-w-[calc(100vw-2rem)] rounded-2xl shadow-2xl bg-white border border-gray-200 flex flex-col overflow-hidden transition-all duration-200 ${minimized ? "h-[60px]" : "h-[520px] max-h-[calc(100dvh-5rem)]"}`}
    >
      {/* Header */}
      <div className="flex items-center gap-2 px-4 py-3 bg-gradient-to-r from-purple-600 to-indigo-600 text-white flex-shrink-0">
        <Sparkles className="w-5 h-5 opacity-80" />
        <div className="flex-1 min-w-0">
          <p className="font-semibold text-sm leading-tight">Ellie</p>
          <p className="text-xs opacity-75">Elevate Social AI</p>
        </div>
        <button onClick={() => setMinimized(m => !m)} className="p-1 rounded hover:bg-white/20 transition-colors" aria-label={minimized ? "Expand chat" : "Minimize chat"}>
          <Minimize2 className="w-4 h-4" />
        </button>
        <button onClick={() => setOpen(false)} className="p-1 rounded hover:bg-white/20 transition-colors" aria-label="Close chat">
          <X className="w-4 h-4" />
        </button>
      </div>

      {!minimized && (
        <>
          {/* Messages */}
          <div className="flex-1 overflow-y-auto p-4 space-y-3 bg-gray-50">
            {messages.map(msg => (
              <div key={msg.id} className={`flex gap-2 ${msg.role === "user" ? "flex-row-reverse" : "flex-row"}`}>
                <div className={`flex-shrink-0 w-7 h-7 rounded-full flex items-center justify-center ${msg.role === "user" ? "bg-purple-600 text-white" : "bg-indigo-100 text-indigo-700"}`}>
                  {msg.role === "user" ? <User className="w-3.5 h-3.5" /> : <Bot className="w-3.5 h-3.5" />}
                </div>
                <div className={`max-w-[80%] rounded-2xl px-3 py-2 text-sm leading-relaxed whitespace-pre-wrap ${msg.role === "user" ? "bg-purple-600 text-white rounded-tr-sm" : "bg-white text-gray-800 border border-gray-200 rounded-tl-sm"}`}>
                  {msg.content}
                </div>
              </div>
            ))}

            {sending && (
              <div className="flex gap-2">
                <div className="w-7 h-7 rounded-full bg-indigo-100 text-indigo-700 flex items-center justify-center flex-shrink-0">
                  <Bot className="w-3.5 h-3.5" />
                </div>
                <div className="bg-white border border-gray-200 rounded-2xl rounded-tl-sm px-3 py-2.5">
                  <div className="flex gap-1 items-center">
                    <span className="w-1.5 h-1.5 rounded-full bg-gray-400 animate-bounce" style={{ animationDelay: "0ms" }} />
                    <span className="w-1.5 h-1.5 rounded-full bg-gray-400 animate-bounce" style={{ animationDelay: "150ms" }} />
                    <span className="w-1.5 h-1.5 rounded-full bg-gray-400 animate-bounce" style={{ animationDelay: "300ms" }} />
                  </div>
                </div>
              </div>
            )}

            {error && (
              <p className="text-xs text-red-500 bg-red-50 border border-red-100 rounded-lg px-3 py-2">{error}</p>
            )}
            <div ref={bottomRef} />
          </div>

          {/* Input */}
          <div className="flex-shrink-0 border-t border-gray-200 bg-white p-3">
            <div className="flex items-end gap-2">
              <textarea
                ref={inputRef}
                value={input}
                onChange={e => setInput(e.target.value.slice(0, MAX_CHARS))}
                onKeyDown={handleKeyDown}
                placeholder="Ask me anything..."
                rows={1}
                disabled={sending}
                className="flex-1 resize-none rounded-xl border border-gray-300 bg-white text-gray-900 placeholder:text-gray-400 px-3 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-purple-500 focus:border-transparent disabled:opacity-50 overflow-y-auto"
                style={{ minHeight: "40px", maxHeight: "96px" }}
                aria-label="Chat message input"
              />
              <button
                onClick={sendMessage}
                disabled={!input.trim() || sending}
                className="flex-shrink-0 w-9 h-9 rounded-xl bg-purple-600 text-white flex items-center justify-center hover:bg-purple-700 disabled:opacity-40 disabled:cursor-not-allowed transition-colors"
                aria-label="Send message"
              >
                <Send className="w-4 h-4" />
              </button>
            </div>
            {input.length > MAX_CHARS * 0.8 && (
              <p className="text-xs text-gray-400 mt-1 text-right">{input.length}/{MAX_CHARS}</p>
            )}
          </div>
        </>
      )}
    </div>
  );
}

export default ChatBot;
