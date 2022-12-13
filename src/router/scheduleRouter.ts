import { Router } from "express";
import { getSchedule } from "../controller/scheduleController.js";
const scheduleRouter = Router();

scheduleRouter.get("/", getSchedule);

export default scheduleRouter;
