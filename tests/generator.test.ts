import { describe, it, expect } from 'vitest';
import { generateREADME } from '../src/generator/readme.js';
import { loadConfig } from '../src/config.js';
import { DEFAULT_THEME } from '../src/theme.js';
import { join } from 'path';

const PROJECT_ROOT = process.cwd();
const CONFIG_PATH = join(PROJECT_ROOT, 'config', 'profile.json');

describe('Cinematic README Generator', () => {
  const config = loadConfig(CONFIG_PATH);
  const theme = DEFAULT_THEME;
  const skillPcts = { cybersecurity: 45, networking: 50, linux: 55, programming: 35 };

  it('generates a non-empty README', () => {
    const readme = generateREADME(config, undefined, { theme, skillPercentages: skillPcts });
    expect(readme.length).toBeGreaterThan(500);
  });

  it('contains profile name', () => {
    const readme = generateREADME(config, undefined, { theme, skillPercentages: skillPcts });
    expect(readme).toContain('Sahan Chathumina');
  });

  it('contains terminal component', () => {
    const readme = generateREADME(config, undefined, { theme, skillPercentages: skillPcts });
    expect(readme).toContain('whoami');
    expect(readme).toContain('ONLINE');
  });

  it('contains banner SVG reference', () => {
    const readme = generateREADME(config, undefined, { theme, skillPercentages: skillPcts });
    expect(readme).toContain('assets/profile-banner.svg');
  });

  it('contains skill circles SVG reference', () => {
    const readme = generateREADME(config, undefined, { theme, skillPercentages: skillPcts });
    expect(readme).toContain('assets/skill-circles.svg');
  });

  it('contains network topology SVG reference', () => {
    const readme = generateREADME(config, undefined, { theme, skillPercentages: skillPcts });
    expect(readme).toContain('assets/network-topology.svg');
  });

  it('contains footer animation SVG reference', () => {
    const readme = generateREADME(config, undefined, { theme, skillPercentages: skillPcts });
    expect(readme).toContain('assets/footer-animation.svg');
  });

  it('contains skills section', () => {
    const readme = generateREADME(config, undefined, { theme, skillPercentages: skillPcts });
    expect(readme).toContain('## Skills');
    expect(readme).toContain('Cybersecurity');
    expect(readme).toContain('Networking');
    expect(readme).toContain('Linux');
  });

  it('contains projects section', () => {
    const readme = generateREADME(config, undefined, { theme, skillPercentages: skillPcts });
    expect(readme).toContain('## Projects');
    expect(readme).toContain('Network Security Lab');
  });

  it('contains CTF section', () => {
    const readme = generateREADME(config, undefined, { theme, skillPercentages: skillPcts });
    expect(readme).toContain('## Cybersecurity Lab');
  });

  it('contains certifications with timeline', () => {
    const readme = generateREADME(config, undefined, { theme, skillPercentages: skillPcts });
    expect(readme).toContain('## Certifications');
    expect(readme).toContain('Red Hat');
  });

  it('contains education with timeline', () => {
    const readme = generateREADME(config, undefined, { theme, skillPercentages: skillPcts });
    expect(readme).toContain('## Education');
    expect(readme).toContain('BSc');
  });

  it('contains currently learning', () => {
    const readme = generateREADME(config, undefined, { theme, skillPercentages: skillPcts });
    expect(readme).toContain('## Currently Learning');
    expect(readme).toContain('ACTIVE');
  });

  it('contains GitHub stats with theme colors', () => {
    const readme = generateREADME(config, undefined, { theme, skillPercentages: skillPcts });
    expect(readme).toContain('## GitHub Statistics');
    expect(readme).toContain('github-readme-stats.vercel.app');
  });

  it('contains connect section', () => {
    const readme = generateREADME(config, undefined, { theme, skillPercentages: skillPcts });
    expect(readme).toContain('## Connect With Me');
  });

  it('contains footer with status', () => {
    const readme = generateREADME(config, undefined, { theme, skillPercentages: skillPcts });
    expect(readme).toContain('SYSTEM STATUS: ONLINE');
    expect(readme).toContain('BUILD');
    expect(readme).toContain('LEARN');
    expect(readme).toContain('SECURE');
  });

  it('contains section dividers', () => {
    const readme = generateREADME(config, undefined, { theme, skillPercentages: skillPcts });
    expect(readme).toContain('sd-g');
  });

  it('contains linux labs', () => {
    const readme = generateREADME(config, undefined, { theme, skillPercentages: skillPcts });
    expect(readme).toContain('## Linux Labs');
  });

  it('contains networking labs', () => {
    const readme = generateREADME(config, undefined, { theme, skillPercentages: skillPcts });
    expect(readme).toContain('## Networking Labs');
  });
});
