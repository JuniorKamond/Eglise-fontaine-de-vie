import type { Metadata, Viewport } from "next";
import localFont from "next/font/local";
import { config } from "@/config";
import { Header } from "@/components/layout/Header";
import { Footer } from "@/components/layout/Footer";
import { Providers } from "@/components/layout/Providers";
import "./globals.css";

const serif = localFont({
  src: [
    { path: "../fonts/newsreader-latin-opsz-normal.woff2", style: "normal", weight: "200 800" },
    { path: "../fonts/newsreader-latin-opsz-italic.woff2", style: "italic", weight: "200 800" },
  ],
  variable: "--font-serif",
  display: "swap",
});

const sans = localFont({
  src: "../fonts/hanken-grotesk-latin-wght-normal.woff2",
  weight: "100 900",
  variable: "--font-sans",
  display: "swap",
});

const description = `${config.eglise.nom} — ${config.eglise.slogan}. Culte chaque dimanche de 14h00 à 17h00, ${config.contact.adresse_courte}, Abidjan.`;

export const metadata: Metadata = {
  metadataBase: new URL(config.site.url),
  title: { default: `${config.eglise.nom} — ${config.eglise.slogan}`, template: `%s — ${config.eglise.nom}` },
  description,
  openGraph: {
    type: "website",
    locale: "fr_CI",
    siteName: config.eglise.nom,
    title: config.eglise.nom,
    description,
    images: [{ url: "/og.jpg", width: 1200, height: 630, alt: "Assemblée de l'Église Fontaine de Vie" }],
  },
  twitter: { card: "summary_large_image", title: config.eglise.nom, description, images: ["/og.jpg"] },
};

export const viewport: Viewport = { themeColor: "#0070CC", width: "device-width", initialScale: 1 };

const jsonLd = {
  "@context": "https://schema.org",
  "@type": "Church",
  name: config.eglise.nom,
  url: config.site.url,
  logo: `${config.site.url}/icon.png`,
  image: `${config.site.url}/og.jpg`,
  telephone: config.contact.telephone_lien,
  email: config.contact.email,
  foundingDate: String(config.eglise.annee_fondation),
  address: {
    "@type": "PostalAddress",
    streetAddress: config.contact.adresse_courte,
    addressLocality: "Abidjan",
    addressCountry: "CI",
  },
  geo: { "@type": "GeoCoordinates", latitude: config.contact.gps.lat, longitude: config.contact.gps.lng },
};

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="fr" className={`${serif.variable} ${sans.variable}`}>
      <body>
        <a href="#contenu" className="sr-only focus:not-sr-only focus:fixed focus:left-4 focus:top-4 focus:z-[100] focus:rounded-full focus:bg-white focus:px-5 focus:py-3 focus:text-encre">
          Aller au contenu
        </a>
        <Providers>
          <Header />
          <main id="contenu">{children}</main>
          <Footer />
        </Providers>
        <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }} />
      </body>
    </html>
  );
}
