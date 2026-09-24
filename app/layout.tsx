import type { Metadata } from "next";
import "./globals.css";
import Header from "@/components/Header";
import Footer from "@/components/Footer";
import SmoothScroll from "@/components/SmoothScroll";
import GsapInit from "@/components/GsapInit";
import WhatsAppFloat from "@/components/WhatsAppFloat";
import RevealOnScroll from "@/components/RevealOnScroll";
import { site } from "@/lib/site";

export const metadata: Metadata = {
  metadataBase: new URL(site.url),
  title: {
    default: `${site.name} – ${site.legalName} | Abogados de Inmigración en NY, NJ y CT`,
    template: `%s | ${site.name}`,
  },
  description:
    "Firma legal especializada en inmigración, lesiones personales y bienes raíces para la comunidad hispana en Nueva York, Nueva Jersey y Connecticut. Consulta gratuita.",
  keywords: [
    "abogado de inmigración",
    "abogado hispano",
    "abogado Nueva York",
    "Visa U",
    "VAWA",
    "Green Card",
    "asilo político",
    "Neuhauser Law",
  ],
  openGraph: {
    type: "website",
    locale: "es_US",
    url: site.url,
    title: `${site.name} – ${site.legalName}`,
    description: site.tagline,
    siteName: site.name,
  },
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="es">
      <head>
        <link rel="preconnect" href="https://fonts.googleapis.com" />
        <link
          rel="preconnect"
          href="https://fonts.gstatic.com"
          crossOrigin="anonymous"
        />
        <link
          href="https://fonts.googleapis.com/css2?family=Inter:wght@400;500;600;700&family=Playfair+Display:wght@500;600;700&display=swap"
          rel="stylesheet"
        />
      </head>
      <body className="min-h-screen bg-bone text-ink antialiased">
        <SmoothScroll />
        <GsapInit />
        <RevealOnScroll />
        <Header />
        <main>{children}</main>
        <Footer />
        <WhatsAppFloat />
      </body>
    </html>
  );
}
