"use client";

import { cn } from "@/lib/utils";
import React from "react";
import ReactMarkdown, { Components } from "react-markdown";
import remarkGfm from "remark-gfm";
import { CodeBlock, CodeBlockCode } from "./code-block";

export type MarkdownProps = {
  children: string;
  className?: string;
  components?: Components;
} & React.ComponentProps<typeof ReactMarkdown>;

const extractLanguage = (className?: string) => {
  if (!className) return "plaintext";
  const match = className.match(/language-(\w+)/);
  return match ? match[1] : "plaintext";
};

const INITIAL_COMPONENTS: Partial<Components> = {
  h1: ({ children }) => (
    <h1 className="text-2xl font-bold mb-4 text-primary">{children}</h1>
  ),
  h2: ({ children }) => (
    <h2 className="text-xl font-semibold mt-6 mb-3 text-primary">{children}</h2>
  ),
  h3: ({ children }) => (
    <h3 className="text-lg font-medium mt-5 mb-2">{children}</h3>
  ),
  p: ({ children }) => <p className="mb-4 leading-relaxed">{children}</p>,
  ul: ({ children }) => (
    <ul className="mb-4 pl-5 space-y-2 list-disc list-outside">{children}</ul>
  ),
  ol: ({ children }) => (
    <ol className="mb-4 pl-5 space-y-2 list-decimal list-outside">
      {children}
    </ol>
  ),
  li: ({ children }) => <li className="leading-normal">{children}</li>,
  a: ({ href, children }) => (
    <a
      href={href}
      className="text-blue-500 hover:text-blue-700 underline transition-colors"
      target="_blank"
      rel="noopener noreferrer"
    >
      {children}
    </a>
  ),
  blockquote: ({ children }) => (
    <blockquote className="border-l-4 border-primary pl-4 my-4 italic">
      {children}
    </blockquote>
  ),
  code: ({ className, children, node, ...props }) => {
    const isInline =
      !node?.position?.start?.line ||
      node?.position?.start?.line === node?.position?.end?.line;

    if (isInline) {
      return (
        <span
          className={cn(
            "bg-muted rounded-md px-1.5 py-0.5 font-mono text-sm",
            className
          )}
          {...props}
        >
          {children}
        </span>
      );
    }

    const language = extractLanguage(className);

    try {
      return (
        <CodeBlock className={cn("my-4", className)}>
          <CodeBlockCode code={children as string} language={language} />
        </CodeBlock>
      );
    } catch (error) {
      console.error("Error rendering code block:", error);
      return (
        <pre className="my-4 bg-muted p-4 rounded overflow-x-auto">
          <code>{children}</code>
        </pre>
      );
    }
  },
  pre: ({ children }) => <div className="my-4">{children}</div>,
  hr: () => <hr className="my-8 border-border" />,
  strong: ({ children }) => <strong className="font-bold">{children}</strong>,
  em: ({ children }) => <em className="italic">{children}</em>,
};

export function Markdown({
  children,
  className,
  components = INITIAL_COMPONENTS,
  ...props
}: MarkdownProps) {
  try {
    return (
      <div className={cn("space-y-2 text-card-foreground", className)}>
        <ReactMarkdown
          remarkPlugins={[remarkGfm]}
          components={{
            ...INITIAL_COMPONENTS,
            ...components,
          }}
          {...props}
        >
          {children}
        </ReactMarkdown>
      </div>
    );
  } catch (error) {
    console.error("Error rendering markdown:", error);
    return (
      <div className={cn("space-y-2 text-card-foreground", className)}>
        <pre className="p-4 bg-muted rounded overflow-x-auto">{children}</pre>
      </div>
    );
  }
}
