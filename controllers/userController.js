const registerUser = (req, res) => {
  res.status(201).json({
    message: "user register successfully",
    success: true,
    data: req.body,
  });
};

export { registerUser };
