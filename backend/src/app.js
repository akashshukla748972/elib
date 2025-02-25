import express from "express";
import globalErrorHandler from "../middleware/globalErrorHandler.js";
import userRouter from "../routes/userRouter.js";
import bookRouter from "../routes/bookRouter.js";

const app = express();

// middleware
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

// routes
app.get("/", (req, res) => {
  res.status(200).json({
    message: "successfully connected to our site",
    success: true,
    error: false,
  });
});
app.use("/api/users", userRouter);
app.use("/api/books", bookRouter);

// global error handler
app.use(globalErrorHandler);

export default app;
