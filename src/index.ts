import { readFileSync, writeFileSync } from 'node:fs';
import { segmentMarkdown } from './segment.js';

function renderSlide(slide: { title: string; content: string }): string {
  const htmlContent = slide.content
    .split(/\n+/)
    .map((p) => `<p>${p}</p>`) // very naive paragraph handling
    .join('\n');
  return `<section class="slide">\n<h1>${slide.title}</h1>\n${htmlContent}\n</section>`;
}

function main() {
  const [,, inputPath, outputPath] = process.argv;
  if (!inputPath || !outputPath) {
    console.error('Usage: node index.js <input.md> <output.html>');
    process.exit(1);
  }
  const markdown = readFileSync(inputPath, 'utf-8');
  const slides = segmentMarkdown(markdown);
  const htmlSlides = slides.map(renderSlide).join('\n');
  const html = `<!DOCTYPE html>\n<html><head><meta charset="utf-8"><title>Slides</title></head><body>\n${htmlSlides}\n</body></html>`;
  writeFileSync(outputPath, html);
}

main();
