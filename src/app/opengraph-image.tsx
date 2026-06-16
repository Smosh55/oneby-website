import { ImageResponse } from "next/og";
import { OgShell, ogSize, ogContentType } from "@/lib/og";

export const size = ogSize;
export const contentType = ogContentType;
export const alt = "OneBy: the AI Communications OS that turns every call into action";

export default function Image() {
  return new ImageResponse(
    (
      <OgShell
        eyebrow="The AI Communications OS"
        title="Turn every call into action."
      />
    ),
    { ...size }
  );
}
