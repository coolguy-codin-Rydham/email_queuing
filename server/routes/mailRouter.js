import { EmailSendController } from "../middlewares/index.js";
import express from "express"

export const mailRouter = express.Router();

mailRouter.post("/send",EmailSendController );

