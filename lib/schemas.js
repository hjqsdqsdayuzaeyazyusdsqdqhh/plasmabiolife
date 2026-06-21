export function generateOrganizationSchema() {
  return {
    "@context": "https://schema.org",
    "@type": "Organization",
    name: "PlasmaBioLife",
    url: "https://plasmabiolife.com",
    description: "Plasma Donation Information & Earnings Calculator",
  };
}

export function generateFAQSchema(faqs) {
  return {
    "@context": "https://schema.org",
    "@type": "FAQPage",
    mainEntity: faqs.map((f) => ({
      "@type": "Question",
      name: f.q,
      acceptedAnswer: { "@type": "Answer", text: f.a },
    })),
  };
}

export function generateBreadcrumbSchema(items) {
  return {
    "@context": "https://schema.org",
    "@type": "BreadcrumbList",
    itemListElement: items.map((item, i) => ({
      "@type": "ListItem",
      position: i + 1,
      name: item.name,
      item: item.url,
    })),
  };
}

export function generateWebPageSchema(title, description) {
  return {
    "@context": "https://schema.org",
    "@type": "WebPage",
    name: title,
    description,
  };
}

export function generateLocalBusinessSchema(city, state, company) {
  return {
    "@context": "https://schema.org",
    "@type": "LocalBusiness",
    name: `${company.shortName} - ${city.city}`,
    description: `Plasma donation center in ${city.city}, ${state.name}`,
    address: {
      "@type": "PostalAddress",
      addressLocality: city.city,
      addressRegion: state.code,
      addressCountry: "US",
    },
  };
}
