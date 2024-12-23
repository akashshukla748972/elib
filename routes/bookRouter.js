import express from "express";
import { createBook } from "../controllers/bookController.js";
import upload from "../middleware/multerMiddleware.js";

const bookRouter = express();

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
