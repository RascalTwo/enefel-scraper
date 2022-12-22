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
import { formatTeam } from "../utils/helpers.js";
const getTeams = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const teams = yield prisma.team.findMany({
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
});
const getTeam = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const { teamslug } = req.params;
    const team = yield prisma.team.findFirst({
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
});
export { getTeams, getTeam };
