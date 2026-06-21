import { promises as fs } from "fs";
import path from "path";

const dataDir = path.join(process.cwd(), "data");

async function loadJSON(filename) {
  const file = await fs.readFile(path.join(dataDir, filename), "utf-8");
  return JSON.parse(file);
}

let cachedData = null;

async function getData() {
  if (cachedData) return cachedData;
  const [cities, states, companies, bonuses, comparisons, faqs, templates] = await Promise.all([
    loadJSON("cities.json"),
    loadJSON("states.json"),
    loadJSON("companies.json"),
    loadJSON("bonuses.json"),
    loadJSON("comparisons.json"),
    loadJSON("faqs.json"),
    loadJSON("content-templates.json"),
  ]);
  cachedData = { cities, states, companies, bonuses, comparisons, faqs, templates };
  return cachedData;
}

export { getData };
