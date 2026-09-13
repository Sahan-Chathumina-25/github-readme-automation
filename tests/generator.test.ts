import { describe, it, expect } from 'vitest';
import { generateREADME } from '../src/generator/readme.js';
import { loadConfig } from '../src/config.js';
import { join } from 'path';

const PROJECT_ROOT = process.cwd();
const CONFIG_PATH = join(PROJECT_ROOT, 'config', 'profile.json');

describe('README Generator', () => {
  const config = loadConfig(CONFIG_PATH);

  it('generates a non-empty README', () => {
    const readme = generateREADME(config);
    expect(readme.length).toBeGreaterThan(100);
  });

  it('contains profile name', () => {
    const readme = generateREADME(config);
    expect(readme).toContain('Sahan Chathumina');
  });

  it('contains headline', () => {
    const readme = generateREADME(config);
    expect(readme).toContain('Cybersecurity');
    expect(readme).toContain('Network Engineering');
  });

  it('contains skills section', () => {
    const readme = generateREADME(config);
    expect(readme).toContain('## Skills');
    expect(readme).toContain('Cybersecurity');
    expect(readme).toContain('Networking');
    expect(readme).toContain('Linux');
  });

  it('contains projects section', () => {
    const readme = generateREADME(config);
    expect(readme).toContain('## Projects');
    expect(readme).toContain('Network Security Lab');
  });

  it('contains education section', () => {
    const readme = generateREADME(config);
    expect(readme).toContain('## Education');
    expect(readme).toContain('BSc (Hons)');
  });

  it('contains certifications section', () => {
    const readme = generateREADME(config);
    expect(readme).toContain('## Certifications');
  });

  it('contains currently learning section', () => {
    const readme = generateREADME(config);
    expect(readme).toContain('## Currently Learning');
  });

  it('contains GitHub stats section', () => {
    const readme = generateREADME(config);
    expect(readme).toContain('## GitHub Statistics');
  });

  it('contains connect section', () => {
    const readme = generateREADME(config);
    expect(readme).toContain('## Connect With Me');
  });

  it('contains banner SVG', () => {
    const readme = generateREADME(config);
    expect(readme).toContain('assets/profile-banner.svg');
  });

  it('contains animation SVG', () => {
    const readme = generateREADME(config);
    expect(readme).toContain('assets/profile-animation.svg');
  });

  it('contains CTF section', () => {
    const readme = generateREADME(config);
    expect(readme).toContain('## CTF Portfolio');
  });

  it('contains labs sections', () => {
    const readme = generateREADME(config);
    expect(readme).toContain('## Linux Labs');
    expect(readme).toContain('## Networking Labs');
  });
});
