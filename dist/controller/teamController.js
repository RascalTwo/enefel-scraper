import prisma from "../utils/db.js";
import { formatTeam } from "../utils/helpers.js";
const getTeams = async (req, res) => {
    const teams = await prisma.team.findMany({
        include: {
            details: true,
            stats: {
                include: {
                    first_downs: true,
                    down_conversions: true,
                    offense: true,
                    field_goals: true,
                    touch_downs: true,
                },
            },
        },
    });
    res.json({ teams: teams });
};
const getTeam = async (req, res) => {
    const { teamslug } = req.params;
    const team = await prisma.team.findFirst({
        where: {
            name: formatTeam(teamslug),
        },
        include: {
            details: true,
            roster: true,
            stats: {
                include: {
                    first_downs: true,
                    offense: true,
                    down_conversions: true,
                    field_goals: true,
                    touch_downs: true,
                },
            },
        },
    });
    res.json({ team });
};
export { getTeams, getTeam };
