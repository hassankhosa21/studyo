"use client";

import { useState, useMemo } from "react";
import ToolLayout from "@/components/ToolLayout";
import {
  formatCitation,
  createEmptyCitationData,
} from "@/lib/citation/formatters";
import {
  CITATION_STYLES,
  SOURCE_TYPES,
  STYLE_LABELS,
  type CitationData,
  type CitationStyle,
  type SourceType,
  type Author,
} from "@/lib/citation/types";

const relatedTools = [
  { name: "Word Counter", href: "/word-counter" },
  { name: "GPA Calculator", href: "/gpa-calculator" },
  { name: "PDF Merge", href: "/pdf-merge" },
];

const howToSteps = [
  "Choose your citation style (APA, MLA, IEEE, Harvard).",
  "Select the source type (Website, Book, Journal).",
  "Fill in author, title, year, and other details.",
  "Copy the formatted citation with one click.",
  "Save multiple citations and export them all at once.",
];

const features = [
  "APA 7, MLA 9, IEEE, and Harvard styles",
  "Website, book, and journal article support",
  "Multiple authors support",
  "One-click copy to clipboard",
  "Save and export multiple citations",
  "100% free, no signup, works offline",
];

const faqs = [
  {
    question: "Which citation styles are supported?",
    answer:
      "We support APA 7th edition, MLA 9th edition, IEEE, and Harvard styles. More styles are coming soon.",
  },
  {
    question: "Is my data saved on your server?",
    answer:
      "No. All formatting happens in your browser. Your citation data never leaves your device.",
  },
  {
    question: "Can I cite multiple authors?",
    answer:
      "Yes. Click 'Add Author' to add as many authors as needed. Each style formats them differently according to its rules.",
  },
  {
    question: "Is this citation 100% accurate?",
    answer:
      "We follow official style guide rules carefully. However, always double-check with your professor's requirements or your university's citation guide.",
  },
];

export default function CitationGeneratorPage() {
  const [style, setStyle] = useState<CitationStyle>("APA");
  const [sourceType, setSourceType] = useState<SourceType>("website");
  const [data, setData] = useState<CitationData>(
    createEmptyCitationData("website")
  );
  const [copied, setCopied] = useState(false);
  const [savedCitations, setSavedCitations] = useState<
    { id: string; style: CitationStyle; text: string }[]
  >([]);

  // Reset data when source type changes
  const handleSourceTypeChange = (newType: SourceType) => {
    setSourceType(newType);
    setData(createEmptyCitationData(newType));
  };

  const handleFieldChange = (field: string, value: string) => {
    setData((prev) => ({ ...prev, [field]: value }) as CitationData);
  };

  const handleAuthorChange = (
    index: number,
    field: keyof Author,
    value: string
  ) => {
    setData((prev) => {
      const authors = [...prev.authors];
      authors[index] = { ...authors[index], [field]: value };
      return { ...prev, authors };
    });
  };

  const addAuthor = () => {
    setData((prev) => ({
      ...prev,
      authors: [...prev.authors, { firstName: "", lastName: "" }],
    }));
  };

  const removeAuthor = (index: number) => {
    if (data.authors.length <= 1) return;
    setData((prev) => ({
      ...prev,
      authors: prev.authors.filter((_, i) => i !== index),
    }));
  };

  const formattedCitation = useMemo(
    () => formatCitation(data, style),
    [data, style]
  );

  const handleCopy = async () => {
    if (!formattedCitation) return;
    try {
      await navigator.clipboard.writeText(formattedCitation);
      setCopied(true);
      setTimeout(() => setCopied(false), 2000);
    } catch (err) {
      console.error("Copy failed:", err);
    }
  };

  const handleSave = () => {
    if (!formattedCitation) return;
    setSavedCitations((prev) => [
      ...prev,
      {
        id: `${Date.now()}-${Math.random().toString(36).substring(2, 9)}`,
        style,
        text: formattedCitation,
      },
    ]);
  };

  const handleExportAll = () => {
    if (savedCitations.length === 0) return;
    const text = savedCitations.map((c) => c.text).join("\n\n");
    const blob = new Blob([text], { type: "text/plain" });
    const url = URL.createObjectURL(blob);
    const a = document.createElement("a");
    a.href = url;
    a.download = "studyo-citations.txt";
    document.body.appendChild(a);
    a.click();
    document.body.removeChild(a);
    URL.revokeObjectURL(url);
  };

  const handleRemoveSaved = (id: string) => {
    setSavedCitations((prev) => prev.filter((c) => c.id !== id));
  };

  const handleClearAll = () => {
    setData(createEmptyCitationData(sourceType));
    setSavedCitations([]);
  };

  return (
    <ToolLayout
      title="Citation Generator"
      description="Generate APA 7, MLA 9, IEEE, and Harvard citations for websites, books, and journal articles. Copy-paste ready, 100% free."
      howToSteps={howToSteps}
      features={features}
      faqs={faqs}
      relatedTools={relatedTools}
    >
      {/* Style Selector */}
      <div style={{ marginBottom: "1.5rem" }}>
        <label
          style={{
            display: "block",
            fontSize: "0.9rem",
            fontWeight: 600,
            color: "#374151",
            marginBottom: "0.5rem",
          }}
        >
          Citation Style
        </label>
        <div style={{ display: "flex", gap: "0.5rem", flexWrap: "wrap" }}>
          {CITATION_STYLES.map((s) => (
            <button
              key={s}
              onClick={() => setStyle(s)}
              style={{
                flex: 1,
                minWidth: "100px",
                padding: "0.625rem 0.75rem",
                background: style === s ? "#2563eb" : "white",
                color: style === s ? "white" : "#374151",
                border:
                  style === s ? "1px solid #2563eb" : "1px solid #d1d5db",
                borderRadius: "0.5rem",
                fontSize: "0.9rem",
                fontWeight: 500,
                cursor: "pointer",
                transition: "all 0.2s",
              }}
            >
              {STYLE_LABELS[s]}
            </button>
          ))}
        </div>
      </div>

      {/* Source Type */}
      <div style={{ marginBottom: "1.5rem" }}>
        <label
          style={{
            display: "block",
            fontSize: "0.9rem",
            fontWeight: 600,
            color: "#374151",
            marginBottom: "0.5rem",
          }}
        >
          Source Type
        </label>
        <div style={{ display: "flex", gap: "0.5rem", flexWrap: "wrap" }}>
          {SOURCE_TYPES.map((st) => (
            <button
              key={st.value}
              onClick={() => handleSourceTypeChange(st.value)}
              style={{
                flex: 1,
                minWidth: "100px",
                padding: "0.5rem 0.75rem",
                background: sourceType === st.value ? "#dbeafe" : "white",
                color: sourceType === st.value ? "#1e40af" : "#374151",
                border:
                  sourceType === st.value
                    ? "1px solid #93c5fd"
                    : "1px solid #d1d5db",
                borderRadius: "0.5rem",
                fontSize: "0.9rem",
                fontWeight: 500,
                cursor: "pointer",
              }}
            >
              {st.label}
            </button>
          ))}
        </div>
      </div>

      {/* Form Fields */}
      <div
        style={{
          display: "flex",
          flexDirection: "column",
          gap: "1rem",
          padding: "1.25rem",
          background: "#f9fafb",
          borderRadius: "0.75rem",
          border: "1px solid #e5e7eb",
        }}
      >
        {/* Authors */}
        <div>
          <label
            style={{
              display: "block",
              fontSize: "0.875rem",
              fontWeight: 600,
              color: "#374151",
              marginBottom: "0.5rem",
            }}
          >
            Authors
          </label>
          {data.authors.map((author, index) => (
            <div
              key={index}
              style={{
                display: "flex",
                gap: "0.5rem",
                marginBottom: "0.5rem",
                alignItems: "center",
              }}
            >
              <input
                type="text"
                placeholder="First name"
                value={author.firstName}
                onChange={(e) =>
                  handleAuthorChange(index, "firstName", e.target.value)
                }
                style={{
                  flex: 1,
                  padding: "0.5rem 0.75rem",
                  border: "1px solid #d1d5db",
                  borderRadius: "0.5rem",
                  fontSize: "0.9rem",
                  background: "white",
                }}
              />
              <input
                type="text"
                placeholder="Last name"
                value={author.lastName}
                onChange={(e) =>
                  handleAuthorChange(index, "lastName", e.target.value)
                }
                style={{
                  flex: 1,
                  padding: "0.5rem 0.75rem",
                  border: "1px solid #d1d5db",
                  borderRadius: "0.5rem",
                  fontSize: "0.9rem",
                  background: "white",
                }}
              />
              {data.authors.length > 1 && (
                <button
                  onClick={() => removeAuthor(index)}
                  style={{
                    padding: "0.5rem 0.75rem",
                    background: "transparent",
                    color: "#dc2626",
                    border: "1px solid #fca5a5",
                    borderRadius: "0.5rem",
                    fontSize: "0.9rem",
                    cursor: "pointer",
                  }}
                  aria-label="Remove author"
                >
                  ✕
                </button>
              )}
            </div>
          ))}
          <button
            onClick={addAuthor}
            style={{
              padding: "0.375rem 0.75rem",
              background: "white",
              color: "#2563eb",
              border: "1px dashed #93c5fd",
              borderRadius: "0.5rem",
              fontSize: "0.85rem",
              fontWeight: 500,
              cursor: "pointer",
              marginTop: "0.25rem",
            }}
          >
            + Add Author
          </button>
        </div>

        {/* Title */}
        <div>
          <label
            style={{
              display: "block",
              fontSize: "0.875rem",
              fontWeight: 600,
              color: "#374151",
              marginBottom: "0.25rem",
            }}
          >
            Title
          </label>
          <input
            type="text"
            value={data.title}
            onChange={(e) => handleFieldChange("title", e.target.value)}
            placeholder="Article or book title"
            style={{
              width: "100%",
              padding: "0.5rem 0.75rem",
              border: "1px solid #d1d5db",
              borderRadius: "0.5rem",
              fontSize: "0.9rem",
              background: "white",
            }}
          />
        </div>

        {/* Year */}
        <div>
          <label
            style={{
              display: "block",
              fontSize: "0.875rem",
              fontWeight: 600,
              color: "#374151",
              marginBottom: "0.25rem",
            }}
          >
            Year
          </label>
          <input
            type="text"
            value={data.year}
            onChange={(e) => handleFieldChange("year", e.target.value)}
            placeholder="e.g., 2024"
            style={{
              width: "100%",
              padding: "0.5rem 0.75rem",
              border: "1px solid #d1d5db",
              borderRadius: "0.5rem",
              fontSize: "0.9rem",
              background: "white",
            }}
          />
        </div>

        {/* Website-specific */}
        {data.sourceType === "website" && (
          <>
            <div>
              <label
                style={{
                  display: "block",
                  fontSize: "0.875rem",
                  fontWeight: 600,
                  color: "#374151",
                  marginBottom: "0.25rem",
                }}
              >
                Website Name
              </label>
              <input
                type="text"
                value={data.siteName}
                onChange={(e) => handleFieldChange("siteName", e.target.value)}
                placeholder="e.g., BBC News"
                style={{
                  width: "100%",
                  padding: "0.5rem 0.75rem",
                  border: "1px solid #d1d5db",
                  borderRadius: "0.5rem",
                  fontSize: "0.9rem",
                  background: "white",
                }}
              />
            </div>
            <div>
              <label
                style={{
                  display: "block",
                  fontSize: "0.875rem",
                  fontWeight: 600,
                  color: "#374151",
                  marginBottom: "0.25rem",
                }}
              >
                URL
              </label>
              <input
                type="url"
                value={data.url || ""}
                onChange={(e) => handleFieldChange("url", e.target.value)}
                placeholder="https://example.com/article"
                style={{
                  width: "100%",
                  padding: "0.5rem 0.75rem",
                  border: "1px solid #d1d5db",
                  borderRadius: "0.5rem",
                  fontSize: "0.9rem",
                  background: "white",
                }}
              />
            </div>
            <div>
              <label
                style={{
                  display: "block",
                  fontSize: "0.875rem",
                  fontWeight: 600,
                  color: "#374151",
                  marginBottom: "0.25rem",
                }}
              >
                Access Date (optional)
              </label>
              <input
                type="date"
                value={data.accessDate || ""}
                onChange={(e) => handleFieldChange("accessDate", e.target.value)}
                style={{
                  width: "100%",
                  padding: "0.5rem 0.75rem",
                  border: "1px solid #d1d5db",
                  borderRadius: "0.5rem",
                  fontSize: "0.9rem",
                  background: "white",
                }}
              />
            </div>
          </>
        )}

        {/* Book-specific */}
        {data.sourceType === "book" && (
          <>
            <div>
              <label
                style={{
                  display: "block",
                  fontSize: "0.875rem",
                  fontWeight: 600,
                  color: "#374151",
                  marginBottom: "0.25rem",
                }}
              >
                Publisher
              </label>
              <input
                type="text"
                value={data.publisher}
                onChange={(e) => handleFieldChange("publisher", e.target.value)}
                placeholder="e.g., Oxford University Press"
                style={{
                  width: "100%",
                  padding: "0.5rem 0.75rem",
                  border: "1px solid #d1d5db",
                  borderRadius: "0.5rem",
                  fontSize: "0.9rem",
                  background: "white",
                }}
              />
            </div>
            <div>
              <label
                style={{
                  display: "block",
                  fontSize: "0.875rem",
                  fontWeight: 600,
                  color: "#374151",
                  marginBottom: "0.25rem",
                }}
              >
                City (optional)
              </label>
              <input
                type="text"
                value={data.city || ""}
                onChange={(e) => handleFieldChange("city", e.target.value)}
                placeholder="e.g., Lahore"
                style={{
                  width: "100%",
                  padding: "0.5rem 0.75rem",
                  border: "1px solid #d1d5db",
                  borderRadius: "0.5rem",
                  fontSize: "0.9rem",
                  background: "white",
                }}
              />
            </div>
            <div>
              <label
                style={{
                  display: "block",
                  fontSize: "0.875rem",
                  fontWeight: 600,
                  color: "#374151",
                  marginBottom: "0.25rem",
                }}
              >
                Edition (optional)
              </label>
              <input
                type="text"
                value={data.edition || ""}
                onChange={(e) => handleFieldChange("edition", e.target.value)}
                placeholder="e.g., 2nd"
                style={{
                  width: "100%",
                  padding: "0.5rem 0.75rem",
                  border: "1px solid #d1d5db",
                  borderRadius: "0.5rem",
                  fontSize: "0.9rem",
                  background: "white",
                }}
              />
            </div>
          </>
        )}

        {/* Journal-specific */}
        {data.sourceType === "journal" && (
          <>
            <div>
              <label
                style={{
                  display: "block",
                  fontSize: "0.875rem",
                  fontWeight: 600,
                  color: "#374151",
                  marginBottom: "0.25rem",
                }}
              >
                Journal Name
              </label>
              <input
                type="text"
                value={data.journalName}
                onChange={(e) => handleFieldChange("journalName", e.target.value)}
                placeholder="e.g., Nature"
                style={{
                  width: "100%",
                  padding: "0.5rem 0.75rem",
                  border: "1px solid #d1d5db",
                  borderRadius: "0.5rem",
                  fontSize: "0.9rem",
                  background: "white",
                }}
              />
            </div>
            <div style={{ display: "flex", gap: "0.5rem", flexWrap: "wrap" }}>
              <div style={{ flex: 1, minWidth: "80px" }}>
                <label
                  style={{
                    display: "block",
                    fontSize: "0.875rem",
                    fontWeight: 600,
                    color: "#374151",
                    marginBottom: "0.25rem",
                  }}
                >
                  Volume
                </label>
                <input
                  type="text"
                  value={data.volume || ""}
                  onChange={(e) => handleFieldChange("volume", e.target.value)}
                  placeholder="12"
                  style={{
                    width: "100%",
                    padding: "0.5rem 0.75rem",
                    border: "1px solid #d1d5db",
                    borderRadius: "0.5rem",
                    fontSize: "0.9rem",
                    background: "white",
                  }}
                />
              </div>
              <div style={{ flex: 1, minWidth: "80px" }}>
                <label
                  style={{
                    display: "block",
                    fontSize: "0.875rem",
                    fontWeight: 600,
                    color: "#374151",
                    marginBottom: "0.25rem",
                  }}
                >
                  Issue
                </label>
                <input
                  type="text"
                  value={data.issue || ""}
                  onChange={(e) => handleFieldChange("issue", e.target.value)}
                  placeholder="3"
                  style={{
                    width: "100%",
                    padding: "0.5rem 0.75rem",
                    border: "1px solid #d1d5db",
                    borderRadius: "0.5rem",
                    fontSize: "0.9rem",
                    background: "white",
                  }}
                />
              </div>
              <div style={{ flex: 1, minWidth: "100px" }}>
                <label
                  style={{
                    display: "block",
                    fontSize: "0.875rem",
                    fontWeight: 600,
                    color: "#374151",
                    marginBottom: "0.25rem",
                  }}
                >
                  Pages
                </label>
                <input
                  type="text"
                  value={data.pages || ""}
                  onChange={(e) => handleFieldChange("pages", e.target.value)}
                  placeholder="45-67"
                  style={{
                    width: "100%",
                    padding: "0.5rem 0.75rem",
                    border: "1px solid #d1d5db",
                    borderRadius: "0.5rem",
                    fontSize: "0.9rem",
                    background: "white",
                  }}
                />
              </div>
            </div>
            <div>
              <label
                style={{
                  display: "block",
                  fontSize: "0.875rem",
                  fontWeight: 600,
                  color: "#374151",
                  marginBottom: "0.25rem",
                }}
              >
                DOI (optional)
              </label>
              <input
                type="text"
                value={data.doi || ""}
                onChange={(e) => handleFieldChange("doi", e.target.value)}
                placeholder="10.1038/s41586-021-03819-2"
                style={{
                  width: "100%",
                  padding: "0.5rem 0.75rem",
                  border: "1px solid #d1d5db",
                  borderRadius: "0.5rem",
                  fontSize: "0.9rem",
                  background: "white",
                }}
              />
            </div>
          </>
        )}
      </div>

      {/* Preview */}
      {formattedCitation && (
        <div
          style={{
            marginTop: "1.5rem",
            padding: "1.25rem",
            background: "#f0fdf4",
            border: "1px solid #86efac",
            borderRadius: "0.75rem",
          }}
        >
          <h3
            style={{
              fontSize: "1rem",
              fontWeight: 700,
              color: "#166534",
              marginBottom: "0.75rem",
            }}
          >
            📝 Your Citation ({STYLE_LABELS[style]})
          </h3>
          <p
            style={{
              fontSize: "0.95rem",
              color: "#111827",
              lineHeight: 1.7,
              padding: "1rem",
              background: "white",
              borderRadius: "0.5rem",
              border: "1px solid #d1fae5",
              fontFamily: "Georgia, serif",
            }}
          >
            {formattedCitation}
          </p>
          <div
            style={{
              marginTop: "1rem",
              display: "flex",
              gap: "0.5rem",
              flexWrap: "wrap",
            }}
          >
            <button
              onClick={handleCopy}
              style={{
                padding: "0.5rem 1rem",
                background: copied ? "#16a34a" : "#2563eb",
                color: "white",
                border: "none",
                borderRadius: "0.5rem",
                fontWeight: 500,
                fontSize: "0.9rem",
                cursor: "pointer",
              }}
            >
              {copied ? "✓ Copied!" : "Copy Citation"}
            </button>
            <button
              onClick={handleSave}
              style={{
                padding: "0.5rem 1rem",
                background: "white",
                color: "#16a34a",
                border: "1px solid #86efac",
                borderRadius: "0.5rem",
                fontWeight: 500,
                fontSize: "0.9rem",
                cursor: "pointer",
              }}
            >
              + Save to List
            </button>
            <button
              onClick={handleClearAll}
              style={{
                padding: "0.5rem 1rem",
                background: "white",
                color: "#dc2626",
                border: "1px solid #fca5a5",
                borderRadius: "0.5rem",
                fontWeight: 500,
                fontSize: "0.9rem",
                cursor: "pointer",
              }}
            >
              Clear All
            </button>
          </div>
        </div>
      )}

      {/* Saved Citations */}
      {savedCitations.length > 0 && (
        <div style={{ marginTop: "2rem" }}>
          <div
            style={{
              display: "flex",
              justifyContent: "space-between",
              alignItems: "center",
              marginBottom: "1rem",
              flexWrap: "wrap",
              gap: "0.5rem",
            }}
          >
            <h3
              style={{
                fontSize: "1.05rem",
                fontWeight: 600,
                color: "#111827",
              }}
            >
              Saved Citations ({savedCitations.length})
            </h3>
            <button
              onClick={handleExportAll}
              style={{
                padding: "0.5rem 1rem",
                background: "#2563eb",
                color: "white",
                border: "none",
                borderRadius: "0.5rem",
                fontWeight: 500,
                fontSize: "0.85rem",
                cursor: "pointer",
              }}
            >
              ⬇️ Export All (.txt)
            </button>
          </div>
          <div style={{ display: "flex", flexDirection: "column", gap: "0.75rem" }}>
            {savedCitations.map((c) => (
              <div
                key={c.id}
                style={{
                  padding: "1rem",
                  background: "white",
                  border: "1px solid #e5e7eb",
                  borderRadius: "0.5rem",
                  display: "flex",
                  gap: "0.75rem",
                  alignItems: "flex-start",
                }}
              >
                <div style={{ flex: 1 }}>
                  <span
                    style={{
                      fontSize: "0.75rem",
                      fontWeight: 600,
                      color: "#2563eb",
                      textTransform: "uppercase",
                    }}
                  >
                    {c.style}
                  </span>
                  <p
                    style={{
                      marginTop: "0.25rem",
                      fontSize: "0.9rem",
                      color: "#111827",
                      lineHeight: 1.6,
                      fontFamily: "Georgia, serif",
                    }}
                  >
                    {c.text}
                  </p>
                </div>
                <button
                  onClick={() => handleRemoveSaved(c.id)}
                  style={{
                    padding: "0.25rem 0.5rem",
                    background: "transparent",
                    color: "#dc2626",
                    border: "1px solid #fca5a5",
                    borderRadius: "0.375rem",
                    fontSize: "0.8rem",
                    cursor: "pointer",
                  }}
                  aria-label="Remove citation"
                >
                  ✕
                </button>
              </div>
            ))}
          </div>
        </div>
      )}
    </ToolLayout>
  );
}