import createHttpError from "http-errors";
import User from "../models/userModel.js";
import bcrypt from "bcrypt";
import { genJwtToken } from "../services/jsonWebToken.js";

// register user in db
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

// login user
const loginUser = async (req, res, next) => {
  const { email, password } = req.body;

  // Validation
  if (!email || !password) {
    const errorFields = [];
    if (!email) errorFields.push("Email");
    if (!password) errorFields.push("Password");

    const errorMessage = `${errorFields.join(", ")} is required`;

    const error = createHttpError(400, errorMessage);
    return next(error);
  }
  let user = null;
  try {
    // check user exist
    user = await User.findOne({ email });
    if (!user) {
      return next(createHttpError(401, "Invalid credentials"));
    }

    //   check password equal
    const isMatch = await bcrypt.compare(password, user.password);
    if (!isMatch) {
      return next(createHttpError(401, "Invalid credentials"));
    }
  } catch (err) {
    return next(createHttpError(500, "Error while getting user"));
  }

  try {
    // Process
    const token = genJwtToken({ sub: user._id });
    return res.json({ accessToken: token });
  } catch (err) {
    return next(createHttpError(500, "Error while generating error"));
  }

  // Response
};

const forgotPassword = async (req, res, next) => {
  try {
    const { email, password } = req.body;

    // check
    if (!email || !password) {
      const errorFields = [];
      if (!email) errorFields.push("Email");
      if (!password) errorFields.push("Password");
      const errorMessage = `${errorFields.join(", ")} is required`;
      return next(createHttpError(400, errorMessage));
    }

    const user = await User.findOne({
      $and: [{ _id: req.user._id, email: email }, { email: email }],
    });

    if (!user) {
      return next(createHttpError(401, "Invalid credentials"));
    }

    // hash password
    const salt = await bcrypt.genSalt(10);
    const hashPassword = await bcrypt.hash(password, salt);

    const updatePassword = await User.findByIdAndUpdate(req.user._id, {
      password: hashPassword,
    });

    return res.status(200).json({
      message: "Ok",
      data: updatePassword,
    });
  } catch (error) {
    console.log(error);
    return next(createHttpError(500, "Error while forgot password"));
  }
};

export { registerUser, loginUser, forgotPassword };
