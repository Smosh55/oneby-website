import ReactMarkdown from "react-markdown";
import remarkGfm from "remark-gfm";

// Renders post markdown with OneBy brand typography. No external prose plugin.
// Element mapping keeps full control of spacing, color, and rhythm.
export default function Prose({ content }: { content: string }) {
  return (
    <div className="text-[1.0625rem] leading-[1.75] text-ink/90">
      <ReactMarkdown
        remarkPlugins={[remarkGfm]}
        components={{
          h2: ({ children }) => (
            <h2 className="mt-12 mb-4 scroll-mt-24 text-2xl font-bold tracking-tight text-navy sm:text-[1.75rem]">
              {children}
            </h2>
          ),
          h3: ({ children }) => (
            <h3 className="mt-8 mb-3 text-xl font-semibold tracking-tight text-navy">
              {children}
            </h3>
          ),
          p: ({ children }) => <p className="my-5">{children}</p>,
          a: ({ href, children }) => (
            <a
              href={href}
              className="font-medium text-blue underline decoration-blue/30 underline-offset-2 hover:decoration-blue"
            >
              {children}
            </a>
          ),
          ul: ({ children }) => (
            <ul className="my-5 space-y-2.5 pl-1">{children}</ul>
          ),
          ol: ({ children }) => (
            <ol className="my-5 list-decimal space-y-2.5 pl-5 marker:font-semibold marker:text-blue">
              {children}
            </ol>
          ),
          li: ({ children }) => (
            <li className="relative pl-6 [ol_&]:pl-1">
              <span className="absolute left-0 top-[0.6em] hidden h-1.5 w-1.5 rounded-full bg-green [ul_&]:block" />
              {children}
            </li>
          ),
          blockquote: ({ children }) => (
            <blockquote className="my-7 rounded-r-xl border-l-4 border-blue bg-blue/[0.05] px-5 py-1 text-navy">
              {children}
            </blockquote>
          ),
          strong: ({ children }) => (
            <strong className="font-semibold text-navy">{children}</strong>
          ),
          hr: () => <hr className="my-10 border-line" />,
          table: ({ children }) => (
            <div className="my-7 overflow-x-auto rounded-xl border border-line">
              <table className="w-full border-collapse text-[0.95rem]">
                {children}
              </table>
            </div>
          ),
          thead: ({ children }) => (
            <thead className="bg-canvas">{children}</thead>
          ),
          th: ({ children }) => (
            <th className="border-b border-line px-4 py-3 text-left font-semibold text-navy">
              {children}
            </th>
          ),
          td: ({ children }) => (
            <td className="border-b border-line px-4 py-3 align-top text-ink/85">
              {children}
            </td>
          ),
          tr: ({ children }) => (
            <tr className="last:[&>td]:border-0">{children}</tr>
          ),
          code: ({ children }) => (
            <code className="rounded-md bg-canvas-2 px-1.5 py-0.5 text-[0.9em] font-medium text-navy">
              {children}
            </code>
          ),
          h1: ({ children }) => (
            <h2 className="mt-12 mb-4 text-2xl font-bold tracking-tight text-navy sm:text-[1.75rem]">
              {children}
            </h2>
          ),
        }}
      >
        {content}
      </ReactMarkdown>
    </div>
  );
}
