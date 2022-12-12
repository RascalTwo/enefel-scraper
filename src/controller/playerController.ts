import { Request, Response } from "express";
import prisma from "../utils/db.js";

export const getPlayer = async (req: Request, res: Response) => {
  const { team } = req.params;
  const formatTeam = team.replace(team.charAt(0), team.charAt(0).toUpperCase());
  const players = await prisma.team.findFirst({
    where: {
      teamName: formatTeam,
    },
    include: {
      roster: {
        include: {
          stats: true,
        },
      },
    },
  });
  res.json(players);
};
