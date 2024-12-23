import uploadImageCloudinary from "../config/cloudinary.js";

const createBook = async (req, res, next) => {
  console.log("file : ", req.files);
  const uploadResult = await uploadImageCloudinary(req.files);
  console.log("Upload result : ", uploadResult);
  return res.json({ message: "Ok" });
};

export { createBook };
