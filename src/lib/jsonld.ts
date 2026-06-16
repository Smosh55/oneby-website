// Safely serialize JSON-LD for embedding inside a <script> tag.
// Our structured data comes from trusted, build-time content, but escaping the
// HTML-significant characters removes any chance of breaking out of the script
// context (defense in depth against a stray "</script>" in any string).
export function jsonLd(data: unknown): string {
  return JSON.stringify(data)
    .replace(/</g, "\\u003c")
    .replace(/>/g, "\\u003e")
    .replace(/&/g, "\\u0026");
}
