"use client";

import { useState, useRef } from "react";
import ToolLayout from "@/components/ToolLayout";

const relatedTools = [
  { name: "DOC to PDF", href: "/doc-to-pdf" },
  { name: "PDF Merge", href: "/pdf-merge" },
  { name: "PDF Compress", href: "/pdf-compress" },
];

const howToSteps = [
  "Select or drag & drop your PDF file.",
  "Click 'Convert to DOC' and wait a few seconds.",
  "Download your converted Word document (.docx).",
];

const features = [
  "Convert PDF documents to editable Word (.docx) files",
  "Extracts text content from PDF",
  "Files are processed on our server and deleted instantly",
  "No signup required",
  "Fast and secure conversion",
];

const faqs = [
  {
    question: "Is my document safe?",
    answer:
      "Yes. Your file is uploaded securely to our server, converted, and immediately deleted. We do not store or share your documents.",
  },
  {
    question: "Does it preserve formatting?",
    answer:
      "This tool extracts text content and basic paragraph structure. Complex formatting like images, tables, and custom fonts may not be perfectly preserved.",
  },
  {
    question: "What file types are supported?",
    answer:
      "Currently, we support .pdf files. Scanned PDFs (images only) may not convert properly as they contain no extractable text.",
  },
];

export default function PdfToDocPage() {
  const [file, setFile] = useState<File | null>(null);
  const [isProcessing, setIsProcessing] = useState(false);
  const [isDragging, setIsDragging] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const fileInputRef = useRef<HTMLInputElement>(null);

  // Backend URL
  const BACKEND_URL = "https://studyo-6ozz.vercel.app";

  const handleFileSelect = (selectedFiles: FileList | null) => {
    if (!selectedFiles || selectedFiles.length === 0) return;
    const f = selectedFiles[0];
    if (!f.name.toLowerCase().endsWith(".pdf")) {
      setError("Please select a .pdf file.");
      return;
    }
    setFile(f);
    setError(null);
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

  const handleConvert = async () => {
    if (!file) return;
    setIsProcessing(true);
    setError(null);

    try {
      const formData = new FormData();
      formData.append("file", file);

      const response = await fetch(`${BACKEND_URL}/api/pdf-to-doc`, {
        method: "POST",
        body: formData,
      });

      if (!response.ok) {
        const errorData = await response.json().catch(() => ({}));
        throw new Error(
          errorData.error || "Failed to convert PDF. Please try again."
        );
      }

      // Get DOCX blob
      const blob = await response.blob();

      // Trigger download
      const url = URL.createObjectURL(blob);
      const a = document.createElement("a");
      a.href = url;
      a.download = file.name.replace(/\.pdf$/i, ".docx");
      document.body.appendChild(a);
      a.click();
      document.body.removeChild(a);
      URL.revokeObjectURL(url);

      // Reset
      setFile(null);
      if (fileInputRef.current) fileInputRef.current.value = "";
    } catch (err) {
      console.error("Conversion error:", err);
      setError(
        err instanceof Error ? err.message : "Something went wrong. Try again."
      );
    } finally {
      setIsProcessing(false);
    }
  };

  const handleClear = () => {
    setFile(null);
    setError(null);
    if (fileInputRef.current) fileInputRef.current.value = "";
  };

  return (
    <ToolLayout
      title="PDF to DOC Converter"
      description="Convert PDF documents to editable Word (.docx) files quickly and for free. Files are processed securely and deleted instantly."
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
            ? "Drop .pdf file here"
            : "Drag & drop a .pdf file or click to select"}
        </p>
        <p style={{ marginTop: "0.25rem", fontSize: "0.85rem", color: "#6b7280" }}>
          PDF Document — Max 10 MB
        </p>
        <input
          ref={fileInputRef}
          type="file"
          accept=".pdf,application/pdf"
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
              {(file.size / 1024).toFixed(1)} KB
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

      {/* Convert Button */}
      {file && (
        <button
          onClick={handleConvert}
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
          {isProcessing ? "Converting... Please wait" : "Convert to DOC"}
        </button>
      )}
    </ToolLayout>
  );
}