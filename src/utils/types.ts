import { Request } from "express";

export type RawTeam = {
  team: string;
  profUrl: string;
  city: string;
  icon: string;
  conference: "AFC" | "NFC";
};
export type RosterPlayer = {
  headshot: string;
  name: string;
  playerUrl: string;
  number: string;
  position: string;
  status: string;
  height: string;
  weight: string;
  experience: string;
  college: string;
};
export type RawTeamStats = {
  id?: string;
  first_downs: RawFirstDown;
  down_conversion: RawDownConversion;
  general: RawGeneral;
  rushing: RawRushing;
  passing: RawPassing;
  sacks: string;
  field_goals: RawFieldGoal;
  touch_downs: RawTD;
  turnover_ratio: string;
};
type RawFirstDown = {
  id?: string;
  total_first_downs: string;
  rushing: string;
  passing: string;
  penalty: string;
};
type RawDownConversion = {
  id?: string;
  down: string;
  successful: string;
  attempts: string;
};
type RawGeneral = {
  id?: string;
  total_yards: string;
  plays: string;
  average: string;
};
type RawRushing = {
  id?: string;
  total_yards: string;
  plays: string;
  average: string;
};
type RawPassing = {
  id?: string;
  total_yards: string;
  completions: string;
  attempts: string;
  interceptions: string;
  average: string;
};
type RawFieldGoal = {
  id?: string;
  successful: string;
  attempts: string;
};
type RawTD = {
  id?: string;
  total: string;
  rushing: string;
  passing: string;
  returns: string;
  defensive: string;
};
export interface IReq extends Request {
  user?: {
    id: string;
    usage: number;
    access: string;
  };
}
