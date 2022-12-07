import express, { Request, Response } from "express";
import { parser } from "./utils/parser.js";
import { getData } from "./utils/scraper.js";

const app = express();
const port = 5000;

app.get("/", async (req: Request, res: Response) => {
  const html = await getData();
  const teamData = parser(html);

  res.json(teamData);
});

app.listen(port, () => console.log(`📡 server listening on port: ${port}`));
