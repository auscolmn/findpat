import type { Metadata } from "next";
import { Inter, JetBrains_Mono } from "next/font/google";
import "./globals.css";

const inter = Inter({
  variable: "--font-inter",
  subsets: ["latin"],
});

const jetbrainsMono = JetBrains_Mono({
  variable: "--font-jetbrains-mono",
  subsets: ["latin"],
});

export const metadata: Metadata = {
  title: "FindPAT - Find Psychedelic-Assisted Therapy Practitioners",
  description: "The trusted directory for Psychedelic-Assisted Therapy. Find verified practitioners or connect with collaborators in your area.",
  keywords: ["psychedelic therapy", "PAT", "MDMA therapy", "psilocybin", "ketamine", "psychedelic assisted therapy", "mental health"],
  openGraph: {
    title: "FindPAT - Psychedelic-Assisted Therapy Directory",
    description: "Find verified PAT practitioners or connect with collaborators",
    type: "website",
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body
        className={`${inter.variable} ${jetbrainsMono.variable} font-sans antialiased`}
      >
        {children}
      </body>
    </html>
  );
}
