import { describe, it, expect } from 'vitest';
import { validateMarkdown } from '../src/validators/markdown.js';

describe('Markdown Validator', () => {
  it('validates a good README', () => {
    const content = `# Test README

## About Me

This is a test profile.

## Skills

- Python
- Linux

---

[Visit](https://example.com)
`;
    const result = validateMarkdown(content);
    expect(result.valid).toBe(true);
    expect(result.errors.length).toBe(0);
  });

  it('catches empty content', () => {
    const result = validateMarkdown('');
    expect(result.valid).toBe(false);
    expect(result.errors).toContain('README content is empty');
  });

  it('catches script tags', () => {
    const content = `# Test\n\n<script>alert('xss')</script>`;
    const result = validateMarkdown(content);
    expect(result.valid).toBe(false);
    expect(result.errors.some((e) => e.includes('script'))).toBe(true);
  });

  it('warns about missing alt text', () => {
    const content = `# Test\n\n![](image.png)`;
    const result = validateMarkdown(content);
    expect(result.warnings.some((w) => w.includes('alt text'))).toBe(true);
  });

  it('warns about style tags', () => {
    const content = `# Test\n\n<style>body { color: red; }</style>`;
    const result = validateMarkdown(content);
    expect(result.warnings.some((w) => w.includes('style'))).toBe(true);
  });

  it('validates good README passes', () => {
    const content = `# Profile

## About

Hello world.

## Skills

![Python](https://img.shields.io/badge/Python-blue)
`;
    const result = validateMarkdown(content);
    expect(result.valid).toBe(true);
  });
});
