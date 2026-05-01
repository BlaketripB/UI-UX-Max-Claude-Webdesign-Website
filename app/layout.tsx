import type { Metadata } from "next";
import { Geist, Geist_Mono } from "next/font/google";
import "./globals.css";
import Nav from "@/components/Nav";
import Footer from "@/components/Footer";
import ScrollProgress from "@/components/ScrollProgress";
import CursorGlow from "@/components/CursorGlow";
import { ContactPrefillProvider } from "@/components/ContactPrefillProvider";

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

export const metadata: Metadata = {
  metadataBase: new URL("https://lockedinweb.design"),
  title: {
    default: "Locked In Web Design — Premium sites, locked in.",
    template: "%s — Locked In Web Design",
  },
  description:
    "A design & engineering studio building fast, cinematic websites for ambitious brands.",
  icons: {
    icon: [
      { url: "/icon.svg", type: "image/svg+xml" },
      { url: "/favicon-32x32.png", sizes: "32x32", type: "image/png" },
      { url: "/favicon-16x16.png", sizes: "16x16", type: "image/png" },
    ],
    shortcut: "/favicon.ico",
    apple: "/apple-touch-icon.png",
  },
  openGraph: {
    images: [
      {
        url: "/logo-icon-512.png",
        width: 512,
        height: 512,
        alt: "Locked In Web Design",
      },
    ],
  },
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
      <body className="flex min-h-full flex-col bg-background text-foreground">
        <ContactPrefillProvider>
          <ScrollProgress />
          <CursorGlow />
          <Nav />
          <main className="relative flex-1">{children}</main>
          <Footer />
        </ContactPrefillProvider>
      </body>
    </html>
  );
}
