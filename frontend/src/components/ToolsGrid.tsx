"use client";

import Link from "next/link";
import { useEffect, useRef, useState } from "react";

const tools = [
  { name: "PDF Merge", description: "Combine multiple PDF files into one.", href: "/pdf-merge", icon: "📄", color: "#fee2e2" },
  { name: "PDF Compress", description: "Reduce PDF file size without losing quality.", href: "/pdf-compress", icon: "🗜️", color: "#ffedd5" },
  { name: "Image Compressor", description: "Compress JPG, PNG, WebP. Presets for forms.", href: "/image-compressor", icon: "🖼️", color: "#f3e8ff" },
  { name: "Citation Generator", description: "APA 7, MLA 9, IEEE, Harvard citations.", href: "/citation-generator", icon: "📝", color: "#dcfce7" },
  { name: "Word Counter", description: "Count words, characters, keyword density.", href: "/word-counter", icon: "🔢", color: "#dbeafe" },
  { name: "GPA Calculator", description: "HEC-aligned 4.0 scale with presets.", href: "/gpa-calculator", icon: "🎓", color: "#fef9c3" },
  { name: "DOC to PDF", description: "Convert Word documents (.docx) to PDF.", href: "/doc-to-pdf", icon: "📝", color: "#e0e7ff" },
  { name: "PDF to DOC", description: "Convert PDF documents to editable Word files.", href: "/pdf-to-doc", icon: "📝", color: "#e0f2fe" },
  { name: "DOC File Merger", description: "Combine multiple Word documents into one.", href: "/doc-merge", icon: "📑", color: "#fce7f3" },
];

export default function ToolsGrid() {
  const [isVisible, setIsVisible] = useState(false);
  const sectionRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const observer = new IntersectionObserver(
      ([entry]) => {
        setIsVisible(entry.isIntersecting);
      },
      { threshold: 0.1 }
    );

    if (sectionRef.current) {
      observer.observe(sectionRef.current);
    }

    return () => {
      if (sectionRef.current) {
        observer.unobserve(sectionRef.current);
      }
    };
  }, []);

  return (
    <section ref={sectionRef} style={{ padding: "4rem 0", background: "#0f172a", overflow: "hidden" }}>
      <div className="page-container">
        
        {/* Section Header */}
        <div 
          className={`scroll-animate-header ${isVisible ? "is-visible" : ""}`}
          style={{ textAlign: "center", marginBottom: "3rem" }}
        >
          <h2 style={{ fontSize: "clamp(1.8rem, 4vw, 2.2rem)", fontWeight: 800, color: "#f8fafc", letterSpacing: "-0.5px" }}>
            All Tools
          </h2>
          <p style={{ marginTop: "0.5rem", color: "#94a3b8", fontSize: "0.95rem" }}>
            Nine powerful tools. One place. Zero signup.
          </p>
        </div>

        {/* Grid */}
        <div className="tools-grid-custom">
          {tools.map((tool, index) => {
            const animationClass = index % 2 === 0 ? "slide-from-left" : "slide-from-right";
            
            return (
              <Link
                key={tool.href}
                href={tool.href}
                className={`premium-card group scroll-animate-card ${animationClass} ${isVisible ? "is-visible" : ""}`}
                style={{
                  display: "flex",
                  flexDirection: "column",
                  padding: "1.25rem", /* Compact padding */
                  background: "#1e293b",
                  border: "1px solid #334155",
                  borderRadius: "0.75rem", 
                  textDecoration: "none",
                  position: "relative",
                  overflow: "hidden",
                  transitionDelay: isVisible ? `${index * 0.05}s` : "0s",
                }}
              >
                <div className="card-glow"></div>

                <div
                  className="tool-icon"
                  style={{
                    width: "36px", /* Chhota icon */
                    height: "36px",
                    borderRadius: "0.5rem",
                    background: tool.color,
                    display: "flex",
                    alignItems: "center",
                    justifyContent: "center",
                    fontSize: "1.1rem", 
                    marginBottom: "0.75rem",
                  }}
                >
                  {tool.icon}
                </div>
                
                <h3
                  className="tool-title"
                  style={{
                    fontSize: "1rem", /* Compact title */
                    fontWeight: 700,
                    color: "#f8fafc",
                    marginBottom: "0.25rem",
                  }}
                >
                  {tool.name}
                </h3>
                
                <p
                  style={{
                    fontSize: "0.8rem", /* Chhota description */
                    color: "#94a3b8",
                    lineHeight: 1.4,
                    flexGrow: 1,
                    marginBottom: "0.75rem",
                  }}
                >
                  {tool.description}
                </p>
                
                <div
                  className="tool-action"
                  style={{
                    display: "flex",
                    alignItems: "center",
                    color: "#06b6d4",
                    fontSize: "0.75rem", /* Chhota action text */
                    fontWeight: 600,
                  }}
                >
                  Use tool
                  <span className="tool-arrow" style={{ marginLeft: "0.25rem", display: "inline-block" }}>
                    →
                  </span>
                </div>
              </Link>
            );
          })}
        </div>
      </div>

      <style>{`
        /* Custom Grid for smaller boxes */
        .tools-grid-custom {
          display: grid;
          grid-template-columns: repeat(1, 1fr);
          gap: 1rem; /* Chhota gap */
        }
        @media (min-width: 640px) {
          .tools-grid-custom { grid-template-columns: repeat(2, 1fr); }
        }
        @media (min-width: 1024px) {
          .tools-grid-custom { grid-template-columns: repeat(3, 1fr); gap: 1.25rem; } /* 3 columns on desktop */
        }
        @media (min-width: 1280px) {
          .tools-grid-custom { grid-template-columns: repeat(4, 1fr); gap: 1.5rem; } /* 4 columns on large screens for smaller boxes */
        }

        /* Header Animation */
        .scroll-animate-header {
          opacity: 0;
          transform: translateY(-20px);
          transition: opacity 0.5s ease-out, transform 0.5s ease-out;
        }
        .scroll-animate-header.is-visible {
          opacity: 1;
          transform: translateY(0);
        }

        /* Cards Base Animation */
        .scroll-animate-card {
          opacity: 0;
          transition: opacity 0.5s cubic-bezier(0.175, 0.885, 0.32, 1.275), 
                      transform 0.5s cubic-bezier(0.175, 0.885, 0.32, 1.275);
          will-change: transform, opacity;
        }

        /* Side Animations */
        .slide-from-left {
          transform: translateX(-40px) scale(0.95);
        }
        .slide-from-right {
          transform: translateX(40px) scale(0.95);
        }

        .scroll-animate-card.is-visible {
          opacity: 1;
          transform: translateX(0) scale(1);
        }

        /* Hover Effects */
        .premium-card:hover {
          transform: translateY(-4px) !important;
          border-color: rgba(6, 182, 212, 0.5) !important;
          box-shadow: 0 15px 30px -10px rgba(6, 182, 212, 0.2) !important;
        }

        .card-glow {
          position: absolute;
          top: 0; left: 0; right: 0;
          height: 2px;
          background: linear-gradient(90deg, transparent, #06b6d4, transparent);
          opacity: 0;
          transition: opacity 0.3s ease;
        }
        .premium-card:hover .card-glow {
          opacity: 1;
        }

        .premium-card:hover .tool-icon {
          transform: scale(1.1) rotate(-5deg);
        }

        .premium-card:hover .tool-title {
          color: #06b6d4 !important;
        }

        .premium-card:hover .tool-arrow {
          transform: translateX(4px);
        }
      `}</style>
    </section>
  );
}