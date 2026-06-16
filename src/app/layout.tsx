import type { Metadata } from "next";
import { Inter } from "next/font/google";
import "./globals.css";

const inter = Inter({
  variable: "--font-inter",
  subsets: ["latin"],
  weight: ["400", "500", "600", "700", "800"],
  display: "swap",
});

export const metadata: Metadata = {
  metadataBase: new URL("https://oneby.ai"),
  title: {
    default: "OneBy — The AI Communications OS for Small Business",
    template: "%s · OneBy",
  },
  description:
    "OneBy turns every call into action. When you can't answer, AI does — it gathers the details, summarizes the conversation, and creates the task so nothing falls through the cracks.",
  keywords: [
    "AI receptionist",
    "AI call answering",
    "business phone system",
    "home services software",
    "call summaries",
    "workflow automation",
  ],
  openGraph: {
    title: "OneBy — Never Miss A Customer Because You're Busy",
    description:
      "The AI Communications OS for Small Business. Every call becomes work.",
    type: "website",
    url: "https://oneby.ai",
  },
  icons: {
    icon: "/brand/oneby-mark.svg",
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" className={`${inter.variable} h-full antialiased`}>
      <body className="min-h-full flex flex-col bg-surface text-ink">
        {children}
      </body>
    </html>
  );
}
