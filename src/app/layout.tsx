import type { Metadata } from "next";
import { Geist, Geist_Mono } from "next/font/google";
import { Footer } from "@/components/Footer";
import { Nav } from "@/components/Nav";
import "./globals.css";

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
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
    <html
      lang="en"
      className={`${geistSans.variable} ${geistMono.variable} h-full antialiased`}
    >
      <body className="min-h-full bg-[#f8fafc] font-sans text-slate-900">
        <Nav />
        <main className="mx-auto w-full max-w-[680px] px-4 pt-4 pb-2 sm:px-6 sm:pt-5">
          {children}
        </main>
        <Footer />
      </body>
    </html>
  );
}
