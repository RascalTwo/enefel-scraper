import { Request, Response } from "express";
import prisma from "../utils/db.js";
import { formatTeam } from "../utils/helpers.js";

const getTeams = async (req: Request, res: Response) => {
  const teams = await prisma.team.findMany({
    include: {
      details: true,
      stats: {
        include: {
          first_downs: true,
          down_conversions: true,
          offense: true,
          field_goals: true,
          touch_downs: true,
        },
      },
    },
  });
  res.json({ teams: teams });
};

const getTeam = async (req: Request, res: Response) => {
  const { teamslug } = req.params;
  const team = await prisma.team.findFirst({
    where: {
      name: formatTeam(teamslug),
    },
    include: {
      details: true,
      roster: true,
      stats: {
        include: {
          first_downs: true,
          offense: true,
          down_conversions: true,
          field_goals: true,
          touch_downs: true,
        },
      },
    },
  });
  res.json({ team });
};

export { getTeams, getTeam };
