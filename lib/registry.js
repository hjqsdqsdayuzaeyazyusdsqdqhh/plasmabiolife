import { getData } from "./data";

function slugify(text) {
  return text.toLowerCase().replace(/[^a-z0-9]+/g, "-").replace(/^-|-$/g, "");
}

async function getAllSlugs() {
  const { cities, companies, bonuses, comparisons } = await getData();
  const slugs = [];

  for (const city of cities) {
    slugs.push(`plasma-donation-${city.slug}`);
    slugs.push(`plasma-pay-${city.slug}`);
  }

  for (const city of cities) {
    for (const company of companies) {
      slugs.push(`${company.slug}-${city.slug}`);
    }
  }

  for (const city of cities) {
    for (const bonus of bonuses) {
      slugs.push(`plasma-${bonus.slug}-${city.slug}`);
    }
  }

  for (const comparison of comparisons) {
    slugs.push(`comparison/${comparison.slug}`);
  }

  for (const city of cities) {
    for (const bonus of bonuses) {
      for (const company of companies) {
        slugs.push(`${company.slug}-${bonus.slug}-${city.slug}`);
      }
    }
  }

  slugs.push("locations", "plasma-donation-near-me");
  return slugs;
}

async function resolveSlug(slugParts) {
  const slug = typeof slugParts === "string" ? slugParts : slugParts.join("/");
  const { cities, states, companies, bonuses, comparisons } = await getData();

  const patterns = [
    {
      test: (s) => /^comparison\/(.+)$/.test(s),
      handler: async (s) => {
        const match = s.match(/^comparison\/(.+)$/);
        const comp = comparisons.find((c) => c.slug === match[1]);
        if (!comp) return null;
        return { type: "comparison", comparison: comp, data: { slug: match[1] } };
      },
    },
    {
      test: (s) => /^plasma-donation-near-me$/.test(s),
      handler: () => ({ type: "nearby", data: {} }),
    },
    {
      test: (s) => /^plasma-donation-(.+)$/.test(s),
      handler: async (s) => {
        const citySlug = s.match(/^plasma-donation-(.+)$/)[1];
        const city = cities.find((c) => c.slug === citySlug);
        if (!city) return null;
        const state = states.find((st) => st.code === city.state);
        return { type: "earnings", city, state, data: { city, state } };
      },
    },
    {
      test: (s) => /^plasma-pay-(.+)$/.test(s),
      handler: async (s) => {
        const citySlug = s.match(/^plasma-pay-(.+)$/)[1];
        const city = cities.find((c) => c.slug === citySlug);
        if (!city) return null;
        const state = states.find((st) => st.code === city.state);
        return { type: "earnings", city, state, data: { city, state } };
      },
    },
    {
      test: (s) => /^plasma-(new-donor-bonus|monthly-bonus|referral-bonus|grand-opening-bonus|seasonal-promotion)-(.+)$/.test(s),
      handler: async (s) => {
        const match = s.match(/^plasma-([^-].+)-(.+)$/);
        const bonusType = match[1];
        const citySlug = match.slice(2).join("-");
        const city = cities.find((c) => c.slug === citySlug);
        if (!city) return null;
        const state = states.find((st) => st.code === city.state);
        const bonus = bonuses.find((b) => b.slug === bonusType);
        if (!bonus) return null;
        return { type: "bonus", city, state, bonus, data: { city, state, bonus } };
      },
    },
    {
      test: (s) => /^[a-z0-9-]+-(new-donor-bonus|monthly-bonus|referral-bonus|grand-opening-bonus|seasonal-promotion)-([a-z-]+)$/.test(s),
      handler: async (s) => {
        for (const company of companies) {
          const prefix = `${company.slug}-`;
          if (!s.startsWith(prefix)) continue;
          const rest = s.slice(prefix.length);
          for (const bonus of bonuses) {
            if (rest.startsWith(bonus.slug + "-")) {
              const citySlug = rest.slice(bonus.slug.length + 1);
              const city = cities.find((c) => c.slug === citySlug);
              if (!city) continue;
              const state = states.find((st) => st.code === city.state);
              return { type: "company-bonus", city, state, company, bonus, data: { city, state, company, bonus } };
            }
          }
        }
        return null;
      },
    },
    {
      test: (s) => {
        for (const company of companies) {
          if (s.startsWith(company.slug + "-")) {
            const rest = s.slice(company.slug.length + 1);
            if (cities.some((c) => c.slug === rest)) return true;
          }
        }
        return false;
      },
      handler: async (s) => {
        for (const company of companies) {
          if (!s.startsWith(company.slug + "-")) continue;
          const citySlug = s.slice(company.slug.length + 1);
          const city = cities.find((c) => c.slug === citySlug);
          if (!city) continue;
          const state = states.find((st) => st.code === city.state);
          return { type: "company", city, state, company, data: { city, state, company } };
        }
        return null;
      },
    },
  ];

  for (const pattern of patterns) {
    if (pattern.test(slug)) {
      const result = await pattern.handler(slug);
      if (result) return result;
    }
  }

  return null;
}

export { getAllSlugs, resolveSlug };
