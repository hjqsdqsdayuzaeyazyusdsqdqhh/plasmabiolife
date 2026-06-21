import Link from "next/link";
import JsonLd from "../../components/JsonLd";
import AdSlot from "../../components/AdSlot";
import { generateWebPageSchema, generateBreadcrumbSchema } from "../../lib/schemas";
import { notFound } from "next/navigation";
const posts = [
  {
    slug: "tips-for-first-time-donors",
    title: "Tips for First-Time Plasma Donors",
    content: "Preparing for your first plasma donation is simple. Drink plenty of water before your appointment, eat a healthy meal rich in protein and iron, and avoid caffeine. Bring a valid ID and your Social Security card. The first visit takes about 2-3 hours because it includes a medical screening. Wear comfortable clothing with sleeves that can be rolled up easily.",
    date: "2025-01-15",
  },
  {
    slug: "how-to-earn-more",
    title: "How to Earn More Donating Plasma",
    content: "To maximize your plasma donation earnings, donate twice per week consistently. Take advantage of new donor bonuses by switching between companies when promotions change. Refer friends for referral bonuses. Watch for seasonal promotions and grand opening events at new centers. Sign up for center newsletters to stay informed about limited-time offers.",
    date: "2025-01-10",
  },
  {
    slug: "what-to-expect",
    title: "What to Expect During Plasma Donation",
    content: "The plasma donation process takes about 60-90 minutes for returning donors. After checking in, you will have a brief health screening. A technician will clean your arm and insert a sterile needle. Blood is drawn and plasma is separated by a centrifuge. Red blood cells are returned to your body. After donation, you will receive refreshments. You can resume normal activities but should avoid heavy exercise for the rest of the day.",
    date: "2025-01-05",
  },
];
export function generateStaticParams() {
  return posts.map((post) => ({ slug: post.slug }));
}
export async function generateMetadata({ params }) {
  const post = posts.find((p) => p.slug === params.slug);
  if (!post) return { title: "Post Not Found" };
  return { title: post.title, description: post.content.slice(0, 160) };
}
export default function BlogPostPage({ params }) {
  const post = posts.find((p) => p.slug === params.slug);
  if (!post) notFound();
  const schemas = [
    generateWebPageSchema(post.title, post.content.slice(0, 160)),
    generateBreadcrumbSchema([
      { name: "Home", url: "https://plasmabiolife.com/" },
      { name: "Blog", url: "https://plasmabiolife.com/blog" },
      { name: post.title, url: `https://plasmabiolife.com/blog/${post.slug}` },
    ]),
  ];
  return (
    <>
      <JsonLd data={schemas} />
      <div className="container page-content">
        <article>
          <time className="blog-date">{post.date}</time>
          <h1 className="page-title">{post.title}</h1>
          <p>{post.content}</p>
        </article>
        <AdSlot slot="blog-post-bottom" />
        <Link href="/blog" className="btn btn-secondary">Back to Blog</Link>
      </div>
    </>
  );
}
