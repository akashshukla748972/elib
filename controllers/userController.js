import createHttpError from "http-errors";
import User from "../models/userModel.js";
import bcrypt from "bcrypt";
import { genJwtToken } from "../services/jsonWebToken.js";

const registerUser = async (req, res, next) => {
  const { name, email, password } = req.body;

  // Validation
  if (!name || !email || !password) {
    const errorFields = [];
    if (!name) errorFields.push("Name");
    if (!email) errorFields.push("Email");
    if (!password) errorFields.push("Password");

    const errorMessage = `${errorFields.join(", ")} is required`;

    const error = createHttpError(400, errorMessage);
    return next(error);
  }

  //   check user already exist
  try {
    const user = await User.findOne({ email });
    if (user) {
      const error = createHttpError(409, "Email already exist");
      return next(error);
    }
  } catch (err) {
    return next(createHttpError(500, "Error while getting user already exist"));
  }

  const hashPassword = await bcrypt.hash(password, 10);
  //   Passwod -> hash

  // Save user is database
  let newUser = null;
  try {
    newUser = await User.create({
      name,
      email,
      password: hashPassword,
    });
  } catch (err) {
    return next(createHttpError(500, "Error while creating user"));
  }
  // Process

  try {
    //   Genrate jwt token
    const token = genJwtToken({ sub: newUser?._id });
    // Response
    return res.status(201).json({
      message: "User register successfully",
      accessToken: token,
    });
  } catch (error) {
    const err = createHttpError(500, error);
    return next(err);
  }
};

export { registerUser };
