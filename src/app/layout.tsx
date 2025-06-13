"use client";

import { Geist, Geist_Mono } from "next/font/google";
import "./globals.css";
import { SessionProvider } from "next-auth/react";

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" className="scroll-smooth">
      <head>
        <title>NoBrainer Beta</title>
        <meta
          name="description"
          content="AI-powered prompt optimization platform"
        />
        <link rel="icon" href="/image.png" type="image/png" />
      </head>
      <body
        className={`${geistSans.variable} ${geistMono.variable} bg-black text-gray-200 antialiased`}
      >
        <SessionProvider>{children}</SessionProvider>
      </body>
    </html>
  );
}
