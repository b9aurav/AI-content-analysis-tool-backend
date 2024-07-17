var express = require("express");
var router = express.Router();
var multer = require("multer");
var serviceController = require("../controllers/serviceController");
var path = require("path");
var fs = require("fs");
var mammoth = require("mammoth");
var cheerio = require("cheerio");

const uploadDir = path.dirname(__dirname) + '/uploads';
if (!fs.existsSync(uploadDir)) {
  fs.mkdirSync(uploadDir);
}

const storage = multer.diskStorage({
    destination: (req, file, cb) => {
      cb(null, uploadDir);
    },
    filename: (req, file, cb) => {
      const uniqueSuffix = Date.now();
      cb(null, file.fieldname + '-' + uniqueSuffix + path.extname(file.originalname));
    }
  });

var upload = multer({ storage });

router.post("/upload", upload.single("file"), async (req, res) => {
  const file = req.file;

  if (!file) {
    return res.json({ success: false, message: "No file uploaded" });
  }

  try {
    const filePath = path.join(uploadDir, file.filename);
    const fileExtension = path.extname(file.originalname).toLowerCase();
    let textContent;

    if (fileExtension === '.html') {
      const htmlContent = fs.readFileSync(filePath, 'utf-8');
      const $ = cheerio.load(htmlContent);
      textContent = $('body').text();
    } else if (fileExtension === '.doc' || fileExtension === '.docx') {
      const dataBuffer = fs.readFileSync(filePath);
      const result = await mammoth.extractRawText({ buffer: dataBuffer });
      textContent = result.value;
    } else if (fileExtension === '.txt') {
        textContent = fs.readFileSync(filePath, 'utf-8');
    } else {
      return res.json({ success: false, message: "Unsupported file type" });
    }

    const analysisResult = await serviceController.analyzeText(textContent);

    res.json({
      success: true,
      message: "File uploaded and analyzed successfully",
      data: analysisResult,
    });
  } catch (error) {
    res.json({ success: false, message: error.message });
  }
});

module.exports = router;