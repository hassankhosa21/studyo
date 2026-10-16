// ============================================
// Studyo: Image Compressor Logic
// ============================================
// browser-image-compression library use karta hai.
// Sab kuch browser mein — files server par nahi jati.
// ============================================

import imageCompression from "browser-image-compression";

export interface CompressionOptions {
  maxSizeMB: number;
  maxWidthOrHeight: number;
  quality: number;
  useWebWorker: boolean;
}

export interface CompressedResult {
  originalFile: File;
  compressedFile: File;
  originalSize: number;
  compressedSize: number;
  savings: number; // percentage
  previewUrl: string;
}

// Presets for common use cases
export const PRESETS = {
  custom: {
    label: "Custom",
    maxSizeMB: 1,
    maxWidthOrHeight: 1920,
    quality: 0.8,
  },
  passport: {
    label: "Passport Photo (under 50 KB)",
    maxSizeMB: 0.05,
    maxWidthOrHeight: 600,
    quality: 0.85,
  },
  cnic: {
    label: "CNIC Photo (under 100 KB)",
    maxSizeMB: 0.1,
    maxWidthOrHeight: 800,
    quality: 0.85,
  },
  web: {
    label: "Web / Social Media (under 200 KB)",
    maxSizeMB: 0.2,
    maxWidthOrHeight: 1920,
    quality: 0.8,
  },
  email: {
    label: "Email Attachment (under 500 KB)",
    maxSizeMB: 0.5,
    maxWidthOrHeight: 1920,
    quality: 0.8,
  },
} as const;

export type PresetKey = keyof typeof PRESETS;

/**
 * Ek image file ko compress karta hai.
 */
export async function compressImage(
  file: File,
  options: CompressionOptions
): Promise<CompressedResult> {
  const compressionOptions = {
    maxSizeMB: options.maxSizeMB,
    maxWidthOrHeight: options.maxWidthOrHeight,
    useWebWorker: options.useWebWorker,
    initialQuality: options.quality,
  };

  const compressedFile = await imageCompression(file, compressionOptions);

  const originalSize = file.size;
  const compressedSize = compressedFile.size;
  const savings =
    originalSize > 0
      ? Math.round(((originalSize - compressedSize) / originalSize) * 100)
      : 0;

  const previewUrl = URL.createObjectURL(compressedFile);

  return {
    originalFile: file,
    compressedFile,
    originalSize,
    compressedSize,
    savings,
    previewUrl,
  };
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
 * Download link banata hai compressed image ke liye.
 */
export function downloadFile(file: File, filename?: string) {
  const url = URL.createObjectURL(file);
  const a = document.createElement("a");
  a.href = url;
  a.download = filename || file.name;
  document.body.appendChild(a);
  a.click();
  document.body.removeChild(a);
  URL.revokeObjectURL(url);
}