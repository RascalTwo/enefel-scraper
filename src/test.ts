import { teamsUrl } from "./utils/consts.js";
import { playerStatsScraper, teamScraper } from "./utils/scrapers.js";
import {
  getData,
  getPlayerStats,
  getRoster,
  getSchedules,
} from "./utils/services.js";
import { logger } from "./utils/logger.js";
import { RosterPlayer, ScheduleGame } from "./utils/types.js";

export const getNFL = async () => {
  logger.start();
  const teamsHTML = await getData(teamsUrl);
  if (teamsHTML) {
    logger.success("teamsHTML");
  }
  const teamData = teamScraper(teamsHTML);
  if (teamData) {
    logger.success("teamData");
  }
  const schedules = await getSchedules(teamData.slice(0, 3));
  if (schedules) {
    logger.success("schedules");
  }
  const roster = await getRoster(schedules);
  if (roster) {
    logger.success("roster");
  }
  const playerStats = await playerStatsTest(roster);
  if (playerStats) {
    logger.success("playerStats");
  }
  logger.success("scrape");
  return playerStats;
};
// getNFL();

const playerStatsTest = async (
  roster: {
    roster: RosterPlayer[];
    teamName: string;
    urlSlug: string;
    teamIcon: string;
    teamCity: string;
    conference: "AFC" | "NFC";
    division: "north" | "south" | "east" | "west";
    schedule: ScheduleGame[];
  }[]
) => {
  const updatePlayers = await Promise.all(
    roster.map(async (t, i) => {
      logger.start();
      const withStats = await Promise.all(
        t.roster.map(async (p, i) => {
          const html = await getData(`${p.statsUrl}`);
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

  return updatePlayers;
};
