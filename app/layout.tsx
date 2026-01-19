import type { Metadata } from "next";
import { Source_Sans_3 as FontSans } from "next/font/google";
import Header from "../components/common/header";
import Footer from "@/components/common/footer";
import { Playfair_Display } from "next/font/google";
import "./globals.css";
import { ClerkProvider } from "@clerk/nextjs";
import { Toaster } from "@/components/ui/sonner";

const fontsans = FontSans({
  variable: "--font-geist-sans",
  subsets: ["latin"],
  weight: ["200", "300", "400", "500", "600", "700", "800", "900"],
});
const playfair = Playfair_Display({
  weight: ["400", "500", "600", "700"],
  style: ["italic"],
  subsets: ["latin"],
  variable: "--font-playfair",
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
    <ClerkProvider>
      <html lang="en">
        <body
          className={`${fontsans.variable} ${playfair.variable} font-sans antialiased`}
        >
          <div className="relative flex flex-col min-h-screen ">
            <div className="absolute top-0 z-[-2] h-screen w-screen bg-white bg-[radial-gradient(100%_50%_at_0%_0%,rgba(0,163,255,0.13)_0,rgba(0,163,255,0)_50%,rgba(0,163,255,0)_100%)]"></div>
            <Header />
            <main className="flex-1">{children}</main>
            <Footer />
          </div>
          <Toaster />
        </body>
      </html>
    </ClerkProvider>
  );
}
