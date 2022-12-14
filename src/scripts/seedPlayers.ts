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
                    slugUrl: player?.playerUrl as string,
                    headshot: player?.headshot as string,
                    name: player?.name as string,
                    number: player?.number as string,
                    position: player?.position as string,
                    height: player?.height as string,
                    weight: player?.weight as string,
                    experience: player?.experience as string,
                    college: player?.college as string,
                    status: player?.status as string,
                  },
                },
              },
            });
            logger.success(`${createPlayer.name}`);
          }
        }
      } catch (err) {
        logger.error((err as Error).message);
      }
    }
  }
};
seedRoster();
