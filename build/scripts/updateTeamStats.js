var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
import { getTeamStats } from "../utils/services.js";
import { logger } from "../utils/logger.js";
import prisma from "../utils/db.js";
const updateTeamsStats = () => __awaiter(void 0, void 0, void 0, function* () {
    var _a, _b;
    const withStats = yield getTeamStats();
    while (withStats.length >= 1) {
        try {
            const team = withStats.pop();
            if (team === null || team === void 0 ? void 0 : team.stats) {
                logger.start(team.urlSlug);
                const updateStats = yield prisma.team.update({
                    where: { id: team === null || team === void 0 ? void 0 : team.id },
                    data: {
                        stats: {
                            upsert: {
                                update: {
                                    first_downs: {
                                        upsert: {
                                            update: {
                                                total_first_downs: team.stats.first_downs.total_first_downs,
                                                rushing: (_a = team.stats.first_downs) === null || _a === void 0 ? void 0 : _a.rushing,
                                                passing: (_b = team.stats.first_downs) === null || _b === void 0 ? void 0 : _b.passing,
                                                penalty: team.stats.first_downs.penalty,
                                            },
                                            create: {
                                                total_first_downs: team.stats.first_downs
                                                    .total_first_downs,
                                                rushing: team.stats.first_downs.rushing,
                                                passing: team.stats.first_downs.passing,
                                                penalty: team.stats.first_downs.penalty,
                                            },
                                        },
                                    },
                                    down_conversions: {
                                        upsert: team === null || team === void 0 ? void 0 : team.stats.down_conversions.map((dc) => ({
                                            create: {
                                                down: dc.down,
                                                successful: dc.successful,
                                                attempts: dc.attempts,
                                            },
                                            update: {
                                                down: dc.down,
                                                successful: dc.successful,
                                                attempts: dc.attempts,
                                            },
                                            where: {
                                                id: dc.id ? dc.id : "123123123",
                                            },
                                        })),
                                    },
                                    offense: {
                                        upsert: {
                                            create: {
                                                general_total_yards: team.stats.offense
                                                    .general_total_yards,
                                                general_plays: team.stats.offense
                                                    .general_plays,
                                                general_average_yards: team.stats.offense
                                                    .general_average_yards,
                                                rushing_total_yards: team.stats.offense
                                                    .rushing_total_yards,
                                                rushing_plays: team.stats.offense
                                                    .rushing_plays,
                                                rushing_average_yards: team.stats.offense
                                                    .rushing_average_yards,
                                                passing_completions: team.stats.offense
                                                    .passing_completions,
                                                passing_attempts: team.stats.offense
                                                    .passing_attempts,
                                                passing_interceptions: team.stats.offense
                                                    .passing_interceptions,
                                                passing_average_yards: team.stats.offense
                                                    .passing_average_yards,
                                            },
                                            update: {
                                                general_total_yards: team.stats.offense
                                                    .general_total_yards,
                                                general_plays: team.stats.offense
                                                    .general_plays,
                                                general_average_yards: team.stats.offense
                                                    .general_average_yards,
                                                rushing_total_yards: team.stats.offense
                                                    .rushing_total_yards,
                                                rushing_plays: team.stats.offense
                                                    .rushing_plays,
                                                rushing_average_yards: team.stats.offense
                                                    .rushing_average_yards,
                                                passing_completions: team.stats.offense
                                                    .passing_completions,
                                                passing_attempts: team.stats.offense
                                                    .passing_attempts,
                                                passing_interceptions: team.stats.offense
                                                    .passing_interceptions,
                                                passing_average_yards: team.stats.offense
                                                    .passing_average_yards,
                                            },
                                        },
                                    },
                                    sacks: team === null || team === void 0 ? void 0 : team.stats.sacks,
                                    field_goals: {
                                        upsert: {
                                            update: {
                                                successful: team.stats.field_goals.successful,
                                                attempts: team.stats.field_goals.attempts,
                                            },
                                            create: {
                                                successful: team.stats.field_goals.successful,
                                                attempts: team.stats.field_goals.attempts,
                                            },
                                        },
                                    },
                                    touch_downs: {
                                        upsert: {
                                            update: {
                                                total: team.stats.touch_downs.total,
                                                rushing: team.stats.touch_downs.rushing,
                                                passing: team.stats.touch_downs.passing,
                                                returns: team.stats.touch_downs.returns,
                                                defensive: team.stats.touch_downs.defensive,
                                            },
                                            create: {
                                                total: team.stats.touch_downs.total,
                                                rushing: team.stats.touch_downs.rushing,
                                                passing: team.stats.touch_downs.passing,
                                                returns: team.stats.touch_downs.returns,
                                                defensive: team.stats.touch_downs.defensive,
                                            },
                                        },
                                    },
                                    turnover_ratio: team.stats.turnover_ratio,
                                },
                                create: {
                                    first_downs: {
                                        create: {
                                            total_first_downs: team.stats.first_downs
                                                .total_first_downs,
                                            rushing: team.stats.first_downs.rushing,
                                            passing: team.stats.first_downs.passing,
                                            penalty: team.stats.first_downs.penalty,
                                        },
                                    },
                                    down_conversions: {
                                        create: team === null || team === void 0 ? void 0 : team.stats.down_conversions.map((dc) => ({
                                            down: dc.down,
                                            successful: dc.successful,
                                            attempts: dc.attempts,
                                        })),
                                    },
                                    offense: {
                                        create: {
                                            general_total_yards: team.stats.offense
                                                .general_total_yards,
                                            general_plays: team.stats.offense.general_plays,
                                            general_average_yards: team.stats.offense
                                                .general_average_yards,
                                            rushing_total_yards: team.stats.offense
                                                .rushing_total_yards,
                                            rushing_plays: team.stats.offense.rushing_plays,
                                            rushing_average_yards: team.stats.offense
                                                .rushing_average_yards,
                                            passing_completions: team.stats.offense
                                                .passing_completions,
                                            passing_attempts: team.stats.offense
                                                .passing_attempts,
                                            passing_interceptions: team.stats.offense
                                                .passing_interceptions,
                                            passing_average_yards: team.stats.offense
                                                .passing_average_yards,
                                        },
                                    },
                                    sacks: team === null || team === void 0 ? void 0 : team.stats.sacks,
                                    field_goals: {
                                        create: {
                                            successful: team === null || team === void 0 ? void 0 : team.stats.field_goals.successful,
                                            attempts: team === null || team === void 0 ? void 0 : team.stats.field_goals.attempts,
                                        },
                                    },
                                    touch_downs: {
                                        create: {
                                            total: team.stats.touch_downs.total,
                                            rushing: team.stats.touch_downs.rushing,
                                            passing: team.stats.touch_downs.passing,
                                            returns: team.stats.touch_downs.returns,
                                            defensive: team.stats.touch_downs.defensive,
                                        },
                                    },
                                    turnover_ratio: team.stats.turnover_ratio,
                                },
                            },
                        },
                    },
                });
                logger.success(`${team.urlSlug}`);
            }
        }
        catch (err) {
            logger.error(err.message);
        }
    }
});
updateTeamsStats();
