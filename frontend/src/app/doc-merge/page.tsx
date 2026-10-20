"use client";

import { useState, useRef } from "react";
import ToolLayout from "@/components/ToolLayout";

const relatedTools = [
  { name: "DOC to PDF", href: "/doc-to-pdf" },
  { name: "PDF Merge", href: "/pdf-merge" },
  { name: "PDF to DOC", href: "/pdf-to-doc" },
];

const howToSteps = [
  "Select or drag & drop two or more .docx files.",
  "Reorder files using the ↑ and ↓ buttons if needed.",
  "Click 'Merge Documents' and wait a few seconds.",
  "Download your merged .docx file.",
];

const features = [
  "Merge up to 10 Word documents (.docx) at once",
  "Preserves text content and basic paragraph structure",
  "Files are processed on our server and deleted instantly",
  "No signup required",
  "Fast and secure merging",
];

const faqs = [
  {
    question: "Is my document safe?",
    answer:
      "Yes. Your files are uploaded securely to our server, merged, and immediately deleted. We do not store or share your documents.",
  },
  {
    question: "Does it preserve formatting?",
    answer:
      "Basic text and paragraph structure are preserved. Complex formatting like specific fonts, images, and tables may not be perfectly merged.",
  },
  {
    question: "What file types are supported?",
    answer: "Currently, we only support .docx files (Microsoft Word 2007 and newer).",
  },
];

export default function DocMergePage() {
  const [files, setFiles] = useState<File[]>([]);
  const [isProcessing, setIsProcessing] = useState(false);
  const [isDragging, setIsDragging] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const fileInputRef = useRef<HTMLInputElement>(null);

  const BACKEND_URL = "https://studyo-6ozz.vercel.app";

  const handleFileSelect = (selectedFiles: FileList | null) => {
    if (!selectedFiles) return;
    
    const newFiles = Array.from(selectedFiles).filter(
      (f) => f.name.toLowerCase().endsWith(".docx")
    );

    if (newFiles.length !== selectedFiles.length) {
      setError("Only .docx files are allowed. Some files were skipped.");
    } else {
      setError(null);
    }

    setFiles((prev) => [...prev, ...newFiles].slice(0, 10)); // Max 10 files
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
  };

  const removeFile = (index: number) => {
    setFiles((prev) => prev.filter((_, i) => i !== index));
  };

  const handleMerge = async () => {
    if (files.length < 2) {
      setError("Please select at least 2 files to merge.");
      return;
    }
    setIsProcessing(true);
    setError(null);

    try {
      const formData = new FormData();
      files.forEach((file) => {
        formData.append("files", file);
      });

      const response = await fetch(`${BACKEND_URL}/api/doc-merge`, {
        method: "POST",
        body: formData,
      });

      if (!response.ok) {
        const errorData = await response.json().catch(() => ({}));
        throw new Error(
          errorData.error || "Failed to merge documents. Please try again."
        );
      }

      const blob = await response.blob();
      const url = URL.createObjectURL(blob);
      const a = document.createElement("a");
      a.href = url;
      a.download = "merged.docx";
      document.body.appendChild(a);
      a.click();
      document.body.removeChild(a);
      URL.revokeObjectURL(url);

      // Reset
      setFiles([]);
      if (fileInputRef.current) fileInputRef.current.value = "";

    } catch (err) {
      console.error("Merge error:", err);
      setError(
        err instanceof Error ? err.message : "Something went wrong. Try again."
      );
    } finally {
      setIsProcessing(false);
    }
  };

  return (
    <ToolLayout
      title="DOC File Merger"
      description="Combine multiple Microsoft Word documents (.docx) into one file quickly and for free. Files are processed securely."
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
            ? "Drop .docx files here"
            : "Drag & drop .docx files or click to select"}
        </p>
        <p style={{ marginTop: "0.25rem", fontSize: "0.85rem", color: "#6b7280" }}>
          Microsoft Word (.docx) — Max 10 files (10 MB each)
        </p>
        <input
          ref={fileInputRef}
          type="file"
          accept=".docx,application/vnd.openxmlformats-officedocument.wordprocessingml.document"
          multiple
          onChange={(e) => handleFileSelect(e.target.files)}
          style={{ display: "none" }}
        />
      </div>

      {/* Error */}
      {error && (
        <div
          style={{
            marginTop: "1rem",
            padding: "0.75rem 1rem",
            background: "#fee2e2",
            border: "1px solid #fca5a5",
            borderRadius: "0.5rem",
            color: "#991b1b",
            fontSize: "0.9rem",
          }}
        >
          {error}
        </div>
      )}

      {/* Files List */}
      {files.length > 0 && (
        <div style={{ marginTop: "1.5rem" }}>
          <div
            style={{
              display: "flex",
              justifyContent: "space-between",
              alignItems: "center",
              marginBottom: "0.75rem",
            }}
          >
            <h3 style={{ fontSize: "1.05rem", fontWeight: 600, color: "#111827" }}>
              Files ({files.length}/10)
            </h3>
            <button
              onClick={() => setFiles([])}
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
                  {(file.size / 1024).toFixed(1)} KB
                </span>
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
                >
                  ↑
                </button>
                <button
                  onClick={() => moveFile(index, "down")}
                  disabled={index === files.length - 1}
                  style={{
                    padding: "0.25rem 0.5rem",
                    background: "white",
                    border: "1px solid #d1d5db",
                    borderRadius: "0.375rem",
                    fontSize: "0.8rem",
                    cursor: index === files.length - 1 ? "not-allowed" : "pointer",
                    opacity: index === files.length - 1 ? 0.4 : 1,
                  }}
                >
                  ↓
                </button>
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
                >
                  ✕
                </button>
              </div>
            ))}
          </div>

          {/* Merge Button */}
          <button
            onClick={handleMerge}
            disabled={isProcessing || files.length < 2}
            style={{
              marginTop: "1.25rem",
              padding: "0.75rem 1.5rem",
              width: "100%",
              background: isProcessing || files.length < 2 ? "#93c5fd" : "#2563eb",
              color: "white",
              border: "none",
              borderRadius: "0.5rem",
              fontWeight: 600,
              fontSize: "1rem",
              cursor: isProcessing || files.length < 2 ? "not-allowed" : "pointer",
            }}
          >
            {isProcessing ? "Merging..." : `Merge ${files.length} Documents`}
          </button>
        </div>
      )}
    </ToolLayout>
  );
}