import multer from "multer";
import path from "node:path";
import { fileURLToPath } from "node:url";

// __dirname को simulate करने के लिए setup करें
const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

const upload = multer({
  dest: path.join(__dirname, "../public/data/uploads"),
  limits: { fileSize: 3e7 }, // File size limit: 30 MB
});

export default upload;
