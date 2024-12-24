import { v2 as cloudinary } from "cloudinary";
import { config } from "./config.js";
import path from "node:path";
import { fileURLToPath } from "node:url";
import fs from "fs";

// __dirname को simulate करें
const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

cloudinary.config({
  cloud_name: config.cloud_name,
  api_key: config.api_key,
  api_secret: config.api_secret, // Fix api_secret (previously used api_key)
});

const uploadImageCloudinary = async (files) => {
  try {
    let uploadImage,
      uploadPdf = null;
    if (files.cover_image) {
      const imageFilePath = path.resolve(
        __dirname,
        "../public/data/uploads",
        files?.cover_image[0]?.filename
      );

      uploadImage = await cloudinary.uploader.upload(imageFilePath, {
        filename_override: files?.cover_image[0]?.filename,
        folder: "book-cover",
        format: files?.cover_image[0]?.mimetype.split("/")[1],
      });
      await fs.promises.unlink(imageFilePath);
    }

    if (files.file) {
      const PdfFilePath = path.resolve(
        __dirname,
        "../public/data/uploads",
        files?.file[0]?.filename
      );
      uploadPdf = await cloudinary.uploader.upload(PdfFilePath, {
        resource_type: "raw",
        filename_override: files?.file[0]?.filename,
        folder: "file-pdf",
        format: files?.file[0]?.mimetype.split("/")[1],
      });
      await fs.promises.unlink(PdfFilePath);
    }

    return { uploadImage, uploadPdf };
  } catch (error) {
    console.error("Error uploading to Cloudinary:", error);
    throw new Error("Cloudinary upload failed.");
  }
};

export default uploadImageCloudinary;
