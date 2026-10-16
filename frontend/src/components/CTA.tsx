import Link from "next/link";

export default function CTA() {
  return (
    <section
      style={{
        padding: "4rem 0",
        background: "linear-gradient(135deg, #2563eb 0%, #1e40af 100%)",
      }}
    >
      <div className="page-container" style={{ textAlign: "center" }}>
        <h2
          style={{
            fontSize: "clamp(1.75rem, 4vw, 2.5rem)",
            fontWeight: "bold",
            color: "white",
          }}
        >
          Ready to get started?
        </h2>
        <p
          style={{
            marginTop: "1rem",
            fontSize: "1.125rem",
            color: "#dbeafe",
            maxWidth: "640px",
            marginLeft: "auto",
            marginRight: "auto",
            lineHeight: 1.6,
          }}
        >
          Pick any tool and start using it right now. No signup. No downloads.
          No waiting.
        </p>

        <div
          style={{
            marginTop: "2rem",
            display: "flex",
            flexWrap: "wrap",
            gap: "1rem",
            justifyContent: "center",
          }}
        >
          <Link
            href="/gpa-calculator"
            style={{
              display: "inline-flex",
              alignItems: "center",
              justifyContent: "center",
              padding: "0.75rem 1.5rem",
              background: "white",
              color: "#1d4ed8",
              fontWeight: 600,
              borderRadius: "0.5rem",
              boxShadow: "0 4px 6px rgba(0,0,0,0.1)",
              textDecoration: "none",
            }}
          >
            Calculate Your GPA →
          </Link>
          <Link
            href="/pdf-merge"
            style={{
              display: "inline-flex",
              alignItems: "center",
              justifyContent: "center",
              padding: "0.75rem 1.5rem",
              background: "#3b82f6",
              color: "white",
              fontWeight: 600,
              borderRadius: "0.5rem",
              border: "1px solid #60a5fa",
              textDecoration: "none",
            }}
          >
            Merge PDFs Now
          </Link>
        </div>

        <p style={{ marginTop: "1.5rem", fontSize: "0.875rem", color: "#bfdbfe" }}>
          Trusted by students across Pakistan. Free forever.
        </p>
      </div>
    </section>
  );
}