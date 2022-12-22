var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
import { teamsUrl } from "../utils/consts.js";
import { teamScraper } from "../utils/scrapers.js";
import { getData, getTeamDetails } from "../utils/services.js";
import { logger } from "../utils/logger.js";
import prisma from "../utils/db.js";
const updateTeams = () => __awaiter(void 0, void 0, void 0, function* () {
    const teamsHTML = yield getData(teamsUrl);
    const teams = teamScraper(teamsHTML);
    const withDetails = yield getTeamDetails(teams);
    while (withDetails.length >= 1) {
        const team = withDetails.pop();
        if (team && team.details) {
            try {
                logger.start(`${team.team} seed`);
                const seed = yield prisma.team.upsert({
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
});
updateTeams();
