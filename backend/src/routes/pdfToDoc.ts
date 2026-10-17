import express, { Request, Response } from "express";
import multer from "multer";
import { extractText } from "unpdf";
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

      // 1. Extract text from PDF using unpdf
      const uint8Array = new Uint8Array(req.file.buffer);
      const { text } = await extractText(uint8Array);
      const fullText = text.join("\n");

      if (!fullText || fullText.trim() === "") {
        return res
          .status(400)
          .json({ error: "The PDF appears to be empty or contains only images (scanned)." });
      }

      // 2. Convert text to DOCX paragraphs
      const paragraphs = fullText.split("\n").map((line) => {
        return new Paragraph({
          children: [
            new TextRun({
              text: line,
              size: 24, // 12pt font
              font: "Arial",
            }),
          ],
          spacing: { after: 120 },
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

      // 4. Generate DOCX buffer using Packer (bina canvas ke)
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
      res.status(500).json({ error: "Failed to convert PDF to DOC. Make sure the PDF is valid." });
    }
  }
);

export default router;