// backend/server.js
import express from "express";
import multer from "multer";
import cors from "cors";
import path from "path";

const app = express();
app.use(cors());

// configure multer storage
const storage = multer.diskStorage({
  destination: function (req, file, cb) {
    cb(null, "uploads/"); // make sure this folder exists
  },
  filename: function (req, file, cb) {
    cb(null, Date.now() + path.extname(file.originalname));
  },
});

const upload = multer({ storage: storage });

// route for uploading invoice
app.post("/upload-invoice", upload.single("file"), (req, res) => {
  console.log("File received:", req.file);
  if (!req.file) {
    return res.status(400).json({ error: "No file uploaded" });
  }
  res.json({ message: "File uploaded successfully!", file: req.file });
});

app.listen(5000, () => console.log("Server running on http://localhost:5000"));
