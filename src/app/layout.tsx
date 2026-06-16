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
    default: "OneBy: The AI Communications OS That Turns Calls Into Action",
    template: "%s · OneBy",
  },
  description:
    "OneBy makes every call smarter. Answered or missed, desk phone or mobile, it transcribes the conversation, writes the summary, and creates and assigns the follow-up task, automatically. For businesses of every size.",
  keywords: [
    "post-call automation",
    "AI call summaries",
    "call task automation",
    "AI receptionist",
    "business phone system",
    "workflow automation",
    "call transcription",
  ],
  openGraph: {
    title: "OneBy: Turn Every Call Into Action",
    description:
      "The AI Communications OS that makes every call smarter. Every conversation becomes a summary and an assigned task, automatically.",
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
