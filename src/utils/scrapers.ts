import { JSDOM } from "jsdom";
import {
  Category,
  RawTeam,
  RosterPlayer,
  ScheduleGame,
  Season,
  Stat,
} from "./types.js";
import { logger } from "./logger.js";

const getDocument = (html: string) => {
  const dom = new JSDOM(html);
  const document = dom.window.document;
  return document;
};

export const teamScraper = (html: string) => {
  const document = getDocument(html);
  const teams: RawTeam[] = [];
  const teamsEl = document.querySelectorAll("div.d3-l-col__col-12");
  teamsEl.forEach((t) => {
    const icon = t.querySelector("picture img")?.getAttribute("data-src");
    const fullName = t
      .querySelector("picture img")
      ?.getAttribute("alt")
      ?.split(" ");
    const profUrl = t
      .querySelector('a[data-link_name="1st CTA View Profile"]')
      ?.getAttribute("href");
    const conference = t.parentElement?.parentElement
      ?.querySelector("h2.d3-o-section-title span")
      ?.textContent?.trim()
      .split(" ")[0];
    if (fullName) {
      teams.push({
        icon,
        team: fullName.pop(),
        city: fullName.join(" "),
        profUrl,
        conference,
      } as RawTeam);
    }
  });
  return teams;
};

export const teamDetailsScraper = (html: string) => {
  const document = getDocument(html);
  const rankHeader = document
    .querySelector("div.nfl-c-team-header__ranking")
    ?.textContent?.split(" ");
  const recordHeader = document
    .querySelector("div.nfl-c-team-header__stats")
    ?.textContent?.split("-")
    .map((r) => r.trim());
  const coach = document.querySelector(
    "ul.d3-o-list > li div.nfl-c-team-info__info-value"
  )?.textContent;
  const stadium = document.querySelector(
    "ul.d3-o-list > li + li div.nfl-c-team-info__info-value"
  )?.textContent;
  if (rankHeader && recordHeader && coach && stadium) {
    const record = {
      rank: rankHeader[0],
      division: rankHeader[2],
      wins: recordHeader[0],
      loss: recordHeader[1],
      ties: recordHeader[2],
      coach,
      stadium,
    };
    return record;
  } else {
    const record = {
      rank: null,
      division: null,
      wins: null,
      loss: null,
      ties: null,
      coach: null,
      stadium: null,
    };
    return record;
  }
};

export const scheduleScraper = async (html: string) => {
  const document = getDocument(html);
  const gamesContainerEl = document.querySelectorAll("div.nfl-c-matchup-strip");
  console.log("games", gamesContainerEl.length);

  const formattedGames: ScheduleGame[] = [];
  gamesContainerEl.forEach((el) => {
    const date = el.parentElement?.querySelector(
      "h2.d3-o-section-title"
    )?.textContent;
    const gameUrl = el
      .querySelector("a.nfl-c-matchup-strip__left-area")
      ?.getAttribute("href");
    const status = el.querySelector(
      "p.nfl-c-matchup-strip__period"
    )?.textContent;
    const awayEl = el.querySelector("div.nfl-c-matchup-strip__team--opponent");
    const awayTeam = awayEl?.querySelector(
      "span.nfl-c-matchup-strip__team-fullname"
    )?.textContent;
    const awayScore = awayEl?.querySelector(
      "div.nfl-c-matchup-strip__team-score"
    )?.textContent;
    const homeEl = el.querySelector(
      "div.nfl-c-matchup-strip__team div.nfl-c-matchup-strip__team"
    );
    const homeTeam = homeEl?.querySelector(
      "span.nfl-c-matchup-strip__team-fullname"
    )?.textContent;
    const homeScore = homeEl?.querySelector(
      "div.nfl-c-matchup-strip__team-score"
    )?.textContent;

    // remove
    logger.base(
      `date: ${date}\ngameURL: ${gameUrl}\nstatus: ${status}\naway: ${awayTeam}\nhome: ${homeTeam}`
    );

    formattedGames.push({
      date: date as string,
      gameUrl: gameUrl as string,
      status: status as string,
      away: {
        team: awayTeam as string,
        score: awayScore as string,
      },
      home: {
        team: homeTeam as string,
        score: homeScore as string,
      },
    });
  });
  return formattedGames;
};

// const formatScheduleRowData = (row: HTMLTableRowElement) => {
//   const date = row.querySelector(
//     "td.Table__TD + td.Table__TD > span"
//   )?.textContent;
//   const opponentContainer = row.querySelector("td.Table__TD div.opponent-logo");
//   const homeOrAway =
//     opponentContainer?.querySelector("span")?.textContent === "@"
//       ? "AWAY"
//       : opponentContainer?.querySelector("span")?.textContent === "vs"
//       ? "HOME"
//       : "NUETRAL";
//   const opponent = opponentContainer
//     ?.querySelector("a > img")
//     ?.getAttribute("title");
//   const opponentUrl = opponentContainer
//     ?.querySelector("a > img")
//     ?.getAttribute("src");
//   const outcomeContainer = row.querySelector(
//     "td.Table__TD + td.Table__TD + td.Table__TD + td.Table__TD"
//   );
//   const outcome = outcomeContainer
//     ?.querySelector("span")
//     ?.textContent?.match(/[a-z]/i)
//     ? outcomeContainer?.querySelector("span")?.textContent
//     : "TBD";
//   const score = outcomeContainer?.querySelector("span > a.AnchorLink")
//     ?.textContent
//     ? outcomeContainer
//         ?.querySelector("span > a.AnchorLink")
//         ?.textContent?.trim()
//     : "TBD";
//   const gameUrl = outcomeContainer
//     ?.querySelector("span > a.AnchorLink")
//     ?.getAttribute("href");
//   return {
//     gameUrl,
//     date,
//     opponent,
//     homeOrAway,
//     outcome,
//     score,
//   } as ScheduleGame;
// };

// export const rosterScraper = (html: string) => {
//   const document = getDocument(html);
//   const teamRoster: RosterPlayer[] = [];
//   getOffensePlayers(document, teamRoster);
//   getDefensePlayers(document, teamRoster);
//   getSTPlayers(document, teamRoster);
//   return teamRoster;
// };

// const getOffensePlayers = (document: Document, teamRoster: RosterPlayer[]) => {
//   const tBody = document.querySelector(".Offense tbody");
//   const tRows = tBody?.querySelectorAll("tr");
//   tRows?.forEach((row) => {
//     const playerImage = row
//       .querySelector("td div.headshot img")
//       ?.getAttribute("alt");
//     const playerName = row.querySelector("td + td > div > a")?.textContent;
//     const playerNumber = row.querySelector(
//       "td + td > div a + span"
//     )?.textContent;
//     const statsUrl = row.querySelector("td + td > div a")?.getAttribute("href");
//     const playerPosition = row.querySelector("td + td + td > div")?.textContent;
//     const playerAge = row.querySelector("td + td + td + td > div")?.textContent;
//     const playerHeight = row.querySelector(
//       "td + td + td + td + td > div"
//     )?.textContent;
//     const playerWeight = row.querySelector(
//       "td + td + td + td + td + td > div"
//     )?.textContent;
//     const playerExp = row.querySelector(
//       "td + td + td + td + td + td + td > div"
//     )?.textContent;
//     const playerCollege = row.querySelector(
//       "td + td + td + td + td + td + td + td > div"
//     )?.textContent;
//     teamRoster.push({
//       statsUrl: statsUrl?.replace("/player/", "/player/stats/"),
//       headshot: playerImage,
//       lineup: "Offense",
//       name: playerName,
//       number: playerNumber,
//       position: playerPosition,
//       age: playerAge,
//       height: playerHeight,
//       weight: playerWeight,
//       experience: playerExp,
//       college: playerCollege,
//     } as RosterPlayer);
//   });
// };

// const getDefensePlayers = (document: Document, teamRoster: RosterPlayer[]) => {
//   const tBody = document.querySelector(".Defense tbody");
//   const tRows = tBody?.querySelectorAll("tr");
//   tRows?.forEach((row) => {
//     const playerImage = row
//       .querySelector("td div.headshot img")
//       ?.getAttribute("alt");
//     const playerName = row.querySelector("td + td > div > a")?.textContent;
//     const playerNumber = row.querySelector(
//       "td + td > div a + span"
//     )?.textContent;
//     const statsUrl = row.querySelector("td + td > div a")?.getAttribute("href");
//     const playerPosition = row.querySelector("td + td + td > div")?.textContent;
//     const playerAge = row.querySelector("td + td + td + td > div")?.textContent;
//     const playerHeight = row.querySelector(
//       "td + td + td + td + td > div"
//     )?.textContent;
//     const playerWeight = row.querySelector(
//       "td + td + td + td + td + td > div"
//     )?.textContent;
//     const playerExp = row.querySelector(
//       "td + td + td + td + td + td + td > div"
//     )?.textContent;
//     const playerCollege = row.querySelector(
//       "td + td + td + td + td + td + td + td > div"
//     )?.textContent;
//     teamRoster.push({
//       statsUrl: statsUrl?.replace("/player/", "/player/stats/"),
//       headshot: playerImage,
//       lineup: "Defense",
//       name: playerName,
//       number: playerNumber,
//       position: playerPosition,
//       age: playerAge,
//       height: playerHeight,
//       weight: playerWeight,
//       experience: playerExp,
//       college: playerCollege,
//     } as RosterPlayer);
//   });
// };

// const getSTPlayers = (document: Document, teamRoster: RosterPlayer[]) => {
//   const tBody = document.querySelector(".Special.Teams tbody");
//   const tRows = tBody?.querySelectorAll("tr");
//   tRows?.forEach((row) => {
//     const playerImage = row
//       .querySelector("td div.headshot img")
//       ?.getAttribute("alt");
//     const playerName = row.querySelector("td + td > div > a")?.textContent;
//     const playerNumber = row.querySelector(
//       "td + td > div a + span"
//     )?.textContent;
//     const statsUrl = row.querySelector("td + td > div a")?.getAttribute("href");
//     const playerPosition = row.querySelector("td + td + td > div")?.textContent;
//     const playerAge = row.querySelector("td + td + td + td > div")?.textContent;
//     const playerHeight = row.querySelector(
//       "td + td + td + td + td > div"
//     )?.textContent;
//     const playerWeight = row.querySelector(
//       "td + td + td + td + td + td > div"
//     )?.textContent;
//     const playerExp = row.querySelector(
//       "td + td + td + td + td + td + td > div"
//     )?.textContent;
//     const playerCollege = row.querySelector(
//       "td + td + td + td + td + td + td + td > div"
//     )?.textContent;
//     teamRoster.push({
//       statsUrl: statsUrl?.replace("/player/", "/player/stats/"),
//       headshot: playerImage,
//       lineup: "Special Teams",
//       name: playerName,
//       number: playerNumber,
//       position: playerPosition,
//       age: playerAge,
//       height: playerHeight,
//       weight: playerWeight,
//       experience: playerExp,
//       college: playerCollege,
//     } as RosterPlayer);
//   });
// };

// export const playerStatsScraper = (html: string) => {
//   const document = getDocument(html);
//   const playerStatus = document.querySelector("span.TextStatus")?.textContent;
//   const categories: Category[] = [];
//   const tableEls = document.querySelectorAll(
//     "div.ResponsiveTable > div.Table__Title"
//   );
//   tableEls.forEach((cat) => {
//     const seasons: Season[] = [];

//     const category = cat.textContent;
//     const catContainer = cat.parentElement;

//     const tData: (string | null)[] = [];
//     catContainer?.querySelectorAll("thead > tr > th").forEach((th, idx) => {
//       tData.push(th.textContent);
//     });

//     const tRows = catContainer?.querySelectorAll("tbody > tr[data-idx]");
//     tRows?.forEach((row, idx) => {
//       const rd: (string | null)[] = [];
//       const rowdata = catContainer?.querySelectorAll(
//         `tbody > tr[data-idx="${idx}"] > td`
//       );
//       rowdata?.forEach((td) => rd.push(td.textContent));

//       seasons.push({
//         season: rd[0],
//         team: rd[1],
//         stats: rd
//           .slice(2)
//           .map((r, i) => ({ title: tData.slice(2)[i], stat: r })),
//       });
//     });
//     categories.push({
//       category,
//       seasons: seasons,
//     });
//   });
//   try {
//     return { status: playerStatus, categories };
//   } catch (err) {
//     return { status: playerStatus, categories: null };
//   }
// };
