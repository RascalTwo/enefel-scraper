import { getPlayerStats } from "../utils/services.js";
import { logger } from "../utils/logger.js";
import prisma from "../utils/db.js";
const updatePlayerStats = async () => {
    const teams = await getPlayerStats();
    while (teams.length >= 1) {
        const team = teams.pop();
        if (team) {
            try {
                while (team.roster.length >= 1) {
                    const player = team.roster.pop();
                    if (player?.name && player.stats) {
                        const playerWithStats = await prisma.player.update({
                            where: { id: player.id },
                            data: {
                                status: player.stats.status,
                                stats: {
                                    upsert: player.stats.stats.map((st) => {
                                        return {
                                            create: {
                                                week: st.week,
                                                opponent: st.opponent,
                                                result: st.result,
                                                performance: {
                                                    createMany: {
                                                        data: st.stats.map((s) => {
                                                            return {
                                                                title: s?.title,
                                                                stat: s?.stat,
                                                            };
                                                        }),
                                                    },
                                                },
                                            },
                                            update: {
                                                result: st.result,
                                                performance: {
                                                    upsert: st.stats.map((s) => {
                                                        return {
                                                            create: {
                                                                title: s?.title,
                                                                stat: s?.stat,
                                                            },
                                                            update: {
                                                                title: s?.title,
                                                                stat: s?.stat,
                                                            },
                                                            where: {
                                                                id: s?.id ?? "bogus123",
                                                            },
                                                        };
                                                    }),
                                                },
                                            },
                                            where: {
                                                id: st.id ?? "bogusbonus",
                                            },
                                        };
                                    }),
                                },
                            },
                        });
                        logger.success(`${player.name}`);
                    }
                }
            }
            catch (err) {
                logger.error(err.message);
            }
        }
    }
};
updatePlayerStats();
