import express from "express";
import globalErrorHandler from "../middleware/globalErrorHandler.js";

const app = express();

// routes
app.get("/", (req, res) => {
  res.status(200).json({
    message: "successfully connected to our site",
    success: true,
    error: false,
  });
});

// global error handler
app.use(globalErrorHandler);

export default app;
