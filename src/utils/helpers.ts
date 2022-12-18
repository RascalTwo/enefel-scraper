import crypto from "crypto";

export const formatTeam = (team: string) =>
  team.replace(team.charAt(0), team.charAt(0).toUpperCase());
export const createHash = (string: string) => {
  return crypto.createHash("sha256").update(string).digest("hex");
};
