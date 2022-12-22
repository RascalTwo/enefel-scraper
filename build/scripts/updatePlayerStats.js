var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
import { getPlayerStats } from "../utils/services.js";
import { logger } from "../utils/logger.js";
import prisma from "../utils/db.js";
const updatePlayerStats = () => __awaiter(void 0, void 0, void 0, function* () {
    const teams = yield getPlayerStats();
    while (teams.length >= 1) {
        const team = teams.pop();
        if (team) {
            try {
                while (team.roster.length >= 1) {
                    const player = team.roster.pop();
                    if ((player === null || player === void 0 ? void 0 : player.name) && player.stats) {
                        const playerWithStats = yield prisma.player.update({
                            where: { id: player.id },
                            data: {
                                status: player.stats.status,
                                stats: {
                                    upsert: player.stats.stats.map((st) => {
                                        var _a;
                                        return {
                                            create: {
                                                week: st.week,
                                                opponent: st.opponent,
                                                result: st.result,
                                                performance: {
                                                    createMany: {
                                                        data: st.stats.map((s) => {
                                                            return {
                                                                title: s === null || s === void 0 ? void 0 : s.title,
                                                                stat: s === null || s === void 0 ? void 0 : s.stat,
                                                            };
                                                        }),
                                                    },
                                                },
                                            },
                                            update: {
                                                result: st.result,
                                                performance: {
                                                    upsert: st.stats.map((s) => {
                                                        var _a;
                                                        return {
                                                            create: {
                                                                title: s === null || s === void 0 ? void 0 : s.title,
                                                                stat: s === null || s === void 0 ? void 0 : s.stat,
                                                            },
                                                            update: {
                                                                title: s === null || s === void 0 ? void 0 : s.title,
                                                                stat: s === null || s === void 0 ? void 0 : s.stat,
                                                            },
                                                            where: {
                                                                id: (_a = s === null || s === void 0 ? void 0 : s.id) !== null && _a !== void 0 ? _a : "bogus123",
                                                            },
                                                        };
                                                    }),
                                                },
                                            },
                                            where: {
                                                id: (_a = st.id) !== null && _a !== void 0 ? _a : "bogusbonus",
                                            },
                                        };
                                    }),
                                },
                            },
                        });
                        logger.success(`${player.name}`);
                    }
                }
            }
            catch (err) {
                logger.error(err.message);
            }
        }
    }
});
updatePlayerStats();
