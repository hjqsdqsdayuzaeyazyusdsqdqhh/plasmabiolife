import Link from "next/link";
import JsonLd from "../../components/JsonLd";
import LocationGrid from "../../components/LocationGrid";
import { getData } from "../../lib/data";
import { generateWebPageSchema } from "../../lib/schemas";
import { generateMetadata } from "../../lib/metadata";
export const metadata = generateMetadata({ title: "Plasma Donation Locations", description: "Find plasma donation centers near you. Browse all locations by city and state.", path: "locations" });
export default async function LocationsPage() {
  const { cities, states } = await getData();
  const schemas = [generateWebPageSchema("Plasma Donation Locations", "Find plasma donation centers near you")];
  const grouped = {};
  for (const city of cities) {
    if (!grouped[city.state]) grouped[city.state] = [];
    grouped[city.state].push(city);
  }
  return (
    <>
      <JsonLd data={schemas} />
      <div className="container page-content">
        <h1 className="page-title">Plasma Donation Locations</h1>
        <p className="page-intro">Find plasma donation centers in cities across the United States.</p>
        <LocationGrid cities={cities} />
        <section className="section">
          <h2 className="section-title">Browse by State</h2>
          <div className="state-grid">
            {states.filter((s) => grouped[s.code]).map((state) => (
              <details key={state.code} className="state-group">
                <summary className="state-name">{state.name}</summary>
                <div className="state-cities">
                  {grouped[state.code].map((city) => (
                    <Link key={city.slug} href={`/plasma-donation-${city.slug}`} className="state-city-link">{city.city}</Link>
                  ))}
                </div>
              </details>
            ))}
          </div>
        </section>
      </div>
    </>
  );
}
