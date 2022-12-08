export type Team = {
  teamName: string;
  urlSlug: string;
  teamIcon: string;
  teamCity: string;
  conference: "AFC" | "NFC";
  division: "north" | "south" | "east" | "west";
};
export type Schedule = ScheduleGame[];
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
export type Roster = RosterPlayer[];
export type RosterPlayer = {
  headshot: string;
  name: string;
  number: string;
  position: string;
  age: string;
  height: string;
  weight: string;
  experience: string;
  college: string | null;
};
