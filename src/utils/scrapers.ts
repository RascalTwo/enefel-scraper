import { JSDOM } from "jsdom";
import { RawTeam, RawTeamStats, RosterPlayer } from "./types.js";
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
        profUrl:
          profUrl === "/teams/indianapolis-colts" ||
          profUrl === "/teams/houston-texans"
            ? `${profUrl}/`
            : profUrl,
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

export const teamRosterScraper = (html: string) => {
  const document = getDocument(html);
  const tableRowEls = document.querySelectorAll(
    "table.d3-o-table--detailed tbody > tr"
  );
  const roster: RosterPlayer[] = [];
  tableRowEls.forEach((tr) => {
    const headshot = tr.querySelector("td picture img")?.getAttribute("src");
    const playerAnchorEl = tr.querySelector("td a.nfl-o-roster__player-name");
    const name = playerAnchorEl?.textContent;
    const playerUrl = playerAnchorEl?.getAttribute("href");
    const number = tr.querySelector("td + td")?.textContent;
    const position = tr.querySelector("td + td + td")?.textContent;
    const status = tr.querySelector("td + td + td + td")?.textContent;
    const height = tr.querySelector("td + td + td + td + td")?.textContent;
    const weight = tr.querySelector("td + td + td + td + td + td")?.textContent;
    const experience = tr.querySelector(
      "td + td + td + td + td + td + td"
    )?.textContent;
    const college = tr.querySelector(
      "td + td + td + td + td + td + td + td"
    )?.textContent;

    roster.push({
      headshot,
      name,
      playerUrl,
      number,
      position,
      status,
      height,
      weight,
      experience,
      college,
    } as RosterPlayer);
  });
  return roster;
};

export const teamStatsScraper = (html: string) => {
  const document = getDocument(html);
  const listEl = document.querySelector("ul.nfl-o-team-h2h-stats__list");
  const listItemEls = listEl?.querySelectorAll("li");
  if (typeof listItemEls !== undefined) {
    const total_first_downs = listItemEls![0].firstChild?.textContent;
    const fdRaw = listItemEls![1];
    const first_downs = {
      total_first_downs: total_first_downs as string,
      rushing: fdRaw.querySelector("span")?.textContent as string,
      passing: fdRaw.querySelector("span + span")?.textContent as string,
      penalty: fdRaw.querySelector("span + span + span")?.textContent as string,
    };

    const thirdSuccessful = listItemEls![2].firstChild?.textContent
      ?.split("/")
      .map((s) => s.trim());
    const fourthSuccessful = listItemEls![3].firstChild?.textContent
      ?.split("/")
      .map((s) => s.trim());
    const down_conversions = [
      {
        down: "third",
        successful: thirdSuccessful![0] as string,
        attempts: thirdSuccessful![1] as string,
      },
      {
        down: "fourth",
        successful: fourthSuccessful![0] as string,
        attempts: fourthSuccessful![1] as string,
      },
    ];

    const totOff = listItemEls![4].firstChild?.textContent;
    const playsRow = listItemEls![5];
    const totRush = listItemEls![6].firstChild?.textContent;
    const rushRow = listItemEls![7];
    const totPass = listItemEls![8].firstChild?.textContent;
    const passRow = listItemEls![9];
    const general = {
      total_yards: totOff as string,
      plays: playsRow.querySelector("span")?.textContent as string,
      average: playsRow.querySelector("span + span")?.textContent as string,
    };
    const rushing = {
      total_yards: totRush as string,
      plays: rushRow.querySelector("span")?.textContent as string,
      average: rushRow.querySelector("span + span")?.textContent as string,
    };
    const passing = {
      total_yards: totPass as string,
      completions: passRow.querySelector("span")?.textContent as string,
      attempts: passRow.querySelector("span + span")?.textContent as string,
      interceptions: passRow.querySelector("span + span + span")
        ?.textContent as string,
      average: passRow.querySelector("span + span + span + span")
        ?.textContent as string,
    };

    const sacks = listItemEls![10].firstChild?.textContent as string;

    const fgRow = listItemEls![11].firstChild?.textContent
      ?.split("/")
      .map((s) => s.trim());
    const field_goals = {
      successful: fgRow![0] as string,
      attempts: fgRow![1] as string,
    };

    const totTD = listItemEls![12].firstChild?.textContent;
    const tdRow = listItemEls![13];
    const rushTD = tdRow.querySelector("span")?.textContent;
    const passTD = tdRow.querySelector("span + span")?.textContent;
    const returnTD = tdRow.querySelector("span + span + span")?.textContent;
    const defTD = tdRow.querySelector("span + span + span + span")?.textContent;
    const touch_downs = {
      total: totTD as string,
      rushing: rushTD as string,
      passing: passTD as string,
      returns: returnTD as string,
      defensive: defTD as string,
    };

    const turnover_ratio = listItemEls![14]?.firstChild?.textContent as string;

    const stats = {
      first_downs,
      down_conversions,
      general,
      rushing,
      passing,
      sacks,
      field_goals,
      touch_downs,
      turnover_ratio,
    };

    return stats;
  }
};

export const playerScraper = (html: string) => {
  const document = getDocument(html);
  const status =
    document.querySelector("h3.nfl-c-player-header__roster-status")
      ?.textContent ?? "inactive";
  logger.base(`${status}`);
  const tableEl = document.querySelector("table.d3-o-table");
  const tableHeadingEl = tableEl?.querySelectorAll("thead > tr > th");
  const tableRowEls = tableEl?.querySelectorAll("tbody tr");
  const weekStats: {
    week: string | null | undefined;
    opponent: string | null | undefined;
    result: string | null | undefined;
    stats: { title: string | null; stat: string | null }[];
  }[] = [];
  tableRowEls?.forEach((row) => {
    const tdEl = row.querySelectorAll("td");
    const week = row.querySelector("td")?.textContent;
    const opponent = row.querySelector("td + td")?.textContent;
    const result = row.querySelector("td + td + td")?.textContent;
    const stats: { title: string | null; stat: string | null }[] = [];
    tdEl.forEach((td, idx) => {
      if (tableHeadingEl && idx > 2) {
        stats.push({
          title: tableHeadingEl[idx].textContent,
          stat: td.textContent,
        });
      }
    });
    weekStats.push({
      week,
      opponent,
      result,
      stats,
    });
  });
  return {
    status,
    stats: weekStats,
  };
};
