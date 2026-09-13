import { describe, it, expect } from 'vitest';
import { loadConfig } from '../src/config.js';
import { join } from 'path';

const PROJECT_ROOT = process.cwd();
const CONFIG_PATH = join(PROJECT_ROOT, 'config', 'profile.json');

describe('Profile Configuration', () => {
  it('loads config successfully', () => {
    const config = loadConfig(CONFIG_PATH);
    expect(config).toBeDefined();
    expect(config.profile).toBeDefined();
  });

  it('has required profile fields', () => {
    const config = loadConfig(CONFIG_PATH);
    expect(config.profile.name).toBe('Sahan Chathumina');
    expect(config.profile.username).toBe('Sahan-Chathumina-25');
    expect(config.profile.headline).toContain('Cybersecurity');
  });

  it('has skills sections', () => {
    const config = loadConfig(CONFIG_PATH);
    expect(config.skills.cybersecurity.length).toBeGreaterThan(0);
    expect(config.skills.networking.length).toBeGreaterThan(0);
    expect(config.skills.linux.length).toBeGreaterThan(0);
    expect(config.skills.programming.length).toBeGreaterThan(0);
    expect(config.skills.tools.length).toBeGreaterThan(0);
  });

  it('has projects', () => {
    const config = loadConfig(CONFIG_PATH);
    expect(config.projects.length).toBeGreaterThan(0);
    for (const project of config.projects) {
      expect(project.name).toBeTruthy();
      expect(project.description).toBeTruthy();
      expect(project.technologies.length).toBeGreaterThan(0);
    }
  });

  it('has education entries', () => {
    const config = loadConfig(CONFIG_PATH);
    expect(config.education.length).toBeGreaterThan(0);
  });

  it('has certifications', () => {
    const config = loadConfig(CONFIG_PATH);
    expect(config.certifications.length).toBeGreaterThan(0);
  });

  it('has social links', () => {
    const config = loadConfig(CONFIG_PATH);
    expect(config.social.github).toBeTruthy();
  });

  it('has currently learning list', () => {
    const config = loadConfig(CONFIG_PATH);
    expect(config.currentlyLearning.length).toBeGreaterThan(0);
  });

  it('throws on missing config file', () => {
    expect(() => loadConfig('/nonexistent/path.json')).toThrow('Configuration file not found');
  });
});
