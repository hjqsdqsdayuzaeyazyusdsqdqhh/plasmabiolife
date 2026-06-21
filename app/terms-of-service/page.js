import JsonLd from "../../components/JsonLd";
import { generateWebPageSchema } from "../../lib/schemas";
import { generateMetadata } from "../../lib/metadata";
export const metadata = generateMetadata({ title: "Terms of Service", description: "Terms of service for PlasmaBioLife.", path: "terms-of-service" });
export default function TermsPage() {
  const schemas = [generateWebPageSchema("Terms of Service", "PlasmaBioLife terms of service")];
  return (
    <>
      <JsonLd data={schemas} />
      <div className="container page-content">
        <h1 className="page-title">Terms of Service</h1>
        <p className="page-intro">Last updated: January 2025</p>
        <p>PlasmaBioLife provides general information about plasma donation earnings for educational purposes. We do not guarantee the accuracy of all information. Pay rates and promotions change frequently. Always verify current rates with your local donation center.</p>
        <p>This site may display advertisements. We are not responsible for the content or practices of third-party advertisers.</p>
      </div>
    </>
  );
}
