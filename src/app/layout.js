import { Geist, Geist_Mono } from "next/font/google";
import "./globals.css";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import AppProviders from "@/components/AppProviders";
import { Toaster } from "react-hot-toast";

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

export const metadata = {
  title: "TechTalk | Technology Content Platform",
  description: "Modern technology content platform built with Next.js and Tailwind CSS.",
};

export default function RootLayout({ children }) {
  return (
    <html
      lang="en"
      className={`${geistSans.variable} ${geistMono.variable} h-full antialiased`}
      suppressHydrationWarning
    >
      <body className="min-h-full transition-colors duration-300" style={{ backgroundColor: "var(--background)", color: "var(--foreground)" }}>
        <AppProviders>
          <div className="flex min-h-screen flex-col">
            <Navbar/>
            <main className="mx-auto w-full max-w-7xl flex-1 px-4 pt-24 pb-10 sm:px-6 lg:px-8">
              {children}
              <Toaster position="top-right" />
            </main>
            <Footer />
          </div>
        </AppProviders>
      </body>
    </html>
  );
}
