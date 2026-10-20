import express, { Request, Response } from "express";
import multer from "multer";
import { Document, Packer, Paragraph, TextRun } from "docx";
import mammoth from "mammoth";

const router = express.Router();

// Multer setup
const upload = multer({
  storage: multer.memoryStorage(),
  limits: { fileSize: 10 * 1024 * 1024 }, // 10 MB per file
});

router.post(
  "/doc-merge",
  upload.array("files", 10),
  async (req: Request, res: Response) => {
    try {
      const files = req.files as Express.Multer.File[];

      if (!files || files.length < 2) {
        return res.status(400).json({ error: "Please upload at least 2 DOCX files to merge." });
      }

      let combinedParagraphs: Paragraph[] = [];

      // Loop through each file, extract text using mammoth, and convert to Paragraphs
      for (const file of files) {
        const result = await mammoth.extractRawText({ buffer: file.buffer });
        const text = result.value;

        if (text && text.trim() !== "") {
          const lines = text.split("\n");
          
          for (const line of lines) {
            combinedParagraphs.push(
              new Paragraph({
                children: [
                  new TextRun({
                    text: line,
                    size: 24, // 12pt
                    font: "Arial",
                  }),
                ],
                spacing: { after: 120 }, // paragraph spacing
              })
            );
          }
          
          // Add a page break or empty line between files
          combinedParagraphs.push(
            new Paragraph({
              children: [new TextRun({ text: "", break: 1 })], // Line break
            })
          );
        }
      }

      if (combinedParagraphs.length === 0) {
        return res.status(400).json({ error: "No text could be extracted from the provided documents." });
      }

      // Create a single new document
      const doc = new Document({
        sections: [
          {
            properties: {},
            children: combinedParagraphs,
          },
        ],
      });

      // Generate buffer
      const buffer = await Packer.toBuffer(doc);

      res.setHeader(
        "Content-Type",
        "application/vnd.openxmlformats-officedocument.wordprocessingml.document"
      );
      res.setHeader(
        "Content-Disposition",
        'attachment; filename="merged.docx"'
      );
      
      res.send(buffer);

    } catch (error) {
      console.error("DOC Merge error:", error);
      res.status(500).json({ error: "Failed to merge documents. Please try again." });
    }
  }
);

export default router;