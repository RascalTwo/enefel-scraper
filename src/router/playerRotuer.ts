import { Router } from "express";
import {
  getPlayers,
  getPlayerSearch,
  getPlayerById,
} from "../controller/playerController.js";
const playerRouter = Router();

playerRouter.get("/:team", getPlayers);

playerRouter.get("/player/:playerslug", getPlayerSearch);

playerRouter.get("/player/id/:playerID", getPlayerById);

export default playerRouter;
