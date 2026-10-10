
const fs = require("fs");
const path = require("path");
const { PDFParse } = require("pdf-parse");
const mammoth = require("mammoth");

const uploadDirectory = path.join(
  process.cwd(),
  process.env.RESUME_UPLOAD_DIR || "uploads/resumes"
);

if (!fs.existsSync(uploadDirectory)) {
  fs.mkdirSync(uploadDirectory, { recursive: true });
}

const extractResumeText = async (filePath, mimeType, extension) => {
  const buffer = fs.readFileSync(filePath);

  console.log("Resume file debug:", {
  filePath,
  exists: fs.existsSync(filePath),
  size: buffer.length,
  mimeType,
  extension,
  firstBytes: buffer.subarray(0, 30).toString("utf8"),
  pdfSignatureFound: buffer
    .subarray(0, 1024)
    .includes(Buffer.from("%PDF-")),
});

  // Extract text from PDF using pdf-parse v2

  // PDF
  if (mimeType === "application/pdf" || extension === ".pdf") {
    if (
      buffer.length < 5 ||
      buffer.subarray(0, 1024).indexOf("%PDF-") === -1
    ) {
      throw new Error(
        "The uploaded file is not a valid PDF. Please upload a genuine PDF file."
      );
    }

    const parser = new PDFParse({ data: buffer });

    try {
      const result = await parser.getText();
      return result.text || "";
    } catch (error) {
      if (error.name === "InvalidPDFException") {
        throw new Error(
          "This PDF is corrupted or has an unsupported structure. Please open it and save/export it as a new PDF, then upload it again."
        );
      }

      throw error;
    } finally {
      await parser.destroy();
    }
  }

  // Extract text from DOCX
  if (
    mimeType ===
    "application/vnd.openxmlformats-officedocument.wordprocessingml.document" ||
    extension === ".docx"
  ) {
    const result = await mammoth.extractRawText({ buffer });
    return result.value || "";
  }

  // Legacy DOC: stored, but text extraction is not implemented
  if (mimeType === "application/msword" || extension === ".doc") {
    return "";
  }

  return "";
};

module.exports = {
  uploadDirectory,
  extractResumeText,
};