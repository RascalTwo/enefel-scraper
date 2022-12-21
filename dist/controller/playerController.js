import prisma from "../utils/db.js";
import { formatTeam } from "../utils/helpers.js";
const getPlayers = async (req, res) => {
    const { team } = req.params;
    const players = await prisma.team.findFirst({
        where: {
            name: formatTeam(team),
        },
    });
    res.json({ players: players });
};
const getPlayerById = async (req, res) => {
    const { playerID } = req.params;
    const player = await prisma.player.findFirst({
        where: {
            id: playerID,
        },
        include: {
            team: true,
        },
    });
};
const getPlayerSearch = async (req, res) => {
    const { playerslug } = req.params;
    const formatPlayer = playerslug
        .split(" ")
        .map((n) => formatTeam(n))
        .join(" ");
    const player = await prisma.player.findMany({
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
};
const getPlayersByPosition = async (req, res) => {
    const { position } = req.params;
    const players = await prisma.player.findMany({
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
};
export { getPlayers, getPlayerById, getPlayerSearch, getPlayersByPosition };
