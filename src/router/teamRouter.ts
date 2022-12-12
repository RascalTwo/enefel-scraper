import { Router } from "express";
import { getTeams } from "../controller/teamController.js";

const teamRouter = Router();

teamRouter.get("/", getTeams);

export default teamRouter;
