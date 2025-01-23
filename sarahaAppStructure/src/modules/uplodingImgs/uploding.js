import multer from "multer";
import path from "path";
import { Router } from "express";
let imgRouter = Router();

const storage = multer.diskStorage({
  destination: (req, file, cb) => {
    cb(null, "./assets");
  },

  filename: (req, file, cb) => {
    console.log(file);
    cb(null, Date.now() + path.extname(file.originalname));
  },
});

const upload = multer({ storage });
imgRouter.post("/", upload.single("image"), (req, res) => {
  if (!req.file) {
    return res.status(400).json({ message: "No file uploaded" });
  }

  res
    .status(200)
    .json({ message: "File uploaded successfully", file: req.file });
});

export default imgRouter;
