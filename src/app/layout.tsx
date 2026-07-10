import ThemeProvider from "@/components/ThemeProvider";
import { Analytics } from "@vercel/analytics/next";
import { SpeedInsights } from "@vercel/speed-insights/next";
import type { Metadata, Viewport } from "next";
import { Inter, JetBrains_Mono, Sora } from "next/font/google";
import Script from "next/script";
import "./globals.css";

const inter = Inter({
  variable: "--font-inter",
  subsets: ["latin"],
  display: "swap",
});

const sora = Sora({
  variable: "--font-sora",
  subsets: ["latin"],
  display: "swap",
});

const jetbrainsMono = JetBrains_Mono({
  variable: "--font-jetbrains-mono",
  subsets: ["latin"],
  display: "swap",
});

export const viewport: Viewport = {
  themeColor: [
    { media: "(prefers-color-scheme: light)", color: "#ffffff" },
    { media: "(prefers-color-scheme: dark)", color: "#0a0f1a" },
  ],
  width: "device-width",
  initialScale: 1,
};

const BASE_URL = process.env.NEXT_PUBLIC_BASE_URL!;

export const metadata: Metadata = {
  metadataBase: new URL(BASE_URL),
  title: {
    default: "Yusuf Reza Hasnat",
    template: "%s | Yusuf Reza Hasnat",
  },
  description:
    "Portfolio of Yusuf Reza Hasnat — Software Engineer, Competitive Programmer (Specialist @ Codeforces), ICPC Asia Dhaka Regionalist and CSE undergraduate at MIST. 1500+ problems solved.",
  keywords: [
    "Yusuf Reza Hasnat",
    "hasnat0006",
    "competitive programming",
    "ICPC",
    "Codeforces Specialist",
    "software engineer",
    "biomedical research",
    "algorithm",
    "MIST CSE",
    "Military Institute of Science and Technology",
    "problem solver",
    "full-stack developer",
    "Tekarsh",
    "Career Climb",
  ],
  authors: [{ name: "Yusuf Reza Hasnat", url: BASE_URL }],
  creator: "Yusuf Reza Hasnat",
  publisher: "Yusuf Reza Hasnat",
  alternates: {
    canonical: BASE_URL,
  },
  openGraph: {
    title: `Yusuf Reza Hasnat | ${new URL(BASE_URL).hostname}`,
    description:
      "Software Engineer, Competitive Programmer (Specialist @ CF), ICPC Asia Dhaka Regionalist & MIST CSE Undergraduate. 1500+ problems solved.",
    url: BASE_URL,
    siteName: new URL(BASE_URL).hostname,
    locale: "en_US",
    type: "website",
    countryName: "Bangladesh",
    emails: ["yusufrezahasnat0006@gmail.com"],
    images: [
      {
        url: `${BASE_URL}/logo.png`,
        width: 512,
        height: 512,
        alt: "Yusuf Reza Hasnat — Portfolio",
      },
    ],
  },
  twitter: {
    card: "summary_large_image",
    title: `Yusuf Reza Hasnat | ${new URL(BASE_URL).hostname}`,
    description:
      "Software Engineer, Competitive Programmer (Specialist @ CF), ICPC Asia Dhaka Regionalist & MIST CSE Undergraduate.",
    images: [`${BASE_URL}/logo.png`],
    creator: "@hasnat0006",
  },
  icons: {
    icon: [
      { url: "/favicon.ico", sizes: "any" },
      { url: "/logo.png", type: "image/png" },
    ],
    apple: { url: "/logo.png", sizes: "180x180" },
  },
  robots: {
    index: true,
    follow: true,
    googleBot: {
      index: true,
      follow: true,
      "max-video-preview": -1,
      "max-image-preview": "large",
      "max-snippet": -1,
    },
  },
  category: "technology",
  classification: "Portfolio",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html
      lang="en"
      className={`${inter.variable} ${sora.variable} ${jetbrainsMono.variable} h-full antialiased`}
      suppressHydrationWarning
    >
      <head>
        {/* Preconnect to critical external origins */}
        <link rel="preconnect" href="https://skillicons.dev" />
        <link rel="preconnect" href="https://raw.githubusercontent.com" />
        <link rel="dns-prefetch" href="https://github.com" />
        <link rel="dns-prefetch" href="https://codeforces.com" />

        {/* Preload hero image for faster LCP */}
        <link
          rel="preload"
          href="/hasnat.jpeg"
          as="image"
          type="image/jpeg"
          fetchPriority="high"
        />
        <meta
          name="google-site-verification"
          content="AnbzusuoDN1cBbBsp1oWGo-7eHr0aVgLI94uA_289wc"
        />
        <meta
          name="google-site-verification"
          content="Z9UgzpzVhcztBSr8r0ivQk4Xl0QmYDeYXMlXlPQcD64"
        />
        {/* Prevent flash of wrong theme */}
        <Script
          id="theme-init"
          strategy="beforeInteractive"
          dangerouslySetInnerHTML={{
            __html: `(function(){try{var t=localStorage.getItem("portfolio-theme");if(t==="dark"||(!t&&window.matchMedia("(prefers-color-scheme:dark)").matches)){document.documentElement.classList.add("dark")}}catch(e){}})()`,
          }}
        />
        {/* JSON-LD Structured Data for Google Knowledge Graph */}
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{
            __html: JSON.stringify({
              "@context": "https://schema.org",
              "@type": "Person",
              name: "Yusuf Reza Hasnat",
              alternateName: "hasnat0006",
              givenName: "Yusuf Reza",
              familyName: "Hasnat",
              url: BASE_URL,
              image: `${BASE_URL}/logo.png`,
              email: "yusufrezahasnat0006@gmail.com",
              jobTitle: [
                "Software Engineer",
                "Competitive Programmer",
                "Biomedical Researcher",
              ],
              description:
                "Competitive Programmer (Specialist @ Codeforces), ICPC Asia Dhaka Regionalist, and CSE undergraduate at MIST with 1500+ problems solved.",
              knowsAbout: [
                "Algorithm Design",
                "Data Structures",
                "Competitive Programming",
                "Web Development",
                "Biomedical Data Pipelines",
                "Machine Learning",
              ],
              alumniOf: {
                "@type": "CollegeOrUniversity",
                name: "Military Institute of Science and Technology (MIST)",
                identifier: "MIST",
              },
              affiliation: {
                "@type": "Organization",
                name: "MIST Computer Club",
              },
              sameAs: [
                "https://github.com/hasnat0006",
                "https://linkedin.com/in/yusufrezahasnat",
                "https://codeforces.com/profile/Hasnat0006",
              ],
              mainEntityOfPage: {
                "@type": "WebSite",
                "@id": BASE_URL,
                name: "Yusuf Reza Hasnat - Portfolio",
                url: BASE_URL,
              },
              nationality: {
                "@type": "Country",
                name: "Bangladesh",
              },
            }),
          }}
        />
        {/* JSON-LD WebSite schema with SearchAction */}
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{
            __html: JSON.stringify({
              "@context": "https://schema.org",
              "@type": "WebSite",
              "@id": `${BASE_URL}/#website`,
              url: BASE_URL,
              name: "Yusuf Reza Hasnat - Portfolio",
              description:
                "Portfolio of Yusuf Reza Hasnat — Software Engineer L1, Competitive Programmer and CSE Undergraduate from MIST.",
              publisher: {
                "@type": "Person",
                "@id": `${BASE_URL}/#person`,
                name: "Yusuf Reza Hasnat",
              },
              potentialAction: {
                "@type": "SearchAction",
                target: {
                  "@type": "EntryPoint",
                  urlTemplate: `${BASE_URL}/?q={search_term_string}`,
                },
                "query-input": "required name=search_term_string",
              },
            }),
          }}
        />
      </head>
      <body
        className="min-h-full flex flex-col transition-colors duration-300"
        suppressHydrationWarning
      >
        <ThemeProvider>{children}</ThemeProvider>
        <Analytics />
        <SpeedInsights />
      </body>
    </html>
  );
}
