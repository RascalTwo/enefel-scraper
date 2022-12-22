export const logger = {
    base: (text) => console.log(text),
    success: (text) => logger.base(`🌟 ${text} success!!!!`),
    start: (text) => logger.base(`🔧 ${text} start`),
    teamLogger: (team) => logger.base(`🏈 ${team}`),
    playerLogger: (player) => logger.base(`🏅 ${player}`),
    waitLogger: () => logger.base("🕐 waiting..."),
    resumeLogger: () => logger.base("🔧 resuming"),
    error: (text) => logger.base(`💢 ${text}`),
};
