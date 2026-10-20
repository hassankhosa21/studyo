import express, { Request, Response } from "express";
import multer from "multer";
// @ts-ignore
import DocxMerger from "docx-merger";

const router = express.Router();

// Multer setup (Multiple files allow karne ke liye)
const upload = multer({
  storage: multer.memoryStorage(),
  limits: { fileSize: 10 * 1024 * 1024 }, // 10 MB per file
});

router.post(
  "/doc-merge",
  upload.array("files", 10), // Max 10 files
  async (req: Request, res: Response) => {
    try {
      const files = req.files as Express.Multer.File[];

      if (!files || files.length < 2) {
        return res.status(400).json({ error: "Please upload at least 2 DOCX files to merge." });
      }

      // File buffers ko base64 format mein convert karo (docx-merger ko aise chahiye)
      const filesArray = files.map((file) => file.buffer.toString("base64"));

      // Merge logic
      const docx = new DocxMerger({}, filesArray);
      
      docx.save("nodebuffer", (data: Buffer) => {
        res.setHeader(
          "Content-Type",
          "application/vnd.openxmlformats-officedocument.wordprocessingml.document"
        );
        res.setHeader(
          "Content-Disposition",
          'attachment; filename="merged.docx"'
        );
        res.send(data);
      });

    } catch (error) {
      console.error("DOC Merge error:", error);
      res.status(500).json({ error: "Failed to merge documents. Make sure all files are valid .docx files." });
    }
  }
);

export default router;