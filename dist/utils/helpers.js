import crypto from "crypto";
import path from "path";
import { fileURLToPath } from "url";
import fs from "fs";
export const formatTeam = (team) => team.replace(team.charAt(0), team.charAt(0).toUpperCase());
export const createHash = (token) => {
    return crypto.createHash("sha256").update(token).digest("hex");
};
const __filename = fileURLToPath(import.meta.url);
export const __dirname = path.dirname(__filename);
export const emailTemplateSrc = fs.readFileSync(path.join(__dirname, "../views/main.hbs"));
