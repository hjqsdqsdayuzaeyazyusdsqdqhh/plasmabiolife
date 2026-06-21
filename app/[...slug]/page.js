import Link from "next/link";
import AdSlot from "../../components/AdSlot";
import JsonLd from "../../components/JsonLd";
import Calculator from "../../components/Calculator";
import FAQ from "../../components/FAQ";
import CouponCard from "../../components/CouponCard";
import LocationGrid from "../../components/LocationGrid";
import { getData } from "../../lib/data";
import { resolveSlug, getAllSlugs } from "../../lib/registry";
import { generateEarningsContent, generateCompanyContent, generateBonusContent, generateComparisonContent, generateFaqs } from "../../lib/content";
import { generateFAQSchema, generateBreadcrumbSchema, generateWebPageSchema, generateLocalBusinessSchema } from "../../lib/schemas";
import { generateMetadata } from "../../lib/metadata";
import { notFound } from "next/navigation";

export async function generateStaticParams() {
  const slugs = await getAllSlugs();
  return slugs.map((slug) => ({ slug: slug.split("/") }));
}

export async function generateMetadata({ params }) {
  const resolved = await resolveSlug(params.slug);
  if (!resolved) return { title: "Page Not Found" };
  const path = params.slug.join("/");
  switch (resolved.type) {
    case "earnings":
      return generateMetadata({ title: `Plasma Donation Pay in ${resolved.city.city}, ${resolved.state.name}`, description: `How much can you earn donating plasma in ${resolved.city.city}, ${resolved.state.name}? Compare pay rates, bonuses, and centers.`, path });
    case "company":
      return generateMetadata({ title: `${resolved.company.shortName} in ${resolved.city.city}, ${resolved.state.name}`, description: `Find ${resolved.company.shortName} plasma donation center in ${resolved.city.city}, ${resolved.state.name}. Pay rates, hours, and bonuses.`, path });
    case "bonus":
      return generateMetadata({ title: `${resolved.bonus.title} in ${resolved.city.city}, ${resolved.state.name}`, description: `Earn extra with ${resolved.bonus.title.toLowerCase()} at plasma donation centers in ${resolved.city.city}, ${resolved.state.name}.`, path });
    case "comparison":
      return generateMetadata({ title: resolved.comparison.title, description: resolved.comparison.summary, path });
    case "company-bonus":
      return generateMetadata({ title: `${resolved.company.shortName} ${resolved.bonus.title} in ${resolved.city.city}`, description: `Get the best ${resolved.company.shortName} ${resolved.bonus.title.toLowerCase()} in ${resolved.city.city}, ${resolved.state.name}.`, path });
    default:
      return generateMetadata({ title: "Plasma Donation Information", description: "Find plasma donation information and centers.", path });
  }
}

export default async function SlugPage({ params }) {
  const resolved = await resolveSlug(params.slug);
  if (!resolved) notFound();

  const { companies, cities, bonuses } = await getData();
  const { city, state, company, bonus, comparison } = resolved;
  const path = params.slug.join("/");
  const schemas = [generateWebPageSchema("", "")];

  switch (resolved.type) {
    case "earnings": {
      const content = await generateEarningsContent(city, state);
      const faqs = await generateFaqs(path, "general");
      schemas.push(generateFAQSchema(faqs));
      schemas.push(generateBreadcrumbSchema([{ name: "Home", url: "https://plasmabiolife.com/" }, { name: `${city.city}, ${state.name}`, url: `https://plasmabiolife.com/${path}` }]));

      const nearbyCities = (city.related || []).map((s) => cities.find((c) => c.slug === s)).filter(Boolean);

      return (
        <>
          <JsonLd data={schemas} />
          <div className="container page-content">
            <h1 className="page-title">{content.headline}</h1>
            <p className="page-intro">{content.intro}</p>
            <AdSlot slot="earnings-top" />
            <section className="section">
              <h2 className="section-title">Pay Rates in {city.city}</h2>
              <p>{content.payExplanation}</p>
              <Calculator rates={{ newDonor: content.topCompany.newDonorRate, returnDonor: content.topCompany.returnDonorRate }} />
            </section>
            <section className="section">
              <h2 className="section-title">Donation Centers in {city.city}</h2>
              <div className="coupon-grid">
                {companies.map((c) => (
                  <Link key={c.id} href={`/${c.slug}-${city.slug}`} className="coupon-link">
                    <CouponCard company={c} amount={c.newDonorRate} />
                  </Link>
                ))}
              </div>
            </section>
            {nearbyCities.length > 0 && (
              <section className="section">
                <LocationGrid cities={nearbyCities} title="Nearby Cities" />
              </section>
            )}
            <FAQ items={faqs} />
          </div>
        </>
      );
    }

    case "company": {
      const content = await generateCompanyContent(city, state, company);
      const faqs = await generateFaqs(path, company.id);
      schemas.push(generateFAQSchema(faqs));
      schemas.push(generateLocalBusinessSchema(city, state, company));

      return (
        <>
          <JsonLd data={schemas} />
          <div className="container page-content">
            <h1 className="page-title">{content.headline}</h1>
            <p className="page-intro">{content.intro}</p>
            <AdSlot slot="company-top" />
            <section className="section">
              <h2 className="section-title">Center Information</h2>
              <p>{content.centerDesc}</p>
              <div className="company-rate-card" style={{ borderLeftColor: company.color }}>
                <h3>{company.shortName} Pay Rates</h3>
                <p>New donors: ${company.newDonorRate}/donation</p>
                <p>Returning donors: ${company.returnDonorRate}/donation</p>
              </div>
            </section>
            <section className="section">
              <h2 className="section-title">Available Bonuses</h2>
              <div className="coupon-grid">
                {bonuses.map((b) => (
                  <Link key={b.type} href={`/${company.slug}-${b.slug}-${city.slug}`} className="coupon-link">
                    <CouponCard company={company} amount={company.newDonorRate} />
                  </Link>
                ))}
              </div>
            </section>
            <FAQ items={faqs} />
          </div>
        </>
      );
    }

    case "bonus": {
      const content = await generateBonusContent(city, state, bonus);
      const faqs = await generateFaqs(path, "general");

      return (
        <>
          <JsonLd data={schemas} />
          <div className="container page-content">
            <h1 className="page-title">{content.headline}</h1>
            <p className="page-intro">{content.intro}</p>
            <AdSlot slot="bonus-top" />
            <section className="section">
              <h2 className="section-title">Available Centers with {bonus.title}</h2>
              <div className="coupon-grid">
                {companies.map((c) => (
                  <Link key={c.id} href={`/${c.slug}-${bonus.slug}-${city.slug}`} className="coupon-link">
                    <CouponCard company={c} amount={c.newDonorRate} />
                  </Link>
                ))}
              </div>
            </section>
            <FAQ items={faqs} />
          </div>
        </>
      );
    }

    case "comparison": {
      const content = await generateComparisonContent(city, state, comparison);
      const companyA = companies.find((c) => c.id === comparison.companyA);
      const companyB = company ? companies.find((c) => c.id === comparison.companyB) : null;
      const faqs = await generateFaqs(path, "general");

      return (
        <>
          <JsonLd data={schemas} />
          <div className="container page-content">
            <h1 className="page-title">{content.headline}</h1>
            <p className="page-intro">{content.intro}</p>
            <AdSlot slot="comparison-top" />
            <section className="section">
              <p>{comparison.summary}</p>
              {companyA && companyB && (
                <div className="comparison-grid">
                  <div className="comparison-col">
                    <h3>{companyA.shortName}</h3>
                    <p>Rating: {comparison.ratingA}/5</p>
                    <p>New donor: ${companyA.newDonorRate}/donation</p>
                    <p>Return donor: ${companyA.returnDonorRate}/donation</p>
                  </div>
                  <div className="comparison-col">
                    <h3>{companyB.shortName}</h3>
                    <p>Rating: {comparison.ratingB}/5</p>
                    <p>New donor: ${companyB.newDonorRate}/donation</p>
                    <p>Return donor: ${companyB.returnDonorRate}/donation</p>
                  </div>
                </div>
              )}
            </section>
            <FAQ items={faqs} />
          </div>
        </>
      );
    }

    case "company-bonus": {
      const content = await generateCompanyContent(city, state, company);
      const faqs = await generateFaqs(path, company.id);

      return (
        <>
          <JsonLd data={schemas} />
          <div className="container page-content">
            <h1 className="page-title">{company.shortName} {bonus.title} in {city.city}, {state.name}</h1>
            <p className="page-intro">Combine {company.shortName}'s competitive rates with {bonus.title.toLowerCase()} to maximize your earnings in {city.city}.</p>
            <AdSlot slot="company-bonus-top" />
            <section className="section">
              <CouponCard company={company} amount={company.newDonorRate + bonus.averageValue} />
              <p style={{ marginTop: "1rem" }}>Donors at {company.shortName} in {city.city} can earn up to ${company.newDonorRate + bonus.averageValue} per donation by combining new donor rates with {bonus.title.toLowerCase()}.</p>
            </section>
            <FAQ items={faqs} />
          </div>
        </>
      );
    }

    default:
      notFound();
  }
}
