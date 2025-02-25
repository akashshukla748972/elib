import createHttpError from "http-errors";
import jwt from "jsonwebtoken";
import { config } from "../config/config.js";

const verifyToken = async (req, res, next) => {
  try {
    const token = req.header("authorization") || null;
    if (!token) {
      next(createHttpError(401, "Authorization token is require"));
    }
    const parsedToken = token.split(" ")[1];
    const isVerify = await jwt.verify(parsedToken, config.jwtSecret);
    req.user = {
      _id: isVerify.sub,
    };
    next();
  } catch (error) {
    console.log("Error", error);
    return next(createHttpError(500, "Error while verifying token"));
  }
};

export default verifyToken;
