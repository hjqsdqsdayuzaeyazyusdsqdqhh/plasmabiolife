import Link from "next/link";
export default function LocationGrid({ cities, title }) {
  if (!cities || cities.length === 0) return null;
  return (
    <section className="location-section">
      {title && <h2 className="section-title">{title}</h2>}
      <div className="location-grid">
        {cities.map((city) => (
          <Link key={city.slug} href={`/plasma-donation-${city.slug}`} className="location-card">
            <span className="location-city">{city.city}</span>
            <span className="location-state">{city.stateFull}</span>
          </Link>
        ))}
      </div>
    </section>
  );
}
