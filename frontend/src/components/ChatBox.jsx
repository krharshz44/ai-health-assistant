import React, { useEffect, useRef } from "react";
import MessageBubble, { TypingIndicator } from "./MessageBubble";
import { useChat } from "../hooks/useChat";

// Quick symptom suggestions
const SUGGESTIONS = [
  "I have a headache and fever since morning",
  "Stomach pain after eating mess food",
  "Sore throat and body ache",
  "I feel very weak and dizzy",
  "Cold and runny nose since 2 days",
];

export default function ChatBox() {
  const { messages, input, setInput, isLoading, sendMessage, clearChat } =
    useChat();
  const messagesEndRef = useRef(null);
  const inputRef = useRef(null);

  // Auto-scroll to bottom
  useEffect(() => {
    messagesEndRef.current?.scrollIntoView({ behavior: "smooth" });
  }, [messages, isLoading]);

  // Handle Enter key
  const handleKeyDown = (e) => {
    if (e.key === "Enter" && !e.shiftKey) {
      e.preventDefault();
      sendMessage();
    }
  };

  const handleSuggestion = (text) => {
    setInput(text);
    inputRef.current?.focus();
  };

  const isFirstMessage = messages.length === 1; // only welcome message

  return (
    <div className="flex flex-col flex-1 overflow-hidden">
      {/* Messages area */}
      <div className="flex-1 overflow-y-auto px-4 py-4 space-y-4">
        {messages.map((msg) => (
          <MessageBubble key={msg.id} message={msg} />
        ))}

        {/* Typing indicator */}
        {isLoading && <TypingIndicator />}

        {/* Scroll anchor */}
        <div ref={messagesEndRef} />
      </div>

      {/* Suggestions (only show when chat is fresh) */}
      {isFirstMessage && !isLoading && (
        <div className="px-4 pb-2">
          <p className="text-[10px] text-gray-600 font-mono mb-2 uppercase tracking-wider">
            Common symptoms
          </p>
          <div className="flex flex-wrap gap-1.5">
            {SUGGESTIONS.map((s) => (
              <button
                key={s}
                onClick={() => handleSuggestion(s)}
                className="text-xs px-3 py-1.5 rounded-full bg-white/5 border border-white/10 text-gray-400 hover:text-white hover:border-white/20 hover:bg-white/10 transition-all"
              >
                {s}
              </button>
            ))}
          </div>
        </div>
      )}

      {/* Input area */}
      <div className="px-4 pb-4 pt-2 border-t border-white/5">
        <div className="flex gap-2 items-end">
          {/* Clear button */}
          {messages.length > 1 && (
            <button
              onClick={clearChat}
              title="Clear chat"
              className="w-10 h-10 rounded-xl bg-white/5 border border-white/10 text-gray-500 hover:text-white hover:bg-white/10 transition-all flex-shrink-0 flex items-center justify-center text-sm"
            >
              ↺
            </button>
          )}

          {/* Text input */}
          <div className="flex-1 relative">
            <textarea
              ref={inputRef}
              value={input}
              onChange={(e) => setInput(e.target.value)}
              onKeyDown={handleKeyDown}
              placeholder="Describe your symptoms..."
              rows={1}
              disabled={isLoading}
              className="w-full bg-[#1a1d27] border border-white/10 rounded-2xl px-4 py-2.5 text-sm text-white placeholder-gray-600 resize-none focus:outline-none focus:border-indigo-500/50 focus:ring-1 focus:ring-indigo-500/20 transition-all disabled:opacity-50 leading-relaxed"
              style={{ minHeight: "44px", maxHeight: "100px" }}
              onInput={(e) => {
                e.target.style.height = "auto";
                e.target.style.height =
                  Math.min(e.target.scrollHeight, 100) + "px";
              }}
            />
          </div>

          {/* Send button */}
          <button
            onClick={sendMessage}
            disabled={!input.trim() || isLoading}
            className="w-10 h-10 rounded-xl bg-indigo-600 hover:bg-indigo-500 disabled:bg-white/5 disabled:text-gray-600 text-white transition-all flex-shrink-0 flex items-center justify-center text-base disabled:cursor-not-allowed"
          >
            {isLoading ? (
              <span className="w-4 h-4 border-2 border-gray-500 border-t-transparent rounded-full animate-spin"></span>
            ) : (
              "↑"
            )}
          </button>
        </div>
        <p className="text-[10px] text-gray-700 mt-1.5 pl-1">
          Press Enter to send
        </p>
      </div>
    </div>
  );
}
