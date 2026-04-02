import React from "react";

// ─── Urgency config ───────────────────────────────────────────────────────────
const URGENCY = {
  LOW: {
    label: "LOW",
    bg: "bg-emerald-500/10",
    border: "border-emerald-500/30",
    text: "text-emerald-400",
    dot: "bg-emerald-400",
    icon: "✅",
  },
  MEDIUM: {
    label: "MEDIUM",
    bg: "bg-amber-500/10",
    border: "border-amber-500/30",
    text: "text-amber-400",
    dot: "bg-amber-400",
    icon: "⚠️",
  },
  HIGH: {
    label: "HIGH",
    bg: "bg-red-500/10",
    border: "border-red-500/30",
    text: "text-red-400",
    dot: "bg-red-400",
    icon: "🚨",
  },
};

// ─── User bubble ──────────────────────────────────────────────────────────────
function UserBubble({ content }) {
  return (
    <div className="flex justify-end animate-slide-up">
      <div className="max-w-[75%] bg-indigo-600 text-white rounded-2xl rounded-tr-sm px-4 py-2.5 text-sm leading-relaxed">
        {content}
      </div>
    </div>
  );
}

// ─── Welcome bubble ───────────────────────────────────────────────────────────
function WelcomeBubble({ content }) {
  return (
    <div className="flex gap-3 animate-fade-in">
      <div className="w-8 h-8 rounded-xl bg-emerald-500/20 border border-emerald-500/30 flex items-center justify-center flex-shrink-0 text-base">
        🏥
      </div>
      <div className="max-w-[80%] bg-[#1a1d27] border border-white/8 rounded-2xl rounded-tl-sm px-4 py-3 text-sm text-gray-300 leading-relaxed whitespace-pre-line">
        {content}
      </div>
    </div>
  );
}

// ─── Error bubble ─────────────────────────────────────────────────────────────
function ErrorBubble({ content }) {
  return (
    <div className="flex gap-3 animate-slide-up">
      <div className="w-8 h-8 rounded-xl bg-red-500/20 border border-red-500/30 flex items-center justify-center flex-shrink-0 text-base">
        ⚠️
      </div>
      <div className="max-w-[80%] bg-red-500/10 border border-red-500/20 rounded-2xl rounded-tl-sm px-4 py-3 text-sm text-red-300">
        {content}
      </div>
    </div>
  );
}

// ─── Section helper ───────────────────────────────────────────────────────────
function Section({ title, children }) {
  return (
    <div>
      <p className="text-[10px] uppercase tracking-widest text-gray-500 font-mono mb-1.5">
        {title}
      </p>
      {children}
    </div>
  );
}

// ─── Health response card ─────────────────────────────────────────────────────
function HealthBubble({ data }) {
  const urgency = URGENCY[data.urgencyLevel] || URGENCY.MEDIUM;

  return (
    <div className="flex gap-3 animate-slide-up">
      <div className="w-8 h-8 rounded-xl bg-emerald-500/20 border border-emerald-500/30 flex items-center justify-center flex-shrink-0 text-base">
        🏥
      </div>

      <div className="max-w-[85%] flex flex-col gap-3">
        {/* Issue + Urgency */}
        <div className="bg-[#1a1d27] border border-white/8 rounded-2xl rounded-tl-sm px-4 py-3">
          <p className="text-sm font-semibold text-white mb-2">
            {data.possibleIssue}
          </p>

          <div
            className={`inline-flex items-center gap-2 px-2.5 py-1 rounded-full text-xs font-mono font-medium ${urgency.bg} ${urgency.border} border ${urgency.text}`}
          >
            <span className={`w-1.5 h-1.5 rounded-full ${urgency.dot}`}></span>
            {urgency.icon} URGENCY: {urgency.label}
          </div>

          {data.urgencyReason && (
            <p className="text-xs text-gray-400 mt-2 leading-relaxed">
              {data.urgencyReason}
            </p>
          )}
        </div>

        {/* What to do */}
        <div className="bg-[#1a1d27] border border-white/8 rounded-2xl px-4 py-3">
          <Section title="What to do">
            <ul className="space-y-1">
              {data.whatToDo.map((step, i) => (
                <li
                  key={i}
                  className="flex gap-2 text-xs text-gray-300 leading-relaxed"
                >
                  <span className="text-emerald-400 font-mono flex-shrink-0">
                    {String(i + 1).padStart(2, "0")}
                  </span>
                  {step}
                </li>
              ))}
            </ul>
          </Section>
        </div>

        {/* What to avoid */}
        <div className="bg-[#1a1d27] border border-white/8 rounded-2xl px-4 py-3">
          <Section title="What to avoid">
            <ul className="space-y-1">
              {data.whatToAvoid.map((item, i) => (
                <li
                  key={i}
                  className="flex gap-2 text-xs text-gray-300 leading-relaxed"
                >
                  <span className="text-red-400 flex-shrink-0">✕</span>
                  {item}
                </li>
              ))}
            </ul>
          </Section>
        </div>

        {/* Budget remedy + Mess food advice (side by side if both exist) */}
        {(data.budgetRemedy || data.messFood) && (
          <div className="flex gap-2">
            {data.budgetRemedy && (
              <div className="flex-1 bg-[#1a1d27] border border-white/8 rounded-2xl px-4 py-3">
                <Section title="💰 Budget remedy">
                  <p className="text-xs text-gray-300 leading-relaxed">
                    {data.budgetRemedy}
                  </p>
                </Section>
              </div>
            )}
            {data.messFood && (
              <div className="flex-1 bg-[#1a1d27] border border-white/8 rounded-2xl px-4 py-3">
                <Section title="🍽️ Mess food">
                  <p className="text-xs text-gray-300 leading-relaxed">
                    {data.messFood}
                  </p>
                </Section>
              </div>
            )}
          </div>
        )}

        {/* When to see doctor */}
        <div
          className={`${urgency.bg} border ${urgency.border} rounded-2xl px-4 py-3`}
        >
          <Section title="🩺 When to see a doctor">
            <p className={`text-xs ${urgency.text} leading-relaxed`}>
              {data.whenToSeeDoctor}
            </p>
          </Section>
        </div>
      </div>
    </div>
  );
}

// ─── Typing indicator ─────────────────────────────────────────────────────────
export function TypingIndicator() {
  return (
    <div className="flex gap-3 animate-fade-in">
      <div className="w-8 h-8 rounded-xl bg-emerald-500/20 border border-emerald-500/30 flex items-center justify-center flex-shrink-0 text-base">
        🏥
      </div>
      <div className="bg-[#1a1d27] border border-white/8 rounded-2xl rounded-tl-sm px-4 py-3 flex items-center gap-1.5">
        <span className="typing-dot"></span>
        <span className="typing-dot"></span>
        <span className="typing-dot"></span>
      </div>
    </div>
  );
}

// ─── Main export ──────────────────────────────────────────────────────────────
export default function MessageBubble({ message }) {
  if (message.role === "user") {
    return <UserBubble content={message.content} />;
  }

  if (message.type === "welcome") {
    return <WelcomeBubble content={message.content} />;
  }

  if (message.type === "error") {
    return <ErrorBubble content={message.content} />;
  }

  if (message.type === "health" && message.data) {
    return <HealthBubble data={message.data} />;
  }

  return null;
}
