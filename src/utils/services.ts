import axios from "axios";
import prisma from "../utils/db.js";
import { base } from "./consts.js";
import { logger } from "./logger.js";
import {
  teamDetailsScraper,
  teamRosterScraper,
  teamStatsScraper,
} from "./scrapers.js";
import { RawTeam, RawTeamStats } from "./types.js";

export const getData = async (url: string): Promise<string> => {
  try {
    const { data } = await axios(url, {
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

export const getTeamDetails = async (teamArr: RawTeam[]) => {
  const teamsWithDetails = [];
  while (teamArr.length >= 1) {
    const team = teamArr.pop();
    if (team) {
      const detailsHTML = await getData(`${base}${team?.profUrl}`);
      const details = teamDetailsScraper(detailsHTML);

      teamsWithDetails.push({ ...team, details });
    }
  }
  return teamsWithDetails;
};

export const getTeamRosters = async () => {
  const teams = await prisma.team.findMany();
  const withRoster = [];
  while (teams.length >= 1) {
    const team = teams.pop();
    if (team) {
      const teamHTML = await getData(`${base}${team.urlSlug}roster`);
      const roster = teamRosterScraper(teamHTML);

      withRoster.push({ ...team, roster: roster });
    }
  }
  return withRoster;
};

export const getTeamStats = async () => {
  const teams = await prisma.team.findMany({
    select: {
      id: true,
      urlSlug: true,
      stats: {
        select: {
          id: true,
          first_downs: {
            select: {
              id: true,
            },
          },
          down_conversions: {
            select: {
              id: true,
            },
          },
          offense: {
            select: {
              id: true,
            },
          },
          field_goals: {
            select: {
              id: true,
            },
          },
          touch_downs: {
            select: {
              id: true,
            },
          },
        },
      },
    },
  });

  const withStats = [];
  while (teams.length >= 1) {
    const team = teams.pop();
    if (team) {
      logger.start(`${team.urlSlug}`);
      const teamHTML = await getData(`${base}${team.urlSlug}stats`);
      const stats = teamStatsScraper(teamHTML);

      withStats.push({
        ...team,
        stats: {
          ...team.stats,
          first_downs: { ...team.stats?.first_downs, ...stats?.first_downs },
          down_conversions: [
            {
              ...team.stats?.down_conversions[0],
              ...stats?.down_conversions[0],
            },
            {
              ...team.stats?.down_conversions[1],
              ...stats?.down_conversions[1],
            },
          ],
          offense: {
            general_total_yards: stats?.general.total_yards,
            general_plays: stats?.general.plays,
            general_average_yards: stats?.general.average,
            rushing_total_yards: stats?.rushing.total_yards,
            rushing_plays: stats?.rushing.plays,
            rushing_average_yards: stats?.rushing.average,
            passing_completions: stats?.passing.completions,
            passing_attempts: stats?.passing.attempts,
            passing_interceptions: stats?.passing.interceptions,
            passing_average_yards: stats?.passing.average,
          },
          sacks: stats?.sacks,
          field_goals: { ...team.stats?.field_goals, ...stats?.field_goals },
          touch_downs: { ...team.stats?.touch_downs, ...stats?.touch_downs },
          turnover_ratio: stats?.turnover_ratio,
        },
      });
    }
  }
  return withStats;
};
