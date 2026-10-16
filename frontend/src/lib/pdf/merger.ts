// ============================================
// Studyo: PDF Merger Logic
// ============================================
// pdf-lib library use karta hai.
// Sab kuch browser mein — files server par nahi jati.
// ============================================

import { PDFDocument } from "pdf-lib";

export interface MergedResult {
  mergedBlob: Blob;
  pageCount: number;
  fileName: string;
}

/**
 * Multiple PDF files ko ek mein merge karta hai.
 */
export async function mergePdfs(files: File[]): Promise<MergedResult> {
  if (files.length === 0) {
    throw new Error("Kam az kam ek PDF file chahiye.");
  }

  if (files.length === 1) {
    // Sirf ek file — bas copy kar do
    const arrayBuffer = await files[0].arrayBuffer();
    const blob = new Blob([arrayBuffer], { type: "application/pdf" });
    const pdfDoc = await PDFDocument.load(arrayBuffer);
    return {
      mergedBlob: blob,
      pageCount: pdfDoc.getPageCount(),
      fileName: "merged.pdf",
    };
  }

  // Naya PDF document banao
  const mergedPdf = await PDFDocument.create();

  for (const file of files) {
    const arrayBuffer = await file.arrayBuffer();
    const pdf = await PDFDocument.load(arrayBuffer, {
      ignoreEncryption: true,
    });
    const copiedPages = await mergedPdf.copyPages(
      pdf,
      pdf.getPageIndices()
    );
    copiedPages.forEach((page) => mergedPdf.addPage(page));
  }

  const mergedBytes = await mergedPdf.save();
  const mergedBlob = new Blob([mergedBytes as unknown as BlobPart], {
    type: "application/pdf",
  });

  return {
    mergedBlob,
    pageCount: mergedPdf.getPageCount(),
    fileName: "merged.pdf",
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
 * Merged PDF ko download karta hai.
 */
export function downloadPdf(blob: Blob, filename: string = "merged.pdf") {
  const url = URL.createObjectURL(blob);
  const a = document.createElement("a");
  a.href = url;
  a.download = filename;
  document.body.appendChild(a);
  a.click();
  document.body.removeChild(a);
  URL.revokeObjectURL(url);
}