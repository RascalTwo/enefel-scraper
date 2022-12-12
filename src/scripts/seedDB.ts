import { teamsUrl } from "../utils/consts.js";
import { teamScraper } from "../utils/scrapers.js";
import {
  getData,
  getPlayerStats,
  getRoster,
  getSchedules,
} from "../utils/services.js";
import { logger } from "../utils/logger.js";
import prisma from "../utils/db.js";
import { Player } from "@prisma/client";
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
  const schedules = await getSchedules(teamData);
  if (schedules) {
    logger.success("schedules");
  }
  const roster = await getRoster(schedules);
  if (roster) {
    logger.success("roster");
  }

  logger.base("🚀 scrape complete");
  return roster;
  //   logger.base(playerStats);
};
const seedDB = async () => {
  const roster = await getNFL();
  await Promise.all(
    roster.map(async (t) => {
      await prisma.team.create({
        data: {
          teamName: t.teamName,
          teamIcon: t.teamIcon,
          teamCity: t.teamCity,
          conference: t.conference,
          division: t.division,
          urlSlug: t.urlSlug,
          schedule: {
            createMany: {
              data: t.schedule.map((s) => {
                return {
                  gameUrl: s.gameUrl ? s.gameUrl : ("TBD" as string),
                  date: s.date as string,
                  opponent: s.opponent as string,
                  homeOrAway: s.homeOrAway as string,
                  outcome: s.outcome ? s.outcome : ("TBD" as string),
                  score: s.score ? s.score : ("TBD" as string),
                };
              }),
            },
          },
          roster: {
            createMany: {
              data: t.roster.map((r) => {
                return {
                  statsUrl: r.statsUrl as string,
                  headshot: r.headshot as string,
                  lineup: r.lineup as string,
                  name: r.name as string,
                  number: r.number,
                  position: r.position as string,
                  age: r.age as string,
                  height: r.height as string,
                  weight: r.weight as string,
                  experience: r.experience as string,
                  college: r.college as string,
                };
              }),
            },
          },
        },
      });
    })
  );
};
seedDB();
