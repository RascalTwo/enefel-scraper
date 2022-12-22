var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
import axios from "axios";
import prisma from "../utils/db.js";
import { base } from "./consts.js";
import { logger } from "./logger.js";
import { playerScraper, teamDetailsScraper, teamRosterScraper, teamStatsScraper, } from "./scrapers.js";
export const getData = (url) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const { data } = yield axios(url, {
            headers: {
                "User-Agent": "Mozilla/5.0",
            },
        });
        return data;
    }
    catch (err) {
        console.log("error", err);
        return "error";
    }
});
export const getTeamDetails = (teamArr) => __awaiter(void 0, void 0, void 0, function* () {
    const teamsWithDetails = [];
    while (teamArr.length >= 1) {
        const team = teamArr.pop();
        if (team) {
            const detailsHTML = yield getData(`${base}${team === null || team === void 0 ? void 0 : team.profUrl}`);
            const details = teamDetailsScraper(detailsHTML);
            teamsWithDetails.push(Object.assign(Object.assign({}, team), { details }));
        }
    }
    return teamsWithDetails;
});
export const getTeamRosters = () => __awaiter(void 0, void 0, void 0, function* () {
    const teams = yield prisma.team.findMany();
    const withRoster = [];
    while (teams.length >= 1) {
        const team = teams.pop();
        if (team) {
            const teamHTML = yield getData(`${base}${team.urlSlug}roster`);
            const roster = teamRosterScraper(teamHTML);
            withRoster.push(Object.assign(Object.assign({}, team), { roster: roster }));
        }
    }
    return withRoster;
});
export const getTeamStats = () => __awaiter(void 0, void 0, void 0, function* () {
    var _a, _b, _c, _d, _e;
    const teams = yield prisma.team.findMany({
        select: {
            id: true,
            urlSlug: true,
            stats: {
                select: {
                    id: true,
                    first_downs: {
                        select: {
                            id: true,
                        },
                    },
                    down_conversions: {
                        select: {
                            id: true,
                        },
                    },
                    offense: {
                        select: {
                            id: true,
                        },
                    },
                    field_goals: {
                        select: {
                            id: true,
                        },
                    },
                    touch_downs: {
                        select: {
                            id: true,
                        },
                    },
                },
            },
        },
    });
    const withStats = [];
    while (teams.length >= 1) {
        const team = teams.pop();
        if (team) {
            logger.start(`${team.urlSlug}`);
            const teamHTML = yield getData(`${base}${team.urlSlug}stats`);
            const stats = teamStatsScraper(teamHTML);
            withStats.push(Object.assign(Object.assign({}, team), { stats: Object.assign(Object.assign({}, team.stats), { first_downs: Object.assign(Object.assign({}, (_a = team.stats) === null || _a === void 0 ? void 0 : _a.first_downs), stats === null || stats === void 0 ? void 0 : stats.first_downs), down_conversions: [
                        Object.assign(Object.assign({}, (_b = team.stats) === null || _b === void 0 ? void 0 : _b.down_conversions[0]), stats === null || stats === void 0 ? void 0 : stats.down_conversions[0]),
                        Object.assign(Object.assign({}, (_c = team.stats) === null || _c === void 0 ? void 0 : _c.down_conversions[1]), stats === null || stats === void 0 ? void 0 : stats.down_conversions[1]),
                    ], offense: {
                        general_total_yards: stats === null || stats === void 0 ? void 0 : stats.general.total_yards,
                        general_plays: stats === null || stats === void 0 ? void 0 : stats.general.plays,
                        general_average_yards: stats === null || stats === void 0 ? void 0 : stats.general.average,
                        rushing_total_yards: stats === null || stats === void 0 ? void 0 : stats.rushing.total_yards,
                        rushing_plays: stats === null || stats === void 0 ? void 0 : stats.rushing.plays,
                        rushing_average_yards: stats === null || stats === void 0 ? void 0 : stats.rushing.average,
                        passing_completions: stats === null || stats === void 0 ? void 0 : stats.passing.completions,
                        passing_attempts: stats === null || stats === void 0 ? void 0 : stats.passing.attempts,
                        passing_interceptions: stats === null || stats === void 0 ? void 0 : stats.passing.interceptions,
                        passing_average_yards: stats === null || stats === void 0 ? void 0 : stats.passing.average,
                    }, sacks: stats === null || stats === void 0 ? void 0 : stats.sacks, field_goals: Object.assign(Object.assign({}, (_d = team.stats) === null || _d === void 0 ? void 0 : _d.field_goals), stats === null || stats === void 0 ? void 0 : stats.field_goals), touch_downs: Object.assign(Object.assign({}, (_e = team.stats) === null || _e === void 0 ? void 0 : _e.touch_downs), stats === null || stats === void 0 ? void 0 : stats.touch_downs), turnover_ratio: stats === null || stats === void 0 ? void 0 : stats.turnover_ratio }) }));
        }
    }
    return withStats;
});
export const getPlayerStats = () => __awaiter(void 0, void 0, void 0, function* () {
    const teams = yield prisma.team.findMany({
        select: {
            id: true,
            name: true,
            roster: {
                select: {
                    id: true,
                    name: true,
                    slugUrl: true,
                    stats: {
                        select: {
                            id: true,
                            performance: {
                                select: {
                                    id: true,
                                },
                            },
                        },
                    },
                },
            },
        },
    });
    const teamWithPlayerStats = [];
    // ****************** remove next line after test
    // const teams = rawteams.slice(0, 2);
    while (teams.length >= 1) {
        const team = teams.pop();
        logger.start(`${team === null || team === void 0 ? void 0 : team.name}`);
        const roster = team === null || team === void 0 ? void 0 : team.roster;
        if (roster) {
            const playerWithStats = yield Promise.all(roster.map((player) => __awaiter(void 0, void 0, void 0, function* () {
                logger.start(`${player === null || player === void 0 ? void 0 : player.name}`);
                const playerHTML = yield getData(`${base}${player === null || player === void 0 ? void 0 : player.slugUrl}stats`);
                const playerWS = playerScraper(playerHTML);
                const updatePlayer = playerWS.stats.map((s, i) => {
                    var _a, _b, _c, _d;
                    if (((_a = player === null || player === void 0 ? void 0 : player.stats) === null || _a === void 0 ? void 0 : _a.length) > 0 && ((_b = player === null || player === void 0 ? void 0 : player.stats[i]) === null || _b === void 0 ? void 0 : _b.id)) {
                        return Object.assign(Object.assign({ id: (player === null || player === void 0 ? void 0 : player.stats) && ((_c = player === null || player === void 0 ? void 0 : player.stats[i]) === null || _c === void 0 ? void 0 : _c.id)
                                ? (_d = player === null || player === void 0 ? void 0 : player.stats[i]) === null || _d === void 0 ? void 0 : _d.id
                                : undefined }, s), { stats: s.stats.map((stat, idx) => {
                                var _a, _b, _c, _d;
                                if (player.stats[i].performance.length > 0 &&
                                    ((_b = (_a = player === null || player === void 0 ? void 0 : player.stats[i]) === null || _a === void 0 ? void 0 : _a.performance[idx]) === null || _b === void 0 ? void 0 : _b.id)) {
                                    return Object.assign({ id: (_d = (_c = player === null || player === void 0 ? void 0 : player.stats[i].performance[idx]) === null || _c === void 0 ? void 0 : _c.id) !== null && _d !== void 0 ? _d : undefined }, stat);
                                }
                            }) });
                    }
                    else {
                        return Object.assign(Object.assign({ id: undefined }, s), { stats: s.stats.map((stat, idx) => {
                                return Object.assign({ id: undefined }, stat);
                            }) });
                    }
                });
                return Object.assign(Object.assign({}, player), { stats: {
                        status: playerWS.status,
                        stats: updatePlayer,
                    } });
            })));
            teamWithPlayerStats.push(Object.assign(Object.assign({}, team), { roster: playerWithStats }));
        }
    }
    return teamWithPlayerStats;
});
