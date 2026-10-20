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
      "Most tools run 100% in your browser. For server-based tools (like DOC to PDF), your files are uploaded securely, processed instantly, and deleted immediately. We never store or share your files.",
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
    <section style={{ padding: "5rem 0", background: "#0f172a" }}>
      <div className="page-container" style={{ maxWidth: "900px" }}>
        
        {/* Section Header */}
        <div className="animate-fade-up" style={{ textAlign: "center", marginBottom: "3rem" }}>
          <h2
            style={{
              fontSize: "clamp(2rem, 4vw, 2.75rem)",
              fontWeight: 800,
              color: "#f8fafc", /* White heading */
              letterSpacing: "-0.5px",
            }}
          >
            Frequently Asked Questions
          </h2>
          <p
            style={{
              marginTop: "0.75rem",
              color: "#94a3b8", /* Light grey text */
              fontSize: "1.125rem",
            }}
          >
            Everything you need to know about Studyo.
          </p>
        </div>

        {/* FAQ List */}
        <div style={{ display: "flex", flexDirection: "column", gap: "1rem" }}>
          {faqs.map((faq, index) => {
            const isOpen = openIndex === index;
            return (
              <div
                key={index}
                className={`faq-item ${isOpen ? "faq-open" : ""}`}
                style={{
                  background: "#1e293b", /* Dark card bg */
                  border: isOpen ? "1px solid #06b6d4" : "1px solid #334155",
                  borderRadius: "0.75rem",
                  overflow: "hidden",
                  transition: "all 0.3s cubic-bezier(0.4, 0, 0.2, 1)",
                  boxShadow: isOpen ? "0 10px 25px -5px rgba(6, 182, 212, 0.2)" : "0 2px 4px rgba(0,0,0,0.2)",
                }}
              >
                <button
                  onClick={() => setOpenIndex(isOpen ? null : index)}
                  style={{
                    width: "100%",
                    display: "flex",
                    justifyContent: "space-between",
                    alignItems: "center",
                    gap: "1rem",
                    padding: "1.25rem",
                    textAlign: "left",
                    background: "transparent", /* Transparent to show dark card */
                    border: "none",
                    cursor: "pointer",
                    fontSize: "1.05rem",
                    fontWeight: 600,
                    color: isOpen ? "#06b6d4" : "#f8fafc", /* Cyan if open, white if closed */
                    transition: "color 0.2s",
                  }}
                  aria-expanded={isOpen}
                >
                  <span>{faq.question}</span>
                  <span
                    style={{
                      color: isOpen ? "#06b6d4" : "#64748b",
                      fontSize: "0.8rem",
                      transition: "transform 0.3s ease",
                      transform: isOpen ? "rotate(180deg)" : "rotate(0deg)",
                    }}
                  >
                    ▼
                  </span>
                </button>
                <div
                  style={{
                    display: "grid",
                    gridTemplateRows: isOpen ? "1fr" : "0fr",
                    transition: "grid-template-rows 0.3s ease",
                  }}
                >
                  <div style={{ overflow: "hidden" }}>
                    <div
                      style={{
                        padding: "0 1.25rem 1.25rem 1.25rem",
                        color: "#94a3b8", /* Light grey answer text */
                        lineHeight: 1.7,
                        fontSize: "0.95rem",
                      }}
                    >
                      {faq.answer}
                    </div>
                  </div>
                </div>
              </div>
            );
          })}
        </div>
      </div>
    </section>
  );
}