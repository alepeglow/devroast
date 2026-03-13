import type { Metadata } from "next";
import { JetBrains_Mono } from "next/font/google";

import { Navbar } from "@/components/layout/navbar";

import "./globals.css";

const jetBrainsMono = JetBrains_Mono({
  subsets: ["latin"],
  variable: "--font-jetbrains-mono",
});

export const metadata: Metadata = {
  title: "devroast",
  description: "Paste your code. Get roasted.",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body className={`${jetBrainsMono.variable} font-sans antialiased`}>
        <div className="min-h-screen bg-surface-inverse text-text-inverse">
          <Navbar />
          {children}
        </div>
      </body>
    </html>
  );
}
