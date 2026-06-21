export function generateMetadata({ title, description, path, canonical }) {
  const baseUrl = "https://plasmabiolife.com";
  return {
    title,
    description,
    alternates: { canonical: canonical || `${baseUrl}/${path}` },
    openGraph: {
      title,
      description,
      url: `${baseUrl}/${path}`,
      siteName: "PlasmaBioLife",
      type: "website",
    },
    robots: {
      index: true,
      follow: true,
    },
  };
}

export function baseMetadata(title, description) {
  return generateMetadata({ title, description, path: "" });
}
