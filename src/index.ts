import express from "express";
import teamsRouter from "./router/teamRouter.js";
import playerRouter from "./router/playerRotuer.js";

const app = express();
const port = 5000;

app.use("/teams", teamsRouter);

app.use("/players", playerRouter);

app.listen(port, () => console.log(`📡 server listening on port: ${port}`));
