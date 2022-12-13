import express, { Request, Response } from "express";
import prisma from "./utils/db.js";
import teamsRouter from "./router/teamRouter.js";
import playerRouter from "./router/playerRotuer.js";
import scheduleRouter from "./router/scheduleRouter.js";

const app = express();
const port = 5000;

app.use("/", scheduleRouter);

app.use("/teams", teamsRouter);

app.use("/players", playerRouter);

app.listen(port, () => console.log(`📡 server listening on port: ${port}`));
