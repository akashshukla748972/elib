import jwt from "jsonwebtoken";
import { config } from "../config/config.js";

// genrate jwt token
const genJwtToken = (payload) => {
  const token = jwt.sign(payload, config.jwtSecret, { expiresIn: "7d" });
  return token;
};

export { genJwtToken };
