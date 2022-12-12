// import { teamsUrl } from "./utils/consts.js";
// import { teamScraper } from "./utils/scrapers.js";
// import {
//   getData,
//   getPlayerStats,
//   getRoster,
//   getSchedules,
// } from "./utils/services.js";
// import { logger } from "./utils/logger.js";

// const getNFL = async () => {
//   logger.start();
//   const teamsHTML = await getData(teamsUrl);
//   if (teamsHTML) {
//     logger.success("teamsHTML");
//   }
//   const teamData = teamScraper(teamsHTML);
//   if (teamData) {
//     logger.success("teamData");
//   }
//   const schedules = await getSchedules(teamData);
//   if (schedules) {
//     logger.success("schedules");
//   }
//   const roster = await getRoster(schedules);
//   if (roster) {
//     logger.success("roster");
//   }
//   const playerStats = await getPlayerStats(roster);
//   if (playerStats) {
//     logger.success("playerStats");
//   }
//   logger.success("scrape");
//   logger.base(playerStats);
// };
// // getNFL();
