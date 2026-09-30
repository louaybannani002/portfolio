import type { Metadata, Viewport } from "next";
import { Inter, JetBrains_Mono, Space_Grotesk } from "next/font/google";
import { AppProviders } from "@/components/providers/AppProviders";
import { CustomCursor } from "@/components/layout/CustomCursor";
import { Footer } from "@/components/layout/Footer";
import { Navbar } from "@/components/layout/Navbar";
import { ScrollProgress } from "@/components/layout/ScrollProgress";
import { IntroLoader, introScript } from "@/components/layout/IntroLoader";
import { identity } from "@/data/portfolio";
import { OG_IMAGE, SITE_URL, siteDescription, siteKeywords, siteTitle } from "@/data/seo";
import "./globals.css";

const inter = Inter({
  variable: "--font-inter",
  subsets: ["latin"],
  display: "swap",
});

const spaceGrotesk = Space_Grotesk({
  variable: "--font-space-grotesk",
  subsets: ["latin"],
  display: "swap",
});

const jetbrainsMono = JetBrains_Mono({
  variable: "--font-jetbrains-mono",
  subsets: ["latin"],
  display: "swap",
});

export const metadata: Metadata = {
  metadataBase: new URL(SITE_URL),
  title: { default: siteTitle, template: `%s — ${identity.name}` },
  description: siteDescription,
  keywords: siteKeywords,
  authors: [{ name: identity.name, url: SITE_URL }],
  creator: identity.name,
  alternates: { canonical: "/" },
  openGraph: {
    type: "profile",
    url: "/",
    siteName: identity.name,
    title: siteTitle,
    description: siteDescription,
    locale: "en_US",
    images: [OG_IMAGE],
    firstName: identity.firstName,
    lastName: identity.lastName,
  },
  twitter: {
    card: "summary_large_image",
    title: siteTitle,
    description: siteDescription,
    images: [OG_IMAGE.url],
  },
  robots: { index: true, follow: true },
};

export const viewport: Viewport = {
  themeColor: "#0a0a0f",
  colorScheme: "dark",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    // suppressHydrationWarning: the intro script sets data-intro on <html> before hydration
    <html
      lang="en"
      className={`${inter.variable} ${spaceGrotesk.variable} ${jetbrainsMono.variable}`}
      suppressHydrationWarning
    >
      <head>
        {/* Decides before first paint whether the intro loader shows (first visit per session) */}
        <script dangerouslySetInnerHTML={{ __html: introScript }} />
      </head>
      <body className="bg-background font-sans text-foreground antialiased">
        <a
          href="#main"
          className="sr-only focus:not-sr-only focus:fixed focus:top-3 focus:left-3 focus:z-[80] focus:rounded-control focus:bg-elevated focus:px-4 focus:py-2"
        >
          Skip to content
        </a>
        <IntroLoader />
        <AppProviders>
          <ScrollProgress />
          <Navbar />
          <main id="main">{children}</main>
          <Footer />
          <CustomCursor />
        </AppProviders>
      </body>
    </html>
  );
}
