import axios from "axios";
import fetch from "node-fetch";
import { base, teamsUrl } from "./consts.js";
import { RosterPlayer, ScheduleGame, Stat, Team } from "./types.js";
import http from "http";
import https from "https";
import {
  playerStatsScraper,
  rosterScraper,
  scheduleScraper,
} from "./scrapers.js";
import { logger } from "./logger.js";
import prisma from "./db.js";
import type { Category } from "./types.js";
import { Player } from "@prisma/client";

export const getData = async (url: string): Promise<string> => {
  try {
    const { data } = await axios(url, {
      // httpAgent: new http.Agent({ keepAlive: true }),
      // httpsAgent: new https.Agent({ keepAlive: true }),
      headers: {
        "User-Agent": "Mozilla/5.0",
      },
    });
    // const data = await res.json();
    // console.log("response,", data);
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
      const roster = rosterScraper(html as string);
      return { ...d, roster };
    })
  );
  return teamRoster;
};

export const getPlayerStats = async () => {
  const roster = await prisma.player.findMany({
    select: {
      id: true,
      statsUrl: true,
      name: true,
    },
  });
  const withStats = await Promise.all(
    roster.map(async (p, i) => {
      logger.playerLogger(`${p.name} ${i}`);
      // await wait();

      const html = await getData(`${p.statsUrl}`);
      const stats = playerStatsScraper(html as string);
      return {
        ...p,
        status: stats.status ? stats.status : "Inactive",
        stats: stats.categories,
      };
    })
  );
  return withStats;
};

// const wait = () => {
//   return new Promise((resolve) => {
//     setTimeout(resolve, 3000);
//   });
// };
