import express from "express";
import upload from "../utils/multer.js";
import { LoginController, SignupController, VerifyToken } from "../middlewares/index.js";

export const authRouter = express.Router();

authRouter.post("/signup", upload.single("image"), SignupController);
authRouter.post("/login", VerifyToken, LoginController);
                     