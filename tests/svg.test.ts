import { describe, it, expect } from 'vitest';
import { generateHeroBanner } from '../src/svg/hero.js';
import { generateSkillCircle, generateSkillCircleRow } from '../src/svg/skills.js';
import { generateLanguageBars } from '../src/svg/languages.js';
import { generateTimeline } from '../src/svg/timeline.js';
import { generateNetworkTopology, generateFooterAnimation, generateSectionDivider } from '../src/svg/effects.js';
import { DEFAULT_THEME } from '../src/theme.js';

describe('SVG Generation', () => {
  const theme = DEFAULT_THEME;

  it('generates hero banner', () => {
    const svg = generateHeroBanner('Test Name', 'Cyber | Linux', theme);
    expect(svg).toContain('<svg');
    expect(svg).toContain('TEST NAME');
    expect(svg).toContain('CYBER');
    expect(svg).toContain('</svg>');
  });

  it('generates skill circle', () => {
    const svg = generateSkillCircle({ label: 'Test', percentage: 75 }, theme);
    expect(svg).toContain('75%');
    expect(svg).toContain('Test');
  });

  it('generates skill circle row', () => {
    const svg = generateSkillCircleRow(
      [{ label: 'A', percentage: 50 }, { label: 'B', percentage: 80 }],
      theme
    );
    expect(svg).toContain('50%');
    expect(svg).toContain('80%');
  });

  it('generates language bars', () => {
    const svg = generateLanguageBars(
      [{ name: 'Python', percentage: 60 }, { name: 'Bash', percentage: 40 }],
      theme
    );
    expect(svg).toContain('Python');
    expect(svg).toContain('60%');
  });

  it('generates timeline', () => {
    const svg = generateTimeline(
      [{ year: '2024', title: 'Degree', subtitle: 'University', status: 'In Progress' }],
      theme
    );
    expect(svg).toContain('2024');
    expect(svg).toContain('Degree');
  });

  it('generates network topology', () => {
    const svg = generateNetworkTopology(theme);
    expect(svg).toContain('INTERNET');
    expect(svg).toContain('FIREWALL');
  });

  it('generates footer animation', () => {
    const svg = generateFooterAnimation(theme);
    expect(svg).toContain('<svg');
  });

  it('generates section divider', () => {
    const svg = generateSectionDivider(theme);
    expect(svg).toContain('<svg');
  });
});
