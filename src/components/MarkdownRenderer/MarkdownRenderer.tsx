import { useMemo } from "react";
import { marked } from "marked";

interface MarkdownRendererProps {
  content: string;
}

export const MarkdownRenderer = ({ content }: MarkdownRendererProps) => {
  const htmlContent = useMemo(() => {
    return marked(content || "### Новая заметка");
  }, [content]);

  return (
    <div
      className="note-content-rendered"
      dangerouslySetInnerHTML={{ __html: htmlContent }}
    />
  );
};
