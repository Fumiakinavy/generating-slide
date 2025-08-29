import { readFileSync } from 'node:fs';
import { segmentMarkdown } from '../src/segment.js';

const markdown = readFileSync('examples/sample.md', 'utf-8');
const slides = segmentMarkdown(markdown);
console.log(slides);
