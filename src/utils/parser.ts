import { JSDOM } from "jsdom";

type Team = {
  name: string;
  href: string;
  logo: string;
  conference: "AFC" | "NFC";
  division: "north" | "south" | "east" | "west";
};

export const teamParser = (html: string) => {
  const dom = new JSDOM(html);
  const document = dom.window.document;
  const main = document.querySelector("div#Main");
  const conferences = main?.querySelectorAll("h3");
  const teamDetails: Team[] = [];

  conferences?.forEach((con) => {
    const containerEl = con.parentElement;
    const divisionEls = containerEl?.querySelectorAll("h5");
    // for each conference ['AFC', 'NFC'] get all divisions
    divisionEls?.forEach((division) => {
      const divisionText = division?.textContent?.toLowerCase();
      const divisionParent = division?.parentElement?.parentElement;
      const divisionTeams = divisionParent?.querySelectorAll("a > img");
      // for each division ['north', 'south', 'east', 'west'] get team name team url and team logo
      divisionTeams?.forEach((team) => {
        const teamName = team.parentElement?.getAttribute("title");
        const teamHref = team.parentElement?.getAttribute("href");
        const teamIcon = team.getAttribute("src");
        teamDetails.push({
          name: teamName as string,
          href: teamHref as string,
          logo: teamIcon as string,
          conference: con.textContent as "AFC" | "NFC",
          division: divisionText as "north" | "south" | "east" | "west",
        });
      });
    });
  });

  return teamDetails;
};
