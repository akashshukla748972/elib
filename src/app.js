import express from "express";

const app = express();

// routes
app.get("/", (req, res) => {
  res.status(200).json({
    message: "successfully connected to our site",
    success: true,
    error: false,
  });
});

export default app;
