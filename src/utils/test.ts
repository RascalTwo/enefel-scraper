import { teamsUrl } from "./consts.js";
import { teamScraper } from "./scrapers.js";
import {
  getData,
  getPlayerStats,
  getRoster,
  getSchedules,
} from "./services.js";

export const logger = {
  base: (text: string | any) => console.log(text),
  success: (text: string) => logger.base(`🌟 ${text} success!!!!`),
  start: () => logger.base("🔧 scrape start"),
  teamLogger: (team: string) => logger.base(`🏈 ${team}`),
  playerLogger: (player: string) => logger.base(`🏅 ${player}`),
  waitLogger: () => logger.base("🕐 waiting..."),
  resumeLogger: () => logger.base("🔧 resuming"),
};

const getNFL = async () => {
  logger.start();
  const teamsHTML = await getData(teamsUrl);
  if (teamsHTML) {
    logger.success("teamsHTML");
  }
  const teamData = teamScraper(teamsHTML);
  if (teamData) {
    logger.success("teamData");
  }
  const schedules = await getSchedules(teamData.slice(0, 10));
  if (schedules) {
    logger.success("schedules");
  }
  const roster = await getRoster(schedules);
  if (roster) {
    logger.success("roster");
  }
  const playerStats = await getPlayerStats(roster);
  if (playerStats) {
    logger.success("playerStats");
  }
  // console.log(playerStats);
  logger.success("scrape");
  logger.base(playerStats);
};
getNFL();
