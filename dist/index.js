import express from "express";
import registerRouter from "./router/registerRouter.js";
import teamsRouter from "./router/teamRouter.js";
import playerRouter from "./router/playerRotuer.js";
import { checkToken } from "./middleware/auth.js";
import { updateUsage } from "./middleware/updateUsage.js";
const app = express();
const port = 5000;
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
// const __filename = fileURLToPath(import.meta.url);
// export const __dirname = path.dirname(__filename);
// app.set("view engine", "hbs");
// app.set("views", __dirname + "/templates");
app.use("/register", registerRouter);
app.use("/teams", checkToken, updateUsage, teamsRouter);
app.use("/players", checkToken, updateUsage, playerRouter);
// app.get("/", (req, res) => {
//   res.render("main.hbs", {
//     root: "src/templates",
//     message: "THIS IS THE MESSAGE",
//   });
// });
app.listen(port, () => console.log(`📡 server listening on port: ${port}`));
