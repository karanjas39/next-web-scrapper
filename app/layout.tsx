import type { Metadata } from "next";
import "./globals.css";

export const metadata: Metadata = {
  title: "Reviews Scrapper",
  description: "Ultimate review scrapper from career360",
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
