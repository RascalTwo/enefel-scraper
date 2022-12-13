import { Request, Response } from "express";
import prisma from "../utils/db.js";
import { formatTeam } from "../utils/helpers.js";

const getTeams = async (req: Request, res: Response) => {
  const teams = await prisma.team.findMany();
  res.json({ teams: teams });
};

const getTeam = async (req: Request, res: Response) => {
  const { teamslug } = req.params;
  const team = await prisma.team.findFirst({
    where: {
      teamName: formatTeam(teamslug),
    },
    include: {
      roster: true,
      schedule: true,
    },
  });
  res.json({ team });
};

export { getTeams, getTeam };
