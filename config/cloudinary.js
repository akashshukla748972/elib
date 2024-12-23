import { v2 as cloudinary } from "cloudinary";
import { config } from "./config.js";
import path from "node:path";
import { fileURLToPath } from "node:url"; // Add this

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
    // Local file path resolve करें
    let filePath = path.resolve(
      __dirname,
      "../public/data/uploads",
      files?.cover_image[0]?.filename
    );

    // Image Cloudinary पर upload करें
    const uploadImage = await cloudinary.uploader.upload(filePath, {
      filename_override: files?.cover_image[0]?.filename,
      folder: "book-cover",
      format: files?.cover_image[0]?.mimetype.split("/")[1],
    });

    filePath = path.resolve(
      __dirname,
      "../public/data/uploads",
      files?.file[0]?.filename
    );
    // pdf Cloudinary पर upload करें
    const uploadPdf = await cloudinary.uploader.upload(filePath, {
      resource_type: "raw",
      filename_override: files?.file[0]?.filename,
      folder: "file-pdf",
      format: files?.file[0]?.mimetype.split("/")[1],
    });

    return { uploadImage, uploadPdf };
  } catch (error) {
    console.error("Error uploading to Cloudinary:", error);
    throw new Error("Cloudinary upload failed.");
  }
};

export default uploadImageCloudinary;
