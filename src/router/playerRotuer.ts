import { Router } from "express";
import { getPlayer } from "../controller/playerController.js";
const playerRouter = Router();

playerRouter.get("/:team");

export default playerRouter;
