import JsonLd from "../../components/JsonLd";
import { generateWebPageSchema } from "../../lib/schemas";
import { generateMetadata } from "../../lib/metadata";
export const metadata = generateMetadata({ title: "About PlasmaBioLife", description: "About PlasmaBioLife - plasma donation information guide.", path: "about" });
export default function AboutPage() {
  const schemas = [generateWebPageSchema("About PlasmaBioLife", "About PlasmaBioLife")];
  return (
    <>
      <JsonLd data={schemas} />
      <div className="container page-content">
        <h1 className="page-title">About PlasmaBioLife</h1>
        <p className="page-intro">Helping donors find the best plasma donation centers and maximize their earnings.</p>
        <p>PlasmaBioLife is a comprehensive guide to plasma donation in the United States. We provide up-to-date information about pay rates, center locations, and promotions from major plasma donation companies including BioLife, CSL Plasma, Octapharma, and Grifols.</p>
        <p>Our goal is to help donors make informed decisions and maximize their compensation.</p>
      </div>
    </>
  );
}
