import Hero from "../components/Hero";
import Calculator from "../components/Calculator";
import LocationGrid from "../components/LocationGrid";
import JsonLd from "../components/JsonLd";
import { getData } from "../lib/data";
import { generateOrganizationSchema, generateWebPageSchema } from "../lib/schemas";

const benefits = [
  {
    title: "Flexible Schedule",
    desc: "Donate when it fits your life — mornings, evenings, or weekends.",
    icon: (
      <svg width="20" height="20" viewBox="0 0 20 20" fill="none" xmlns="http://www.w3.org/2000/svg">
        <circle cx="10" cy="10" r="8" stroke="#14b8a6" strokeWidth="1.5" fill="none"/>
        <path d="M10 6v4l3 2" stroke="#14b8a6" strokeWidth="1.5" strokeLinecap="round"/>
      </svg>
    ),
  },
  {
    title: "Extra Income",
    desc: "Earn up to $920/month as a new donor with regular visits.",
    icon: (
      <svg width="20" height="20" viewBox="0 0 20 20" fill="none" xmlns="http://www.w3.org/2000/svg">
        <path d="M10 2v16M6 6l4-4 4 4M6 14l4 4 4-4" stroke="#14b8a6" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"/>
      </svg>
    ),
  },
  {
    title: "Fast Payments",
    desc: "Get paid immediately after each donation via prepaid card.",
    icon: (
      <svg width="20" height="20" viewBox="0 0 20 20" fill="none" xmlns="http://www.w3.org/2000/svg">
        <rect x="2" y="5" width="16" height="11" rx="2" stroke="#14b8a6" strokeWidth="1.5" fill="none"/>
        <circle cx="10" cy="10.5" r="2" stroke="#14b8a6" strokeWidth="1.5"/>
        <path d="M2 8h16" stroke="#14b8a6" strokeWidth="1.5"/>
      </svg>
    ),
  },
  {
    title: "Multiple Locations",
    desc: "300+ centers nationwide. Find one near you today.",
    icon: (
      <svg width="20" height="20" viewBox="0 0 20 20" fill="none" xmlns="http://www.w3.org/2000/svg">
        <path d="M10 2a6 6 0 00-6 6c0 4 6 10 6 10s6-6 6-10a6 6 0 00-6-6z" stroke="#14b8a6" strokeWidth="1.5" fill="none"/>
        <circle cx="10" cy="8" r="2" stroke="#14b8a6" strokeWidth="1.5"/>
      </svg>
    ),
  },
];

export default async function HomePage() {
  const { cities } = await getData();
  const schemas = [generateOrganizationSchema(), generateWebPageSchema("BioLife Plasma Earnings Calculator", "Calculate your plasma donation earnings with the free BioLife Plasma Earnings Calculator. Find centers and estimate your monthly income.")];
  return (
    <>
      <JsonLd data={schemas} />
      <Hero title="BioLife Plasma Earnings Calculator" subtitle="Calculate your monthly earnings from plasma donations. Compare pay rates, find nearby centers, and maximize your income." badge="2026 Updated Estimates" />
      <section className="section">
        <div className="container">
          <Calculator />
        </div>
      </section>
      <section className="section">
        <div className="container">
          <h2 className="section-title">Why Donate Plasma?</h2>
          <div className="benefits-grid">
            {benefits.map((b, i) => (
              <div key={i} className="benefit-card">
                <div className="benefit-icon">{b.icon}</div>
                <div className="benefit-title">{b.title}</div>
                <div className="benefit-desc">{b.desc}</div>
              </div>
            ))}
          </div>
        </div>
      </section>
      <section className="section">
        <div className="container">
          <LocationGrid cities={cities} title="Find a Center Near You" />
        </div>
      </section>
    </>
  );
}
