import express from "express";
import createHttpError from "http-errors";
import globalErrorHandler from "../middleware/globalErrorHandler.js";

const app = express();

// routes
app.get("/", (req, res) => {
  const error = createHttpError(400, "Somthing went wrong");
  throw error;
  //   res.status(200).json({
  //     message: "successfully connected to our site",
  //     success: true,
  //     error: false,
  //   });
});

// global error handler
app.use(globalErrorHandler);

export default app;
