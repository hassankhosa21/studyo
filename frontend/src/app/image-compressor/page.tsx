"use client";

import { useState, useRef } from "react";
import ToolLayout from "@/components/ToolLayout";
import {
  compressImage,
  formatFileSize,
  downloadFile,
  PRESETS,
  PresetKey,
  CompressedResult,
} from "@/lib/image/compressor";
import { downloadAsZip, buildCompressedName } from "@/lib/image/zipper";

const relatedTools = [
  { name: "PDF Merge", href: "/pdf-merge" },
  { name: "PDF Compress", href: "/pdf-compress" },
  { name: "Word Counter", href: "/word-counter" },
];

const howToSteps = [
  "Drag and drop images or click to select (JPG, PNG, WebP).",
  "Choose a preset (Passport, CNIC, Web) or set custom quality.",
  "Click Compress to process all images in your browser.",
  "Download individual images or all as a ZIP file.",
];

const features = [
  "Compress JPG, PNG, and WebP images",
  "Passport, CNIC, and form photo presets",
  "Bulk upload and ZIP download",
  "Quality slider and target size control",
  "100% browser-based — your files never leave your device",
  "Free, no signup, no watermark",
];

const faqs = [
  {
    question: "Are my images uploaded to a server?",
    answer:
      "No. All compression happens directly in your browser. Your images never leave your device.",
  },
  {
    question: "Which image formats are supported?",
    answer:
      "JPG, JPEG, PNG, and WebP. The compressed output will be in JPG format for best compression.",
  },
  {
    question: "Can I compress multiple images at once?",
    answer:
      "Yes, you can upload multiple images and download them all as a ZIP file.",
  },
  {
    question: "What's the maximum file size?",
    answer:
      "We recommend images under 20 MB each for best performance. Larger images may take longer.",
  },
];

export default function ImageCompressorPage() {
  const [files, setFiles] = useState<File[]>([]);
  const [results, setResults] = useState<CompressedResult[]>([]);
  const [isProcessing, setIsProcessing] = useState(false);
  const [preset, setPreset] = useState<PresetKey>("web");
  const [quality, setQuality] = useState(0.8);
  const [maxWidth, setMaxWidth] = useState(1920);
  const [isDragging, setIsDragging] = useState(false);
  const fileInputRef = useRef<HTMLInputElement>(null);

  const handleFileSelect = (selectedFiles: FileList | null) => {
    if (!selectedFiles) return;
    const imageFiles = Array.from(selectedFiles).filter((f) =>
      f.type.startsWith("image/")
    );
    setFiles((prev) => [...prev, ...imageFiles]);
    setResults([]);
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

  const handlePresetChange = (key: PresetKey) => {
    setPreset(key);
    const p = PRESETS[key];
    setQuality(p.quality);
    setMaxWidth(p.maxWidthOrHeight);
  };

  const handleCompress = async () => {
    if (files.length === 0) return;
    setIsProcessing(true);
    setResults([]);

    try {
      const presetConfig = PRESETS[preset];
      const compressionResults: CompressedResult[] = [];

      for (const file of files) {
        const result = await compressImage(file, {
          maxSizeMB: presetConfig.maxSizeMB,
          maxWidthOrHeight: maxWidth,
          quality: quality,
          useWebWorker: true,
        });
        compressionResults.push(result);
      }

      setResults(compressionResults);
    } catch (err) {
      console.error("Compression failed:", err);
      alert("Some images failed to compress. Please try again.");
    } finally {
      setIsProcessing(false);
    }
  };

  const handleDownloadAll = async () => {
    if (results.length === 0) return;

    const zipFiles = results.map((r) => ({
      filename: buildCompressedName(r.originalFile.name, "jpg"),
      blob: r.compressedFile,
    }));

    await downloadAsZip(zipFiles, "studyo-compressed-images.zip");
  };

  const handleClearAll = () => {
    setFiles([]);
    setResults([]);
  };

  const handleRemoveFile = (index: number) => {
    setFiles((prev) => prev.filter((_, i) => i !== index));
    setResults([]);
  };

  const totalOriginal = results.reduce((sum, r) => sum + r.originalSize, 0);
  const totalCompressed = results.reduce(
    (sum, r) => sum + r.compressedSize,
    0
  );
  const totalSavings =
    totalOriginal > 0
      ? Math.round(((totalOriginal - totalCompressed) / totalOriginal) * 100)
      : 0;

  return (
    <ToolLayout
      title="Image Compressor"
      description="Compress JPG, PNG, and WebP images in your browser. Presets for passport, CNIC, and form photos. Bulk upload and ZIP download."
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
        <div style={{ fontSize: "2.5rem" }}>🖼️</div>
        <p
          style={{
            marginTop: "0.75rem",
            fontSize: "1rem",
            fontWeight: 500,
            color: "#374151",
          }}
        >
          {isDragging
            ? "Drop images here"
            : "Drag & drop images or click to select"}
        </p>
        <p style={{ marginTop: "0.25rem", fontSize: "0.85rem", color: "#6b7280" }}>
          JPG, PNG, WebP — Multiple files supported
        </p>
        <input
          ref={fileInputRef}
          type="file"
          accept="image/*"
          multiple
          onChange={(e) => handleFileSelect(e.target.files)}
          style={{ display: "none" }}
        />
      </div>

      {/* Preset & Quality Controls */}
      {files.length > 0 && (
        <div style={{ marginTop: "1.5rem" }}>
          <label
            style={{
              display: "block",
              fontSize: "0.9rem",
              fontWeight: 600,
              color: "#374151",
              marginBottom: "0.5rem",
            }}
          >
            Preset
          </label>
          <select
            value={preset}
            onChange={(e) => handlePresetChange(e.target.value as PresetKey)}
            style={{
              width: "100%",
              padding: "0.625rem 0.75rem",
              border: "1px solid #d1d5db",
              borderRadius: "0.5rem",
              fontSize: "0.95rem",
              background: "white",
              cursor: "pointer",
            }}
          >
            {Object.entries(PRESETS).map(([key, value]) => (
              <option key={key} value={key}>
                {value.label}
              </option>
            ))}
          </select>

          {/* Quality Slider */}
          <div style={{ marginTop: "1rem" }}>
            <label
              style={{
                display: "flex",
                justifyContent: "space-between",
                fontSize: "0.9rem",
                fontWeight: 600,
                color: "#374151",
                marginBottom: "0.5rem",
              }}
            >
              <span>Quality</span>
              <span style={{ color: "#2563eb" }}>
                {Math.round(quality * 100)}%
              </span>
            </label>
            <input
              type="range"
              min="0.1"
              max="1"
              step="0.05"
              value={quality}
              onChange={(e) => setQuality(parseFloat(e.target.value))}
              style={{ width: "100%" }}
            />
          </div>

          {/* Max Width Slider */}
          <div style={{ marginTop: "1rem" }}>
            <label
              style={{
                display: "flex",
                justifyContent: "space-between",
                fontSize: "0.9rem",
                fontWeight: 600,
                color: "#374151",
                marginBottom: "0.5rem",
              }}
            >
              <span>Max Width/Height</span>
              <span style={{ color: "#2563eb" }}>{maxWidth}px</span>
            </label>
            <input
              type="range"
              min="400"
              max="4000"
              step="100"
              value={maxWidth}
              onChange={(e) => setMaxWidth(parseInt(e.target.value))}
              style={{ width: "100%" }}
            />
          </div>

          {/* Action Buttons */}
          <div
            style={{
              marginTop: "1.5rem",
              display: "flex",
              gap: "0.75rem",
              flexWrap: "wrap",
            }}
          >
            <button
              onClick={handleCompress}
              disabled={isProcessing}
              style={{
                padding: "0.75rem 1.5rem",
                background: isProcessing ? "#93c5fd" : "#2563eb",
                color: "white",
                border: "none",
                borderRadius: "0.5rem",
                fontWeight: 600,
                fontSize: "0.95rem",
                cursor: isProcessing ? "not-allowed" : "pointer",
              }}
            >
              {isProcessing
                ? `Compressing ${files.length} image(s)...`
                : `Compress ${files.length} Image(s)`}
            </button>
            <button
              onClick={handleClearAll}
              disabled={isProcessing}
              style={{
                padding: "0.75rem 1.5rem",
                background: "white",
                color: "#374151",
                border: "1px solid #d1d5db",
                borderRadius: "0.5rem",
                fontWeight: 500,
                fontSize: "0.95rem",
                cursor: isProcessing ? "not-allowed" : "pointer",
              }}
            >
              Clear All
            </button>
          </div>
        </div>
      )}

      {/* Results Summary */}
      {results.length > 0 && (
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
              marginBottom: "0.75rem",
            }}
          >
            ✅ Compressed Successfully!
          </h3>
          <div
            style={{
              display: "flex",
              flexWrap: "wrap",
              gap: "1.5rem",
              fontSize: "0.9rem",
              color: "#166534",
            }}
          >
            <span>
              <strong>{results.length}</strong> image(s)
            </span>
            <span>
              Original: <strong>{formatFileSize(totalOriginal)}</strong>
            </span>
            <span>
              Compressed: <strong>{formatFileSize(totalCompressed)}</strong>
            </span>
            <span>
              Saved: <strong>{totalSavings}%</strong>
            </span>
          </div>

          <button
            onClick={handleDownloadAll}
            style={{
              marginTop: "1rem",
              padding: "0.625rem 1.25rem",
              background: "#16a34a",
              color: "white",
              border: "none",
              borderRadius: "0.5rem",
              fontWeight: 600,
              fontSize: "0.9rem",
              cursor: "pointer",
            }}
          >
            ⬇️ Download All as ZIP
          </button>
        </div>
      )}

      {/* File List */}
      {files.length > 0 && (
        <div style={{ marginTop: "2rem" }}>
          <h3
            style={{
              fontSize: "1.1rem",
              fontWeight: 600,
              color: "#111827",
              marginBottom: "0.75rem",
            }}
          >
            Files ({files.length})
          </h3>
          <div style={{ display: "flex", flexDirection: "column", gap: "0.5rem" }}>
            {files.map((file, index) => {
              const result = results[index];
              return (
                <div
                  key={`${file.name}-${index}`}
                  style={{
                    display: "flex",
                    alignItems: "center",
                    gap: "0.75rem",
                    padding: "0.75rem",
                    background: "#f9fafb",
                    border: "1px solid #e5e7eb",
                    borderRadius: "0.5rem",
                    flexWrap: "wrap",
                  }}
                >
                  <span style={{ flex: 1, minWidth: "150px", fontSize: "0.9rem", color: "#111827" }}>
                    {file.name}
                  </span>
                  <span style={{ fontSize: "0.85rem", color: "#6b7280" }}>
                    {formatFileSize(file.size)}
                  </span>
                  {result && (
                    <>
                      <span style={{ fontSize: "0.85rem", color: "#16a34a", fontWeight: 600 }}>
                        → {formatFileSize(result.compressedSize)} ({result.savings}%)
                      </span>
                      <button
                        onClick={() =>
                          downloadFile(
                            result.compressedFile,
                            buildCompressedName(file.name, "jpg")
                          )
                        }
                        style={{
                          padding: "0.25rem 0.75rem",
                          background: "#2563eb",
                          color: "white",
                          border: "none",
                          borderRadius: "0.375rem",
                          fontSize: "0.8rem",
                          cursor: "pointer",
                          fontWeight: 500,
                        }}
                      >
                        ⬇️
                      </button>
                    </>
                  )}
                  <button
                    onClick={() => handleRemoveFile(index)}
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
              );
            })}
          </div>
        </div>
      )}
    </ToolLayout>
  );
}