import Link from "next/link";
import JsonLd from "../components/JsonLd";
import { generateWebPageSchema } from "../lib/schemas";
export const metadata = { title: "404 - Page Not Found" };
export default function NotFound() {
  const schemas = [generateWebPageSchema("404 - Page Not Found", "The page you are looking for does not exist.")];
  return (
    <>
      <JsonLd data={schemas} />
      <div className="container page-content text-center" style={{ textAlign: "center", padding: "4rem 0" }}>
        <h1 className="page-title">404</h1>
        <p className="page-intro">Sorry, we couldn't find that page.</p>
        <Link href="/" className="btn btn-primary">Go Home</Link>
      </div>
    </>
  );
}
