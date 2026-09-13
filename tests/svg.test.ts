import { describe, it, expect } from 'vitest';
import { generateTerminalSection } from '../src/svg/terminal.js';
import { generateLabCards, generateCtfCards } from '../src/svg/labcards.js';
import { generateAdvancedTimeline } from '../src/svg/advanced-timeline.js';
import { generateAnimatedFooter } from '../src/svg/footer.js';
import { generateAboutSection } from '../src/svg/about.js';
import { DEFAULT_THEME } from '../src/theme.js';

describe('New SVG Components', () => {
  const theme = DEFAULT_THEME;

  it('generates terminal section', () => {
    const svg = generateTerminalSection('sahan', 'cyberlab', ['Cyber', 'Linux'], ['ONLINE'], theme);
    expect(svg).toContain('<svg');
    expect(svg).toContain('whoami');
    expect(svg).toContain('sahan@cyberlab');
    expect(svg).toContain('ONLINE');
  });

  it('generates lab cards', () => {
    const svg = generateLabCards(
      [{ name: 'SSH Lab', technology: ['Linux', 'SSH'], objective: 'Test', status: 'Completed' }],
      theme,
      'Linux Labs'
    );
    expect(svg).toContain('Linux Labs');
    expect(svg).toContain('SSH Lab');
    expect(svg).toContain('LAB 01');
  });

  it('returns empty for empty labs', () => {
    expect(generateLabCards([], theme, 'Test')).toBe('');
  });

  it('generates CTF cards', () => {
    const svg = generateCtfCards(
      [{ platform: 'TryHackMe', category: 'Web', difficulty: 'Easy', skillsLearned: ['XSS'] }],
      theme
    );
    expect(svg).toContain('Cybersecurity Lab');
    expect(svg).toContain('Web');
    expect(svg).toContain('CTF 01');
  });

  it('generates advanced timeline', () => {
    const svg = generateAdvancedTimeline(
      [{ year: '2026', title: 'Cert', subtitle: 'Provider', status: 'Completed' }],
      theme,
      'Certifications'
    );
    expect(svg).toContain('Certifications');
    expect(svg).toContain('2026');
    expect(svg).toContain('Cert');
    expect(svg).toContain('COMPLETED');
  });

  it('generates animated footer', () => {
    const svg = generateAnimatedFooter(theme);
    expect(svg).toContain('<svg');
    expect(svg).toContain('ONLINE');
    expect(svg).toContain('BUILD');
    expect(svg).toContain('LEARN');
    expect(svg).toContain('SECURE');
  });

  it('generates about section', () => {
    const svg = generateAboutSection(
      { name: 'Test', tagline: 'Cyber', stats: [{ label: 'A', value: 'B' }], focus: ['Linux'] },
      theme
    );
    expect(svg).toContain('Test');
    expect(svg).toContain('Cyber');
    expect(svg).toContain('Linux');
  });
});
