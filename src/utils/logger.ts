export const logger = {
  base: (text: string | any) => console.log(text),
  success: (text: string) => logger.base(`🌟 ${text} success!!!!`),
  start: () => logger.base("🔧 scrape start"),
  teamLogger: (team: string) => logger.base(`🏈 ${team}`),
  playerLogger: (player: string) => logger.base(`🏅 ${player}`),
  waitLogger: () => logger.base("🕐 waiting..."),
  resumeLogger: () => logger.base("🔧 resuming"),
};
