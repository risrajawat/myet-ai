import type { Metadata } from "next";
import { Inter } from "next/font/google";
import "./globals.css";
import Link from "next/link";
import { Newspaper } from "lucide-react";

const inter = Inter({ subsets: ["latin"] });

export const metadata: Metadata = {
  title: "MyET AI | AI-Native News Experience",
  description: "Personalized, interactive, and multi-modal news experience powered by AI.",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" className="dark">
      <body className={`${inter.className} min-h-screen bg-background text-foreground flex flex-col`}>
        {/* Premium Navbar */}
        <header className="sticky top-0 z-50 glass border-b border-border">
          <div className="max-w-7xl mx-auto px-4 h-16 flex items-center justify-between">
            <Link href="/" className="flex items-center gap-2 group">
              <div className="w-8 h-8 rounded-lg bg-gradient-to-br from-brand-500 to-orange-500 flex items-center justify-center text-white shadow-[0_0_15px_rgba(255,51,102,0.5)] group-hover:shadow-[0_0_25px_rgba(255,51,102,0.8)] transition-all">
                <Newspaper size={18} />
              </div>
              <span className="font-bold text-xl tracking-tight bg-clip-text text-transparent bg-gradient-to-r from-white to-gray-400">
                MyET<span className="text-brand-500">AI</span>
              </span>
            </Link>
            
            <nav className="flex items-center gap-6">
              <Link href="/" className="text-sm font-medium text-gray-300 hover:text-white transition-colors">
                Newsroom
              </Link>
              <div className="w-8 h-8 rounded-full bg-surface border border-border flex items-center justify-center cursor-pointer glass-hover">
                <span className="text-xs font-bold text-brand-500">ET</span>
              </div>
            </nav>
          </div>
        </header>

        {/* Main Content Area */}
        <main className="flex-1 max-w-7xl mx-auto w-full px-4 py-8 relative">
          {/* Subtle background glow effect */}
          <div className="absolute top-0 left-1/2 -translate-x-1/2 w-[600px] h-[600px] bg-brand-500/5 rounded-full blur-[120px] -z-10 pointer-events-none" />
          {children}
        </main>
      </body>
    </html>
  );
}
