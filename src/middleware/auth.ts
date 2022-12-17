import prisma from "../utils/db.js";
import { Request, Response, NextFunction } from "express";
import { createHash } from "../utils/helpers.js";
import { IReq } from "../utils/types.js";

export const checkToken = async (
  req: IReq,
  res: Response,
  next: NextFunction
) => {
  const token = req.header("Authorization");
  if (!token) {
    res.status(400).json({ error: "Not authorized to view this resource" });
  }

  const tokenTuple = token?.split(" ");
  if (tokenTuple && (tokenTuple[0] !== "Bearer" || !tokenTuple[1])) {
    res.status(400).json({
      error: "Invalid authorization, access to resource not granted",
    });
  }

  if (tokenTuple) {
    const isValid = validateToken(tokenTuple[1]);

    if (isValid) {
      try {
        const secret = createHash(tokenTuple[1]);
        const usr = await prisma.user.findFirst({
          where: {
            secret: secret,
          },
          select: {
            id: true,
            usage: true,
            access: true,
          },
        });

        if (usr) {
          req.user = usr;
        }
      } catch (err) {
        res
          .status(400)
          .json({ error: "Invalid token, not authorized to continue" });
      }
      next();
    } else {
      res.status(400).json({ error: "Not authorized to view this resource" });
    }
  }
};

const validateToken = (token: string | undefined) => {
  if (token === undefined) {
    return false;
  }

  console.log("token", token);
  return true;
};
