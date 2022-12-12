import express, { Request, Response } from "express";
import prisma from "./utils/db.js";
import { getPlayerStats } from "./utils/services.js";

const app = express();
const port = 5000;

app.get("/", async (req: Request, res: Response) => {
  const teams = await prisma.team.findMany({
    include: {
      schedule: true,
      roster: true,
    },
  });
  res.json(teams);
});

app.get("/players", async (req: Request, res: Response) => {
  const players = await getPlayerStats();
  res.json(players);
});

app.listen(port, () => console.log(`📡 server listening on port: ${port}`));
