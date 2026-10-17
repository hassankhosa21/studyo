"use client";

import Link from "next/link";
import { useState } from "react";

const tools = [
  {
    name: "PDF Merge",
    description: "Combine multiple PDF files into one. Drag, drop, reorder, download.",
    href: "/pdf-merge",
    icon: "📄",
    color: "#fee2e2",
  },
  {
    name: "PDF Compress",
    description: "Reduce PDF file size without losing quality. Perfect for uploads.",
    href: "/pdf-compress",
    icon: "🗜️",
    color: "#ffedd5",
  },
  {
    name: "Image Compressor",
    description: "Compress JPG, PNG, WebP. Presets for passport, CNIC, and forms.",
    href: "/image-compressor",
    icon: "🖼️",
    color: "#f3e8ff",
  },
  {
    name: "Citation Generator",
    description: "APA 7, MLA 9, IEEE, Harvard. Copy-paste ready citations.",
    href: "/citation-generator",
    icon: "📝",
    color: "#dcfce7",
  },
  {
    name: "Word Counter",
    description: "Count words, characters, sentences. Keyword density and reading time.",
    href: "/word-counter",
    icon: "🔢",
    color: "#dbeafe",
  },
  {
    name: "GPA Calculator",
    description: "HEC-aligned 4.0 scale with university presets. Target CGPA planner.",
    href: "/gpa-calculator",
    icon: "🎓",
    color: "#fef9c3",
  },
  {
    name: "DOC to PDF",
    description: "Convert Microsoft Word documents (.docx) to PDF quickly and securely.",
    href: "/doc-to-pdf",
    icon: "📝",
    color: "#e0e7ff",
  },
    {
    name: "PDF to DOC",
    description: "Convert PDF documents to editable Word (.docx) files.",
    href: "/pdf-to-doc",
    icon: "📝",
    color: "#e0f2fe",
  },
];

export default function ToolsGrid() {
  const [hoveredIndex, setHoveredIndex] = useState<number | null>(null);

  return (
    <section style={{ padding: "4rem 0", background: "white" }}>
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
            All Tools
          </h2>
          <p
            style={{
              marginTop: "0.75rem",
              color: "#4b5563",
              fontSize: "1.125rem",
            }}
          >
            Seven powerful tools. One place. Zero signup.
          </p>
        </div>

        {/* Grid */}
        <div className="tools-grid">
          {tools.map((tool, index) => {
            const isHovered = hoveredIndex === index;
            return (
              <Link
                key={tool.href}
                href={tool.href}
                onMouseEnter={() => setHoveredIndex(index)}
                onMouseLeave={() => setHoveredIndex(null)}
                style={{
                  display: "block",
                  padding: "1.5rem",
                  background: "white",
                  border: isHovered ? "1px solid #2563eb" : "1px solid #e5e7eb",
                  borderRadius: "0.75rem",
                  textDecoration: "none",
                  transition: "all 0.25s ease",
                  transform: isHovered ? "translateY(-4px)" : "translateY(0)",
                  boxShadow: isHovered
                    ? "0 20px 25px -5px rgba(37, 99, 235, 0.15), 0 8px 10px -6px rgba(37, 99, 235, 0.1)"
                    : "0 0 0 rgba(0,0,0,0)",
                  cursor: "pointer",
                }}
              >
                <div
                  style={{
                    width: "48px",
                    height: "48px",
                    borderRadius: "0.5rem",
                    background: tool.color,
                    display: "flex",
                    alignItems: "center",
                    justifyContent: "center",
                    fontSize: "1.5rem",
                    transition: "transform 0.25s ease",
                    transform: isHovered ? "scale(1.1) rotate(-5deg)" : "scale(1) rotate(0deg)",
                  }}
                >
                  {tool.icon}
                </div>
                <h3
                  style={{
                    marginTop: "1rem",
                    fontSize: "1.25rem",
                    fontWeight: 600,
                    color: isHovered ? "#2563eb" : "#111827",
                    transition: "color 0.2s",
                  }}
                >
                  {tool.name}
                </h3>
                <p
                  style={{
                    marginTop: "0.5rem",
                    fontSize: "0.875rem",
                    color: "#4b5563",
                    lineHeight: 1.6,
                  }}
                >
                  {tool.description}
                </p>
                <div
                  style={{
                    marginTop: "1rem",
                    display: "flex",
                    alignItems: "center",
                    color: "#2563eb",
                    fontSize: "0.875rem",
                    fontWeight: 500,
                  }}
                >
                  Use tool
                  <span
                    style={{
                      marginLeft: "0.25rem",
                      display: "inline-block",
                      transition: "transform 0.25s ease",
                      transform: isHovered ? "translateX(6px)" : "translateX(0)",
                    }}
                  >
                    →
                  </span>
                </div>
              </Link>
            );
          })}
        </div>
      </div>
    </section>
  );
}