import { JSDOM } from "jsdom";

export const parser = (html: any) => {
  const dom = new JSDOM(html);
  const document = dom.window.document;
  const main = document.querySelector("div#Main");
  const divisions = main?.querySelectorAll("a[title]");
  const teamNames: { name: string; href: string }[] = [];
  divisions?.forEach((d) => {
    const name = d.getAttribute("title");
    const href = d.getAttribute("href");
    if (name && href && !teamNames.find((n) => n.name === name))
      teamNames.push({ name, href });
  });

  return teamNames;
};
