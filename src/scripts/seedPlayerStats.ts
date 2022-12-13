import prisma from "../utils/db.js";
import { logger } from "../utils/logger.js";
// import { getPlayerStats } from "../utils/services.js";
import { Category } from "../utils/types.js";

export const seedStats = async (
  players: {
    name: string;
    statsUrl: string;
    id: string;
    status: string;
    stats: Category[] | null;
  }[]
) => {
  const formatPlayers = players.slice(0, 3).map((p) => {
    return {
      ...p,
      stats: p.stats?.flatMap((c) => {
        const cat = c.category;
        return c.seasons.flatMap((s) => {
          const season = s.season;
          const team = s.team;
          return s.stats.flatMap((st) => ({
            category: cat,
            season,
            team,
            title: st.title,
            stat: st.stat,
          }));
        });
      }),
    };
  });
  // logger.base(formatPlayers);
  const updatedPlayers = await Promise.all(
    formatPlayers.map(async (p) => {
      logger.base(`${p.name} prisma update`);
      if (p.stats) {
        const updateP = await prisma.player.update({
          data: {
            status: p.status,
            stats: {
              createMany: {
                data: p.stats.map((s) => {
                  return {
                    season: s.season,
                    category: s.category,
                    team: s.team,
                    title: s.title,
                    stat: s.stat,
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
};
// getPlayerStats();
