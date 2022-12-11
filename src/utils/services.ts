import axios from "axios";
import fetch from "node-fetch";
import { base, teamsUrl } from "./consts.js";
import { RosterPlayer, ScheduleGame, Team } from "./types.js";
import http from "http";
import https from "https";
import {
  playerStatsScraper,
  rosterScraper,
  scheduleScraper,
} from "./scrapers.js";
import { logger } from "./test.js";

export const getData = async (url: string): Promise<string> => {
  try {
    const res = await fetch(url, {
      // httpAgent: new http.Agent({ keepAlive: true }),
      // httpsAgent: new https.Agent({ keepAlive: true }),
      headers: {
        "User-Agent": "Mozilla/5.0",
        "content-type": "application/json",
      },
    });
    // const data = await res.json();
    // console.log("response,", data);
    return await res.text();
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
      const roster = rosterScraper(html as string);
      return { ...d, roster };
    })
  );
  return teamRoster;
};

export const getPlayerStats = async (
  teams: (Team & { schedule: ScheduleGame[]; roster: RosterPlayer[] })[]
) => {
  const teamWithPlayerStats = await Promise.all(
    teams.map(async (t) => {
      logger.teamLogger(t.teamName);
      logger.waitLogger();
      await wait();
      logger.resumeLogger();

      const withStats = Promise.all(
        // remove this slice
        t.roster.map(async (p) => {
          logger.playerLogger(p.name);
          logger.waitLogger();
          await wait();
          logger.resumeLogger();

          const statsSlug = p.statsUrl;
          const html = await getData(`${statsSlug}`);
          const stats = playerStatsScraper(html as string);
          return {
            ...p,
            status: stats.status ? stats.status : "Inactive",
            stats: stats.categories,
          };
        })
      );
      return { ...t, roster: withStats };
    })
  );
  return teamWithPlayerStats;
};
const wait = () => {
  return new Promise((resolve) => {
    setTimeout(resolve, 3000);
  });
};
