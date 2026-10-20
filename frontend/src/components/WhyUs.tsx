const reasons = [
  {
    title: "100% Free",
    description:
      "No hidden charges, no premium walls. Every tool is completely free to use.",
    icon: "💰",
    color: "#dcfce7",
  },
  {
    title: "No Signup Required",
    description:
      "Open any tool and start using it immediately. No account, no email, no hassle.",
    icon: "🚫",
    color: "#fee2e2",
  },
  {
    title: "Your Files Stay Private",
    description:
      "Most tools run in your browser. For server-based tools, your files are deleted instantly.",
    icon: "🔒",
    color: "#dbeafe",
  },
  {
    title: "Fast & Mobile-Friendly",
    description:
      "Built for speed. Works perfectly on mobile, tablet, and desktop — everywhere.",
    icon: "⚡",
    color: "#fef9c3",
  },
];

export default function WhyUs() {
  return (
    <section style={{ padding: "5rem 0", background: "#f8fafc" }}>
      <div className="page-container">
        
        {/* Section Header */}
        <div className="animate-fade-up" style={{ textAlign: "center", marginBottom: "4rem" }}>
          <h2
            style={{
              fontSize: "clamp(2rem, 4vw, 2.75rem)",
              fontWeight: 800,
              color: "#0f172a",
              letterSpacing: "-0.5px",
            }}
          >
            Why Studyo?
          </h2>
          <p
            style={{
              marginTop: "0.75rem",
              color: "#64748b",
              fontSize: "1.125rem",
            }}
          >
            Built by students, for students. Here&apos;s what makes us different.
          </p>
        </div>

        {/* Grid */}
        <div className="reasons-grid">
          {reasons.map((reason) => (
            <div
              key={reason.title}
              className="premium-card"
              style={{
                background: "white",
                padding: "1.75rem",
                borderRadius: "1rem",
                border: "1px solid #e2e8f0",
                transition: "all 0.3s cubic-bezier(0.4, 0, 0.2, 1)",
                position: "relative",
                overflow: "hidden",
              }}
            >
              <div
                className="reason-icon"
                style={{
                  width: "56px",
                  height: "56px",
                  borderRadius: "0.75rem",
                  background: reason.color,
                  display: "flex",
                  alignItems: "center",
                  justifyContent: "center",
                  fontSize: "1.75rem",
                  transition: "transform 0.3s ease",
                }}
              >
                {reason.icon}
              </div>
              <h3
                style={{
                  marginTop: "1.25rem",
                  fontSize: "1.15rem",
                  fontWeight: 700,
                  color: "#0f172a",
                }}
              >
                {reason.title}
              </h3>
              <p
                style={{
                  marginTop: "0.5rem",
                  fontSize: "0.9rem",
                  color: "#64748b",
                  lineHeight: 1.6,
                }}
              >
                {reason.description}
              </p>
            </div>
          ))}
        </div>
      </div>

      {/* Pure CSS Hover Effects */}
      <style>{`
        .premium-card:hover {
          transform: translateY(-6px);
          border-color: rgba(37, 99, 235, 0.4) !important;
          box-shadow: 0 20px 40px -10px rgba(37, 99, 235, 0.15) !important;
        }
        .premium-card:hover .reason-icon {
          transform: scale(1.1) rotate(5deg);
        }
      `}</style>
    </section>
  );
}