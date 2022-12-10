import axios from "axios";
import { base, teamsUrl } from "./consts.js";
import { RosterPlayer, ScheduleGame, Team } from "./types.js";
import http from "http";
import https from "https";
import {
  playerStatsScraper,
  rosterScraper,
  scheduleScraper,
} from "./scrapers.js";

export const getData = async (url: string): Promise<string> => {
  try {
    const { data } = await axios.get(url, {
      httpAgent: new http.Agent({ keepAlive: true }),
      httpsAgent: new https.Agent({ keepAlive: true }),

      headers: {
        "User-Agent": "Mozilla/5.0",
      },
    });
    return data;
  } catch (err) {
    console.log("error", err);
    return "error";
  }
};

export const getSchedules = async (arr: Team[]) => {
  const teamSchedules = await Promise.all(
    arr.map(async (d) => {
      const scheduleSlug = d.urlSlug.replace("/nfl/team/", "/schedule/");
      const html = await getData(`${base}/nfl/team${scheduleSlug}`);
      const schedule = scheduleScraper(html);
      return { ...d, schedule };
    })
  );
  return teamSchedules;
};

export const getRoster = async (
  arr: (Team & { schedule: ScheduleGame[] })[]
) => {
  const teamRoster = await Promise.all(
    arr.map(async (d) => {
      const scheduleSlug = d.urlSlug.replace("/nfl/team/", "/roster/");
      const html = await getData(`${base}/nfl/team${scheduleSlug}`);
      const roster = rosterScraper(html);
      return { ...d, roster };
    })
  );
  return teamRoster;
};

export const getPlayerStats = async (
  teams: (Team & { schedule: ScheduleGame[]; roster: RosterPlayer[] })[]
) => {
  const teamWithPlayerStats = await Promise.all(
    teams.map(async (d) => {
      const withStats = await Promise.all(
        d.roster.map(async (p) => {
          const statsSlug = p.statsUrl;
          const html = await getData(`${statsSlug}`);
          const stats = playerStatsScraper(html);
          return {
            ...p,
            status: stats.status ? stats.status : "Inactive",
            stats: stats.categories,
          };
        })
      );
      return { ...d, roster: withStats };
    })
  );
  return teamWithPlayerStats;
};
