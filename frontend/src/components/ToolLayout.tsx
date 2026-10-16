import { ReactNode } from "react";
import Link from "next/link";

interface ToolLayoutProps {
  title: string;
  description: string;
  children: ReactNode;
  howToSteps?: string[];
  features?: string[];
  faqs?: { question: string; answer: string }[];
  relatedTools?: { name: string; href: string }[];
}

export default function ToolLayout({
  title,
  description,
  children,
  howToSteps,
  features,
  faqs,
  relatedTools,
}: ToolLayoutProps) {
  return (
    <div style={{ minHeight: "100vh", background: "#f9fafb" }}>
      {/* Header */}
      <div style={{ background: "white", borderBottom: "1px solid #e5e7eb" }}>
        <div className="page-container" style={{ paddingTop: "2rem", paddingBottom: "2rem" }}>
          <nav style={{ fontSize: "0.875rem", color: "#6b7280", marginBottom: "0.75rem" }}>
            <Link href="/" style={{ color: "#6b7280", textDecoration: "none" }}>
              Home
            </Link>
            <span style={{ margin: "0 0.5rem" }}>/</span>
            <span style={{ color: "#374151" }}>{title}</span>
          </nav>
          <h1
            style={{
              fontSize: "clamp(1.75rem, 4vw, 2.5rem)",
              fontWeight: "bold",
              color: "#111827",
            }}
          >
            {title}
          </h1>
          <p
            style={{
              marginTop: "0.75rem",
              color: "#4b5563",
              fontSize: "1.05rem",
              maxWidth: "720px",
              lineHeight: 1.6,
            }}
          >
            {description}
          </p>
        </div>
      </div>

      {/* Main Content */}
      <div className="page-container" style={{ paddingTop: "2rem", paddingBottom: "2rem" }}>
        <div style={{ maxWidth: "900px", marginLeft: "auto", marginRight: "auto" }}>
          {/* Tool Area */}
          <div
            style={{
              background: "white",
              borderRadius: "0.75rem",
              border: "1px solid #e5e7eb",
              padding: "1.5rem",
              boxShadow: "0 1px 3px rgba(0,0,0,0.05)",
            }}
            className="tool-content"
          >
            {children}
          </div>

          {/* Ad Slot */}
          <div
            style={{
              marginTop: "2rem",
              background: "#f3f4f6",
              border: "1px dashed #d1d5db",
              borderRadius: "0.5rem",
              padding: "2rem",
              textAlign: "center",
              color: "#9ca3af",
              fontSize: "0.875rem",
            }}
          >
            Advertisement
          </div>

          {/* How to Use */}
          {howToSteps && howToSteps.length > 0 && (
            <section style={{ marginTop: "3rem" }}>
              <h2
                style={{
                  fontSize: "1.5rem",
                  fontWeight: "bold",
                  color: "#111827",
                  marginBottom: "1rem",
                }}
              >
                How to Use
              </h2>
              <ol
                style={{
                  listStyle: "none",
                  display: "flex",
                  flexDirection: "column",
                  gap: "0.75rem",
                }}
              >
                {howToSteps.map((step, index) => (
                  <li
                    key={index}
                    style={{ display: "flex", gap: "0.75rem", alignItems: "flex-start" }}
                  >
                    <span
                      style={{
                        flexShrink: 0,
                        width: "28px",
                        height: "28px",
                        borderRadius: "9999px",
                        background: "#2563eb",
                        color: "white",
                        display: "flex",
                        alignItems: "center",
                        justifyContent: "center",
                        fontSize: "0.85rem",
                        fontWeight: 600,
                      }}
                    >
                      {index + 1}
                    </span>
                    <span style={{ color: "#374151", paddingTop: "0.25rem", lineHeight: 1.6 }}>
                      {step}
                    </span>
                  </li>
                ))}
              </ol>
            </section>
          )}

          {/* Features */}
          {features && features.length > 0 && (
            <section style={{ marginTop: "3rem" }}>
              <h2
                style={{
                  fontSize: "1.5rem",
                  fontWeight: "bold",
                  color: "#111827",
                  marginBottom: "1rem",
                }}
              >
                Features
              </h2>
              <ul
                style={{
                  listStyle: "none",
                  display: "grid",
                  gridTemplateColumns: "repeat(auto-fit, minmax(240px, 1fr))",
                  gap: "0.75rem",
                }}
              >
                {features.map((feature, index) => (
                  <li
                    key={index}
                    style={{ display: "flex", alignItems: "flex-start", gap: "0.5rem" }}
                  >
                    <span style={{ color: "#16a34a", flexShrink: 0, marginTop: "0.15rem" }}>
                      ✓
                    </span>
                    <span style={{ color: "#374151", lineHeight: 1.6 }}>{feature}</span>
                  </li>
                ))}
              </ul>
            </section>
          )}

          {/* FAQ */}
          {faqs && faqs.length > 0 && (
            <section style={{ marginTop: "3rem" }}>
              <h2
                style={{
                  fontSize: "1.5rem",
                  fontWeight: "bold",
                  color: "#111827",
                  marginBottom: "1rem",
                }}
              >
                Frequently Asked Questions
              </h2>
              <div style={{ display: "flex", flexDirection: "column", gap: "1rem" }}>
                {faqs.map((faq, index) => (
                  <div
                    key={index}
                    style={{
                      background: "white",
                      border: "1px solid #e5e7eb",
                      borderRadius: "0.5rem",
                      padding: "1.25rem",
                    }}
                  >
                    <h3
                      style={{
                        fontWeight: 600,
                        color: "#111827",
                        marginBottom: "0.5rem",
                      }}
                    >
                      {faq.question}
                    </h3>
                    <p style={{ color: "#4b5563", fontSize: "0.9rem", lineHeight: 1.7 }}>
                      {faq.answer}
                    </p>
                  </div>
                ))}
              </div>
            </section>
          )}

          {/* Related Tools */}
          {relatedTools && relatedTools.length > 0 && (
            <section style={{ marginTop: "3rem" }}>
              <h2
                style={{
                  fontSize: "1.5rem",
                  fontWeight: "bold",
                  color: "#111827",
                  marginBottom: "1rem",
                }}
              >
                Related Tools
              </h2>
              <div
                style={{
                  display: "grid",
                  gridTemplateColumns: "repeat(auto-fit, minmax(200px, 1fr))",
                  gap: "1rem",
                }}
              >
                {relatedTools.map((tool) => (
                  <Link
                    key={tool.href}
                    href={tool.href}
                    style={{
                      display: "block",
                      background: "white",
                      border: "1px solid #e5e7eb",
                      borderRadius: "0.5rem",
                      padding: "1rem",
                      textDecoration: "none",
                      color: "#111827",
                      fontWeight: 500,
                      transition: "all 0.2s",
                    }}
                  >
                    {tool.name} →
                  </Link>
                ))}
              </div>
            </section>
          )}
        </div>
      </div>

      {/* Mobile padding fix */}
      <style>{`
        @media (max-width: 640px) {
          .tool-content {
            padding: 1rem !important;
          }
        }
      `}</style>
    </div>
  );
}