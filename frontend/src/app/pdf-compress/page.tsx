"use client";

import { useState, useRef } from "react";
import ToolLayout from "@/components/ToolLayout";
import {
  compressPdf,
  formatFileSize,
  downloadPdf,
  COMPRESSION_PRESETS,
  type CompressionLevel,
  type CompressedPdfResult,
} from "@/lib/pdf/compressor";

const relatedTools = [
  { name: "PDF Merge", href: "/pdf-merge" },
  { name: "Image Compressor", href: "/image-compressor" },
  { name: "Word Counter", href: "/word-counter" },
];

const howToSteps = [
  "Select a PDF file (drag & drop or click to browse).",
  "Choose compression level — Low, Medium, or High.",
  "Click Compress PDF and wait for processing.",
  "Download your compressed PDF file.",
];

const features = [
  "Compress PDF files in your browser",
  "Three compression levels (Low, Medium, High)",
  "Before/After size comparison",
  "100% browser-based — files never leave your device",
  "No signup, no watermark, no file size limits",
  "Works on mobile and desktop",
];

const faqs = [
  {
    question: "Are my PDF files uploaded to a server?",
    answer:
      "No. All compression happens in your browser. Your files never leave your device.",
  },
  {
    question: "How much can I compress my PDF?",
    answer:
      "Results depend on the PDF content. Image-heavy PDFs compress more. Browser-based compression is limited — we're adding server-side compression (Ghostscript) in Phase 2 for better results.",
  },
  {
    question: "Will the quality be reduced?",
    answer:
      "Low compression preserves quality best. High compression reduces file size more but may lower image quality slightly.",
  },
  {
    question: "Is there a file size limit?",
    answer:
      "No hard limit, but we recommend files under 50 MB for smooth performance on mobile devices.",
  },
];

export default function PdfCompressPage() {
  const [file, setFile] = useState<File | null>(null);
  const [level, setLevel] = useState<CompressionLevel>("medium");
  const [isProcessing, setIsProcessing] = useState(false);
  const [result, setResult] = useState<CompressedPdfResult | null>(null);
  const [isDragging, setIsDragging] = useState(false);
  const fileInputRef = useRef<HTMLInputElement>(null);

  const handleFileSelect = (selectedFiles: FileList | null) => {
    if (!selectedFiles || selectedFiles.length === 0) return;
    const f = selectedFiles[0];
    if (
      f.type !== "application/pdf" &&
      !f.name.toLowerCase().endsWith(".pdf")
    ) {
      alert("Please select a PDF file.");
      return;
    }
    setFile(f);
    setResult(null);
  };

  const handleDrop = (e: React.DragEvent) => {
    e.preventDefault();
    setIsDragging(false);
    handleFileSelect(e.dataTransfer.files);
  };

  const handleDragOver = (e: React.DragEvent) => {
    e.preventDefault();
    setIsDragging(true);
  };

  const handleDragLeave = () => {
    setIsDragging(false);
  };

  const handleCompress = async () => {
    if (!file) return;
    setIsProcessing(true);
    setResult(null);

    try {
      const settings = COMPRESSION_PRESETS[level];
      const res = await compressPdf(file, settings);
      setResult(res);
    } catch (err) {
      console.error("Compression failed:", err);
      alert(
        "PDF compression failed. Make sure the file is a valid PDF and not corrupted."
      );
    } finally {
      setIsProcessing(false);
    }
  };

  const handleDownload = () => {
    if (!result || !file) return;
    const newName = file.name.replace(/\.pdf$/i, "-compressed.pdf");
    downloadPdf(result.compressedBlob, newName);
  };

  const handleClear = () => {
    setFile(null);
    setResult(null);
  };

  return (
    <ToolLayout
      title="PDF Compress"
      description="Reduce PDF file size in your browser. Three compression levels — Low, Medium, High. No uploads, no signup."
      howToSteps={howToSteps}
      features={features}
      faqs={faqs}
      relatedTools={relatedTools}
    >
      {/* Upload Area */}
      <div
        onDrop={handleDrop}
        onDragOver={handleDragOver}
        onDragLeave={handleDragLeave}
        onClick={() => fileInputRef.current?.click()}
        style={{
          border: isDragging ? "2px dashed #2563eb" : "2px dashed #d1d5db",
          background: isDragging ? "#eff6ff" : "#f9fafb",
          borderRadius: "0.75rem",
          padding: "2.5rem 1rem",
          textAlign: "center",
          cursor: "pointer",
          transition: "all 0.2s",
        }}
      >
        <div style={{ fontSize: "2.5rem" }}>🗜️</div>
        <p
          style={{
            marginTop: "0.75rem",
            fontSize: "1rem",
            fontWeight: 500,
            color: "#374151",
          }}
        >
          {isDragging
            ? "Drop PDF here"
            : "Drag & drop a PDF or click to select"}
        </p>
        <p
          style={{
            marginTop: "0.25rem",
            fontSize: "0.85rem",
            color: "#6b7280",
          }}
        >
          Single PDF file
        </p>
        <input
          ref={fileInputRef}
          type="file"
          accept="application/pdf,.pdf"
          onChange={(e) => handleFileSelect(e.target.files)}
          style={{ display: "none" }}
        />
      </div>

      {/* Selected File */}
      {file && (
        <div
          style={{
            marginTop: "1.5rem",
            padding: "1rem",
            background: "#f9fafb",
            border: "1px solid #e5e7eb",
            borderRadius: "0.5rem",
            display: "flex",
            justifyContent: "space-between",
            alignItems: "center",
            gap: "0.75rem",
            flexWrap: "wrap",
          }}
        >
          <div style={{ flex: 1, minWidth: "200px" }}>
            <p
              style={{
                fontSize: "0.95rem",
                fontWeight: 500,
                color: "#111827",
                wordBreak: "break-all",
              }}
            >
              📄 {file.name}
            </p>
            <p
              style={{
                fontSize: "0.8rem",
                color: "#6b7280",
                marginTop: "0.25rem",
              }}
            >
              {formatFileSize(file.size)}
            </p>
          </div>
          <button
            onClick={handleClear}
            disabled={isProcessing}
            style={{
              padding: "0.375rem 0.75rem",
              background: "transparent",
              color: "#dc2626",
              border: "1px solid #fca5a5",
              borderRadius: "0.375rem",
              fontSize: "0.85rem",
              cursor: isProcessing ? "not-allowed" : "pointer",
              fontWeight: 500,
            }}
          >
            Remove
          </button>
        </div>
      )}

      {/* Compression Level */}
      {file && (
        <div style={{ marginTop: "1.5rem" }}>
          <label
            style={{
              display: "block",
              fontSize: "0.9rem",
              fontWeight: 600,
              color: "#374151",
              marginBottom: "0.75rem",
            }}
          >
            Compression Level
          </label>
          <div style={{ display: "flex", gap: "0.5rem", flexWrap: "wrap" }}>
            {(["low", "medium", "high"] as CompressionLevel[]).map((lvl) => (
              <button
                key={lvl}
                onClick={() => setLevel(lvl)}
                style={{
                  flex: 1,
                  minWidth: "100px",
                  padding: "0.75rem",
                  background: level === lvl ? "#2563eb" : "white",
                  color: level === lvl ? "white" : "#374151",
                  border:
                    level === lvl
                      ? "1px solid #2563eb"
                      : "1px solid #d1d5db",
                  borderRadius: "0.5rem",
                  fontSize: "0.9rem",
                  fontWeight: 500,
                  cursor: "pointer",
                  textTransform: "capitalize",
                  transition: "all 0.2s",
                }}
              >
                {lvl}
              </button>
            ))}
          </div>
          <p
            style={{
              marginTop: "0.5rem",
              fontSize: "0.8rem",
              color: "#6b7280",
            }}
          >
            {level === "low" &&
              "Preserves quality best — smaller size reduction."}
            {level === "medium" &&
              "Balanced — good size reduction without visible quality loss."}
            {level === "high" &&
              "Maximum size reduction — may reduce image quality slightly."}
          </p>

          {/* Compress Button */}
          <button
            onClick={handleCompress}
            disabled={isProcessing}
            style={{
              marginTop: "1.25rem",
              padding: "0.75rem 1.5rem",
              width: "100%",
              background: isProcessing ? "#93c5fd" : "#2563eb",
              color: "white",
              border: "none",
              borderRadius: "0.5rem",
              fontWeight: 600,
              fontSize: "1rem",
              cursor: isProcessing ? "not-allowed" : "pointer",
            }}
          >
            {isProcessing ? "Compressing..." : "Compress PDF"}
          </button>
        </div>
      )}

      {/* Result */}
      {result && (
        <div
          style={{
            marginTop: "2rem",
            padding: "1.5rem",
            background: "#f0fdf4",
            border: "1px solid #86efac",
            borderRadius: "0.75rem",
          }}
        >
          <h3
            style={{
              fontSize: "1.1rem",
              fontWeight: 700,
              color: "#166534",
              marginBottom: "1rem",
            }}
          >
            ✅ PDF Compressed Successfully!
          </h3>

          <div
            style={{
              display: "grid",
              gridTemplateColumns: "repeat(auto-fit, minmax(140px, 1fr))",
              gap: "0.75rem",
              marginBottom: "1rem",
            }}
          >
            <StatBox
              label="Original Size"
              value={formatFileSize(result.originalSize)}
            />
            <StatBox
              label="Compressed Size"
              value={formatFileSize(result.compressedSize)}
            />
            <StatBox
              label="Savings"
              value={`${result.savings}%`}
              highlight
            />
            <StatBox label="Pages" value={`${result.pageCount}`} />
          </div>

          {result.savings <= 5 && (
            <p
              style={{
                fontSize: "0.8rem",
                color: "#92400e",
                background: "#fef3c7",
                padding: "0.75rem",
                borderRadius: "0.5rem",
                marginBottom: "1rem",
                lineHeight: 1.5,
              }}
            >
              ⚠️ <strong>Note:</strong> Is PDF mein zyada compression nahi hui
              kyunke ye text-based hai. Server-side compression (Ghostscript)
              Phase 2 mein aayega — jo zyada behtar result dega.
            </p>
          )}

          <button
            onClick={handleDownload}
            style={{
              padding: "0.75rem 1.5rem",
              background: "#16a34a",
              color: "white",
              border: "none",
              borderRadius: "0.5rem",
              fontWeight: 600,
              fontSize: "0.95rem",
              cursor: "pointer",
            }}
          >
            ⬇️ Download Compressed PDF
          </button>
        </div>
      )}
    </ToolLayout>
  );
}

/* Stat Box */
function StatBox({
  label,
  value,
  highlight,
}: {
  label: string;
  value: string;
  highlight?: boolean;
}) {
  return (
    <div
      style={{
        background: "white",
        padding: "0.875rem",
        borderRadius: "0.5rem",
        border: `1px solid ${highlight ? "#86efac" : "#d1fae5"}`,
        textAlign: "center",
      }}
    >
      <div
        style={{
          fontSize: "0.7rem",
          color: "#6b7280",
          fontWeight: 600,
          textTransform: "uppercase",
          letterSpacing: "0.05em",
        }}
      >
        {label}
      </div>
      <div
        style={{
          marginTop: "0.25rem",
          fontSize: "1.15rem",
          fontWeight: "bold",
          color: highlight ? "#16a34a" : "#166534",
        }}
      >
        {value}
      </div>
    </div>
  );
}