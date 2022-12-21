import { Request, Response } from "express";
import crypto from "crypto";
import hbs from "hbs";
import prisma from "../utils/db.js";

import { createHash } from "../utils/helpers.js";
import { transporter } from "../utils/nm-transporter.js";

import { emailTemplateSrc } from "../utils/helpers.js";

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
    const alreadyUser = await prisma.user.findFirst({
      where: {
        email: email,
      },
    });

    if (alreadyUser) {
      res.status(500).json({
        error: "Already in use",
      });
    } else {
      const randomString = crypto.randomBytes(32).toString("hex");
      const secret = createHash(randomString);
      /* 
     generate random string and hash that string, save user email & hashedString to db
     
     dispatch email to provided with random string to attach to requests for comparison
      */

      await prisma.user.create({
        data: {
          email: email as string,
          secret: secret,
          usage: 0,
          access: "user",
        },
      });

      const template = hbs.handlebars.compile(
          emailTemplateSrc.toString("utf-8")
        ),
        htmlToSend = template({ message: randomString });

      const mailOptions = {
        from: "no-reply@enefel.com",
        to: email,
        subject: "Your EnEfEl API registration key",
        html: htmlToSend,
      };

      transporter.sendMail(mailOptions, (err, res) => {
        if (err) {
          console.log("ERROR", err);
        } else {
          console.log("successfully sent registration email");
        }
      });
      res.json({
        randomString,
        message: `Email sent to ${email}`,
      });
    }
  }
};

export { registerUser };
