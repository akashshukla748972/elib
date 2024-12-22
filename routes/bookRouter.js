import express from "express";
import { createBook } from "../controllers/bookController.js";
import multer from "multer";
import path from "path";

const bookRouter = express();

// create multer middleware for get file
const upload = multer({
  dest: path.relative(__dirname, "../../public/data/uploads"),
  limits: { fileSize: 3e7 },
});

// book routes
bookRouter.post(
  "/create",
  upload.fields([
    { name: "cover_image", maxCount: 1 },
    { name: "file", maxCount: 1 },
  ]),
  createBook
);

export default bookRouter;
