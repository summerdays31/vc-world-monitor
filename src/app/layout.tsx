import type { Metadata } from "next";
import { Geist } from "next/font/google";
import { Masthead } from "@/components/Masthead";
import "./globals.css";

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

export const metadata: Metadata = {
  title: {
    default: "World Monitor",
    template: "%s · World Monitor",
  },
  description:
    "Live and curated public signals across AI, infrastructure, and capital.",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" className={`${geistSans.variable} h-full antialiased`}>
      <body className="min-h-full bg-[#f7f6f3] font-sans text-[#0a0a0a]">
        <Masthead />
        <main className="min-w-0">{children}</main>
      </body>
    </html>
  );
}
