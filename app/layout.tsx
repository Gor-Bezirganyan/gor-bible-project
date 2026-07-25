import type { Metadata } from "next";
import { Inter, Lora } from "next/font/google";
import "./globals.css";
import { SiteShell } from "./components/site-shell";

const inter = Inter({
  variable: "--font-inter",
  subsets: ["latin"],
});

const lora = Lora({
  variable: "--font-lora",
  subsets: ["latin"],
});

export const metadata: Metadata = {
  title: "The Gor Bible Project",
  description: "A modern study experience for Scripture, reflection, and AI-guided learning.",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" className={`${inter.variable} ${lora.variable} h-full`}>
      <body className="min-h-full bg-[#0B0A0F] text-[#F5F3F7] antialiased">
        <SiteShell>{children}</SiteShell>
      </body>
    </html>
  );
}
