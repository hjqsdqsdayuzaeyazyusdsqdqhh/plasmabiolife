import { getData } from "./data";

function pickTemplate(pool, seed) {
  return pool[seed % pool.length];
}

function fillTemplate(tpl, vars) {
  return tpl.replace(/\{(\w+)\}/g, (_, key) => vars[key] ?? `{${key}}`);
}

function pluralize(count, word) {
  return count === 1 ? word : `${word}s`;
}

function estimateMonthlyEarnings(newRate, returnRate, visitsPerWeek = 2) {
  const monthlyVisits = visitsPerWeek * 4;
  const firstMonthNew = monthlyVisits * newRate;
  const subsequentMonthly = monthlyVisits * returnRate;
  return { newDonorMonthly: firstMonthNew, returnDonorMonthly: subsequentMonthly };
}

async function generateEarningsContent(city, state) {
  const { companies } = await getData();
  const seed = city.slug.length + state.code.length;
  const templates = (await getData()).templates.earningsPage;
  const headline = fillTemplate(pickTemplate(templates.headlinePool, seed), { city: city.city, state: state.name });
  const intro = fillTemplate(pickTemplate(templates.introPool, seed + 1), { city: city.city, state: state.name });
  const payExplanation = fillTemplate(pickTemplate(templates.payExplanationPool, seed + 2), { city: city.city, state: state.name });
  const topCompany = companies[seed % companies.length];
  const earnings = estimateMonthlyEarnings(topCompany.newDonorRate, topCompany.returnDonorRate);
  return { headline, intro, payExplanation, topCompany, earnings };
}

async function generateCompanyContent(city, state, company) {
  const seed = city.slug.length + state.code.length + company.id.length;
  const templates = (await getData()).templates.companyPage;
  const headline = fillTemplate(pickTemplate(templates.headlinePool, seed), { city: city.city, state: state.name, company: company.shortName });
  const intro = fillTemplate(pickTemplate(templates.introPool, seed + 1), { city: city.city, state: state.name, company: company.shortName });
  const centerDesc = fillTemplate(pickTemplate(templates.centerDescriptionPool, seed + 2), { city: city.city, state: state.name, company: company.shortName });
  return { headline, intro, centerDesc };
}

async function generateBonusContent(city, state, bonus) {
  const seed = city.slug.length + state.code.length + bonus.type.length;
  const templates = (await getData()).templates.bonusPage;
  const headline = fillTemplate(pickTemplate(templates.headlinePool, seed), { city: city.city, state: state.name, bonus: bonus.title });
  const intro = fillTemplate(pickTemplate(templates.introPool, seed + 1), { city: city.city, state: state.name, bonus: bonus.title });
  return { headline, intro };
}

async function generateComparisonContent(city, state, comparison) {
  const seed = city.slug.length + state.code.length + comparison.slug.length;
  const templates = (await getData()).templates.comparisonPage;
  const headline = pickTemplate(templates.headlinePool, seed).replace("{comparisonTitle}", comparison.title).replace("{city}", city.city).replace("{state}", state.name);
  const intro = fillTemplate(pickTemplate(templates.introPool, seed + 1), { city: city.city, state: state.name });
  return { headline, intro };
}

async function generateFaqs(slug, faqKey) {
  const { faqs } = await getData();
  const pool = faqs[faqKey] || faqs.general;
  return pool;
}

export {
  pickTemplate,
  fillTemplate,
  pluralize,
  estimateMonthlyEarnings,
  generateEarningsContent,
  generateCompanyContent,
  generateBonusContent,
  generateComparisonContent,
  generateFaqs,
};
