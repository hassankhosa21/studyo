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
    <footer style={{ background: "#111827", color: "#d1d5db", marginTop: "4rem" }}>
      <div
        className="page-container"
        style={{ paddingTop: "3rem", paddingBottom: "3rem" }}
      >
        <div
          style={{
            display: "grid",
            gridTemplateColumns: "1fr",
            gap: "2rem",
          }}
          className="footer-grid"
        >
          {/* Brand */}
          <div>
            <Link
              href="/"
              style={{
                fontSize: "1.5rem",
                fontWeight: "bold",
                color: "#60a5fa",
                textDecoration: "none",
              }}
            >
              Studyo
            </Link>
            <p
              style={{
                marginTop: "1rem",
                fontSize: "0.875rem",
                color: "#9ca3af",
                lineHeight: 1.6,
                maxWidth: "400px",
              }}
            >
              Free online tools for students. PDF merge, image compression,
              citation generator, GPA calculator — all in one place. No signup,
              no file uploads. Your files never leave your device.
            </p>
          </div>

          {/* Tools */}
          <div>
            <h3
              style={{
                color: "white",
                fontWeight: 600,
                marginBottom: "1rem",
                fontSize: "1rem",
              }}
            >
              Tools
            </h3>
            <ul
              style={{
                listStyle: "none",
                display: "flex",
                flexDirection: "column",
                gap: "0.5rem",
              }}
            >
              {tools.map((tool) => (
                <li key={tool.href}>
                  <Link
                    href={tool.href}
                    style={{
                      color: "#9ca3af",
                      textDecoration: "none",
                      fontSize: "0.875rem",
                    }}
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
                color: "white",
                fontWeight: 600,
                marginBottom: "1rem",
                fontSize: "1rem",
              }}
            >
              Company
            </h3>
            <ul
              style={{
                listStyle: "none",
                display: "flex",
                flexDirection: "column",
                gap: "0.5rem",
              }}
            >
              {company.map((item) => (
                <li key={item.href}>
                  <Link
                    href={item.href}
                    style={{
                      color: "#9ca3af",
                      textDecoration: "none",
                      fontSize: "0.875rem",
                    }}
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
            marginTop: "3rem",
            paddingTop: "2rem",
            borderTop: "1px solid #1f2937",
            display: "flex",
            flexDirection: "column",
            gap: "0.75rem",
            alignItems: "center",
            textAlign: "center",
          }}
        >
          <p style={{ fontSize: "0.875rem", color: "#9ca3af" }}>
            © {currentYear} Studyo. All rights reserved.
          </p>

          <p style={{ fontSize: "0.875rem", color: "#9ca3af" }}>
            Developed by{" "}
            <span style={{ color: "#60a5fa", fontWeight: 600 }}>
              Masood ul Hassan
            </span>
          </p>

          <p style={{ fontSize: "0.75rem", color: "#6b7280" }}>
            Not affiliated with HEC or any university. Results are estimates only.
          </p>
        </div>
      </div>

      {/* Responsive grid styles */}
      <style>{`
        @media (min-width: 768px) {
          .footer-grid {
            grid-template-columns: 2fr 1fr 1fr !important;
          }
        }
      `}</style>
    </footer>
  );
}