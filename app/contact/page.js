import JsonLd from "../../components/JsonLd";
import { generateWebPageSchema } from "../../lib/schemas";
import { generateMetadata } from "../../lib/metadata";
export const metadata = generateMetadata({ title: "Contact Us", description: "Contact PlasmaBioLife.", path: "contact" });
export default function ContactPage() {
  const schemas = [generateWebPageSchema("Contact Us", "Contact PlasmaBioLife")];
  return (
    <>
      <JsonLd data={schemas} />
      <div className="container page-content">
        <h1 className="page-title">Contact Us</h1>
        <p className="page-intro">Have a question or suggestion? Reach out to us.</p>
        <p>Email: contact@plasmabiolife.com</p>
        <p>We aim to respond within 1-2 business days.</p>
      </div>
    </>
  );
}
