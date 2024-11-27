import "../global.css";
import { Inter } from "next/font/google";
import LocalFont from "next/font/local";
import { Metadata } from "next";
import { Analytics as BeamAnalytics } from "./components/analytics";
import { Analytics } from '@vercel/analytics/react';
import { SpeedInsights } from '@vercel/speed-insights/next';

export const metadata: Metadata = {
  title: {
    default: "Satwik Bhasin",
    template: "%s | satwikbhasin.com",
  },
  description: "Full Stack Software Engineer",
  openGraph: {
    title: "Satwik Bhasin",
    description:
      "Full Stack Software Engineer",
    url: "https://satwikbhasin.com",
    siteName: "satwikbhasin.com",
    images: [
      {
        url: "https://satwikbhasin.com/SB.png",
        width: 1920,
        height: 1080,
      },
    ],
    locale: "en-US",
    type: "website",
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
  icons: {
    shortcut: "/SB.png",
  },
  twitter: {
    card: "summary_large_image",
    title: "Satwik Bhasin",
    description: "Full Stack Software Engineer",
    images: ["https://satwikbhasin.com/SB.png"],
  },
  metadataBase: new URL("https://satwikbhasin.com"),
};
const inter = Inter({
  subsets: ["latin"],
  variable: "--font-inter",
});

const calSans = LocalFont({
  src: "../public/fonts/CalSans-SemiBold.ttf",
  variable: "--font-calsans",
});

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en" className={[inter.variable, calSans.variable].join(" ")}>
      <head>
        {/* <Analytics /> */}
      </head>
      <body
        className={`bg-black ${process.env.NODE_ENV === "development" ? "debug-screens" : undefined
          }`}
      >
        {children}
        <Analytics />
        <BeamAnalytics />
        <SpeedInsights />
      </body>
    </html>
  );
}
