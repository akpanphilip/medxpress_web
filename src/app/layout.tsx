import type { Metadata, Viewport } from "next";
import { Inter_Tight, JetBrains_Mono } from 'next/font/google';
import "./globals.css";
import Providers from "@/components/Providers";

const sans = Inter_Tight({
  subsets: ['latin'],
  variable: '--font-sans',
  display: 'swap',
});

const mono = JetBrains_Mono({
  subsets: ['latin'],
  variable: '--font-mono',
  display: 'swap',
});


export const metadata: Metadata = {
  title: "MEDXPRESS | Telemedicine for the modern web",
  description:
    "Consult verified doctors by video and chat, book appointments and get prescriptions. Healthcare that moves at your speed.",
};

export const viewport: Viewport = {
  themeColor: "#0d1b2a",
  width: "device-width",
  initialScale: 1,
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en" suppressHydrationWarning>
      <body className={`${sans.variable} ${mono.variable} antialiased`}>
        <Providers>{children}</Providers>
      </body>
    </html>
  );
}
