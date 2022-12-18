import crypto from "crypto";
import path from "path";
import { fileURLToPath } from "url";
import fs from "fs";

export const formatTeam = (team: string) =>
  team.replace(team.charAt(0), team.charAt(0).toUpperCase());
export const createHash = (string: string) => {
  return crypto.createHash("sha256").update(string).digest("hex");
};

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

export const emailTemplateSrc = fs.readFileSync(
  path.join(__dirname, "../templates/main.handlebars")
);
