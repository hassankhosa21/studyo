"use client";

import { useState, useMemo } from "react";
import ToolLayout from "@/components/ToolLayout";
import { analyzeText, formatTime } from "@/lib/text/wordCounter";

const relatedTools = [
  { name: "Citation Generator", href: "/citation-generator" },
  { name: "GPA Calculator", href: "/gpa-calculator" },
  { name: "PDF Merge", href: "/pdf-merge" },
];

const howToSteps = [
  "Paste or type your text in the box below.",
  "See live word count, characters, sentences, and paragraphs.",
  "Check reading time, speaking time, and top keywords.",
  "Click Copy to copy the text, or Clear to start over.",
];

const features = [
  "Real-time word and character count",
  "Sentences and paragraphs analysis",
  "Reading and speaking time estimate",
  "Top 10 keyword density",
  "Copy and clear buttons",
  "100% free, no signup, works offline",
];

const faqs = [
  {
    question: "Is this word counter free?",
    answer:
      "Yes, completely free. No signup, no limits, no hidden charges.",
  },
  {
    question: "Does it work offline?",
    answer:
      "Yes, once the page is loaded, it works entirely in your browser without internet.",
  },
  {
    question: "Is my text saved or uploaded?",
    answer:
      "No. Your text never leaves your device. Everything is processed locally in your browser.",
  },
  {
    question: "How is reading time calculated?",
    answer:
      "We use an average reading speed of 200 words per minute, which is standard for adult readers.",
  },
];

export default function WordCounterPage() {
  const [text, setText] = useState("");
  const [copied, setCopied] = useState(false);

  const stats = useMemo(() => analyzeText(text), [text]);

  const handleCopy = async () => {
    if (!text) return;
    try {
      await navigator.clipboard.writeText(text);
      setCopied(true);
      setTimeout(() => setCopied(false), 2000);
    } catch (err) {
      console.error("Copy failed:", err);
    }
  };

  const handleClear = () => {
    setText("");
  };

  return (
    <ToolLayout
      title="Word Counter"
      description="Count words, characters, sentences, and paragraphs in real-time. Get reading time, speaking time, and top keywords instantly."
      howToSteps={howToSteps}
      features={features}
      faqs={faqs}
      relatedTools={relatedTools}
    >
      {/* Text Area */}
      <div>
        <textarea
          value={text}
          onChange={(e) => setText(e.target.value)}
          placeholder="Paste or type your text here..."
          style={{
            width: "100%",
            minHeight: "250px",
            padding: "1rem",
            border: "1px solid #d1d5db",
            borderRadius: "0.5rem",
            fontSize: "1rem",
            fontFamily: "inherit",
            lineHeight: 1.6,
            resize: "vertical",
            outline: "none",
          }}
        />

        {/* Buttons */}
        <div
          style={{
            marginTop: "1rem",
            display: "flex",
            gap: "0.75rem",
            flexWrap: "wrap",
          }}
        >
          <button
            onClick={handleCopy}
            disabled={!text}
            style={{
              padding: "0.625rem 1.25rem",
              background: copied ? "#16a34a" : "#2563eb",
              color: "white",
              border: "none",
              borderRadius: "0.5rem",
              fontWeight: 500,
              fontSize: "0.95rem",
              cursor: text ? "pointer" : "not-allowed",
              opacity: text ? 1 : 0.5,
              transition: "all 0.2s",
            }}
          >
            {copied ? "✓ Copied!" : "Copy Text"}
          </button>
          <button
            onClick={handleClear}
            disabled={!text}
            style={{
              padding: "0.625rem 1.25rem",
              background: "white",
              color: "#374151",
              border: "1px solid #d1d5db",
              borderRadius: "0.5rem",
              fontWeight: 500,
              fontSize: "0.95rem",
              cursor: text ? "pointer" : "not-allowed",
              opacity: text ? 1 : 0.5,
            }}
          >
            Clear
          </button>
        </div>
      </div>

      {/* Stats Grid */}
      <div
        style={{
          marginTop: "2rem",
          display: "grid",
          gridTemplateColumns: "repeat(2, 1fr)",
          gap: "1rem",
        }}
        className="stats-grid"
      >
        <StatCard label="Words" value={stats.words} />
        <StatCard label="Characters" value={stats.characters} />
        <StatCard label="Characters (no spaces)" value={stats.charactersNoSpaces} />
        <StatCard label="Sentences" value={stats.sentences} />
        <StatCard label="Paragraphs" value={stats.paragraphs} />
        <StatCard
          label="Reading Time"
          value={formatTime(stats.readingTimeMinutes)}
        />
        <StatCard
          label="Speaking Time"
          value={formatTime(stats.speakingTimeMinutes)}
        />
        <StatCard
          label="Unique Keywords"
          value={stats.topKeywords.length}
        />
      </div>

      {/* Top Keywords */}
      {stats.topKeywords.length > 0 && (
        <div style={{ marginTop: "2rem" }}>
          <h3
            style={{
              fontSize: "1.125rem",
              fontWeight: 600,
              color: "#111827",
              marginBottom: "0.75rem",
            }}
          >
            Top Keywords
          </h3>
          <div style={{ display: "flex", flexWrap: "wrap", gap: "0.5rem" }}>
            {stats.topKeywords.map((kw) => (
              <span
                key={kw.word}
                style={{
                  padding: "0.375rem 0.75rem",
                  background: "#eff6ff",
                  color: "#2563eb",
                  borderRadius: "9999px",
                  fontSize: "0.875rem",
                  fontWeight: 500,
                }}
              >
                {kw.word}{" "}
                <span style={{ color: "#60a5fa" }}>×{kw.count}</span>
              </span>
            ))}
          </div>
        </div>
      )}

      {/* Responsive styles */}
      <style>{`
        @media (min-width: 768px) {
          .stats-grid {
            grid-template-columns: repeat(4, 1fr) !important;
          }
        }
      `}</style>
    </ToolLayout>
  );
}

/* Stat Card Component */
function StatCard({
  label,
  value,
}: {
  label: string;
  value: number | string;
}) {
  return (
    <div
      style={{
        background: "#f9fafb",
        border: "1px solid #e5e7eb",
        borderRadius: "0.75rem",
        padding: "1rem",
        textAlign: "center",
      }}
    >
      <div
        style={{
          fontSize: "1.75rem",
          fontWeight: "bold",
          color: "#2563eb",
          lineHeight: 1.2,
        }}
      >
        {value}
      </div>
      <div
        style={{
          marginTop: "0.25rem",
          fontSize: "0.8rem",
          color: "#6b7280",
          fontWeight: 500,
        }}
      >
        {label}
      </div>
    </div>
  );
}