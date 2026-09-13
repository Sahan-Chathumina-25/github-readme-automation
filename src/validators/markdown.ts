interface ValidationResult {
  valid: boolean;
  errors: string[];
  warnings: string[];
}

export function validateMarkdown(content: string): ValidationResult {
  const errors: string[] = [];
  const warnings: string[] = [];

  if (!content || content.trim().length === 0) {
    return { valid: false, errors: ['README content is empty'], warnings: [] };
  }

  const lines = content.split('\n');

  if (!content.startsWith('#') && !content.startsWith('<div')) {
    warnings.push('README does not start with a heading or HTML block');
  }

  const imageRegex = /!\[([^\]]*)\]\(([^)]+)\)/g;
  let match;
  while ((match = imageRegex.exec(content)) !== null) {
    const alt = match[1];
    const src = match[2];
    if (!alt || alt.trim().length === 0) {
      warnings.push(`Image missing alt text: ${src}`);
    }
    if (src && src.startsWith('http') && !src.includes('img.shields.io') && !src.includes('github-readme-stats')) {
      const ext = src.split('.').pop()?.toLowerCase();
      if (ext && !['svg', 'png', 'jpg', 'jpeg', 'gif', 'webp'].includes(ext)) {
        warnings.push(`Image may not be GitHub-compatible: ${src}`);
      }
    }
  }

  const linkRegex = /\[([^\]]*)\]\(([^)]+)\)/g;
  while ((match = linkRegex.exec(content)) !== null) {
    const text = match[1];
    const href = match[2];
    if (!href || href.trim().length === 0) {
      errors.push(`Broken link: [${text}]()`);
    }
    if (href && href.startsWith('http')) {
      try {
        new URL(href);
      } catch {
        errors.push(`Invalid URL: ${href}`);
      }
    }
  }

  const htmlRegex = /<script[\s>]/gi;
  if (htmlRegex.test(content)) {
    errors.push('GitHub READMEs do not support <script> tags');
  }

  const styleRegex = /<style[\s>]/gi;
  if (styleRegex.test(content)) {
    warnings.push('GitHub READMEs do not support <style> tags');
  }

  const headingRegex = /^#{1,6}\s+(.+)/gm;
  const headings: string[] = [];
  while ((match = headingRegex.exec(content)) !== null) {
    headings.push(match[1]);
  }
  if (headings.length === 0) {
    warnings.push('No markdown headings found');
  }

  const emptySections = content.match(/#{1,6}\s+[^\n]+\n\n\n/g);
  if (emptySections) {
    warnings.push('Some sections may be empty');
  }

  if (content.length > 100000) {
    warnings.push('README is very large (>100KB), may cause rendering issues');
  }

  return {
    valid: errors.length === 0,
    errors,
    warnings,
  };
}
