import { Request, Response } from "express";
import prisma from "../utils/db.js";

const getTeams = async (req: Request, res: Response) => {
  const teams = await prisma.team.findMany();
  res.json(teams);
};

export { getTeams };
