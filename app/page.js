import Hero from "../components/Hero";
import LocationGrid from "../components/LocationGrid";
import Calculator from "../components/Calculator";
import JsonLd from "../components/JsonLd";
import { getData } from "../lib/data";
import { generateOrganizationSchema, generateWebPageSchema } from "../lib/schemas";
export default async function HomePage() {
  const { cities } = await getData();
  const schemas = [generateOrganizationSchema(), generateWebPageSchema("PlasmaBioLife - Plasma Donation Earnings Guide", "Compare plasma donation pay rates and find local centers.")];
  return (
    <>
      <JsonLd data={schemas} />
      <Hero title="Plasma Donation Earnings Guide" subtitle="Find donation centers near you, compare pay rates, and calculate your potential earnings." />
      <section className="section">
        <div className="container">
          <h2 className="section-title">How Much Can You Earn?</h2>
          <Calculator />
        </div>
      </section>
      <section className="section">
        <div className="container">
          <LocationGrid cities={cities} title="Browse by City" />
        </div>
      </section>
    </>
  );
}
