import { throws } from "assert";
import { table } from "console";
import { JSDOM } from "jsdom";
import { RosterPlayer, ScheduleGame, Team } from "./types.js";

const getDocument = (html: string) => {
  const dom = new JSDOM(html);
  const document = dom.window.document;
  return document;
};
export const teamScraper = (html: string) => {
  const document = getDocument(html);
  const headlines = document.querySelectorAll("div.headline");
  const teams: Team[] = [];
  headlines.forEach((hl) => {
    if (hl.textContent) {
      const conferenceTuple = hl.textContent?.split(" ");
      const conference = conferenceTuple[0];
      const division = conferenceTuple[1];
      const hlTeams = hl.parentElement?.querySelectorAll("section.TeamLinks");
      hlTeams?.forEach((t) => {
        const urlSlug = t.querySelector("a.AnchorLink")?.getAttribute("href");
        const teamImgEl = t.querySelector("a > img.Logo");
        const teamCity = teamImgEl
          ?.getAttribute("title")
          ?.split(" ")
          .slice(0, -1)
          .join(" ");
        const teamName = teamImgEl
          ?.getAttribute("title")
          ?.split(" ")
          .slice(-1)[0];
        const teamSlug = urlSlug?.split("/").slice(-2)[0];

        const teamIcon = `https://a.espncdn.com/combiner/i?img=/i/teamlogos/nfl/500/${teamSlug}.png`;
        teams.push({
          teamName,
          teamIcon,
          teamCity,
          conference: conference.toUpperCase(),
          division: division.toLowerCase(),
          urlSlug,
        } as Team);
      });
    }
  });
  return teams;
};

export const scheduleScraper = (html: string) => {
  const document = getDocument(html);

  const tBody = document.querySelector("tbody");
  const tRows = tBody?.querySelectorAll("tr");
  const schedule: ScheduleGame[] = [];
  tRows?.forEach((row) => {
    const weekNum = row.querySelector("td.Table__TD > span")?.textContent;
    const isByeWeek =
      row.querySelector("td.Table__TD + td.Table__TD")?.textContent ===
      "BYE WEEK";
    const isGameRow = weekNum?.match(/[1-9]+/);
    if (isByeWeek) {
      schedule.push({
        gameUrl: null,
        date: "hello",
        opponent: "BYE",
        homeOrAway: "HOME",
        outcome: null,
        score: null,
      });
    } else if (isGameRow) {
      const formattedRowData = formatScheduleRowData(row);
      schedule.push(formattedRowData);
    }
  });
  return schedule;
};

const formatScheduleRowData = (row: HTMLTableRowElement) => {
  const date = row.querySelector(
    "td.Table__TD + td.Table__TD > span"
  )?.textContent;
  const opponentContainer = row.querySelector("td.Table__TD div.opponent-logo");
  const homeOrAway =
    opponentContainer?.querySelector("span")?.textContent === "@"
      ? "AWAY"
      : opponentContainer?.querySelector("span")?.textContent === "vs"
      ? "HOME"
      : "NUETRAL";
  const opponent = opponentContainer
    ?.querySelector("a > img")
    ?.getAttribute("title");
  const opponentUrl = opponentContainer
    ?.querySelector("a > img")
    ?.getAttribute("src");
  const outcomeContainer = row.querySelector(
    "td.Table__TD + td.Table__TD + td.Table__TD + td.Table__TD"
  );
  const outcome = outcomeContainer
    ?.querySelector("span")
    ?.textContent?.match(/[a-z]/i)
    ? outcomeContainer?.querySelector("span")?.textContent
    : "TBD";
  const score = outcomeContainer?.querySelector("span > a.AnchorLink")
    ?.textContent
    ? outcomeContainer
        ?.querySelector("span > a.AnchorLink")
        ?.textContent?.trim()
    : "TBD";
  const gameUrl = outcomeContainer
    ?.querySelector("span > a.AnchorLink")
    ?.getAttribute("href");
  return {
    gameUrl,
    date,
    opponent,
    homeOrAway,
    outcome,
    score,
  } as ScheduleGame;
};

export const rosterScraper = (html: string) => {
  const document = getDocument(html);
  const teamRoster: RosterPlayer[] = [];
  getOffensePlayers(document, teamRoster);
  getDefensePlayers(document, teamRoster);
  getSTPlayers(document, teamRoster);
  return teamRoster;
};

const getOffensePlayers = (document: Document, teamRoster: RosterPlayer[]) => {
  const tBody = document.querySelector(".Offense tbody");
  const tRows = tBody?.querySelectorAll("tr");
  tRows?.forEach((row) => {
    const playerImage = row
      .querySelector("td div.headshot img")
      ?.getAttribute("alt");
    const playerName = row.querySelector("td + td > div > a")?.textContent;
    const playerNumber = row.querySelector(
      "td + td > div a + span"
    )?.textContent;
    const statsUrl = row.querySelector("td + td > div a")?.getAttribute("href");
    const playerPosition = row.querySelector("td + td + td > div")?.textContent;
    const playerAge = row.querySelector("td + td + td + td > div")?.textContent;
    const playerHeight = row.querySelector(
      "td + td + td + td + td > div"
    )?.textContent;
    const playerWeight = row.querySelector(
      "td + td + td + td + td + td > div"
    )?.textContent;
    const playerExp = row.querySelector(
      "td + td + td + td + td + td + td > div"
    )?.textContent;
    const playerCollege = row.querySelector(
      "td + td + td + td + td + td + td + td > div"
    )?.textContent;
    teamRoster.push({
      statsUrl: statsUrl?.replace("/player/", "/player/stats/"),
      headshot: playerImage,
      lineup: "Offense",
      name: playerName,
      number: playerNumber,
      position: playerPosition,
      age: playerAge,
      height: playerHeight,
      weight: playerWeight,
      experience: playerExp,
      college: playerCollege,
    } as RosterPlayer);
  });
};

const getDefensePlayers = (document: Document, teamRoster: RosterPlayer[]) => {
  const tBody = document.querySelector(".Defense tbody");
  const tRows = tBody?.querySelectorAll("tr");
  tRows?.forEach((row) => {
    const playerImage = row
      .querySelector("td div.headshot img")
      ?.getAttribute("alt");
    const playerName = row.querySelector("td + td > div > a")?.textContent;
    const playerNumber = row.querySelector(
      "td + td > div a + span"
    )?.textContent;
    const statsUrl = row.querySelector("td + td > div a")?.getAttribute("href");
    const playerPosition = row.querySelector("td + td + td > div")?.textContent;
    const playerAge = row.querySelector("td + td + td + td > div")?.textContent;
    const playerHeight = row.querySelector(
      "td + td + td + td + td > div"
    )?.textContent;
    const playerWeight = row.querySelector(
      "td + td + td + td + td + td > div"
    )?.textContent;
    const playerExp = row.querySelector(
      "td + td + td + td + td + td + td > div"
    )?.textContent;
    const playerCollege = row.querySelector(
      "td + td + td + td + td + td + td + td > div"
    )?.textContent;
    teamRoster.push({
      statsUrl: statsUrl?.replace("/player/", "/player/stats/"),
      headshot: playerImage,
      lineup: "Defense",
      name: playerName,
      number: playerNumber,
      position: playerPosition,
      age: playerAge,
      height: playerHeight,
      weight: playerWeight,
      experience: playerExp,
      college: playerCollege,
    } as RosterPlayer);
  });
};

const getSTPlayers = (document: Document, teamRoster: RosterPlayer[]) => {
  const tBody = document.querySelector(".Special.Teams tbody");
  const tRows = tBody?.querySelectorAll("tr");
  tRows?.forEach((row) => {
    const playerImage = row
      .querySelector("td div.headshot img")
      ?.getAttribute("alt");
    const playerName = row.querySelector("td + td > div > a")?.textContent;
    const playerNumber = row.querySelector(
      "td + td > div a + span"
    )?.textContent;
    const statsUrl = row.querySelector("td + td > div a")?.getAttribute("href");
    const playerPosition = row.querySelector("td + td + td > div")?.textContent;
    const playerAge = row.querySelector("td + td + td + td > div")?.textContent;
    const playerHeight = row.querySelector(
      "td + td + td + td + td > div"
    )?.textContent;
    const playerWeight = row.querySelector(
      "td + td + td + td + td + td > div"
    )?.textContent;
    const playerExp = row.querySelector(
      "td + td + td + td + td + td + td > div"
    )?.textContent;
    const playerCollege = row.querySelector(
      "td + td + td + td + td + td + td + td > div"
    )?.textContent;
    teamRoster.push({
      statsUrl: statsUrl?.replace("/player/", "/player/stats/"),
      headshot: playerImage,
      lineup: "Special Teams",
      name: playerName,
      number: playerNumber,
      position: playerPosition,
      age: playerAge,
      height: playerHeight,
      weight: playerWeight,
      experience: playerExp,
      college: playerCollege,
    } as RosterPlayer);
  });
};

export const playerStatsScraper = (html: string) => {
  const document = getDocument(html);
  const playerStatus = document.querySelector("span.TextStatus")?.textContent;
  const categories: any[] = [];
  const tableEls = document.querySelectorAll(
    "div.ResponsiveTable > div.Table__Title"
  );
  tableEls.forEach((cat, i) => {
    const seasons: any[] = [];
    const category = cat.textContent;
    const tableHeaders = cat.parentElement?.querySelectorAll("thead > tr > th");
    tableHeaders?.forEach((th, i) => {
      const data = cat.parentElement?.querySelectorAll("tbody > tr > td");
      const dataArr: any[] = [];
      data?.forEach((td) => {
        dataArr.push(td.textContent);
      });
      seasons.push({
        season: th.textContent,
        dataArr: tableHeaders.length,
      });
    });
    categories.push({
      category,
      seasons,
    });
  });
  return { status: playerStatus, categories };
};
