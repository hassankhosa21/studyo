"use client";

import Link from "next/link";
import { useState } from "react";

const tools = [
  { name: "PDF Merge", href: "/pdf-merge", icon: "📄" },
  { name: "PDF Compress", href: "/pdf-compress", icon: "🗜️" },
  { name: "Image Compressor", href: "/image-compressor", icon: "🖼️" },
  { name: "Citation Generator", href: "/citation-generator", icon: "📝" },
  { name: "Word Counter", href: "/word-counter", icon: "🔢" },
  { name: "GPA Calculator", href: "/gpa-calculator", icon: "🎓" },
  { name: "DOC to PDF", href: "/doc-to-pdf", icon: "📝" },
    { name: "PDF to DOC", href: "/pdf-to-doc", icon: "📝" },
      { name: "DOC File Merger", href: "/doc-merge", icon: "📑" },
];

export default function Navbar() {
  const [isOpen, setIsOpen] = useState(false);
  const [toolsOpen, setToolsOpen] = useState(false);
  const [hoveredLink, setHoveredLink] = useState<string | null>(null);

  const navLinkStyle = (key: string): React.CSSProperties => ({
    color: hoveredLink === key ? "#2563eb" : "#374151",
    textDecoration: "none",
    fontSize: "0.95rem",
    fontWeight: 500,
    padding: "0.5rem 0.75rem",
    borderRadius: "0.5rem",
    background: hoveredLink === key ? "#eff6ff" : "transparent",
    transition: "all 0.2s",
  });

  return (
    <nav
      style={{
        position: "sticky",
        top: 0,
        zIndex: 50,
        background: "white",
        borderBottom: "1px solid #e5e7eb",
        boxShadow: "0 1px 3px rgba(0,0,0,0.05)",
      }}
    >
      <div className="page-container">
        <div
          style={{
            display: "flex",
            justifyContent: "space-between",
            alignItems: "center",
            height: "64px",
          }}
        >
          {/* Logo */}
          <Link
            href="/"
            style={{
              fontSize: "1.5rem",
              fontWeight: "bold",
              color: "#2563eb",
              textDecoration: "none",
            }}
          >
            Studyo
          </Link>

          {/* Desktop Menu */}
          <div
            style={{
              display: "flex",
              alignItems: "center",
              gap: "0.5rem",
            }}
            className="desktop-menu"
          >
            <Link
              href="/"
              style={navLinkStyle("home")}
              onMouseEnter={() => setHoveredLink("home")}
              onMouseLeave={() => setHoveredLink(null)}
            >
              Home
            </Link>

            {/* Tools Dropdown */}
            <div
              style={{ position: "relative" }}
              onMouseEnter={() => {
                setToolsOpen(true);
                setHoveredLink("tools");
              }}
              onMouseLeave={() => {
                setToolsOpen(false);
                setHoveredLink(null);
              }}
            >
              <button
                style={{
                  background: hoveredLink === "tools" ? "#eff6ff" : "transparent",
                  border: "none",
                  color: hoveredLink === "tools" ? "#2563eb" : "#374151",
                  fontSize: "0.95rem",
                  fontWeight: 500,
                  cursor: "pointer",
                  display: "flex",
                  alignItems: "center",
                  gap: "0.35rem",
                  padding: "0.5rem 0.75rem",
                  borderRadius: "0.5rem",
                  transition: "all 0.2s",
                }}
              >
                Tools
                <span
                  style={{
                    fontSize: "0.7rem",
                    transform: toolsOpen ? "rotate(180deg)" : "rotate(0deg)",
                    transition: "transform 0.2s",
                  }}
                >
                  ▼
                </span>
              </button>

              {/* Dropdown Menu */}
              {toolsOpen && (
                <div
                  style={{
                    position: "absolute",
                    top: "100%",
                    right: 0,
                    marginTop: "0.5rem",
                    width: "260px",
                    background: "white",
                    border: "1px solid #e5e7eb",
                    borderRadius: "0.75rem",
                    boxShadow:
                      "0 10px 25px -5px rgba(0,0,0,0.1), 0 8px 10px -6px rgba(0,0,0,0.05)",
                    overflow: "hidden",
                    padding: "0.5rem",
                  }}
                >
                  {tools.map((tool) => (
                    <Link
                      key={tool.href}
                      href={tool.href}
                      style={{
                        display: "flex",
                        alignItems: "center",
                        gap: "0.75rem",
                        padding: "0.625rem 0.75rem",
                        borderRadius: "0.5rem",
                        color: "#374151",
                        textDecoration: "none",
                        fontSize: "0.9rem",
                        fontWeight: 500,
                        transition: "all 0.15s",
                      }}
                      onMouseEnter={(e) => {
                        e.currentTarget.style.background = "#eff6ff";
                        e.currentTarget.style.color = "#2563eb";
                        e.currentTarget.style.transform = "translateX(4px)";
                      }}
                      onMouseLeave={(e) => {
                        e.currentTarget.style.background = "transparent";
                        e.currentTarget.style.color = "#374151";
                        e.currentTarget.style.transform = "translateX(0)";
                      }}
                    >
                      <span style={{ fontSize: "1.125rem" }}>{tool.icon}</span>
                      <span>{tool.name}</span>
                    </Link>
                  ))}
                </div>
              )}
            </div>

            <Link
              href="/about"
              style={navLinkStyle("about")}
              onMouseEnter={() => setHoveredLink("about")}
              onMouseLeave={() => setHoveredLink(null)}
            >
              About
            </Link>
            <Link
              href="/contact"
              style={navLinkStyle("contact")}
              onMouseEnter={() => setHoveredLink("contact")}
              onMouseLeave={() => setHoveredLink(null)}
            >
              Contact
            </Link>
          </div>

          {/* Mobile Menu Button */}
          <button
            onClick={() => setIsOpen(!isOpen)}
            style={{
              display: "none",
              background: "none",
              border: "none",
              fontSize: "1.5rem",
              cursor: "pointer",
              padding: "0.5rem",
              color: "#374151",
            }}
            className="mobile-menu-btn"
            aria-label="Toggle menu"
          >
            {isOpen ? "✕" : "☰"}
          </button>
        </div>

        {/* Mobile Menu */}
        {isOpen && (
          <div
            style={{
              padding: "1rem 0",
              borderTop: "1px solid #e5e7eb",
            }}
          >
            <Link
              href="/"
              onClick={() => setIsOpen(false)}
              style={{
                display: "block",
                padding: "0.75rem 1rem",
                color: "#374151",
                textDecoration: "none",
                fontWeight: 500,
                borderRadius: "0.5rem",
              }}
            >
              Home
            </Link>
            <div style={{ padding: "0.5rem 0" }}>
              <p
                style={{
                  fontSize: "0.75rem",
                  fontWeight: 600,
                  color: "#9ca3af",
                  textTransform: "uppercase",
                  marginBottom: "0.5rem",
                  paddingLeft: "1rem",
                }}
              >
                Tools
              </p>
              {tools.map((tool) => (
                <Link
                  key={tool.href}
                  href={tool.href}
                  onClick={() => setIsOpen(false)}
                  style={{
                    display: "flex",
                    alignItems: "center",
                    gap: "0.5rem",
                    padding: "0.75rem 1rem",
                    color: "#374151",
                    textDecoration: "none",
                    fontSize: "0.9rem",
                    borderRadius: "0.5rem",
                  }}
                >
                  <span>{tool.icon}</span>
                  <span>{tool.name}</span>
                </Link>
              ))}
            </div>
            <Link
              href="/about"
              onClick={() => setIsOpen(false)}
              style={{
                display: "block",
                padding: "0.75rem 1rem",
                color: "#374151",
                textDecoration: "none",
                fontWeight: 500,
                borderRadius: "0.5rem",
              }}
            >
              About
            </Link>
            <Link
              href="/contact"
              onClick={() => setIsOpen(false)}
              style={{
                display: "block",
                padding: "0.75rem 1rem",
                color: "#374151",
                textDecoration: "none",
                fontWeight: 500,
                borderRadius: "0.5rem",
              }}
            >
              Contact
            </Link>
          </div>
        )}
      </div>

      {/* Responsive styles */}
      <style>{`
        @media (max-width: 768px) {
          .desktop-menu {
            display: none !important;
          }
          .mobile-menu-btn {
            display: block !important;
          }
        }
      `}</style>
    </nav>
  );
}