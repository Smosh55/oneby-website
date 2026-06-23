import { ImageResponse } from "next/og";
import { OgShell, ogSize, ogContentType } from "@/lib/og";

export const size = ogSize;
export const contentType = ogContentType;
export const alt = "OneBy: the all-in-one CRM that turns every call into action";

export default function Image() {
  return new ImageResponse(
    (
      <OgShell
        eyebrow="The all-in-one CRM"
        title="Turn every call into action."
      />
    ),
    { ...size }
  );
}
