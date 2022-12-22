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
const getPlayers = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const { team } = req.params;
    const players = yield prisma.team.findFirst({
        where: {
            name: formatTeam(team),
        },
    });
    res.json({ players: players });
});
const getPlayerById = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const { playerID } = req.params;
    const player = yield prisma.player.findFirst({
        where: {
            id: playerID,
        },
        include: {
            team: true,
        },
    });
});
const getPlayerSearch = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const { playerslug } = req.params;
    const formatPlayer = playerslug
        .split(" ")
        .map((n) => formatTeam(n))
        .join(" ");
    const player = yield prisma.player.findMany({
        where: {
            name: formatPlayer,
        },
        include: {
            team: true,
            stats: {
                include: {
                    performance: true,
                },
            },
        },
    });
    res.json({ player });
});
const getPlayersByPosition = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const { position } = req.params;
    const players = yield prisma.player.findMany({
        where: {
            position: position.toUpperCase(),
        },
        include: {
            team: true,
            stats: {
                include: {
                    performance: true,
                },
            },
        },
    });
    const filterStatless = players.filter((p) => p.stats.length > 0);
    res.json({
        players: filterStatless,
    });
});
export { getPlayers, getPlayerById, getPlayerSearch, getPlayersByPosition };
