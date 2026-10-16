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
    title: "Your Files Never Leave Your Device",
    description:
      "All processing happens in your browser. We never upload or store your files.",
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
    <section style={{ padding: "4rem 0", background: "#f9fafb" }}>
      <div className="page-container">
        {/* Section Header */}
        <div style={{ textAlign: "center", marginBottom: "3rem" }}>
          <h2
            style={{
              fontSize: "clamp(1.75rem, 4vw, 2.5rem)",
              fontWeight: "bold",
              color: "#111827",
            }}
          >
            Why Studyo?
          </h2>
          <p
            style={{
              marginTop: "0.75rem",
              color: "#4b5563",
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
              style={{
                background: "white",
                padding: "1.5rem",
                borderRadius: "0.75rem",
                border: "1px solid #e5e7eb",
              }}
            >
              <div
                style={{
                  width: "48px",
                  height: "48px",
                  borderRadius: "0.5rem",
                  background: reason.color,
                  display: "flex",
                  alignItems: "center",
                  justifyContent: "center",
                  fontSize: "1.5rem",
                }}
              >
                {reason.icon}
              </div>
              <h3
                style={{
                  marginTop: "1rem",
                  fontSize: "1.125rem",
                  fontWeight: 600,
                  color: "#111827",
                }}
              >
                {reason.title}
              </h3>
              <p
                style={{
                  marginTop: "0.5rem",
                  fontSize: "0.875rem",
                  color: "#4b5563",
                  lineHeight: 1.6,
                }}
              >
                {reason.description}
              </p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}