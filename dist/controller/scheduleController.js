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
export const getSchedule = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const schedule = yield prisma.team.findMany({
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
});
