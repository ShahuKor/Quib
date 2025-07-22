import type { Metadata } from "next";
import { Source_Sans_3 as FontSans } from "next/font/google";

import "./globals.css";

const fontsans = FontSans({
  variable: "--font-geist-sans",
  subsets: ["latin"],
  weight: ["200", "300", "400", "500", "600", "700", "800", "900"],
});

export const metadata: Metadata = {
  title: "Quib - AI Powered PDF summaryr",
  description: "Quib is an app made for summarizing pdfs using AI",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body className={`${fontsans.variable} font-sans antialiased`}>
        {children}
      </body>
    </html>
  );
}
