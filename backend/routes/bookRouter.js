import express from "express";
import {
  createBook,
  getAllBook,
  getSingleBook,
  deleteBook,
  updateBook,
} from "../controllers/bookController.js";
import upload from "../middleware/multerMiddleware.js";
import verifyToken from "../middleware/verifyJwtToken.js";

const bookRouter = express();

// book routes
bookRouter.post(
  "/create",
  verifyToken,
  upload.fields([
    { name: "cover_image", maxCount: 1 },
    { name: "file", maxCount: 1 },
  ]),
  createBook
);

bookRouter.get("/", getAllBook);
bookRouter.get("/:bookId", getSingleBook);
bookRouter.put(
  "/update/:bookId",
  upload.fields([
    { name: "cover_image", maxCount: 1 },
    { name: "file", maxCount: 1 },
  ]),
  verifyToken,
  updateBook
);
bookRouter.delete("/delete/:bookId", verifyToken, deleteBook);

export default bookRouter;
