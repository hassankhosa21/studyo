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
      style={{
        background: "linear-gradient(to bottom, #eff6ff, #ffffff)",
        paddingTop: "4rem",
        paddingBottom: "4rem",
      }}
    >
      <div
        style={{
          maxWidth: "1280px",
          marginLeft: "auto",
          marginRight: "auto",
          paddingLeft: "1rem",
          paddingRight: "1rem",
          textAlign: "center",
          width: "100%",
        }}
      >
        {/* Tagline */}
        <h1
          style={{
            fontSize: "clamp(1.75rem, 5vw, 3.5rem)",
            fontWeight: "bold",
            lineHeight: "1.15",
            color: "#111827",
            maxWidth: "900px",
            marginLeft: "auto",
            marginRight: "auto",
          }}
        >
          Free Tools for <span style={{ color: "#2563eb" }}>Students</span>
        </h1>

        <p
          style={{
            marginTop: "1.5rem",
            fontSize: "clamp(1rem, 2vw, 1.125rem)",
            color: "#4b5563",
            maxWidth: "640px",
            marginLeft: "auto",
            marginRight: "auto",
            lineHeight: "1.6",
          }}
        >
          PDF merge, image compression, citation generator, GPA calculator, and
          more. No signup. No file uploads. Your files never leave your device.
        </p>

        {/* Search Bar */}
        <div
          style={{
            marginTop: "2.5rem",
            maxWidth: "560px",
            marginLeft: "auto",
            marginRight: "auto",
            position: "relative",
            width: "100%",
          }}
        >
          <div style={{ position: "relative" }}>
            <input
              type="text"
              value={query}
              onChange={(e) => handleSearch(e.target.value)}
              placeholder="Search tools (e.g., pdf merge, gpa)"
              style={{
                width: "100%",
                padding: "1rem 1rem 1rem 3rem",
                border: "1px solid #d1d5db",
                borderRadius: "9999px",
                fontSize: "1rem",
                outline: "none",
                boxShadow: "0 1px 2px rgba(0,0,0,0.05)",
                boxSizing: "border-box",
              }}
            />
            <svg
              style={{
                position: "absolute",
                left: "1rem",
                top: "50%",
                transform: "translateY(-50%)",
                width: "20px",
                height: "20px",
                color: "#9ca3af",
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
                background: "white",
                border: "1px solid #e5e7eb",
                borderRadius: "0.5rem",
                boxShadow: "0 10px 15px -3px rgba(0,0,0,0.1)",
                zIndex: 10,
                overflow: "hidden",
                textAlign: "left",
              }}
            >
              {results.map((tool) => (
                <button
                  key={tool.href}
                  onClick={() => goToTool(tool.href)}
                  style={{
                    width: "100%",
                    textAlign: "left",
                    padding: "0.75rem 1.25rem",
                    background: "none",
                    border: "none",
                    borderBottom: "1px solid #f3f4f6",
                    cursor: "pointer",
                    fontSize: "1rem",
                    color: "#1f2937",
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
          style={{
            marginTop: "2rem",
            display: "flex",
            flexWrap: "wrap",
            justifyContent: "center",
            alignItems: "center",
            gap: "0.5rem",
            fontSize: "0.875rem",
          }}
        >
          <span style={{ color: "#6b7280" }}>Popular:</span>
          {["PDF Merge", "GPA Calculator", "Image Compressor"].map((name) => {
            const tool = tools.find((t) => t.name === name);
            return (
              <button
                key={name}
                onClick={() => tool && goToTool(tool.href)}
                style={{
                  padding: "0.25rem 0.75rem",
                  background: "white",
                  border: "1px solid #e5e7eb",
                  borderRadius: "9999px",
                  color: "#374151",
                  cursor: "pointer",
                  fontSize: "0.875rem",
                }}
              >
                {name}
              </button>
            );
          })}
        </div>
      </div>
    </section>
  );
}