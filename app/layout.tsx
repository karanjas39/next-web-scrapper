import type { Metadata } from "next";
import "./globals.css";

export const metadata: Metadata = {
  title: "Web scrapper",
  description: "Ultimate web scrapper",
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
