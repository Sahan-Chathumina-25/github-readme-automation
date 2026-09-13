import { describe, it, expect } from 'vitest';
import {
  generateHeroBanner,
  generateSkillCircles,
  generateNetworkTopology,
  generateSectionDivider,
  generateAboutCard,
  generateTerminal,
  generateNetworkArchitecture,
  generateCyberLabs,
  generateLinuxLabs,
  generateNetworkLabs,
  generateCertifications,
  generateFooter,
} from '../src/svg/index.js';
import { DEFAULT_THEME } from '../src/theme.js';
import type { ProfileConfig } from '../src/types.js';

const theme = DEFAULT_THEME;

const mockConfig: ProfileConfig = {
  profile: {
    name: 'Test User',
    username: 'testuser',
    headline: 'Cybersecurity Student',
    location: 'Sri Lanka',
    about: 'Building secure systems. Exploring networks.',
  },
  theme: DEFAULT_THEME,
  skillPercentages: { cybersecurity: 45, networking: 50, linux: 55, programming: 35, fullstack: 30 },
  education: [],
  certifications: [
    { name: 'Red Hat System Administration I', provider: 'Red Hat', status: 'Completed', year: '2026' },
    { name: 'CCNA: Introduction to Networks', provider: 'Cisco', module: 'Module 01', status: 'Completed', year: '2026' },
    { name: 'CCNA: Switching, Routing & Wireless Essentials', provider: 'Cisco', module: 'Module 02', status: 'Completed', year: '2026' },
  ],
  skills: {
    cybersecurity: [{ name: 'Ethical Hacking', level: 'Learning' }],
    networking: [{ name: 'TCP/IP', level: 'Practicing' }],
    linux: [{ name: 'Linux', level: 'Practicing' }],
    programming: [{ name: 'WordPress', level: 'Learning' }],
    tools: [{ name: 'Git', level: 'Practicing' }],
  },
  projects: [],
  ctf: [
    { platform: 'TryHackMe', category: 'Web', challenge: 'Test challenge', difficulty: 'Easy', skillsLearned: ['SQL'] },
  ],
  labs: [
    { name: 'SSH Lab', technology: ['Linux', 'SSH'], objective: 'Configure SSH', status: 'Completed', repository: '' },
    { name: 'DNS Lab', technology: ['Linux', 'BIND', 'DNS'], objective: 'Set up DNS', status: 'Completed', repository: '' },
    { name: 'VLAN Lab', technology: ['Networking', 'VLAN', 'Switching'], objective: 'Configure VLANs', status: 'Planned', repository: '' },
    { name: 'Subnetting Lab', technology: ['Networking', 'Subnetting'], objective: 'Practice subnetting', status: 'In Progress', repository: '' },
  ],
  social: { github: 'testuser' },
  currentlyLearning: ['Cybersecurity'],
  featuredRepos: [],
};

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

  describe('generateSkillCircles', () => {
    it('generates valid SVG', () => {
      const svg = generateSkillCircles(mockConfig);
      expect(svg).toContain('<svg');
      expect(svg).toContain('Cybersecurity');
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
      const svg = generateAboutCard(mockConfig);
      expect(svg).toContain('<svg');
      expect(svg).toContain('Test User');
    });
  });

  describe('generateTerminal', () => {
    it('generates valid SVG', () => {
      const svg = generateTerminal(mockConfig);
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
      const svg = generateCyberLabs(mockConfig);
      expect(svg).toContain('<svg');
      expect(svg).toContain('CYBERSECURITY LAB');
    });
  });

  describe('generateLinuxLabs', () => {
    it('generates valid SVG', () => {
      const svg = generateLinuxLabs(mockConfig);
      expect(svg).toContain('<svg');
      expect(svg).toContain('LINUX LABS');
    });
  });

  describe('generateNetworkLabs', () => {
    it('generates valid SVG', () => {
      const svg = generateNetworkLabs(mockConfig);
      expect(svg).toContain('<svg');
      expect(svg).toContain('NETWORKING LABS');
    });
  });

  describe('generateCertifications', () => {
    it('generates valid SVG', () => {
      const svg = generateCertifications(mockConfig);
      expect(svg).toContain('<svg');
      expect(svg).toContain('Red Hat');
    });

    it('handles CCNA modules', () => {
      const svg = generateCertifications(mockConfig);
      expect(svg).toContain('CCNA');
      expect(svg).toContain('Module 01');
      expect(svg).toContain('Module 02');
    });
  });

  describe('generateFooter', () => {
    it('generates valid SVG', () => {
      const svg = generateFooter(mockConfig);
      expect(svg).toContain('<svg');
      expect(svg).toContain('BUILD');
    });
  });
});
