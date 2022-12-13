import { Request, Response } from "express";
import prisma from "../utils/db.js";

export const getSchedule = async (req: Request, res: Response) => {
  const schedule = await prisma.team.findMany({
    include: {
      schedule: {
        include: {
          team: true,
        },
      },
    },
  });
  const flattenSchedule = schedule.flatMap((team) => {
    return team.schedule.flatMap((s) => s);
  });
  res.json({ schedule: flattenSchedule });
};
