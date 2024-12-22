import express from "express";
import { registerUser } from "../controllers/userController.js";

const userRouter = express();

userRouter.post("/register", registerUser);

export default userRouter;