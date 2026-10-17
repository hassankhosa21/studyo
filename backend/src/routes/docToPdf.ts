import express, { Request, Response } from "express";
import multer from "multer";
import mammoth from "mammoth";
import { PDFDocument, StandardFonts, rgb } from "pdf-lib";

const router = express.Router();

// Configure multer to store the file in memory (not on disk)
const upload = multer({
  storage: multer.memoryStorage(),
  limits: { fileSize: 10 * 1024 * 1024 }, // 10 MB limit
});

router.post(
  "/doc-to-pdf",
  upload.single("file"),
  async (req: Request, res: Response) => {
    try {
      if (!req.file) {
        return res.status(400).json({ error: "No file uploaded." });
      }

      // 1. Extract text from DOCX using mammoth
      const result = await mammoth.extractRawText({ buffer: req.file.buffer });
      const text = result.value;

      if (!text || text.trim() === "") {
        return res
          .status(400)
          .json({ error: "The document appears to be empty." });
      }

      // 2. Create a new PDF
      const pdfDoc = await PDFDocument.create();
      const font = await pdfDoc.embedFont(StandardFonts.Helvetica);

      let page = pdfDoc.addPage();
      const { width, height } = page.getSize();
      
      const fontSize = 12;
      const margin = 50;
      const maxWidth = width - margin * 2;
      const lineHeight = fontSize * 1.5;

      // Function to split text into lines that fit the page
      const wrapText = (text: string, maxWidth: number) => {
        const words = text.split(" ");
        const lines = [];
        let currentLine = "";

        for (const word of words) {
          const testLine = currentLine ? currentLine + " " + word : word;
          const textWidth = font.widthOfTextAtSize(testLine, fontSize);

          if (textWidth > maxWidth) {
            if (currentLine) lines.push(currentLine);
            currentLine = word;
          } else {
            currentLine = testLine;
          }
        }
        if (currentLine) lines.push(currentLine);
        return lines;
      };

      const paragraphs = text.split("\n");
      let y = height - margin;

      for (const paragraph of paragraphs) {
        if (paragraph.trim() === "") {
          y -= lineHeight; // empty line
          continue;
        }

        const lines = wrapText(paragraph, maxWidth);

        for (const line of lines) {
          if (y < margin) {
            // Add new page if no space left
            page = pdfDoc.addPage();
            y = page.getSize().height - margin;
          }

          page.drawText(line, {
            x: margin,
            y: y,
            size: fontSize,
            font: font,
            color: rgb(0, 0, 0),
          });

          y -= lineHeight;
        }
        y -= lineHeight * 0.5; // spacing between paragraphs
      }

      // 3. Save the PDF and send it back
      const pdfBytes = await pdfDoc.save();

      res.setHeader("Content-Type", "application/pdf");
      res.setHeader(
        "Content-Disposition",
        'attachment; filename="converted.pdf"'
      );
      
      // Send as buffer
      res.send(Buffer.from(pdfBytes as Uint8Array));

    } catch (error) {
      console.error("DOC to PDF conversion error:", error);
      res.status(500).json({ error: "Failed to convert document." });
    }
  }
);

export default router;