"use client";

import { useState } from "react";

const faqs = [
  {
    question: "Is Studyo completely free to use?",
    answer:
      "Yes, all tools on Studyo are 100% free. There's no signup, no hidden charges, and no premium wall. We support the site through non-intrusive ads.",
  },
  {
    question: "Do I need to create an account to use the tools?",
    answer:
      "No account is needed. Just open any tool and start using it. Your data is never stored on our servers.",
  },
  {
    question: "Are my files safe? Do you upload them to your server?",
    answer:
      "Your files never leave your device. All processing (PDF merging, image compression, word counting) happens directly in your browser. We don't upload, store, or share your files.",
  },
  {
    question: "Is the GPA calculator accurate for my university?",
    answer:
      "Our GPA calculator uses HEC-aligned 4.0 scale presets, verified from official university sources. However, grading policies vary between universities. Always check with your university's official notification. The calculator provides estimates only.",
  },
  {
    question: "Which citation styles are supported?",
    answer:
      "We support APA 7, MLA 9, IEEE, and Harvard citation styles for websites, books, and journal articles. More styles and source types will be added soon.",
  },
  {
    question: "Can I use Studyo on my mobile phone?",
    answer:
      "Yes, Studyo is fully mobile-friendly and works on all modern browsers — Chrome, Safari, Firefox, and Samsung Internet.",
  },
  {
    question: "Do you store my data or files?",
    answer:
      "No. We don't store your files or personal data. Some tools (like GPA calculator) may save your data locally in your browser for convenience, but it never reaches our servers.",
  },
  {
    question: "How can I support Studyo?",
    answer:
      "You can support us by sharing the site with friends, disabling ad-blocker on our pages, or sending us feedback. Every bit helps us keep the tools free.",
  },
];

export default function FAQ() {
  const [openIndex, setOpenIndex] = useState<number | null>(0);

  return (
    <section style={{ padding: "4rem 0", background: "white" }}>
      <div className="page-container" style={{ maxWidth: "900px" }}>
        {/* Section Header */}
        <div style={{ textAlign: "center", marginBottom: "3rem" }}>
          <h2
            style={{
              fontSize: "clamp(1.75rem, 4vw, 2.5rem)",
              fontWeight: "bold",
              color: "#111827",
            }}
          >
            Frequently Asked Questions
          </h2>
          <p
            style={{
              marginTop: "0.75rem",
              color: "#4b5563",
              fontSize: "1.125rem",
            }}
          >
            Everything you need to know about Studyo.
          </p>
        </div>

        {/* FAQ List */}
        <div style={{ display: "flex", flexDirection: "column", gap: "0.75rem" }}>
          {faqs.map((faq, index) => (
            <div
              key={index}
              style={{
                border: "1px solid #e5e7eb",
                borderRadius: "0.5rem",
                overflow: "hidden",
              }}
            >
              <button
                onClick={() =>
                  setOpenIndex(openIndex === index ? null : index)
                }
                style={{
                  width: "100%",
                  display: "flex",
                  justifyContent: "space-between",
                  alignItems: "center",
                  gap: "1rem",
                  padding: "1rem 1.25rem",
                  textAlign: "left",
                  background: "white",
                  border: "none",
                  cursor: "pointer",
                  fontSize: "1rem",
                  fontWeight: 600,
                  color: "#111827",
                }}
                aria-expanded={openIndex === index}
              >
                <span>{faq.question}</span>
                <span
                  style={{
                    color: "#6b7280",
                    fontSize: "1rem",
                    transition: "transform 0.2s",
                    transform:
                      openIndex === index ? "rotate(180deg)" : "rotate(0deg)",
                  }}
                >
                  ▼
                </span>
              </button>
              {openIndex === index && (
                <div
                  style={{
                    padding: "0 1.25rem 1rem 1.25rem",
                    color: "#4b5563",
                    lineHeight: 1.7,
                    fontSize: "0.95rem",
                  }}
                >
                  {faq.answer}
                </div>
              )}
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}