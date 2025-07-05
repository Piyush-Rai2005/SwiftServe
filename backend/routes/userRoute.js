import express from "express";
import { loginUser, registerUser, getUserDetails } from "../controllers/userController.js";
import authMiddleware from "../middleware/auth.js";

const userRouter = express.Router();

userRouter.post("/register", registerUser);
userRouter.post("/login", loginUser);
userRouter.get("/details", authMiddleware, getUserDetails);

export default userRouter;
