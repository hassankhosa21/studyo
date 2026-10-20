import Link from "next/link";

export default function CTA() {
  return (
    <section
      className="cta-section"
      style={{
        padding: "5rem 0",
        background: "linear-gradient(135deg, #f8fafc 0%, #eff6ff 100%)",
        borderTop: "1px solid #e2e8f0",
        position: "relative",
        overflow: "hidden",
      }}
    >
      <div className="page-container" style={{ textAlign: "center", position: "relative", zIndex: 1 }}>
        <h2
          className="animate-fade-up"
          style={{
            fontSize: "clamp(2rem, 4vw, 2.75rem)",
            fontWeight: 800,
            color: "#0f172a",
            letterSpacing: "-0.5px",
          }}
        >
          Ready to get started?
        </h2>
        <p
          className="animate-fade-up"
          style={{
            marginTop: "1rem",
            fontSize: "1.125rem",
            color: "#475569",
            maxWidth: "640px",
            marginLeft: "auto",
            marginRight: "auto",
            lineHeight: 1.6,
            animationDelay: "0.1s",
          }}
        >
          Pick any tool and start using it right now. No signup. No downloads.
          No waiting.
        </p>

        <div
          className="animate-fade-up"
          style={{
            marginTop: "2.5rem",
            display: "flex",
            flexWrap: "wrap",
            gap: "1rem",
            justifyContent: "center",
            animationDelay: "0.2s",
          }}
        >
          <Link href="/gpa-calculator" className="cta-btn-primary">
            Calculate Your GPA →
          </Link>
          <Link href="/pdf-merge" className="cta-btn-secondary">
            Merge PDFs Now
          </Link>
        </div>

        <p
          className="animate-fade-up"
          style={{
            marginTop: "2rem",
            fontSize: "0.9rem",
            color: "#94a3b8",
            fontWeight: 500,
            animationDelay: "0.3s",
          }}
        >
          Trusted by students across Pakistan. Free forever.
        </p>
      </div>

      {/* Pure CSS Styles for Buttons & Effects */}
      <style>{`
        .cta-section::before {
          content: "";
          position: absolute;
          top: 50%; left: 50%;
          transform: translate(-50%, -50%);
          width: 60%; height: 100%;
          background: radial-gradient(circle, rgba(6, 182, 212, 0.08) 0%, transparent 70%);
          pointer-events: none;
          z-index: 0;
        }

        .cta-btn-primary {
          display: inline-flex;
          align-items: center;
          justify-content: center;
          padding: 0.85rem 1.75rem;
          background: #2563eb;
          color: white;
          font-weight: 600;
          border-radius: 0.5rem;
          text-decoration: none;
          box-shadow: 0 10px 20px -5px rgba(37, 99, 235, 0.4);
          transition: all 0.3s ease;
        }
        .cta-btn-primary:hover {
          background: #1d4ed8;
          transform: translateY(-3px);
          box-shadow: 0 15px 25px -5px rgba(37, 99, 235, 0.5), 0 0 15px rgba(6, 182, 212, 0.4);
        }

        .cta-btn-secondary {
          display: inline-flex;
          align-items: center;
          justify-content: center;
          padding: 0.85rem 1.75rem;
          background: white;
          color: #1e3a8a;
          font-weight: 600;
          border-radius: 0.5rem;
          border: 1px solid #bfdbfe;
          text-decoration: none;
          transition: all 0.3s ease;
        }
        .cta-btn-secondary:hover {
          border-color: #2563eb;
          transform: translateY(-3px);
          box-shadow: 0 10px 20px -5px rgba(0,0,0,0.05);
        }
      `}</style>
    </section>
  );
}