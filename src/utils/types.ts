export type Team = {
  teamName: string;
  urlSlug: string;
  teamIcon: string;
  teamCity: string;
  conference: "AFC" | "NFC";
  division: "north" | "south" | "east" | "west";
};
export type ScheduleGame = {
  gameUrl: string | null;
  date: string;
  opponent: string;
  homeOrAway: string;
  outcome: string | null;
  score: string | null;
};
type ScheduleStat = {
  player: string;
  yards: number;
};
export type RosterPlayer = {
  statsUrl: string;
  headshot: string;
  lineup: "Offense" | "Defense" | "Special Teams" | string | null;
  name: string;
  number: string;
  position: string;
  age: string;
  height: string;
  weight: string;
  experience: string;
  college: string | null;
};
