import express, { Request, Response } from "express";
import multer from "multer";
import pdfParse from "pdf-parse";
import { Document, Packer, Paragraph, TextRun } from "docx";

const router = express.Router();

// Multer setup (memory storage)
const upload = multer({
  storage: multer.memoryStorage(),
  limits: { fileSize: 10 * 1024 * 1024 }, // 10 MB limit
});

router.post(
  "/pdf-to-doc",
  upload.single("file"),
  async (req: Request, res: Response) => {
    try {
      if (!req.file) {
        return res.status(400).json({ error: "No file uploaded." });
      }

      // 1. Extract text from PDF
      const pdfData = await pdfParse(req.file.buffer);
      const text = pdfData.text;

      if (!text || text.trim() === "") {
        return res
          .status(400)
          .json({ error: "The PDF appears to be empty or contains only images (scanned)." });
      }

      // 2. Convert text to DOCX paragraphs
      const paragraphs = text.split("\n").map((line) => {
        return new Paragraph({
          children: [
            new TextRun({
              text: line,
              size: 24, // 12pt font
              font: "Arial",
            }),
          ],
          spacing: { after: 120 }, // spacing between paragraphs
        });
      });

      // 3. Create DOCX document
      const doc = new Document({
        sections: [
          {
            properties: {},
            children: paragraphs,
          },
        ],
      });

      // 4. Generate DOCX buffer
      const buffer = await Packer.toBuffer(doc);

      // 5. Send back to frontend
      res.setHeader(
        "Content-Type",
        "application/vnd.openxmlformats-officedocument.wordprocessingml.document"
      );
      res.setHeader(
        "Content-Disposition",
        'attachment; filename="converted.docx"'
      );
      
      res.send(buffer);

    } catch (error) {
      console.error("PDF to DOC conversion error:", error);
      res.status(500).json({ error: "Failed to convert PDF to DOC. Make sure the PDF is valid and not password protected." });
    }
  }
);

export default router;