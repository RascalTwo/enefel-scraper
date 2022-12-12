import prisma from "../utils/db.js";
import { logger } from "../utils/logger.js";
import { getPlayerStats } from "../utils/services.js";

const seedStats = async () => {
  const players = await getPlayerStats();
  if (players) {
    const updatedPlayers = await Promise.all(
      players.map(async (p) => {
        logger.base(`${p.name} prisma update`);
        if (p.stats) {
          const updateP = await prisma.player.update({
            data: {
              status: p.status,
              stats: {
                createMany: {
                  data: p.stats.map((s) => {
                    return {
                      category: s.category as string,
                      seasons: {
                        createMany: {
                          data: s.seasons.map((szn) => {
                            return {
                              season: szn.season as string,
                              team: szn.team as string,
                              stats: {
                                createMany: {
                                  data: szn.stats.map((stat) => {
                                    return {
                                      title: stat.title as string,
                                      stat: stat.stat as string,
                                    };
                                  }),
                                },
                              },
                            };
                          }),
                        },
                      },
                    };
                  }),
                },
              },
            },
            where: { id: p.id },
          });
        }
      })
    );
  }
};
seedStats();
