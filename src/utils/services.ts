import axios from "axios";
import { base } from "./consts.js";
import { logger } from "./logger.js";
import { scheduleScraper, teamDetailsScraper } from "./scrapers.js";
import { RawTeam } from "./types.js";

export const getData = async (url: string): Promise<string> => {
  try {
    const { data } = await axios(url, {
      headers: {
        "User-Agent": "Mozilla/5.0",
      },
    });
    return data;
  } catch (err) {
    console.log("error", err);
    return "error";
  }
};

export const getTeamDetails = async (teamArr: RawTeam[]) => {
  const teamsWithDetails = [];
  while (teamArr.length >= 1) {
    const team = teamArr.pop();
    if (team) {
      const detailsHTML = await getData(`${base}${team?.profUrl}`);
      const details = teamDetailsScraper(detailsHTML);

      teamsWithDetails.push({ ...team, details });
    }
  }
  return teamsWithDetails;
};

export const getSchedules = async () => {
  const weeks = [
    "PRE1",
    // "PRE2",
    // "PRE3",
    // "REG1",
    // "REG2",
    // "REG3",
    // "REG4",
    // "REG5",
    // "REG6",
    // "REG7",
    // "REG8",
    // "REG9",
    // "REG10",
    // "REG11",
    // "REG12",
    // "REG13",
    // "REG14",
    // "REG15",
    // "REG16",
    // "REG17",
    // "REG18",
  ];
  const formatWeeks = [];
  while (weeks.length >= 1) {
    const week = weeks.pop();
    logger.start(week as string);
    const schedHTML = await getData(`${base}/schedules/2022/${week}/`);
    const schedData = await scheduleScraper(schedHTML);
    // console.log("data", schedHTML);

    formatWeeks.push({
      week: week?.match("REG")
        ? week.replace("REG", "week ")
        : week?.replace("PRE", "preseason "),
      schedule: schedData,
    });
    logger.success(week as string);
  }

  return formatWeeks;
};

// export const getRoster = async (
//   arr: (Team & { schedule: ScheduleGame[] })[]
// ) => {
//   const teamRoster = await Promise.all(
//     arr.map(async (d) => {
//       const scheduleSlug = d.urlSlug.replace("/nfl/team/", "/roster/");
//       const html = await getData(`${base}/nfl/team${scheduleSlug}`);
//       const roster = rosterScraper(html as string);
//       return { ...d, roster };
//     })
//   );
//   return teamRoster;
// };

// export const getPlayerStats = async () => {
//   const teamRosterQueue = await prisma.team.findMany({
//     select: {
//       id: true,
//       roster: {
//         select: {
//           id: true,
//           statsUrl: true,
//           name: true,
//         },
//       },
//     },
//   });

//   while (teamRosterQueue.length > 1) {
//     const seedTeam = teamRosterQueue.pop();
//     if (seedTeam) {
//       const withStats = await Promise.all(
//         seedTeam.roster.map(async (p, i) => {
//           logger.playerLogger(`${p.name} ${i}`);

//           const html = await getData(`${p.statsUrl}`);
//           const stats = playerStatsScraper(html as string);
//           return {
//             ...p,
//             status: stats.status ? stats.status : "Inactive",
//             stats: stats.categories,
//           };
//         })
//       );
//       seedStats(withStats);
//     }
//   }
// };

// // const wait = () => {
// //   return new Promise((resolve) => {
// //     setTimeout(resolve, 3000);
// //   });
// // };
