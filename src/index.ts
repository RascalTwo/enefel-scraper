import express from "express";
import teamsRouter from "./router/teamRouter.js";
import playerRouter from "./router/playerRotuer.js";
import scheduleRouter from "./router/scheduleRouter.js";

import { getData, getTeamRosters, getTeamStats } from "./utils/services.js";
import { teamsUrl } from "./utils/consts.js";
import { teamScraper } from "./utils/scrapers.js";
import prisma from "./utils/db.js";

const app = express();
const port = 5000;

// app.use("/", scheduleRouter);
app.get("/", async (req, res) => {
  const teams = await getTeamStats();
  res.json({ teams });
});

app.use("/teams", teamsRouter);

app.use("/players", playerRouter);

app.listen(port, () => console.log(`📡 server listening on port: ${port}`));
