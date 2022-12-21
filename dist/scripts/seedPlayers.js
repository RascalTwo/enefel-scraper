import { getTeamRosters } from "../utils/services.js";
import { logger } from "../utils/logger.js";
import prisma from "../utils/db.js";
const seedRoster = async () => {
    const teams = await getTeamRosters();
    while (teams.length >= 1) {
        const team = teams.pop();
        if (team) {
            try {
                while (team.roster.length >= 1) {
                    const player = team.roster.pop();
                    if (player?.name && player.playerUrl) {
                        const createPlayer = await prisma.team.update({
                            where: { id: team.id },
                            data: {
                                roster: {
                                    create: {
                                        slugUrl: player?.playerUrl,
                                        headshot: player?.headshot,
                                        name: player?.name,
                                        number: player?.number,
                                        position: player?.position,
                                        height: player?.height,
                                        weight: player?.weight,
                                        experience: player?.experience,
                                        college: player?.college,
                                        status: player?.status,
                                    },
                                },
                            },
                        });
                        logger.success(`${createPlayer.name}`);
                    }
                }
            }
            catch (err) {
                logger.error(err.message);
            }
        }
    }
};
seedRoster();
