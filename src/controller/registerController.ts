import { Request, Response } from "express";
import crypto from "crypto";
import prisma from "../utils/db.js";
import { createHash } from "../utils/helpers.js";

// const randomString = crypto.randomBytes(32).toString("hex");

// const hashString = crypto
//   .createHash("sha256")
//   .update(randomString)
//   .digest("hex");

const registerUser = async (req: Request, res: Response) => {
  const { email } = req.body;
  if (!email) {
    res.status(400).json({
      error: "Must provide an email to register for this service",
    });
  } else {
    /* 
	  validate email w/ zod
    */

    /* 
	 generate random string and hash that string, save user email & hashedString to db
	 
	 dispatch email to provided with random string to attach to requests for comparison
    */
    const randomString = crypto.randomBytes(32).toString("hex");
    const secret = createHash(randomString);

    const alreadyUser = await prisma.user.findFirst({
      where: {
        email: email as string,
      },
    });

    if (alreadyUser) {
      res.status(500).json({
        error: "Already in use",
      });
    } else {
      await prisma.user.create({
        data: {
          email: email as string,
          secret: secret,
          usage: 0,
        },
      });

      res.json({
        randomString,
        message: `Email sent to ${email}`,
      });
    }
  }
};

export { registerUser };
