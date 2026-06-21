import Link from "next/link";
export default function Hero({ title, subtitle, badge }) {
  return (
    <div className="hero">
      <div className="hero-content">
        {badge && <span className="hero-badge">{badge}</span>}
        <h1 className="hero-title">{title}</h1>
        {subtitle && <p className="hero-subtitle">{subtitle}</p>}
        <div className="hero-actions">
          <Link href="/calculator" className="btn btn-primary">Try the Calculator</Link>
          <Link href="/locations" className="btn btn-secondary">Find a Location</Link>
        </div>
      </div>
    </div>
  );
}
