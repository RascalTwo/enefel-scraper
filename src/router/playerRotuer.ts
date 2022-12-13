import { Router } from "express";
import { getPlayers, getPlayer } from "../controller/playerController.js";
const playerRouter = Router();

playerRouter.get("/:team", getPlayers);

playerRouter.get("/player/:playerslug", getPlayer);

export default playerRouter;
