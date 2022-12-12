import express, { Request, Response } from "express";
import { getNFL } from "./test.js";
import prisma from "./utils/db.js";
import teamsRouter from "./router/teamRouter.js";
import playerRouter from "./router/playerRotuer.js";
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

app.use("/teams", teamsRouter);

app.use("/players", playerRouter);

app.listen(port, () => console.log(`📡 server listening on port: ${port}`));
