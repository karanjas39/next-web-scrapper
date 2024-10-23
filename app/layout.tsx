import type { Metadata } from "next";
import "./globals.css";

export const metadata: Metadata = {
  title: "Scrape360",
  description: "API for scraping reviews from the Career360 website.",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" suppressHydrationWarning>
      <body>{children}</body>
    </html>
  );
}
