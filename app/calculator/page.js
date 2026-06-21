import Hero from "../../components/Hero";
import Calculator from "../../components/Calculator";
import JsonLd from "../../components/JsonLd";
import FAQ from "../../components/FAQ";
import AdSlot from "../../components/AdSlot";
import { generateWebPageSchema, generateFAQSchema } from "../../lib/schemas";
import { generateMetadata } from "../../lib/metadata";
import { getData } from "../../lib/data";
export const metadata = generateMetadata({ title: "Plasma Donation Earnings Calculator", description: "Calculate how much you can earn donating plasma. Free earnings calculator for new and returning donors.", path: "calculator" });
export default async function CalculatorPage() {
  const { companies } = await getData();
  const schemas = [generateWebPageSchema("Plasma Donation Earnings Calculator", "Calculate your plasma donation earnings")];
  const faqs = [
    { q: "How accurate is this calculator?", a: "This calculator provides estimates based on average pay rates. Actual earnings vary by location, current promotions, and donation frequency." },
    { q: "How often can I donate plasma?", a: "Most centers allow donations twice per week with at least 48 hours between donations." },
    { q: "Do rates change?", a: "Yes, pay rates and promotions change regularly. Check with your local center for current rates." },
  ];
  schemas.push(generateFAQSchema(faqs));
  return (
    <>
      <JsonLd data={schemas} />
      <Hero title="Plasma Donation Earnings Calculator" subtitle="Estimate your potential earnings based on donation frequency and donor type." />
      <section className="section">
        <div className="container">
          <Calculator />
        </div>
      </section>
      <AdSlot slot="calculator-bottom" />
      <section className="section">
        <div className="container">
          <h2 className="section-title">Top Centers</h2>
          <div className="coupon-grid">
            {companies.map((c) => (
              <div key={c.id} className="company-rate-card" style={{ borderLeftColor: c.color }}>
                <h3>{c.shortName}</h3>
                <p>New: ${c.newDonorRate}/donation</p>
                <p>Return: ${c.returnDonorRate}/donation</p>
              </div>
            ))}
          </div>
        </div>
      </section>
      <FAQ items={faqs} />
    </>
  );
}
