var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
import prisma from "../utils/db.js";
import { createHash } from "../utils/helpers.js";
export const checkToken = (req, res, next) => __awaiter(void 0, void 0, void 0, function* () {
    const token = req.header("Authorization");
    if (!token) {
        res.status(400).json({ error: "Not authorized to view this resource" });
    }
    const tokenTuple = token === null || token === void 0 ? void 0 : token.split(" ");
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
                const usr = yield prisma.user.findFirst({
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
});
const validateToken = (token) => {
    if (token === undefined) {
        return false;
    }
    console.log("token", token);
    return true;
};
