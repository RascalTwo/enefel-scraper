import { teamsUrl } from "../utils/consts.js";
import { teamScraper } from "../utils/scrapers.js";
import { getData, getTeamDetails } from "../utils/services.js";
import { logger } from "../utils/logger.js";
import prisma from "../utils/db.js";
const updateTeams = async () => {
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
                                rank: team.details.rank,
                                wins: team.details.wins,
                                losses: team.details.loss,
                                ties: team.details.ties,
                                coach: team.details.coach,
                            },
                        },
                    },
                    create: {
                        name: team.team,
                        icon: team.icon,
                        urlSlug: team.profUrl,
                        city: team.city,
                        conference: team.conference,
                        division: team.details.division,
                        details: {
                            create: {
                                rank: team.details.rank,
                                wins: team.details.wins,
                                losses: team.details.loss,
                                ties: team.details.ties,
                                coach: team.details.coach,
                                stadium: team.details.stadium,
                            },
                        },
                    },
                });
                logger.success(team.team);
            }
            catch (err) {
                logger.error(err.message);
            }
        }
    }
};
updateTeams();
