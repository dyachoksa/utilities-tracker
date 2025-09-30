import type { Metadata } from "next";

import { NextIntlClientProvider } from "next-intl";
import { Geist_Mono, Inter } from "next/font/google";

import { Toaster } from "~/components/ui/sonner";

import "./globals.css";

const inter = Inter({
  variable: "--font-inter",
  subsets: ["latin"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

export const metadata: Metadata = {
  title: {
    template: "%s - Utilities Tracker",
    default: "Utilities Tracker",
  },
  description: "The app to track utilities usage and calculate the cost",
};

type Props = Readonly<{ children: React.ReactNode }>;

export default function RootLayout({ children }: Props) {
  return (
    <html lang="en" suppressHydrationWarning>
      <body className={`${inter.variable} ${geistMono.variable} bg-gray-50 antialiased`}>
        <NextIntlClientProvider>
          {children}
          <Toaster />
        </NextIntlClientProvider>
      </body>
    </html>
  );
}
