import Link from "next/link";
import JsonLd from "../../components/JsonLd";
import AdSlot from "../../components/AdSlot";
import { generateWebPageSchema } from "../../lib/schemas";
import { generateMetadata } from "../../lib/metadata";
export const metadata = generateMetadata({ title: "Plasma Donation Blog", description: "Articles and guides about plasma donation earnings, tips, and center information.", path: "blog" });
const posts = [
  { slug: "tips-for-first-time-donors", title: "Tips for First-Time Plasma Donors", excerpt: "Everything you need to know before your first plasma donation visit.", date: "2025-01-15" },
  { slug: "how-to-earn-more", title: "How to Earn More Donating Plasma", excerpt: "Strategies to maximize your monthly plasma donation earnings.", date: "2025-01-10" },
  { slug: "what-to-expect", title: "What to Expect During Plasma Donation", excerpt: "A step-by-step guide to the plasma donation process.", date: "2025-01-05" },
];
export default function BlogIndexPage() {
  const schemas = [generateWebPageSchema("Plasma Donation Blog", "Articles about plasma donation")];
  return (
    <>
      <JsonLd data={schemas} />
      <div className="container page-content">
        <h1 className="page-title">Plasma Donation Blog</h1>
        <p className="page-intro">Tips, guides, and resources for plasma donors.</p>
        <AdSlot slot="blog-top" />
        <div className="blog-grid">
          {posts.map((post) => (
            <article key={post.slug} className="blog-card">
              <time className="blog-date">{post.date}</time>
              <h2 className="blog-title"><Link href={`/blog/${post.slug}`}>{post.title}</Link></h2>
              <p className="blog-excerpt">{post.excerpt}</p>
              <Link href={`/blog/${post.slug}`} className="blog-readmore">Read More</Link>
            </article>
          ))}
        </div>
      </div>
    </>
  );
}
