import { teamsUrl } from "../utils/consts.js";
import { teamScraper } from "../utils/scrapers.js";
import { getData, getTeamDetails } from "../utils/services.js";
import { logger } from "../utils/logger.js";
import prisma from "../utils/db.js";

const seedTeams = async () => {
  const teamsHTML = await getData(teamsUrl);
  const teams = teamScraper(teamsHTML);
  const withDetails = await getTeamDetails(teams);
  while (withDetails.length >= 1) {
    const team = withDetails.pop();
    if (team && team.details) {
      try {
        logger.start(`${team.team} seed`);
        const seed = await prisma.team.upsert({
          where: { name: team.team },
          update: {
            details: {
              update: {
                // rank: team.details.rank as string,
                rank: team.details.rank as string,
                wins: team.details.wins as string,
                losses: team.details.loss as string,
                ties: team.details.ties as string,
                coach: team.details.coach as string,
              },
            },
          },
          create: {
            name: team.team,
            icon: team.icon,
            urlSlug: team.profUrl,
            city: team.city,
            conference: team.conference,
            division: team.details.division as string,
            details: {
              create: {
                rank: team.details.rank as string,
                wins: team.details.wins as string,
                losses: team.details.loss as string,
                ties: team.details.ties as string,
                coach: team.details.coach as string,
                stadium: team.details.stadium as string,
              },
            },
          },
        });
        logger.success(team.team);
      } catch (err) {
        logger.error((err as Error).message);
      }
    }
  }
};
seedTeams();
