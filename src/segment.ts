export interface Slide {
  title: string;
  content: string;
}

/**
 * Simple Markdown segmentation.
 * Splits slides whenever a heading starting with `#` is found.
 */
export function segmentMarkdown(markdown: string): Slide[] {
  const lines = markdown.split(/\r?\n/);
  const slides: Slide[] = [];
  let current: Slide | null = null;

  for (const line of lines) {
    const headingMatch = /^#\s+(.*)/.exec(line);
    if (headingMatch) {
      if (current) {
        slides.push(current);
      }
      current = { title: headingMatch[1].trim(), content: "" };
      continue;
    }
    if (!current) {
      // Skip content before first heading
      continue;
    }
    current.content += (current.content ? "\n" : "") + line;
  }
  if (current) {
    slides.push(current);
  }
  return slides;
}
