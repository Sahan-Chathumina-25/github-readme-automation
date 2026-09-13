import { describe, it, expect } from 'vitest';
import {
  generateHeroBanner,
  generateSkillCircleRow,
  generateNetworkTopology,
  generateSectionDivider,
  generateAboutCard,
  generateTerminalSection,
  generateNetworkArchitecture,
  generateCyberLabs,
  generateLabDashboard,
  generateNetworkLabs,
  generateCertifications,
  generateCinematicFooter,
} from '../src/svg/index.js';
import { DEFAULT_THEME } from '../src/theme.js';

const theme = DEFAULT_THEME;

describe('SVG Generators', () => {
  describe('generateHeroBanner', () => {
    it('generates valid SVG', () => {
      const svg = generateHeroBanner('Test User', 'Test Tagline', theme);
      expect(svg).toContain('<svg');
      expect(svg).toContain('</svg>');
    });

    it('includes name and tagline', () => {
      const svg = generateHeroBanner('John Doe', 'Developer', theme);
      expect(svg.toLowerCase()).toContain('john doe');
      expect(svg.toLowerCase()).toContain('developer');
    });
  });

  describe('generateSkillCircleRow', () => {
    it('generates valid SVG', () => {
      const svg = generateSkillCircleRow(
        [{ label: 'Test', percentage: 50 }],
        theme
      );
      expect(svg).toContain('<svg');
      expect(svg).toContain('Test');
    });
  });

  describe('generateNetworkTopology', () => {
    it('generates valid SVG', () => {
      const svg = generateNetworkTopology(theme);
      expect(svg).toContain('<svg');
      expect(svg.toLowerCase()).toContain('internet');
    });
  });

  describe('generateSectionDivider', () => {
    it('generates valid SVG', () => {
      const svg = generateSectionDivider(theme);
      expect(svg).toContain('<svg');
    });
  });

  describe('generateAboutCard', () => {
    it('generates valid SVG', () => {
      const svg = generateAboutCard({
        name: 'Test User',
        tagline: 'Test',
        description: 'Test description',
        focus: ['Focus 1'],
        stats: [{ label: 'TEST', value: '100' }],
      }, theme);
      expect(svg).toContain('<svg');
      expect(svg).toContain('Test User');
    });
  });

  describe('generateTerminalSection', () => {
    it('generates valid SVG', () => {
      const svg = generateTerminalSection(
        'user', 'host', ['Identity'], ['Stack'], ['Focus'], theme
      );
      expect(svg).toContain('<svg');
      expect(svg).toContain('whoami');
    });
  });

  describe('generateNetworkArchitecture', () => {
    it('generates valid SVG with all layers', () => {
      const svg = generateNetworkArchitecture(theme);
      expect(svg).toContain('<svg');
      expect(svg.toLowerCase()).toContain('internet');
      expect(svg.toLowerCase()).toContain('firewall');
      expect(svg.toLowerCase()).toContain('database');
    });
  });

  describe('generateCyberLabs', () => {
    it('generates valid SVG', () => {
      const svg = generateCyberLabs([
        { platform: 'TryHackMe', category: 'Web', challenge: 'Test', difficulty: 'Easy', skillsLearned: ['SQL'] },
      ], theme);
      expect(svg).toContain('<svg');
      expect(svg).toContain('CTF 01');
    });

    it('returns empty for no entries', () => {
      expect(generateCyberLabs([], theme)).toBe('');
    });
  });

  describe('generateLabDashboard', () => {
    it('generates valid SVG', () => {
      const svg = generateLabDashboard([
        { name: 'Test Lab', technology: ['Linux'], objective: 'Test', status: 'Completed' },
      ], theme, 'Test Labs');
      expect(svg).toContain('<svg');
      expect(svg).toContain('Test Lab');
    });
  });

  describe('generateNetworkLabs', () => {
    it('generates valid SVG', () => {
      const svg = generateNetworkLabs([
        { name: 'Test Lab', technology: ['DNS'], objective: 'Test', status: 'Completed' },
      ], theme);
      expect(svg).toContain('<svg');
      expect(svg).toContain('Test Lab');
    });
  });

  describe('generateCertifications', () => {
    it('generates valid SVG', () => {
      const svg = generateCertifications([
        { name: 'Red Hat', provider: 'Red Hat', status: 'Completed', year: '2026' },
      ], theme);
      expect(svg).toContain('<svg');
      expect(svg).toContain('Red Hat');
    });

    it('handles CCNA modules', () => {
      const svg = generateCertifications([
        { name: 'CCNA: Intro', provider: 'Cisco', status: 'Completed', year: '2026', module: 'Module 01' },
        { name: 'CCNA: Switching', provider: 'Cisco', status: 'Completed', year: '2026', module: 'Module 02' },
      ], theme);
      expect(svg).toContain('CCNA');
      expect(svg).toContain('Module 01');
    });
  });

  describe('generateCinematicFooter', () => {
    it('generates valid SVG', () => {
      const svg = generateCinematicFooter(theme);
      expect(svg).toContain('<svg');
      expect(svg).toContain('ONLINE');
      expect(svg).toContain('BUILD');
    });
  });
});
