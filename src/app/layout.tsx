import type { Metadata } from "next";
import { Inter } from "next/font/google";
import "./globals.css";

const inter = Inter({
  subsets: ["latin"],
  weight: ["300", "400", "600", "800"],
  display: "swap",
  variable: "--font-inter",
});

export const metadata: Metadata = {
  title: "The Moving Company | Atlanta's Premier Moving Service — 470-658-7092",
  description:
    "Local, long-distance, same-day, and commercial moving in Atlanta, GA. Packing, furniture assembly, storage, senior moving and more. Free quotes. Call 470-658-7092. Open 24 hours.",
};

export default function RootLayout({
  children,
}: Readonly<{ children: React.ReactNode }>) {
  return (
    <html lang="en" className={inter.variable}>
      <body className="antialiased">{children}</body>
    </html>
  );
}
