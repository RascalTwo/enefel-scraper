import prisma from "../utils/db.js";
export const getSchedule = async (req, res) => {
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
