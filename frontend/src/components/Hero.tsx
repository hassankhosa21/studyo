"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";

const tools = [
  { name: "PDF Merge", href: "/pdf-merge", keywords: ["pdf", "merge", "combine"] },
  { name: "PDF Compress", href: "/pdf-compress", keywords: ["pdf", "compress", "reduce"] },
  { name: "Image Compressor", href: "/image-compressor", keywords: ["image", "photo", "compress", "resize"] },
  { name: "Citation Generator", href: "/citation-generator", keywords: ["citation", "apa", "mla", "ieee"] },
  { name: "Word Counter", href: "/word-counter", keywords: ["word", "count", "character"] },
  { name: "GPA Calculator", href: "/gpa-calculator", keywords: ["gpa", "cgpa", "calculator"] },
  { name: "DOC to PDF", href: "/doc-to-pdf", keywords: ["doc", "word", "pdf", "convert"] },
  { name: "PDF to DOC", href: "/pdf-to-doc", keywords: ["pdf", "doc", "word", "convert"] },
  { name: "DOC Merger", href: "/doc-merge", keywords: ["doc", "word", "merge", "combine"] },
];

export default function Hero() {
  const [query, setQuery] = useState("");
  const [results, setResults] = useState<typeof tools>([]);
  const router = useRouter();

  const handleSearch = (value: string) => {
    setQuery(value);
    if (value.trim().length < 2) {
      setResults([]);
      return;
    }

    const lowerQuery = value.toLowerCase();
    const matches = tools.filter(
      (tool) =>
        tool.name.toLowerCase().includes(lowerQuery) ||
        tool.keywords.some((k) => k.includes(lowerQuery))
    );
    setResults(matches);
  };

  const goToTool = (href: string) => {
    setQuery("");
    setResults([]);
    router.push(href);
  };

  return (
    <section
      className="hero-bg"
      style={{
        paddingTop: "6rem",
        paddingBottom: "6rem",
        position: "relative",
        overflow: "hidden",
        textAlign: "center",
      }}
    >
      <div
        style={{
          maxWidth: "1280px",
          marginLeft: "auto",
          marginRight: "auto",
          paddingLeft: "1rem",
          paddingRight: "1rem",
          position: "relative",
          zIndex: 1,
        }}
      >
        {/* Tagline */}
        <h1
          className="animate-fade-up"
          style={{
            fontSize: "clamp(2.5rem, 6vw, 4.5rem)",
            fontWeight: 800,
            lineHeight: 1.1,
            color: "#f8fafc", /* White text for dark theme */
            letterSpacing: "-1px",
            maxWidth: "900px",
            marginLeft: "auto",
            marginRight: "auto",
          }}
        >
          Free Tools for{" "}
          <span style={{ color: "#06b6d4", position: "relative", textShadow: "0 0 20px rgba(6, 182, 212, 0.5)" }}>
            Students
            <span
              style={{
                position: "absolute",
                bottom: "5px",
                left: 0,
                width: "100%",
                height: "8px",
                background: "rgba(6, 182, 212, 0.2)",
                zIndex: -1,
                borderRadius: "4px",
              }}
            ></span>
          </span>
        </h1>

        <p
          className="animate-fade-up"
          style={{
            marginTop: "1.5rem",
            fontSize: "clamp(1.1rem, 2vw, 1.25rem)",
            color: "#94a3b8", /* Light grey for dark theme */
            maxWidth: "640px",
            marginLeft: "auto",
            marginRight: "auto",
            lineHeight: "1.6",
            animationDelay: "0.1s",
          }}
        >
          PDF merge, image compression, citation generator, GPA calculator, and
          more. No signup. No file uploads. Your files never leave your device.
        </p>

        {/* Search Bar */}
        <div
          className="animate-fade-up"
          style={{
            marginTop: "3rem",
            maxWidth: "560px",
            marginLeft: "auto",
            marginRight: "auto",
            position: "relative",
            width: "100%",
            animationDelay: "0.2s",
          }}
        >
          <div style={{ position: "relative" }}>
            <input
              type="text"
              value={query}
              onChange={(e) => handleSearch(e.target.value)}
              placeholder="Search tools (e.g., pdf merge, gpa)"
              className="hero-search-input"
              style={{
                width: "100%",
                padding: "1.25rem 1.25rem 1.25rem 3.5rem",
                border: "1px solid #334155",
                borderRadius: "9999px",
                fontSize: "1.05rem",
                outline: "none",
                background: "#1e293b", /* Dark search bar */
                color: "#f8fafc",
                boxShadow: "0 10px 25px -5px rgba(0,0,0,0.3), 0 0 20px rgba(6,182,212,0.05)",
                boxSizing: "border-box",
                transition: "all 0.3s ease",
              }}
            />
            <svg
              style={{
                position: "absolute",
                left: "1.25rem",
                top: "50%",
                transform: "translateY(-50%)",
                width: "24px",
                height: "24px",
                color: "#64748b",
              }}
              fill="none"
              stroke="currentColor"
              viewBox="0 0 24 24"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth={2}
                d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z"
              />
            </svg>
          </div>

          {results.length > 0 && (
            <div
              style={{
                position: "absolute",
                top: "100%",
                left: 0,
                right: 0,
                marginTop: "0.5rem",
                background: "#1e293b",
                border: "1px solid #334155",
                borderRadius: "1rem",
                boxShadow: "0 20px 40px -10px rgba(0,0,0,0.5)",
                zIndex: 10,
                overflow: "hidden",
                textAlign: "left",
                padding: "0.5rem",
              }}
            >
              {results.map((tool) => (
                <button
                  key={tool.href}
                  onClick={() => goToTool(tool.href)}
                  className="search-result-item"
                  style={{
                    width: "100%",
                    textAlign: "left",
                    padding: "0.75rem 1rem",
                    background: "none",
                    border: "none",
                    borderRadius: "0.5rem",
                    cursor: "pointer",
                    fontSize: "1rem",
                    color: "#e2e8f0",
                    fontWeight: 500,
                    transition: "all 0.2s ease",
                  }}
                >
                  {tool.name}
                </button>
              ))}
            </div>
          )}
        </div>

        {/* Quick Links */}
        <div
          className="animate-fade-up"
          style={{
            marginTop: "2.5rem",
            display: "flex",
            flexWrap: "wrap",
            justifyContent: "center",
            alignItems: "center",
            gap: "0.75rem",
            fontSize: "0.9rem",
            animationDelay: "0.3s",
          }}
        >
          <span style={{ color: "#64748b", fontWeight: 500 }}>Popular:</span>
          {["PDF Merge", "GPA Calculator", "Image Compressor"].map((name) => {
            const tool = tools.find((t) => t.name === name);
            return (
              <button
                key={name}
                onClick={() => tool && goToTool(tool.href)}
                className="quick-link-btn"
                style={{
                  padding: "0.4rem 1rem",
                  background: "#1e293b",
                  border: "1px solid #334155",
                  borderRadius: "9999px",
                  color: "#cbd5e1",
                  cursor: "pointer",
                  fontSize: "0.9rem",
                  fontWeight: 500,
                  boxShadow: "0 2px 4px rgba(0,0,0,0.2)",
                  transition: "all 0.2s ease",
                }}
              >
                {name}
              </button>
            );
          })}
        </div>
      </div>

      {/* Pure CSS Animations & Glows for Dark Theme */}
      <style>{`
        .hero-bg {
          background: radial-gradient(circle at 50% 0%, #1e293b 0%, #0f172a 100%);
        }
        .hero-bg::before {
          content: "";
          position: absolute;
          top: -20%; left: 50%;
          transform: translateX(-50%);
          width: 80%; height: 60%;
          background: radial-gradient(ellipse at center, rgba(6, 182, 212, 0.15) 0%, transparent 70%);
          pointer-events: none;
          z-index: 0;
        }
        .hero-bg::after {
          content: "";
          position: absolute;
          top: 0; left: 0; width: 100%; height: 100%;
          background-image: 
            linear-gradient(rgba(6, 182, 212, 0.05) 1px, transparent 1px),
            linear-gradient(90deg, rgba(6, 182, 212, 0.05) 1px, transparent 1px);
          background-size: 40px 40px;
          mask-image: linear-gradient(to bottom, black 40%, transparent 100%);
          -webkit-mask-image: linear-gradient(to bottom, black 40%, transparent 100%);
          pointer-events: none;
          z-index: 0;
        }
        .hero-search-input:focus {
          border-color: #06b6d4 !important;
          box-shadow: 0 0 0 4px rgba(6, 182, 212, 0.15), 0 10px 25px -5px rgba(0,0,0,0.3) !important;
        }
        .search-result-item:hover {
          background: rgba(6, 182, 212, 0.1) !important;
          color: #06b6d4 !important;
        }
        .quick-link-btn:hover {
          border-color: #06b6d4 !important;
          color: #06b6d4 !important;
          box-shadow: 0 4px 10px rgba(6, 182, 212, 0.2) !important;
          transform: translateY(-2px) !important;
        }
      `}</style>
    </section>
  );
}