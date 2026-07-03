import type { Metadata } from "next";
import VoiceDemo from "./VoiceDemo";

// Unlisted share link: keep it out of search + sitemaps.
export const metadata: Metadata = {
  title: "Voice recording demo",
  description:
    "See how OneBy turns a call recording into a summary and the exact next tasks — schedule, invoice, order parts, send documents, follow up.",
  robots: { index: false, follow: false },
};

export default function Page() {
  return <VoiceDemo />;
}
