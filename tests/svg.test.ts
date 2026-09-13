import { describe, it, expect } from 'vitest';
import {
  generateHeroBanner,
  generateSkillCircleRow,
  generateNetworkTopology,
  generateSectionDivider,
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
});
