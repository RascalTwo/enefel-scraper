import { teamsUrl } from "./consts.js";
import { teamScraper } from "./scrapers.js";
import {
  getData,
  getPlayerStats,
  getRoster,
  getSchedules,
} from "./services.js";

const getNFL = async () => {
  const teamsHTML = await getData(teamsUrl);
  const teamData = teamScraper(teamsHTML);
  const schedules = await getSchedules(teamData);
  const roster = await getRoster(schedules);
  //   const playerStats = await getPlayerStats(roster);
  console.log("🌟 success!!!!");
  console.log(roster);
};
getNFL();
