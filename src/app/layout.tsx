import type { Metadata } from "next";
import { Inter, Fira_Code, Pinyon_Script } from "next/font/google";
import "./globals.css";
import LenisProvider from "@/components/LenisProvider";
import CursorProvider from "@/components/CursorProvider";

const inter = Inter({ subsets: ["latin"], variable: "--font-inter" });
const firaCode = Fira_Code({ subsets: ["latin"], variable: "--font-fira-code" });
const pinyonScript = Pinyon_Script({ 
  subsets: ["latin"], 
  weight: "400", 
  variable: "--font-pinyon-script" 
});

export const metadata: Metadata = {
  title: "Portfolio | Full-Stack Engineer & Interaction Designer",
  description: "The Synthesis: Blueprint & Brush",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" className={`${inter.variable} ${firaCode.variable} ${pinyonScript.variable}`}>
      <body className="bg-base-dark text-text-primary antialiased font-sans flex flex-col min-h-screen">
        <LenisProvider>
          <CursorProvider />
          {children}
        </LenisProvider>
      </body>
    </html>
  );
}
