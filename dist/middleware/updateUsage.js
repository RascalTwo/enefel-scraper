import prisma from "../utils/db.js";
export const updateUsage = async (req, res, next) => {
    if (req.user?.access === process.env.ADMIN_ACCESS) {
        next();
    }
    else if (req.user && req.user.usage < 4) {
        await prisma.user.update({
            where: {
                id: req.user.id,
            },
            data: {
                usage: req.user.usage + 1,
            },
        });
        next();
    }
    else {
        res.status(400).json({
            error: "Request limit exceeded, ",
        });
    }
};
