var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
import { getTeamRosters } from "../utils/services.js";
import { logger } from "../utils/logger.js";
import prisma from "../utils/db.js";
const seedRoster = () => __awaiter(void 0, void 0, void 0, function* () {
    const teams = yield getTeamRosters();
    while (teams.length >= 1) {
        const team = teams.pop();
        if (team) {
            try {
                while (team.roster.length >= 1) {
                    const player = team.roster.pop();
                    if ((player === null || player === void 0 ? void 0 : player.name) && player.playerUrl) {
                        const createPlayer = yield prisma.team.update({
                            where: { id: team.id },
                            data: {
                                roster: {
                                    create: {
                                        slugUrl: player === null || player === void 0 ? void 0 : player.playerUrl,
                                        headshot: player === null || player === void 0 ? void 0 : player.headshot,
                                        name: player === null || player === void 0 ? void 0 : player.name,
                                        number: player === null || player === void 0 ? void 0 : player.number,
                                        position: player === null || player === void 0 ? void 0 : player.position,
                                        height: player === null || player === void 0 ? void 0 : player.height,
                                        weight: player === null || player === void 0 ? void 0 : player.weight,
                                        experience: player === null || player === void 0 ? void 0 : player.experience,
                                        college: player === null || player === void 0 ? void 0 : player.college,
                                        status: player === null || player === void 0 ? void 0 : player.status,
                                    },
                                },
                            },
                        });
                        logger.success(`${createPlayer.name}`);
                    }
                }
            }
            catch (err) {
                logger.error(err.message);
            }
        }
    }
});
seedRoster();
