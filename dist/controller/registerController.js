var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
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
const registerUser = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const { email } = req.body;
    if (!email) {
        res.status(400).json({
            error: "Must provide an email to register for this service",
        });
    }
    else {
        /*
        validate email w/ zod
        */
        const alreadyUser = yield prisma.user.findFirst({
            where: {
                email: email,
            },
        });
        if (alreadyUser) {
            res.status(500).json({
                error: "Already in use",
            });
        }
        else {
            const randomString = crypto.randomBytes(32).toString("hex");
            const secret = createHash(randomString);
            /*
           generate random string and hash that string, save user email & hashedString to db
           
           dispatch email to provided with random string to attach to requests for comparison
            */
            yield prisma.user.create({
                data: {
                    email: email,
                    secret: secret,
                    usage: 0,
                    access: "user",
                },
            });
            const template = hbs.handlebars.compile(emailTemplateSrc.toString("utf-8")), htmlToSend = template({ message: randomString });
            const mailOptions = {
                from: "no-reply@enefel.com",
                to: email,
                subject: "Your EnEfEl API registration key",
                html: htmlToSend,
            };
            transporter.sendMail(mailOptions, (err, res) => {
                if (err) {
                    console.log("ERROR", err);
                }
                else {
                    console.log("successfully sent registration email");
                }
            });
            res.json({
                randomString,
                message: `Email sent to ${email}`,
            });
        }
    }
});
export { registerUser };
