// ============================================
// Studyo: ZIP Export Helper
// ============================================
// JSZip use karke multiple files ko ek ZIP mein pack karta hai.
// ============================================

import JSZip from "jszip";

export interface ZipFile {
  filename: string;
  blob: Blob;
}

/**
 * Multiple files ko ek ZIP mein pack karke download karta hai.
 */
export async function downloadAsZip(
  files: ZipFile[],
  zipName: string = "studyo-files.zip"
): Promise<void> {
  const zip = new JSZip();

  for (const file of files) {
    zip.file(file.filename, file.blob);
  }

  const blob = await zip.generateAsync({ type: "blob" });

  // Download trigger
  const url = URL.createObjectURL(blob);
  const a = document.createElement("a");
  a.href = url;
  a.download = zipName;
  document.body.appendChild(a);
  a.click();
  document.body.removeChild(a);
  URL.revokeObjectURL(url);
}

/**
 * File ke naam se extension nikalta hai.
 */
export function getExtension(filename: string): string {
  const parts = filename.split(".");
  return parts.length > 1 ? parts[parts.length - 1] : "";
}

/**
 * File ka naam (extension ke bina) return karta hai.
 */
export function getBaseName(filename: string): string {
  const parts = filename.split(".");
  if (parts.length <= 1) return filename;
  return parts.slice(0, -1).join(".");
}

/**
 * Compressed file ka naya naam banata hai.
 */
export function buildCompressedName(
  originalName: string,
  format: string
): string {
  const base = getBaseName(originalName);
  return `${base}-compressed.${format}`;
}