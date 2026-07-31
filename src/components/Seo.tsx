import { useEffect } from "react";

interface SeoProps {
  title?: string;
  description?: string;
}

export default function Seo({ title, description }: SeoProps) {
  useEffect(() => {
    if (title) document.title = title;
    if (description) {
      const meta = document.querySelector('meta[name="description"]');
      if (meta) meta.setAttribute("content", description);
    }
  }, [title, description]);
  return null;
}
