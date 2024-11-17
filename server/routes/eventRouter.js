import express from "express"
import { CreateEventController } from "../middlewares/index.js";
import { GetAllEvents, GetEventByEventId } from "../middlewares/eventController.js";

export const eventRouter = express.Router();

// Create
eventRouter.post("/new" ,CreateEventController)

//Read
eventRouter.get("/get/all", GetAllEvents)
eventRouter.get("/get/:id", GetEventByEventId)

//Update