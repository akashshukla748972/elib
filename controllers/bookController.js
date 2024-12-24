import createHttpError from "http-errors";
import uploadImageCloudinary from "../config/cloudinary.js";
import Book from "../models/bookModel.js";
import { v2 as cloudinary } from "cloudinary";

const createBook = async (req, res, next) => {
  try {
    const { title, genre } = req.body;
    const { cover_image, file } = req.files;

    // Validation
    if (!cover_image || !file || !title || !genre) {
      const errorFields = [];
      if (!cover_image) errorFields.push("Cover Image");
      if (!file) errorFields.push("File");
      if (!title) errorFields.push("Title");
      if (!genre) errorFields.push("Genre");
      const errorMessage = `${errorFields.join(", ")} is required`;
      return next(createHttpError(400, errorMessage));
    }

    // upload image in cloudinary
    const uploadResult = await uploadImageCloudinary(req.files);
    console.log("upload image", uploadResult);
    // Process to create book
    const newBook = await Book.create({
      title,
      genre,
      author: req.user._id,
      cover_image: {
        url: uploadResult.uploadImage.secure_url,
        public_id: uploadResult.uploadImage.public_id,
      },
      file: {
        url: uploadResult.uploadPdf.secure_url,
        public_id: uploadResult.uploadPdf.public_id,
      },
    });

    return res.status(201).json({
      message: "Ok",
      book_id: newBook._id,
      cover_image: newBook.cover_image,
      file: newBook.file,
    });
  } catch (error) {
    console.log("Error", error);
    createHttpError(500, "Internal server error");
  }
};

const getAllBook = async (req, res, next) => {
  try {
    const allBooks = await Book.find();
    return res.status(200).json({
      message: "Getting all books",
      data: allBooks,
    });
  } catch (error) {
    console.log(error);
    return next(createHttpError(500, "Error while getting all books"));
  }
};

const getSingleBook = async (req, res, next) => {
  try {
    const { bookId } = req.params;
    console.log(bookId);
    const singleBook = await Book.findById(bookId);
    return res.status(200).json({
      message: "Getting book",
      data: singleBook,
    });
  } catch (error) {
    console.log(error);
    return next(createHttpError(500, "Error while getting single books"));
  }
};

// const updateBook = (req, res, next)=>{

// }

const deleteBook = async (req, res, next) => {
  try {
    const { bookId } = req.params;
    // check book exist
    const book = await Book.findById(bookId);
    if (!book) {
      return next(createHttpError(404, "Book not found"));
    }
    // check login user author of book
    const isAuthor = book.author.toString() === req.user._id;
    if (!isAuthor) {
      return next(createHttpError(403, "Not a author"));
    }

    await cloudinary.uploader.destroy(book.cover_image.public_id);
    await cloudinary.uploader.destroy(book.file.public_id);

    await Book.deleteOne({ _id: bookId });

    return res.sendStatus(204);
  } catch (error) {
    console.log(error);
    return next(createHttpError(500, "Error while deleting a book"));
  }
};

export { createBook, getAllBook, getSingleBook, deleteBook };
