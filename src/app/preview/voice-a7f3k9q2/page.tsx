import type { Metadata } from "next";
import VoiceDemo from "./VoiceDemo";

// Unlisted share link for the customer: keep it out of search + sitemaps.
export const metadata: Metadata = {
  title: "MD Auto Rental · Call intelligence",
  description:
    "MD Auto Rental's real claim calls, transcribed and turned into action items by OneBy.",
  robots: { index: false, follow: false },
};

export default function Page() {
  return <VoiceDemo />;
}
