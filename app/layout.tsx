import type { Metadata } from "next";
import "./globals.css";

export const metadata: Metadata = {
  title: "Reviews Scraper",
  description: "Ultimate reviews Scraper from Career360 website.",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body>{children}</body>
    </html>
  );
}
