import { Inter } from "next/font/google";
import "../scss/main.scss";
import { generateMetadata as generateSEOMetadata, defaultSEO } from "@/lib/seo";
import Header from "@/components/Header";
import Footer from "@/components/Footer";

const inter = Inter({
  subsets: ["latin"],
  weight: ["100", "200", "300", "400", "500", "600", "700", "800", "900"],
  style: ["normal", "italic"],
  variable: "--font-inter",
});

// Generate metadata for the root layout
export const metadata = generateSEOMetadata({
  title: defaultSEO.title,
  description: defaultSEO.description,
  canonicalUrl: defaultSEO.siteUrl,
});

export default function RootLayout({ children }) {
  return (
    <html lang="en">
      <head>
        {/* Favicon and App Icons */}
        <link rel="icon" href="/favicon.ico" sizes="any" />
        <link rel="apple-touch-icon" href="/apple-touch-icon.png" />
        <link rel="manifest" href="/manifest.json" />
      </head>
      <body className={`${inter.variable}`}>
        <Header />
        {children}
        <Footer />
      </body>
    </html>
  );
}
