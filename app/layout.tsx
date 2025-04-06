import type { Metadata } from "next";
import { Geist, Geist_Mono } from "next/font/google";
import "./globals.css";
import { LayoutWrapper } from "./layout-wrapper";

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

export const metadata: Metadata = {
  title: "BytesBricksAI - Innovative AI Solutions",
  description:
    "Building the future with AI. Innovative solutions that improve everyday life and boost business efficiency.",
  keywords: [
    "AI",
    "Artificial Intelligence",
    "Business Solutions",
    "Automation",
    "Sales Agent AI",
    "WhatsApp Automation",
    "AI for Ecommerce",
    "BytesBricksAI",
    "Innovation",
    "Technology",
  ],
  authors: [{ name: "BytesBricksAI", url: "https://bytesbricksai.com" }], // Assuming a domain
  openGraph: {
    title: "BytesBricksAI - Automate Sales & Support with AI",
    description:
      "Boost efficiency and improve customer experience with BytesBricksAI's intelligent automation solutions, including our advanced Sales Agent.",
    url: "https://bytesbricksai.com", // Assuming a domain
    siteName: "BytesBricksAI",
    // images: [ // Add an image URL later
    //   {
    //     url: 'https://example.com/og-image.jpg',
    //     width: 800,
    //     height: 600,
    //   },
    // ],
    locale: "en_US",
    type: "website",
  },
  twitter: {
    card: "summary_large_image",
    title: "BytesBricksAI - AI-Powered Automation for Your Business",
    description:
      "Transform your sales and customer service with BytesBricksAI. Explore our innovative AI solutions.",
    // siteId: 'YourTwitterID', // Add Twitter ID if available
    // creator: '@YourTwitterHandle', // Add Twitter handle
    // creatorId: 'YourTwitterCreatorID', // Add Twitter Creator ID if available
    // images: ['https://example.com/twitter-image.jpg'], // Add Twitter image URL later
  },
  robots: {
    index: true,
    follow: true,
    nocache: true,
    googleBot: {
      index: true,
      follow: true,
      noimageindex: true,
      "max-video-preview": -1,
      "max-image-preview": "large",
      "max-snippet": -1,
    },
  },
  // Add other relevant metadata like icons, manifest, etc.
  // icons: {
  //   icon: '/favicon.ico',
  //   shortcut: '/shortcut-icon.png',
  //   apple: '/apple-icon.png',
  //   other: {
  //     rel: 'apple-touch-icon-precomposed',
  //     url: '/apple-touch-icon-precomposed.png',
  //   },
  // },
  // manifest: '/site.webmanifest',
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body
        className={`${geistSans.variable} ${geistMono.variable} antialiased bg-gray-50 text-slate-900`}
      >
        <LayoutWrapper>{children}</LayoutWrapper>
      </body>
    </html>
  );
}
