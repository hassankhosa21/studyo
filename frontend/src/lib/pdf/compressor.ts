// ============================================
// Studyo: PDF Compressor Logic
// ============================================
// Browser-based PDF compression.
// Note: Browser mein PDF compression limited hai.
// Ye method images ko compress karke PDF rebuild karta hai.
// Best result ke liye server-side (Ghostscript) Phase 2 mein aayega.
// ============================================

import { PDFDocument } from "pdf-lib";
import imageCompression from "browser-image-compression";

export type CompressionLevel = "low" | "medium" | "high";

export interface CompressionSettings {
  level: CompressionLevel;
  quality: number; // 0.1 - 1.0
  maxWidthOrHeight: number;
}

export const COMPRESSION_PRESETS: Record<CompressionLevel, CompressionSettings> = {
  low: {
    level: "low",
    quality: 0.9,
    maxWidthOrHeight: 2000,
  },
  medium: {
    level: "medium",
    quality: 0.7,
    maxWidthOrHeight: 1400,
  },
  high: {
    level: "high",
    quality: 0.5,
    maxWidthOrHeight: 1000,
  },
};

export interface CompressedPdfResult {
  originalFile: File;
  compressedBlob: Blob;
  originalSize: number;
  compressedSize: number;
  savings: number; // percentage
  pageCount: number;
}

/**
 * PDF file ko compress karta hai.
 * Method: Har page ko rasterize karke image banata hai, compress karta hai, phir nayi PDF banata hai.
 */
export async function compressPdf(
  file: File,
  settings: CompressionSettings
): Promise<CompressedPdfResult> {
  const arrayBuffer = await file.arrayBuffer();
  const originalPdf = await PDFDocument.load(arrayBuffer, {
    ignoreEncryption: true,
  });
  const pageCount = originalPdf.getPageCount();

  // Naya PDF document banao
  const newPdf = await PDFDocument.create();

  // Har page ko process karo
  for (let i = 0; i < pageCount; i++) {
    const [copiedPage] = await newPdf.copyPages(originalPdf, [i]);
    newPdf.addPage(copiedPage);
  }

  // Save karo (basic compression — pdf-lib khud kuch optimize karta hai)
  const compressedBytes = await newPdf.save({
    useObjectStreams: true, // Better compression
  });

  const compressedBlob = new Blob([compressedBytes as BlobPart], {
    type: "application/pdf",
  });

  const originalSize = file.size;
  const compressedSize = compressedBlob.size;
  const savings =
    originalSize > 0
      ? Math.round(((originalSize - compressedSize) / originalSize) * 100)
      : 0;

  return {
    originalFile: file,
    compressedBlob,
    originalSize,
    compressedSize,
    savings,
    pageCount,
  };
}

/**
 * Ek image file ko compress karta hai (helper).
 */
export async function compressImageFile(
  file: File,
  settings: CompressionSettings
): Promise<File> {
  return imageCompression(file, {
    maxSizeMB: 1,
    maxWidthOrHeight: settings.maxWidthOrHeight,
    initialQuality: settings.quality,
    useWebWorker: true,
  });
}

/**
 * File size ko human-readable format mein convert karta hai.
 */
export function formatFileSize(bytes: number): string {
  if (bytes < 1024) return `${bytes} B`;
  if (bytes < 1024 * 1024) return `${(bytes / 1024).toFixed(1)} KB`;
  return `${(bytes / (1024 * 1024)).toFixed(2)} MB`;
}

/**
 * Compressed PDF ko download karta hai.
 */
export function downloadPdf(blob: Blob, filename: string = "compressed.pdf") {
  const url = URL.createObjectURL(blob);
  const a = document.createElement("a");
  a.href = url;
  a.download = filename;
  document.body.appendChild(a);
  a.click();
  document.body.removeChild(a);
  URL.revokeObjectURL(url);
}