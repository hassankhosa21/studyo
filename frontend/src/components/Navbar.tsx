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

  return (
    <nav
      style={{
        position: "sticky",
        top: 0,
        zIndex: 50,
        background: "rgba(15, 23, 42, 0.85)",
        backdropFilter: "blur(12px)",
        borderBottom: "1px solid #1e293b",
        boxShadow: "0 4px 30px rgba(0, 0, 0, 0.3)",
      }}
    >
      <div className="page-container">
        <div
          style={{
            display: "flex",
            justifyContent: "space-between",
            alignItems: "center",
            height: "72px",
          }}
        >
          {/* Premium Floating Logo */}
          <Link
            href="/"
            className="nav-logo"
            style={{
              display: "flex",
              alignItems: "center",
              gap: "0.75rem",
              textDecoration: "none",
            }}
          >
            {/* Floating Neon Box */}
            <div className="logo-box">
              <div className="logo-inner">
                {/* Custom SVG Logo */}
                <svg width="24" height="24" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                  <path d="M12 2L2 7L12 12L22 7L12 2Z" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" fill="rgba(6, 182, 212, 0.2)" />
                  <path d="M2 17L12 22L22 17" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
                  <path d="M2 12L12 17L22 12" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
                </svg>
              </div>
            </div>
            
            <span className="logo-text">
              Studyo<span className="logo-dot">.</span>
            </span>
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
            <Link href="/" className="nav-link">
              Home
            </Link>

            {/* Tools Dropdown */}
            <div
              style={{ position: "relative" }}
              onMouseEnter={() => setToolsOpen(true)}
              onMouseLeave={() => setToolsOpen(false)}
            >
              <button className="nav-link" style={{ display: "flex", alignItems: "center", gap: "0.35rem", background: "none", border: "none", cursor: "pointer" }}>
                Tools
                <span
                  style={{
                    fontSize: "0.7rem",
                    transform: toolsOpen ? "rotate(180deg)" : "rotate(0deg)",
                    transition: "transform 0.2s ease",
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
                    width: "280px",
                    background: "#1e293b",
                    border: "1px solid #334155",
                    borderRadius: "0.75rem",
                    boxShadow: "0 20px 40px -10px rgba(0,0,0,0.5), 0 0 20px rgba(6, 182, 212, 0.1)",
                    overflow: "hidden",
                    padding: "0.5rem",
                  }}
                >
                  {tools.map((tool) => (
                    <Link key={tool.href} href={tool.href} className="dropdown-item">
                      <span style={{ fontSize: "1.125rem" }}>{tool.icon}</span>
                      <span>{tool.name}</span>
                    </Link>
                  ))}
                </div>
              )}
            </div>

            <Link href="/about" className="nav-link">
              About
            </Link>
            <Link href="/contact" className="nav-link">
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
              color: "#f8fafc",
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
              borderTop: "1px solid #334155",
            }}
          >
            <Link href="/" onClick={() => setIsOpen(false)} className="nav-link" style={{ display: "block", padding: "0.75rem 1rem" }}>
              Home
            </Link>
            <div style={{ padding: "0.5rem 0" }}>
              <p style={{ fontSize: "0.75rem", fontWeight: 600, color: "#64748b", textTransform: "uppercase", marginBottom: "0.5rem", paddingLeft: "1rem" }}>
                Tools
              </p>
              {tools.map((tool) => (
                <Link key={tool.href} href={tool.href} onClick={() => setIsOpen(false)} className="dropdown-item" style={{ padding: "0.75rem 1rem" }}>
                  <span>{tool.icon}</span>
                  <span>{tool.name}</span>
                </Link>
              ))}
            </div>
            <Link href="/about" onClick={() => setIsOpen(false)} className="nav-link" style={{ display: "block", padding: "0.75rem 1rem" }}>
              About
            </Link>
            <Link href="/contact" onClick={() => setIsOpen(false)} className="nav-link" style={{ display: "block", padding: "0.75rem 1rem" }}>
              Contact
            </Link>
          </div>
        )}
      </div>

      <style>{`
        /* Floating Logo Animations */
        .nav-logo {
          transition: transform 0.3s ease;
        }
        .nav-logo:hover {
          transform: translateY(-2px);
        }

        .logo-box {
          width: 42px;
          height: 42px;
          border-radius: 12px;
          background: linear-gradient(135deg, rgba(6, 182, 212, 0.2) 0%, rgba(59, 130, 246, 0.1) 100%);
          border: 1px solid rgba(6, 182, 212, 0.3);
          display: flex;
          align-items: center;
          justify-content: center;
          position: relative;
          overflow: hidden;
          animation: float 3.5s ease-in-out infinite; /* Speed tez ki hai */
        }

        /* Floating Animation (Faster & Higher) */
        @keyframes float {
          0% { transform: translateY(0px); box-shadow: 0 0 15px rgba(6, 182, 212, 0.15); }
          50% { transform: translateY(-6px); box-shadow: 0 0 25px rgba(6, 182, 212, 0.4); } /* Height badha di */
          100% { transform: translateY(0px); box-shadow: 0 0 15px rgba(6, 182, 212, 0.15); }
        }

        .logo-inner {
          color: #06b6d4;
          display: flex;
          align-items: center;
          justify-content: center;
          filter: drop-shadow(0 0 8px rgba(6, 182, 212, 0.6));
          z-index: 2;
        }

        /* Glowing shine effect on hover */
        .logo-box::before {
          content: "";
          position: absolute;
          top: -50%; left: -50%;
          width: 200%; height: 200%;
          background: radial-gradient(circle, rgba(255,255,255,0.1) 0%, transparent 60%);
          opacity: 0;
          transition: opacity 0.3s;
        }
        .nav-logo:hover .logo-box::before {
          opacity: 1;
        }

        .logo-text {
          font-size: 1.5rem;
          font-weight: 800;
          color: #f8fafc;
          letter-spacing: -0.5px;
          display: flex;
          align-items: center;
        }
        
        .logo-dot {
          color: #06b6d4;
          font-size: 2rem;
          line-height: 0.5;
          margin-left: 2px;
          text-shadow: 0 0 10px rgba(6, 182, 212, 0.8);
        }

        /* Nav Links */
        .nav-link {
          color: #cbd5e1;
          text-decoration: none;
          font-size: 0.95rem;
          font-weight: 500;
          padding: 0.5rem 0.75rem;
          border-radius: 0.5rem;
          transition: all 0.2s ease;
        }
        .nav-link:hover {
          color: #06b6d4;
          background: rgba(6, 182, 212, 0.1);
        }

        /* Dropdown Items */
        .dropdown-item {
          display: flex;
          align-items: center;
          gap: 0.75rem;
          padding: 0.625rem 0.75rem;
          border-radius: 0.5rem;
          color: #cbd5e1;
          text-decoration: none;
          font-size: 0.9rem;
          font-weight: 500;
          transition: all 0.2s ease;
        }
        .dropdown-item:hover {
          background: rgba(6, 182, 212, 0.1);
          color: #06b6d4;
          transform: translateX(4px);
        }

        @media (max-width: 768px) {
          .desktop-menu { display: none !important; }
          .mobile-menu-btn { display: block !important; }
        }
      `}</style>
    </nav>
  );
}