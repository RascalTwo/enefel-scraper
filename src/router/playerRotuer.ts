import { Router } from "express";
import {
  getPlayers,
  getPlayerSearch,
  getPlayerById,
} from "../controller/playerController.js";
const playerRouter = Router();

playerRouter.get("/:team", getPlayers);

playerRouter.get("/search/:playerslug", getPlayerSearch);

playerRouter.get("/id/:playerID", getPlayerById);

export default playerRouter;
