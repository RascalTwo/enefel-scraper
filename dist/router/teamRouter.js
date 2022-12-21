import { Router } from "express";
import { getTeams, getTeam } from "../controller/teamController.js";
const teamRouter = Router();
teamRouter.get("/", getTeams);
teamRouter.get("/:teamslug", getTeam);
export default teamRouter;
