import express from "express"
import { CreateEventController } from "../middlewares/index.js";

export const eventRouter = express.Router();

eventRouter.post("/new", CreateEventController)