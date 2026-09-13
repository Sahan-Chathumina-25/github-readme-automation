import { describe, it, expect } from 'vitest';
import { generateREADME } from '../src/generator/readme.js';
import { loadConfig } from '../src/config.js';
import { DEFAULT_THEME } from '../src/theme.js';
import { join } from 'path';

const PROJECT_ROOT = process.cwd();
const CONFIG_PATH = join(PROJECT_ROOT, 'config', 'profile.json');

describe('README Generator', () => {
  const config = loadConfig(CONFIG_PATH);
  const theme = DEFAULT_THEME;
  const skillPcts = { cybersecurity: 45, networking: 50, linux: 55, programming: 35, fullstack: 30 };

  it('generates a non-empty README', () => {
    const readme = generateREADME(config, undefined, { theme, skillPercentages: skillPcts });
    expect(readme.length).toBeGreaterThan(500);
  });

  it('contains profile name', () => {
    const readme = generateREADME(config, undefined, { theme, skillPercentages: skillPcts });
    expect(readme).toContain('Sahan Chathumina');
  });

  it('contains about SVG reference', () => {
    const readme = generateREADME(config, undefined, { theme, skillPercentages: skillPcts });
    expect(readme).toContain('assets/about-card.svg');
  });

  it('contains terminal SVG reference', () => {
    const readme = generateREADME(config, undefined, { theme, skillPercentages: skillPcts });
    expect(readme).toContain('assets/terminal.svg');
  });

  it('contains banner SVG reference', () => {
    const readme = generateREADME(config, undefined, { theme, skillPercentages: skillPcts });
    expect(readme).toContain('assets/profile-banner.svg');
  });

  it('contains skill circles SVG reference', () => {
    const readme = generateREADME(config, undefined, { theme, skillPercentages: skillPcts });
    expect(readme).toContain('assets/skill-circles.svg');
  });

  it('contains network architecture SVG reference', () => {
    const readme = generateREADME(config, undefined, { theme, skillPercentages: skillPcts });
    expect(readme).toContain('assets/network-architecture.svg');
  });

  it('contains cyber labs SVG reference', () => {
    const readme = generateREADME(config, undefined, { theme, skillPercentages: skillPcts });
    expect(readme).toContain('assets/cyber-labs.svg');
  });

  it('contains linux labs SVG reference', () => {
    const readme = generateREADME(config, undefined, { theme, skillPercentages: skillPcts });
    expect(readme).toContain('assets/linux-labs.svg');
  });

  it('contains network labs SVG reference', () => {
    const readme = generateREADME(config, undefined, { theme, skillPercentages: skillPcts });
    expect(readme).toContain('assets/network-labs.svg');
  });

  it('contains certifications SVG reference', () => {
    const readme = generateREADME(config, undefined, { theme, skillPercentages: skillPcts });
    expect(readme).toContain('assets/certifications.svg');
  });

  it('contains footer SVG reference', () => {
    const readme = generateREADME(config, undefined, { theme, skillPercentages: skillPcts });
    expect(readme).toContain('assets/footer-cinematic.svg');
  });

  it('contains skills section with Full Stack Development', () => {
    const readme = generateREADME(config, undefined, { theme, skillPercentages: skillPcts });
    expect(readme).toContain('## Skills');
    expect(readme).toContain('Cybersecurity');
    expect(readme).toContain('Full Stack Development');
    expect(readme).toContain('WordPress');
  });

  it('contains featured projects', () => {
    const readme = generateREADME(config, undefined, { theme, skillPercentages: skillPcts });
    expect(readme).toContain('## Featured Projects');
    expect(readme).toContain('Network Security Lab');
  });

  it('contains certifications', () => {
    const readme = generateREADME(config, undefined, { theme, skillPercentages: skillPcts });
    expect(readme).toContain('## Certifications');
  });

  it('contains education', () => {
    const readme = generateREADME(config, undefined, { theme, skillPercentages: skillPcts });
    expect(readme).toContain('## Education');
    expect(readme).toContain('BSc');
  });

  it('contains currently learning', () => {
    const readme = generateREADME(config, undefined, { theme, skillPercentages: skillPcts });
    expect(readme).toContain('## Currently Learning');
    expect(readme).toContain('ACTIVE');
  });

  it('contains GitHub stats', () => {
    const readme = generateREADME(config, undefined, { theme, skillPercentages: skillPcts });
    expect(readme).toContain('## GitHub Statistics');
    expect(readme).toContain('github-readme-stats.vercel.app');
  });

  it('contains connect section', () => {
    const readme = generateREADME(config, undefined, { theme, skillPercentages: skillPcts });
    expect(readme).toContain('## Connect With Me');
  });

  it('does not contain standalone Projects section', () => {
    const readme = generateREADME(config, undefined, { theme, skillPercentages: skillPcts });
    expect(readme).not.toMatch(/## Projects\n/);
  });
});
