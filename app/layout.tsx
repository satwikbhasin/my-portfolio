import "../global.css";
import { Inter } from "next/font/google";
import LocalFont from "next/font/local";
import { Metadata } from "next";
import { Analytics as BeamAnalytics } from "./components/analytics";
import { Analytics } from '@vercel/analytics/react';
import { SpeedInsights } from '@vercel/speed-insights/next';
import { Link } from "@mui/material";

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
      <footer className="text-zinc-500 mt-3 mb-3 text-center text-sm">
        Built by{" "}
        <Link
          style={{
            color: "seagreen",
            textDecoration: "none",
          }}
          href="
        https://linkedin.com/in/satwikbhasin">
          Satwik Bhasin
        </Link>
        {" "}|{" "}
        Get this template on{" "}
        <Link
          style={{
            color: "seagreen",
            textDecoration: "none",
          }}
          href="
        https://github.com/satwikbhasin/my-portfolio">
          GitHub
        </Link>
      </footer>
    </html>
  );
}
