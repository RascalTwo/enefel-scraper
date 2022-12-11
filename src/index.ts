import express, { Request, Response } from "express";
import { teamScraper } from "./utils/scrapers.js";
import {
  getData,
  getPlayerStats,
  getRoster,
  getSchedules,
} from "./utils/services.js";
import { teamsUrl } from "./utils/consts.js";

const app = express();
const port = 5000;

app.get("/", async (req: Request, res: Response) => {
  const teamsHTML = await getData(teamsUrl);
  const teamData = teamScraper(teamsHTML);
  const schedules = await getSchedules(teamData.slice(0, 16));
  const roster = await getRoster(schedules);
  const playerStats = await getPlayerStats(roster);
  console.log("🌟 success!!!!");
  res.json(playerStats);
});

app.listen(port, () => console.log(`📡 server listening on port: ${port}`));
