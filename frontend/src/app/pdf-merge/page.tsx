"use client";

import { useState, useRef } from "react";
import ToolLayout from "@/components/ToolLayout";
import {
  mergePdfs,
  formatFileSize,
  downloadPdf,
} from "@/lib/pdf/merger";

const relatedTools = [
  { name: "PDF Compress", href: "/pdf-compress" },
  { name: "Word Counter", href: "/word-counter" },
  { name: "Image Compressor", href: "/image-compressor" },
];

const howToSteps = [
  "Drag and drop or click to select multiple PDF files.",
  "Reorder files using the ↑ and ↓ buttons if needed.",
  "Click Merge PDFs to combine all files into one.",
  "Download your merged PDF file.",
];

const features = [
  "Merge unlimited PDF files for free",
  "Drag & drop interface",
  "Reorder pages before merging",
  "100% browser-based — files never leave your device",
  "No signup, no watermark, no file size limits",
  "Works on mobile and desktop",
];

const faqs = [
  {
    question: "Are my PDF files uploaded to a server?",
    answer:
      "No. All merging happens in your browser using pdf-lib. Your files never leave your device.",
  },
  {
    question: "Is there a file size limit?",
    answer:
      "No hard limit, but we recommend files under 50 MB each for smooth performance on mobile devices.",
  },
  {
    question: "Can I merge password-protected PDFs?",
    answer:
      "We try to handle most password-protected PDFs, but heavily encrypted files may fail. Try removing the password first.",
  },
  {
    question: "Does it work on mobile?",
    answer:
      "Yes, Studyo PDF Merge works on all modern browsers — Chrome, Safari, Firefox, and Samsung Internet.",
  },
];

export default function PdfMergePage() {
  const [files, setFiles] = useState<File[]>([]);
  const [isMerging, setIsMerging] = useState(false);
  const [isDragging, setIsDragging] = useState(false);
  const [mergedResult, setMergedResult] = useState<{
    blob: Blob;
    pageCount: number;
    fileName: string;
  } | null>(null);
  const fileInputRef = useRef<HTMLInputElement>(null);

  const handleFileSelect = (selectedFiles: FileList | null) => {
    if (!selectedFiles) return;
    const pdfFiles = Array.from(selectedFiles).filter(
      (f) => f.type === "application/pdf" || f.name.toLowerCase().endsWith(".pdf")
    );
    setFiles((prev) => [...prev, ...pdfFiles]);
    setMergedResult(null);
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

  const moveFile = (index: number, direction: "up" | "down") => {
    const newFiles = [...files];
    const targetIndex = direction === "up" ? index - 1 : index + 1;
    if (targetIndex < 0 || targetIndex >= files.length) return;
    [newFiles[index], newFiles[targetIndex]] = [
      newFiles[targetIndex],
      newFiles[index],
    ];
    setFiles(newFiles);
    setMergedResult(null);
  };

  const removeFile = (index: number) => {
    setFiles((prev) => prev.filter((_, i) => i !== index));
    setMergedResult(null);
  };

  const handleClearAll = () => {
    setFiles([]);
    setMergedResult(null);
  };

  const handleMerge = async () => {
    if (files.length < 1) return;
    setIsMerging(true);
    setMergedResult(null);

    try {
      const result = await mergePdfs(files);
      setMergedResult({
        blob: result.mergedBlob,
        pageCount: result.pageCount,
        fileName: result.fileName,
      });
    } catch (err) {
      console.error("Merge failed:", err);
      alert(
        "PDF merge failed. Make sure the files are valid PDFs and not corrupted."
      );
    } finally {
      setIsMerging(false);
    }
  };

  const handleDownload = () => {
    if (!mergedResult) return;
    downloadPdf(mergedResult.blob, mergedResult.fileName);
  };

  const totalSize = files.reduce((sum, f) => sum + f.size, 0);

  return (
    <ToolLayout
      title="PDF Merge"
      description="Combine multiple PDF files into one. Drag, drop, reorder, and download — all in your browser. No uploads, no signup."
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
        <div style={{ fontSize: "2.5rem" }}>📄</div>
        <p
          style={{
            marginTop: "0.75rem",
            fontSize: "1rem",
            fontWeight: 500,
            color: "#374151",
          }}
        >
          {isDragging
            ? "Drop PDFs here"
            : "Drag & drop PDFs or click to select"}
        </p>
        <p
          style={{
            marginTop: "0.25rem",
            fontSize: "0.85rem",
            color: "#6b7280",
          }}
        >
          Multiple PDF files supported
        </p>
        <input
          ref={fileInputRef}
          type="file"
          accept="application/pdf,.pdf"
          multiple
          onChange={(e) => handleFileSelect(e.target.files)}
          style={{ display: "none" }}
        />
      </div>

      {/* Files List */}
      {files.length > 0 && (
        <div style={{ marginTop: "1.5rem" }}>
          <div
            style={{
              display: "flex",
              justifyContent: "space-between",
              alignItems: "center",
              marginBottom: "0.75rem",
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
              Files ({files.length}) — {formatFileSize(totalSize)}
            </h3>
            <button
              onClick={handleClearAll}
              style={{
                padding: "0.375rem 0.75rem",
                background: "transparent",
                color: "#dc2626",
                border: "1px solid #fca5a5",
                borderRadius: "0.375rem",
                fontSize: "0.85rem",
                cursor: "pointer",
                fontWeight: 500,
              }}
            >
              Clear All
            </button>
          </div>

          <div style={{ display: "flex", flexDirection: "column", gap: "0.5rem" }}>
            {files.map((file, index) => (
              <div
                key={`${file.name}-${index}`}
                style={{
                  display: "flex",
                  alignItems: "center",
                  gap: "0.5rem",
                  padding: "0.75rem",
                  background: "#f9fafb",
                  border: "1px solid #e5e7eb",
                  borderRadius: "0.5rem",
                  flexWrap: "wrap",
                }}
              >
                <span
                  style={{
                    display: "inline-flex",
                    alignItems: "center",
                    justifyContent: "center",
                    width: "24px",
                    height: "24px",
                    borderRadius: "9999px",
                    background: "#dbeafe",
                    color: "#2563eb",
                    fontSize: "0.75rem",
                    fontWeight: 700,
                    flexShrink: 0,
                  }}
                >
                  {index + 1}
                </span>
                <span
                  style={{
                    flex: 1,
                    minWidth: "150px",
                    fontSize: "0.9rem",
                    color: "#111827",
                    overflow: "hidden",
                    textOverflow: "ellipsis",
                    whiteSpace: "nowrap",
                  }}
                >
                  {file.name}
                </span>
                <span style={{ fontSize: "0.8rem", color: "#6b7280" }}>
                  {formatFileSize(file.size)}
                </span>

                {/* Move Up */}
                <button
                  onClick={() => moveFile(index, "up")}
                  disabled={index === 0}
                  style={{
                    padding: "0.25rem 0.5rem",
                    background: "white",
                    border: "1px solid #d1d5db",
                    borderRadius: "0.375rem",
                    fontSize: "0.8rem",
                    cursor: index === 0 ? "not-allowed" : "pointer",
                    opacity: index === 0 ? 0.4 : 1,
                  }}
                  aria-label="Move up"
                >
                  ↑
                </button>

                {/* Move Down */}
                <button
                  onClick={() => moveFile(index, "down")}
                  disabled={index === files.length - 1}
                  style={{
                    padding: "0.25rem 0.5rem",
                    background: "white",
                    border: "1px solid #d1d5db",
                    borderRadius: "0.375rem",
                    fontSize: "0.8rem",
                    cursor:
                      index === files.length - 1 ? "not-allowed" : "pointer",
                    opacity: index === files.length - 1 ? 0.4 : 1,
                  }}
                  aria-label="Move down"
                >
                  ↓
                </button>

                {/* Remove */}
                <button
                  onClick={() => removeFile(index)}
                  style={{
                    padding: "0.25rem 0.5rem",
                    background: "transparent",
                    color: "#dc2626",
                    border: "1px solid #fca5a5",
                    borderRadius: "0.375rem",
                    fontSize: "0.8rem",
                    cursor: "pointer",
                  }}
                  aria-label="Remove file"
                >
                  ✕
                </button>
              </div>
            ))}
          </div>

          {/* Merge Button */}
          <button
            onClick={handleMerge}
            disabled={isMerging || files.length < 1}
            style={{
              marginTop: "1.25rem",
              padding: "0.75rem 1.5rem",
              width: "100%",
              background: isMerging ? "#93c5fd" : "#2563eb",
              color: "white",
              border: "none",
              borderRadius: "0.5rem",
              fontWeight: 600,
              fontSize: "1rem",
              cursor: isMerging ? "not-allowed" : "pointer",
              transition: "background 0.2s",
            }}
          >
            {isMerging
              ? "Merging..."
              : `Merge ${files.length} PDF${files.length > 1 ? "s" : ""}`}
          </button>
        </div>
      )}

      {/* Merged Result */}
      {mergedResult && (
        <div
          style={{
            marginTop: "2rem",
            padding: "1.25rem",
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
              marginBottom: "0.5rem",
            }}
          >
            ✅ PDF Merged Successfully!
          </h3>
          <p
            style={{
              fontSize: "0.9rem",
              color: "#166534",
              marginBottom: "1rem",
            }}
          >
            <strong>{mergedResult.pageCount}</strong> pages •{" "}
            <strong>{formatFileSize(mergedResult.blob.size)}</strong>
          </p>
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
            ⬇️ Download Merged PDF
          </button>
        </div>
      )}
    </ToolLayout>
  );
}