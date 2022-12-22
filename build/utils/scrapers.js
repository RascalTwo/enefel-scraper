import { JSDOM } from "jsdom";
import { logger } from "./logger.js";
const getDocument = (html) => {
    const dom = new JSDOM(html);
    const document = dom.window.document;
    return document;
};
export const teamScraper = (html) => {
    const document = getDocument(html);
    const teams = [];
    const teamsEl = document.querySelectorAll("div.d3-l-col__col-12");
    teamsEl.forEach((t) => {
        var _a, _b, _c, _d, _e, _f, _g, _h;
        const icon = (_a = t.querySelector("picture img")) === null || _a === void 0 ? void 0 : _a.getAttribute("data-src");
        const fullName = (_c = (_b = t
            .querySelector("picture img")) === null || _b === void 0 ? void 0 : _b.getAttribute("alt")) === null || _c === void 0 ? void 0 : _c.split(" ");
        const profUrl = (_d = t
            .querySelector('a[data-link_name="1st CTA View Profile"]')) === null || _d === void 0 ? void 0 : _d.getAttribute("href");
        const conference = (_h = (_g = (_f = (_e = t.parentElement) === null || _e === void 0 ? void 0 : _e.parentElement) === null || _f === void 0 ? void 0 : _f.querySelector("h2.d3-o-section-title span")) === null || _g === void 0 ? void 0 : _g.textContent) === null || _h === void 0 ? void 0 : _h.trim().split(" ")[0];
        if (fullName) {
            teams.push({
                icon,
                team: fullName.pop(),
                city: fullName.join(" "),
                profUrl: profUrl === "/teams/indianapolis-colts" ||
                    profUrl === "/teams/houston-texans"
                    ? `${profUrl}/`
                    : profUrl,
                conference,
            });
        }
    });
    return teams;
};
export const teamDetailsScraper = (html) => {
    var _a, _b, _c, _d, _e, _f;
    const document = getDocument(html);
    const rankHeader = (_b = (_a = document
        .querySelector("div.nfl-c-team-header__ranking")) === null || _a === void 0 ? void 0 : _a.textContent) === null || _b === void 0 ? void 0 : _b.split(" ");
    const recordHeader = (_d = (_c = document
        .querySelector("div.nfl-c-team-header__stats")) === null || _c === void 0 ? void 0 : _c.textContent) === null || _d === void 0 ? void 0 : _d.split("-").map((r) => r.trim());
    const coach = (_e = document.querySelector("ul.d3-o-list > li div.nfl-c-team-info__info-value")) === null || _e === void 0 ? void 0 : _e.textContent;
    const stadium = (_f = document.querySelector("ul.d3-o-list > li + li div.nfl-c-team-info__info-value")) === null || _f === void 0 ? void 0 : _f.textContent;
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
    }
    else {
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
export const teamRosterScraper = (html) => {
    const document = getDocument(html);
    const tableRowEls = document.querySelectorAll("table.d3-o-table--detailed tbody > tr");
    const roster = [];
    tableRowEls.forEach((tr) => {
        var _a, _b, _c, _d, _e, _f, _g, _h;
        const headshot = (_a = tr.querySelector("td picture img")) === null || _a === void 0 ? void 0 : _a.getAttribute("src");
        const playerAnchorEl = tr.querySelector("td a.nfl-o-roster__player-name");
        const name = playerAnchorEl === null || playerAnchorEl === void 0 ? void 0 : playerAnchorEl.textContent;
        const playerUrl = playerAnchorEl === null || playerAnchorEl === void 0 ? void 0 : playerAnchorEl.getAttribute("href");
        const number = (_b = tr.querySelector("td + td")) === null || _b === void 0 ? void 0 : _b.textContent;
        const position = (_c = tr.querySelector("td + td + td")) === null || _c === void 0 ? void 0 : _c.textContent;
        const status = (_d = tr.querySelector("td + td + td + td")) === null || _d === void 0 ? void 0 : _d.textContent;
        const height = (_e = tr.querySelector("td + td + td + td + td")) === null || _e === void 0 ? void 0 : _e.textContent;
        const weight = (_f = tr.querySelector("td + td + td + td + td + td")) === null || _f === void 0 ? void 0 : _f.textContent;
        const experience = (_g = tr.querySelector("td + td + td + td + td + td + td")) === null || _g === void 0 ? void 0 : _g.textContent;
        const college = (_h = tr.querySelector("td + td + td + td + td + td + td + td")) === null || _h === void 0 ? void 0 : _h.textContent;
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
        });
    });
    return roster;
};
export const teamStatsScraper = (html) => {
    var _a, _b, _c, _d, _e, _f, _g, _h, _j, _k, _l, _m, _o, _p, _q, _r, _s, _t, _u, _v, _w, _x, _y, _z, _0, _1, _2, _3, _4;
    const document = getDocument(html);
    const listEl = document.querySelector("ul.nfl-o-team-h2h-stats__list");
    const listItemEls = listEl === null || listEl === void 0 ? void 0 : listEl.querySelectorAll("li");
    if (typeof listItemEls !== undefined) {
        const total_first_downs = (_a = listItemEls[0].firstChild) === null || _a === void 0 ? void 0 : _a.textContent;
        const fdRaw = listItemEls[1];
        const first_downs = {
            total_first_downs: total_first_downs,
            rushing: (_b = fdRaw.querySelector("span")) === null || _b === void 0 ? void 0 : _b.textContent,
            passing: (_c = fdRaw.querySelector("span + span")) === null || _c === void 0 ? void 0 : _c.textContent,
            penalty: (_d = fdRaw.querySelector("span + span + span")) === null || _d === void 0 ? void 0 : _d.textContent,
        };
        const thirdSuccessful = (_f = (_e = listItemEls[2].firstChild) === null || _e === void 0 ? void 0 : _e.textContent) === null || _f === void 0 ? void 0 : _f.split("/").map((s) => s.trim());
        const fourthSuccessful = (_h = (_g = listItemEls[3].firstChild) === null || _g === void 0 ? void 0 : _g.textContent) === null || _h === void 0 ? void 0 : _h.split("/").map((s) => s.trim());
        const down_conversions = [
            {
                down: "third",
                successful: thirdSuccessful[0],
                attempts: thirdSuccessful[1],
            },
            {
                down: "fourth",
                successful: fourthSuccessful[0],
                attempts: fourthSuccessful[1],
            },
        ];
        const totOff = (_j = listItemEls[4].firstChild) === null || _j === void 0 ? void 0 : _j.textContent;
        const playsRow = listItemEls[5];
        const totRush = (_k = listItemEls[6].firstChild) === null || _k === void 0 ? void 0 : _k.textContent;
        const rushRow = listItemEls[7];
        const totPass = (_l = listItemEls[8].firstChild) === null || _l === void 0 ? void 0 : _l.textContent;
        const passRow = listItemEls[9];
        const general = {
            total_yards: totOff,
            plays: (_m = playsRow.querySelector("span")) === null || _m === void 0 ? void 0 : _m.textContent,
            average: (_o = playsRow.querySelector("span + span")) === null || _o === void 0 ? void 0 : _o.textContent,
        };
        const rushing = {
            total_yards: totRush,
            plays: (_p = rushRow.querySelector("span")) === null || _p === void 0 ? void 0 : _p.textContent,
            average: (_q = rushRow.querySelector("span + span")) === null || _q === void 0 ? void 0 : _q.textContent,
        };
        const passing = {
            total_yards: totPass,
            completions: (_r = passRow.querySelector("span")) === null || _r === void 0 ? void 0 : _r.textContent,
            attempts: (_s = passRow.querySelector("span + span")) === null || _s === void 0 ? void 0 : _s.textContent,
            interceptions: (_t = passRow.querySelector("span + span + span")) === null || _t === void 0 ? void 0 : _t.textContent,
            average: (_u = passRow.querySelector("span + span + span + span")) === null || _u === void 0 ? void 0 : _u.textContent,
        };
        const sacks = (_v = listItemEls[10].firstChild) === null || _v === void 0 ? void 0 : _v.textContent;
        const fgRow = (_x = (_w = listItemEls[11].firstChild) === null || _w === void 0 ? void 0 : _w.textContent) === null || _x === void 0 ? void 0 : _x.split("/").map((s) => s.trim());
        const field_goals = {
            successful: fgRow[0],
            attempts: fgRow[1],
        };
        const totTD = (_y = listItemEls[12].firstChild) === null || _y === void 0 ? void 0 : _y.textContent;
        const tdRow = listItemEls[13];
        const rushTD = (_z = tdRow.querySelector("span")) === null || _z === void 0 ? void 0 : _z.textContent;
        const passTD = (_0 = tdRow.querySelector("span + span")) === null || _0 === void 0 ? void 0 : _0.textContent;
        const returnTD = (_1 = tdRow.querySelector("span + span + span")) === null || _1 === void 0 ? void 0 : _1.textContent;
        const defTD = (_2 = tdRow.querySelector("span + span + span + span")) === null || _2 === void 0 ? void 0 : _2.textContent;
        const touch_downs = {
            total: totTD,
            rushing: rushTD,
            passing: passTD,
            returns: returnTD,
            defensive: defTD,
        };
        const turnover_ratio = (_4 = (_3 = listItemEls[14]) === null || _3 === void 0 ? void 0 : _3.firstChild) === null || _4 === void 0 ? void 0 : _4.textContent;
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
export const playerScraper = (html) => {
    var _a, _b;
    const document = getDocument(html);
    const status = (_b = (_a = document.querySelector("h3.nfl-c-player-header__roster-status")) === null || _a === void 0 ? void 0 : _a.textContent) !== null && _b !== void 0 ? _b : "inactive";
    logger.base(`${status}`);
    const tableEl = document.querySelector("table.d3-o-table");
    const tableHeadingEl = tableEl === null || tableEl === void 0 ? void 0 : tableEl.querySelectorAll("thead > tr > th");
    const tableRowEls = tableEl === null || tableEl === void 0 ? void 0 : tableEl.querySelectorAll("tbody tr");
    const weekStats = [];
    tableRowEls === null || tableRowEls === void 0 ? void 0 : tableRowEls.forEach((row) => {
        var _a, _b, _c;
        const tdEl = row.querySelectorAll("td");
        const week = (_a = row.querySelector("td")) === null || _a === void 0 ? void 0 : _a.textContent;
        const opponent = (_b = row.querySelector("td + td")) === null || _b === void 0 ? void 0 : _b.textContent;
        const result = (_c = row.querySelector("td + td + td")) === null || _c === void 0 ? void 0 : _c.textContent;
        const stats = [];
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
