export type RawTeam = {
  team: string;
  profUrl: string;
  city: string;
  icon: string;
  conference: "AFC" | "NFC";
};
export type ScheduleGame = {
  date: string;
  gameUrl: string;
  status: string;
  away: ScheduleTeam;
  home: ScheduleTeam;
};
type ScheduleTeam = {
  team: string;
  score: string;
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
export type Category = {
  category: string | null;
  seasons: Season[];
};
export type Season = {
  season: string | null;
  team: string | null;
  stats: Stat[];
};
export type Stat = {
  title: string | null;
  stat: string | null;
};
