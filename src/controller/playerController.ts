import { Request, Response } from "express";
import prisma from "../utils/db.js";
import { formatTeam } from "../utils/helpers.js";

const getPlayers = async (req: Request, res: Response) => {
  const { team } = req.params;
  const players = await prisma.team.findFirst({
    where: {
      name: formatTeam(team),
    },
  });
  res.json({ players: players });
};

const getPlayer = async (req: Request, res: Response) => {
  const { playerslug } = req.params;
  const formatPlayer = playerslug
    .split(" ")
    .map((n) => formatTeam(n))
    .join(" ");

  const player = await prisma.player.findFirst({
    where: {
      name: formatPlayer,
    },
    include: {
      team: true,
    },
  });
  res.json({ player });
};
export { getPlayers, getPlayer };
