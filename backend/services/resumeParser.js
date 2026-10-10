const fs = require("fs");
const path = require("path");
const pdfParse = require("pdf-parse");
const mammoth = require("mammoth");

const extractResumeText = async (file) => {

  const extension =
    path.extname(file.originalname).toLowerCase();

  const buffer = fs.readFileSync(file.path);

  // PDF
  if (extension === ".pdf") {

    const result = await pdfParse(buffer);

    return result.text;
  }

  // DOCX
  if (extension === ".docx") {

    const result =
      await mammoth.extractRawText({
        buffer
      });

    return result.value;
  }

  // Old DOC
  if (extension === ".doc") {

    return "DOC file uploaded. Please convert this document to DOCX/PDF for editable text extraction.";
  }

  throw new Error("Unsupported resume format");
};

module.exports = {
  extractResumeText
};

