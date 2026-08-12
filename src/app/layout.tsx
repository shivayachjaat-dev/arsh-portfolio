import type { Metadata, Viewport } from "next";
import { Inter, JetBrains_Mono } from "next/font/google";
import "./globals.css";
import { ThemeProvider } from "@/components/theme-provider";

const inter = Inter({
  variable: "--font-inter",
  subsets: ["latin"],
  display: "swap",
});

const jetbrainsMono = JetBrains_Mono({
  variable: "--font-jetbrains-mono",
  subsets: ["latin"],
  display: "swap",
});

const siteUrl = "https://arshshivayach.com";

export const metadata: Metadata = {
  metadataBase: new URL(siteUrl),
  title: {
    default: "Arsh Shivayach — AI Automation Engineer & Senior Systems Engineer",
    template: "%s — Arsh Shivayach",
  },
  description:
    "Senior Systems Engineer specializing in AI Automation, Workflow Engineering, Internal Platforms, High-Performance Software, and Rapid MVP Development. 6+ years building enterprise software systems.",
  keywords: [
    "AI Automation Engineer",
    "Senior Systems Engineer",
    "C++ Developer",
    "AI Workflow Automation",
    "Internal Tools Builder",
    "Rapid MVP Development",
    "Solution Architect",
    "Enterprise Software",
    "Developer Productivity",
    "Arsh Shivayach",
  ],
  authors: [{ name: "Arsh Shivayach" }],
  creator: "Arsh Shivayach",
  openGraph: {
    type: "website",
    locale: "en_US",
    url: siteUrl,
    title: "Arsh Shivayach — AI Automation Engineer & Senior Systems Engineer",
    description:
      "Building AI-Powered Software, Automation Systems, Developer Tools, and Scalable Products. 6+ years of enterprise software engineering experience.",
    siteName: "Arsh Shivayach",
    images: [
      {
        url: "/profile.jpg",
        width: 1200,
        height: 630,
        alt: "Arsh Shivayach — AI Automation Engineer",
      },
    ],
  },
  twitter: {
    card: "summary_large_image",
    title: "Arsh Shivayach — AI Automation Engineer & Senior Systems Engineer",
    description:
      "Building AI-Powered Software, Automation Systems, Developer Tools, and Scalable Products.",
    images: ["/profile.jpg"],
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
  alternates: {
    canonical: siteUrl,
  },
};

export const viewport: Viewport = {
  width: "device-width",
  initialScale: 1,
  maximumScale: 5,
  themeColor: [
    { media: "(prefers-color-scheme: dark)", color: "#0a0a0f" },
    { media: "(prefers-color-scheme: light)", color: "#fafafa" },
  ],
};

const jsonLd = {
  "@context": "https://schema.org",
  "@type": "Person",
  name: "Arsh Shivayach",
  url: siteUrl,
  image: `${siteUrl}/profile.jpg`,
  jobTitle: "AI Automation Engineer & Senior Systems Engineer",
  email: "arshshivayach@gmail.com",
  telephone: "+91-8958980048",
  address: {
    "@type": "PostalAddress",
    addressLocality: "Ghaziabad",
    addressCountry: "India",
  },
  sameAs: [
    "https://www.linkedin.com/in/arsh-shivayach-7576ba198",
    "https://github.com/arshshivayach",
  ],
  knowsAbout: [
    "AI Automation",
    "C++ Programming",
    "Qt Framework",
    "Workflow Automation",
    "Enterprise Software",
    "System Design",
    "Developer Productivity",
    "Rapid MVP Development",
  ],
  worksFor: [
    {
      "@type": "Organization",
      name: "Graebert GmbH",
    },
  ],
  alumniOf: [
    {
      "@type": "EducationalOrganization",
      name: "CDAC - ACTS",
    },
    {
      "@type": "EducationalOrganization",
      name: "Chandra Shekhar Azad University, Kanpur",
    },
  ],
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html
      lang="en"
      suppressHydrationWarning
      className={`${inter.variable} ${jetbrainsMono.variable} antialiased`}
    >
      <head>
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
        />
      </head>
      <body className="min-h-screen bg-background text-foreground font-sans">
        <ThemeProvider>{children}</ThemeProvider>
      </body>
    </html>
  );
}
