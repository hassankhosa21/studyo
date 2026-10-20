import Link from "next/link";

const tools = [
  {
    name: "PDF Merge",
    description: "Combine multiple PDF files into one. Drag, drop, reorder, download.",
    href: "/pdf-merge",
    icon: "📄",
    color: "#fee2e2", // Light red bg for icon
  },
  {
    name: "PDF Compress",
    description: "Reduce PDF file size without losing quality. Perfect for uploads.",
    href: "/pdf-compress",
    icon: "🗜️",
    color: "#ffedd5", // Light orange
  },
  {
    name: "Image Compressor",
    description: "Compress JPG, PNG, WebP. Presets for passport, CNIC, and forms.",
    href: "/image-compressor",
    icon: "🖼️",
    color: "#f3e8ff", // Light purple
  },
  {
    name: "Citation Generator",
    description: "APA 7, MLA 9, IEEE, Harvard. Copy-paste ready citations.",
    href: "/citation-generator",
    icon: "📝",
    color: "#dcfce7", // Light green
  },
  {
    name: "Word Counter",
    description: "Count words, characters, sentences. Keyword density and reading time.",
    href: "/word-counter",
    icon: "🔢",
    color: "#dbeafe", // Light blue
  },
  {
    name: "GPA Calculator",
    description: "HEC-aligned 4.0 scale with university presets. Target CGPA planner.",
    href: "/gpa-calculator",
    icon: "🎓",
    color: "#fef9c3", // Light yellow
  },
  {
    name: "DOC to PDF",
    description: "Convert Microsoft Word documents (.docx) to PDF quickly and securely.",
    href: "/doc-to-pdf",
    icon: "📝",
    color: "#e0e7ff", // Light indigo
  },
  {
    name: "PDF to DOC",
    description: "Convert PDF documents to editable Word (.docx) files.",
    href: "/pdf-to-doc",
    icon: "📝",
    color: "#e0f2fe", // Light sky
  },
  {
    name: "DOC File Merger",
    description: "Combine multiple Word documents (.docx) into one file.",
    href: "/doc-merge",
    icon: "📑",
    color: "#fce7f3", // Light pink
  },
];

export default function ToolsGrid() {
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
            All Tools
          </h2>
          <p
            style={{
              marginTop: "0.75rem",
              color: "#64748b",
              fontSize: "1.125rem",
            }}
          >
            Nine powerful tools. One place. Zero signup.
          </p>
        </div>

        {/* Grid */}
        <div className="tools-grid">
          {tools.map((tool) => (
            <Link
              key={tool.href}
              href={tool.href}
              className="premium-card group"
              style={{
                display: "flex",
                flexDirection: "column",
                padding: "1.75rem",
                background: "white",
                border: "1px solid #e2e8f0",
                borderRadius: "1rem",
                textDecoration: "none",
                transition: "all 0.3s cubic-bezier(0.4, 0, 0.2, 1)",
                position: "relative",
                overflow: "hidden",
              }}
            >
              {/* Subtle top border glow on hover (using CSS class) */}
              <div className="card-glow"></div>

              <div
                className="tool-icon"
                style={{
                  width: "56px",
                  height: "56px",
                  borderRadius: "0.75rem",
                  background: tool.color,
                  display: "flex",
                  alignItems: "center",
                  justifyContent: "center",
                  fontSize: "1.75rem",
                  transition: "transform 0.3s ease",
                }}
              >
                {tool.icon}
              </div>
              
              <h3
                className="tool-title"
                style={{
                  marginTop: "1.25rem",
                  fontSize: "1.25rem",
                  fontWeight: 700,
                  color: "#0f172a",
                  transition: "color 0.2s",
                }}
              >
                {tool.name}
              </h3>
              
              <p
                style={{
                  marginTop: "0.5rem",
                  fontSize: "0.9rem",
                  color: "#64748b",
                  lineHeight: 1.6,
                  flexGrow: 1, // Makes sure content pushes the arrow down
                }}
              >
                {tool.description}
              </p>
              
              <div
                className="tool-action"
                style={{
                  marginTop: "1.25rem",
                  display: "flex",
                  alignItems: "center",
                  color: "#2563eb",
                  fontSize: "0.9rem",
                  fontWeight: 600,
                }}
              >
                Use tool
                <span
                  className="tool-arrow"
                  style={{
                    marginLeft: "0.25rem",
                    display: "inline-block",
                    transition: "transform 0.3s ease",
                  }}
                >
                  →
                </span>
              </div>
            </Link>
          ))}
        </div>
      </div>

      {/* Pure CSS Hover Effects & Neon Glows */}
      <style>{`
        /* Hover effect for Card (Lift and Shadow) */
        .premium-card:hover {
          transform: translateY(-6px);
          border-color: rgba(37, 99, 235, 0.4) !important;
          box-shadow: 0 20px 40px -10px rgba(37, 99, 235, 0.15), 0 0 20px rgba(6, 182, 212, 0.05) !important;
        }

        /* Top glowing line */
        .card-glow {
          position: absolute;
          top: 0; left: 0; right: 0;
          height: 3px;
          background: linear-gradient(90deg, transparent, #06b6d4, transparent);
          opacity: 0;
          transition: opacity 0.3s ease;
        }
        .premium-card:hover .card-glow {
          opacity: 1;
        }

        /* Icon Animation */
        .premium-card:hover .tool-icon {
          transform: scale(1.1) rotate(-5deg);
        }

        /* Title Color Change */
        .premium-card:hover .tool-title {
          color: #2563eb !important;
        }

        /* Arrow Slide Animation */
        .premium-card:hover .tool-arrow {
          transform: translateX(6px);
        }
      `}</style>
    </section>
  );
}