import Link from "next/link";

const tools = [
  { name: "PDF Merge", href: "/pdf-merge" },
  { name: "PDF Compress", href: "/pdf-compress" },
  { name: "Image Compressor", href: "/image-compressor" },
  { name: "Citation Generator", href: "/citation-generator" },
  { name: "Word Counter", href: "/word-counter" },
  { name: "GPA Calculator", href: "/gpa-calculator" },
  { name: "DOC to PDF", href: "/doc-to-pdf" },
  { name: "PDF to DOC", href: "/pdf-to-doc" },
  { name: "DOC File Merger", href: "/doc-merge" },
];

const company = [
  { name: "About", href: "/about" },
  { name: "Contact", href: "/contact" },
  { name: "Privacy Policy", href: "/privacy-policy" },
  { name: "Terms of Use", href: "/terms" },
];

export default function Footer() {
  const currentYear = new Date().getFullYear();

  return (
    <footer style={{ background: "#0f172a", color: "#cbd5e1", marginTop: "0", borderTop: "1px solid #1e293b" }}>
      <div
        className="page-container"
        style={{ paddingTop: "4rem", paddingBottom: "2.5rem" }}
      >
        <div
          style={{
            display: "grid",
            gridTemplateColumns: "1fr",
            gap: "3rem",
          }}
          className="footer-grid"
        >
          {/* Brand */}
          <div>
            <Link
              href="/"
              className="footer-logo"
              style={{
                display: "inline-flex",
                alignItems: "center",
                gap: "0.5rem",
                textDecoration: "none",
                transition: "transform 0.3s ease",
              }}
            >
              <div
                style={{
                  width: "36px",
                  height: "36px",
                  borderRadius: "10px",
                  background: "linear-gradient(135deg, #06b6d4 0%, #3b82f6 100%)",
                  display: "flex",
                  alignItems: "center",
                  justifyContent: "center",
                  boxShadow: "0 0 15px rgba(6, 182, 212, 0.5)",
                  color: "#0f172a",
                  fontWeight: 800,
                  fontSize: "1.2rem",
                }}
              >
                S
              </div>
              <span
                style={{
                  fontSize: "1.4rem",
                  fontWeight: 800,
                  color: "#f8fafc",
                  letterSpacing: "-0.5px",
                }}
              >
                Studyo
                <span style={{ color: "#06b6d4" }}>.</span>
              </span>
            </Link>
            
            <p
              style={{
                marginTop: "1rem",
                fontSize: "0.9rem",
                color: "#94a3b8",
                lineHeight: 1.7,
                maxWidth: "350px",
              }}
            >
              Premium online tools for students. PDF merge, image compression,
              citation generator, GPA calculator — all in one place. No signup,
              no file uploads. Your files never leave your device.
            </p>
          </div>

          {/* Tools */}
          <div>
            <h3
              style={{
                color: "#f8fafc",
                fontWeight: 700,
                marginBottom: "1.25rem",
                fontSize: "1rem",
                letterSpacing: "0.5px",
              }}
            >
              Tools
            </h3>
            <ul
              style={{
                listStyle: "none",
                display: "grid",
                gridTemplateColumns: "1fr 1fr",
                gap: "0.75rem",
              }}
            >
              {tools.map((tool) => (
                <li key={tool.href}>
                  <Link
                    href={tool.href}
                    className="footer-link"
                  >
                    {tool.name}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          {/* Company */}
          <div>
            <h3
              style={{
                color: "#f8fafc",
                fontWeight: 700,
                marginBottom: "1.25rem",
                fontSize: "1rem",
                letterSpacing: "0.5px",
              }}
            >
              Company
            </h3>
            <ul
              style={{
                listStyle: "none",
                display: "flex",
                flexDirection: "column",
                gap: "0.75rem",
              }}
            >
              {company.map((item) => (
                <li key={item.href}>
                  <Link
                    href={item.href}
                    className="footer-link"
                  >
                    {item.name}
                  </Link>
                </li>
              ))}
            </ul>
          </div>
        </div>

        {/* Bottom bar */}
        <div
          style={{
            marginTop: "4rem",
            paddingTop: "2rem",
            borderTop: "1px solid #1e293b",
            display: "flex",
            flexDirection: "column",
            gap: "1rem",
            alignItems: "center",
            textAlign: "center",
          }}
        >
          <p style={{ fontSize: "0.9rem", color: "#94a3b8" }}>
            © {currentYear} Studyo. All rights reserved.
          </p>

          <p style={{ fontSize: "0.9rem", color: "#94a3b8" }}>
            Developed by{" "}
            <span style={{ color: "#06b6d4", fontWeight: 600 }}>
              Masood ul Hassan
            </span>
          </p>

          <p style={{ fontSize: "0.8rem", color: "#64748b" }}>
            Not affiliated with HEC or any university. Results are estimates only.
          </p>
        </div>
      </div>

      {/* Responsive & Hover Styles */}
      <style>{`
        .footer-logo:hover {
          transform: translateY(-2px);
        }
        .footer-link {
          color: #94a3b8;
          text-decoration: none;
          font-size: 0.9rem;
          transition: all 0.2s ease;
          display: inline-block;
        }
        .footer-link:hover {
          color: #06b6d4;
          transform: translateX(4px);
        }
        @media (min-width: 768px) {
          .footer-grid {
            grid-template-columns: 2fr 1.5fr 1fr !important;
          }
        }
      `}</style>
    </footer>
  );
}