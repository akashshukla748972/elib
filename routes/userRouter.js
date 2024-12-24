import express from "express";
import {
  registerUser,
  loginUser,
  forgotPassword,
} from "../controllers/userController.js";
import verifyToken from "../middleware/verifyJwtToken.js";

const userRouter = express();

userRouter.post("/register", registerUser);
userRouter.post("/login", loginUser);
userRouter.post("/forgot_password", verifyToken, forgotPassword);

export default userRouter;
