import JsonLd from "../../components/JsonLd";
import { generateWebPageSchema } from "../../lib/schemas";
import { generateMetadata } from "../../lib/metadata";
export const metadata = generateMetadata({ title: "Privacy Policy", description: "Privacy policy for PlasmaBioLife.", path: "privacy-policy" });
export default function PrivacyPage() {
  const schemas = [generateWebPageSchema("Privacy Policy", "PlasmaBioLife privacy policy")];
  return (
    <>
      <JsonLd data={schemas} />
      <div className="container page-content">
        <h1 className="page-title">Privacy Policy</h1>
        <p className="page-intro">Last updated: January 2025</p>
        <p>PlasmaBioLife respects your privacy. We do not collect personal information unless you voluntarily provide it through our contact form. We use standard analytics to improve our content. We do not sell or share your data with third parties for marketing purposes.</p>
        <h2 className="section-title">Cookies</h2>
        <p>We may use cookies to analyze traffic and improve user experience. You can disable cookies in your browser settings.</p>
        <h2 className="section-title">Third-Party Services</h2>
        <p>We use Google AdSense and Google Analytics. These services may collect anonymous usage data. Google's privacy policy governs their data handling.</p>
      </div>
    </>
  );
}
