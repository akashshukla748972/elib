import express from "express";
import globalErrorHandler from "../middleware/globalErrorHandler.js";
import userRouter from "../routes/userRouter.js";

const app = express();

// routes
app.get("/", (req, res) => {
  res.status(200).json({
    message: "successfully connected to our site",
    success: true,
    error: false,
  });
});
app.use("/api/users", userRouter);

// global error handler
app.use(globalErrorHandler);

export default app;
