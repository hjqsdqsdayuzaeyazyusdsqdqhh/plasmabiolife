import Link from "next/link";
import "./globals.css";
export const metadata = {
  title: { default: "PlasmaBioLife - Plasma Donation Earnings Guide", template: "%s | PlasmaBioLife" },
  description: "Compare plasma donation pay rates, find local centers, and calculate your earnings with our free plasma donation calculator.",
  openGraph: { siteName: "PlasmaBioLife", type: "website" },
};
export default function RootLayout({ children }) {
  return (
    <html lang="en">
      <head>
        <meta name="google-adsense-account" content="ca-pub-xxxxxxxxxxxxxx" />
        <script async src="https://pagead2.googlesyndication.com/pagead/js/adsbygoogle.js?client=ca-pub-xxxxxxxxxxxxxx" crossOrigin="anonymous" />
      </head>
      <body>
        <div className="topbar" />
        <nav className="nav">
          <div className="nav-inner">
            <Link href="/" className="logo">PlasmaBioLife</Link>
            <div className="nav-links">
              <Link href="/calculator">Calculator</Link>
              <Link href="/locations">Locations</Link>
              <Link href="/blog">Blog</Link>
            </div>
          </div>
        </nav>
        <main className="main">{children}</main>
        <footer className="footer">
          <div className="footer-inner">
            <p className="footer-disclaimer">This site provides general information about plasma donation earnings. Always verify current rates with your local donation center.</p>
            <div className="footer-links">
              <Link href="/privacy-policy">Privacy Policy</Link>
              <Link href="/terms-of-service">Terms of Service</Link>
              <Link href="/contact">Contact</Link>
              <Link href="/about">About</Link>
            </div>
          </div>
        </footer>
      </body>
    </html>
  );
}
