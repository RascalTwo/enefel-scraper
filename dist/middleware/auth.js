import prisma from "../utils/db.js";
import { createHash } from "../utils/helpers.js";
export const checkToken = async (req, res, next) => {
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
            }
            catch (err) {
                res
                    .status(400)
                    .json({ error: "Invalid token, not authorized to continue" });
            }
            next();
        }
        else {
            res.status(400).json({ error: "Not authorized to view this resource" });
        }
    }
};
const validateToken = (token) => {
    if (token === undefined) {
        return false;
    }
    console.log("token", token);
    return true;
};
