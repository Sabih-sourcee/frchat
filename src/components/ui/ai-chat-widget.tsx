import { useEffect, useRef, useState, type KeyboardEvent } from "react";
import { AnimatePresence, motion } from "framer-motion";
import { MessageCircle, Send, X } from "lucide-react";

export interface AIChatWidgetProps {
  /** Optional. Defaults to same-origin "/api/public/chat". Set this when embedding on another domain. */
  endpoint?: string;
  systemPrompt?: string;
  botName?: string;
  logoUrl?: string;
  primaryColor?: string;
}

type ChatMessage = { role: "user" | "assistant"; content: string };

export function AIChatWidget({
  endpoint = "/api/public/chat",
  systemPrompt = "You are a helpful assistant.",
  botName = "AI Assistant",
  logoUrl,
  primaryColor = "#00BFA5",
}: AIChatWidgetProps) {
  const [isOpen, setIsOpen] = useState(false);
  const [messages, setMessages] = useState<ChatMessage[]>([]);
  const [input, setInput] = useState("");
  const [isLoading, setIsLoading] = useState(false);
  const scrollRef = useRef<HTMLDivElement>(null);
  const inputRef = useRef<HTMLTextAreaElement>(null);

  useEffect(() => {
    if (scrollRef.current) {
      scrollRef.current.scrollTop = scrollRef.current.scrollHeight;
    }
  }, [messages, isLoading, isOpen]);

  useEffect(() => {
    const openHandler = () => setIsOpen(true);
    const askHandler = (e: Event) => {
      const detail = (e as CustomEvent<{ text?: string }>).detail;
      setIsOpen(true);
      if (detail?.text) setInput(detail.text);
      requestAnimationFrame(() => inputRef.current?.focus());
    };
    window.addEventListener("factor-chat:open", openHandler);
    window.addEventListener("factor-chat:ask", askHandler as EventListener);
    return () => {
      window.removeEventListener("factor-chat:open", openHandler);
      window.removeEventListener("factor-chat:ask", askHandler as EventListener);
    };
  }, []);

  const sendMessage = async () => {
    const text = input.trim();
    if (!text || isLoading) return;

    const nextMessages: ChatMessage[] = [...messages, { role: "user", content: text }];
    setMessages(nextMessages);
    setInput("");
    setIsLoading(true);

    try {
      const response = await fetch(endpoint, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ messages: nextMessages, systemPrompt }),
      });
      const data = await response.json();
      const reply =
        data?.reply ??
        data?.error ??
        "Sorry, I couldn't generate a response.";
      setMessages((m) => [...m, { role: "assistant", content: reply }]);
    } catch (err) {
      setMessages((m) => [
        ...m,
        { role: "assistant", content: `Error: ${(err as Error).message}` },
      ]);
    } finally {
      setIsLoading(false);
      requestAnimationFrame(() => inputRef.current?.focus());
    }
  };

  const handleKeyDown = (e: KeyboardEvent<HTMLTextAreaElement>) => {
    if (e.key === "Enter" && !e.shiftKey) {
      e.preventDefault();
      sendMessage();
    }
  };

  return (
    <div className="fixed bottom-4 right-4 sm:bottom-6 sm:right-6 z-[9999] font-sans">
      <AnimatePresence>
        {isOpen && (
          <motion.div
            key="window"
            initial={{ opacity: 0, scale: 0, y: 20 }}
            animate={{ opacity: 1, scale: 1, y: 0 }}
            exit={{ opacity: 0, scale: 0, y: 20 }}
            transition={{ type: "spring", stiffness: 260, damping: 22 }}
            style={{ transformOrigin: "bottom right" }}
            className="fixed sm:absolute inset-x-2 bottom-20 sm:inset-x-auto sm:right-0 sm:bottom-20 sm:w-[380px] w-auto h-[min(520px,calc(100dvh-6rem))] sm:h-[520px] mx-auto sm:mx-0 max-w-[420px] sm:max-w-none bg-white rounded-2xl shadow-2xl border border-gray-200 flex flex-col overflow-hidden"
          >
            {/* Header */}
            <div
              className="flex items-center justify-between px-4 py-3 text-white"
              style={{ backgroundColor: primaryColor }}
            >
              <div className="flex items-center gap-2">
                {logoUrl ? (
                  <img src={logoUrl} alt={botName} className="h-8 w-8 rounded-full object-cover bg-white" />
                ) : (
                  <span className="text-2xl leading-none">🤖</span>
                )}
                <span className="font-semibold text-base">{botName}</span>
              </div>
              <button
                onClick={() => setIsOpen(false)}
                className="text-white/90 hover:text-white transition-colors p-1 rounded-md hover:bg-white/10"
                aria-label="Close chat"
              >
                <X size={18} />
              </button>
            </div>

            {/* Messages */}
            <div ref={scrollRef} className="flex-1 overflow-y-auto px-4 py-3 space-y-3 bg-white">
              {messages.length === 0 && (
                <div className="text-center text-sm text-gray-400 mt-8 px-4">
                  Hi! How can I help you today?
                </div>
              )}
              {messages.map((m, i) => (
                <motion.div
                  key={i}
                  initial={{ opacity: 0, y: 10 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.2 }}
                  className={`flex ${m.role === "user" ? "justify-end" : "justify-start"}`}
                >
                  <div
                    className={`max-w-[80%] rounded-2xl px-3.5 py-2 text-sm whitespace-pre-wrap leading-relaxed ${
                      m.role === "user" ? "text-white" : "bg-[#F5F5F5] text-gray-800"
                    }`}
                    style={m.role === "user" ? { backgroundColor: primaryColor } : undefined}
                  >
                    {m.content.split(/(https?:\/\/[^\s)]+)/g).map((part, idx) =>
                      /^https?:\/\//.test(part) ? (
                        <a
                          key={idx}
                          href={part}
                          target="_blank"
                          rel="noopener noreferrer"
                          className="underline break-all"
                          style={m.role === "assistant" ? { color: primaryColor } : undefined}
                        >
                          {part}
                        </a>
                      ) : (
                        <span key={idx}>{part}</span>
                      ),
                    )}
                  </div>
                </motion.div>
              ))}
              {isLoading && (
                <motion.div
                  initial={{ opacity: 0, y: 10 }}
                  animate={{ opacity: 1, y: 0 }}
                  className="flex justify-start"
                >
                  <div className="bg-[#F5F5F5] rounded-2xl px-4 py-3 flex gap-1">
                    {[0, 1, 2].map((i) => (
                      <motion.span
                        key={i}
                        className="block w-2 h-2 rounded-full"
                        style={{ backgroundColor: primaryColor }}
                        animate={{ y: [0, -6, 0] }}
                        transition={{
                          duration: 0.8,
                          repeat: Infinity,
                          delay: i * 0.15,
                          ease: "easeInOut",
                        }}
                      />
                    ))}
                  </div>
                </motion.div>
              )}
            </div>

            {/* Input */}
            <div className="border-t border-gray-200 p-3 bg-white">
              <div className="flex items-end gap-2">
                <textarea
                  ref={inputRef}
                  value={input}
                  onChange={(e) => setInput(e.target.value)}
                  onKeyDown={handleKeyDown}
                  placeholder="Type a message..."
                  rows={1}
                  className="flex-1 resize-none rounded-xl border border-gray-200 px-3 py-2 text-sm focus:outline-none focus:ring-2 max-h-24"
                  style={{ ['--tw-ring-color' as string]: primaryColor }}
                />
                <button
                  onClick={sendMessage}
                  disabled={isLoading || !input.trim()}
                  className="rounded-xl p-2.5 text-white transition-opacity disabled:opacity-40"
                  style={{ backgroundColor: primaryColor }}
                  aria-label="Send message"
                >
                  <Send size={16} />
                </button>
              </div>
            </div>
          </motion.div>
        )}
      </AnimatePresence>

      {/* Floating button */}
      <motion.button
        onClick={() => setIsOpen((o) => !o)}
        whileHover={{ scale: 1.05 }}
        whileTap={{ scale: 0.95 }}
        className="relative w-14 h-14 rounded-full text-white shadow-lg flex items-center justify-center"
        style={{ backgroundColor: primaryColor }}
        aria-label={isOpen ? "Close chat" : "Open chat"}
      >
        {!isOpen && (
          <motion.span
            className="absolute inset-0 rounded-full"
            style={{ backgroundColor: primaryColor }}
            animate={{ scale: [1, 1.4], opacity: [0.5, 0] }}
            transition={{ duration: 1.6, repeat: Infinity, ease: "easeOut" }}
          />
        )}
        <span className="relative">
          {isOpen ? <X size={24} /> : <MessageCircle size={24} />}
        </span>
      </motion.button>
    </div>
  );
}

export default AIChatWidget;
