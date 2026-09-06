import type { Metadata } from "next";
import { Geist } from "next/font/google";
import { AppRail } from "@/components/AppRail";
import { getMonitorBundle } from "@/lib/adapters";
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

export default async function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  const { asOf } = await getMonitorBundle();

  return (
    <html lang="en" className={`${geistSans.variable} h-full antialiased`}>
      <body className="min-h-full bg-[#f8fafc] font-sans text-slate-900">
        <div className="flex min-h-full">
          <AppRail asOf={asOf} />
          <main className="min-w-0 flex-1 px-5 py-5 sm:px-6 lg:px-8">
            {children}
          </main>
        </div>
      </body>
    </html>
  );
}
