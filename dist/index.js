import express from "express";
import { getData } from "./services/scraper.js";
const app = express();
const port = 5000;
app.get("/", async (req, res) => {
    const data = await getData();
    res.json(data);
});
app.listen(port, () => console.log(`📡 server listening on port: ${port}`));
