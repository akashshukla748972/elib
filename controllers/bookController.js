import createHttpError from "http-errors";
import uploadImageCloudinary from "../config/cloudinary.js";
import Book from "../models/bookModel.js";

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
      cover_image: uploadResult.uploadImage.secure_url,
      file: uploadResult.uploadPdf.secure_url,
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

export { createBook };
