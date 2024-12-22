import createHttpError from "http-errors";

const registerUser = (req, res, next) => {
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

  // Process
  // Response
  res.status(201).json({
    message: "user register successfully",
    success: true,
    data: req.body,
  });
};

export { registerUser };
