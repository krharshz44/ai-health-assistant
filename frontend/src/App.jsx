import React from "react";
import ChatBox from "./components/ChatBox";

export default function App() {
  return (
    <div className="flex flex-col h-full bg-[#0f1117]">
      {/* Header */}
      <header className="flex items-center justify-between px-5 py-3 border-b border-white/5 bg-[#0f1117]/90 backdrop-blur-sm z-10">
        <div className="flex items-center gap-3">
          <div className="w-8 h-8 rounded-lg bg-emerald-500/20 border border-emerald-500/30 flex items-center justify-center text-lg">
            🏥
          </div>
          <div>
            <h1 className="text-sm font-semibold text-white tracking-tight">
              HostelMed
            </h1>
            <p className="text-[10px] text-gray-500 font-mono">
              AI Health Assistant
            </p>
          </div>
        </div>
        <div className="flex items-center gap-1.5">
          <span className="w-1.5 h-1.5 bg-emerald-400 rounded-full animate-pulse"></span>
          <span className="text-[10px] text-gray-500 font-mono">online</span>
        </div>
      </header>

      {/* Chat */}
      <ChatBox />

      {/* Footer */}
      <div className="px-4 py-2 text-center">
        <p className="text-[10px] text-gray-600">
          ⚠️ Not a substitute for professional medical advice. For emergencies
          call 112.
        </p>
      </div>
    </div>
  );
}
