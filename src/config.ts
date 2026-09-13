import { readFileSync } from 'fs';
import { join } from 'path';
import type { ProfileConfig } from './types.js';

const PROJECT_ROOT = process.cwd();

export function loadConfig(configPath?: string): ProfileConfig {
  const filePath = configPath ?? join(PROJECT_ROOT, 'config', 'profile.json');

  try {
    const raw = readFileSync(filePath, 'utf-8');
    const config = JSON.parse(raw) as ProfileConfig;
    validateConfig(config);
    return config;
  } catch (err) {
    if ((err as NodeJS.ErrnoException).code === 'ENOENT') {
      throw new Error(`Configuration file not found: ${filePath}`);
    }
    if (err instanceof SyntaxError) {
      throw new Error(`Invalid JSON in configuration file: ${err.message}`);
    }
    throw err;
  }
}

function validateConfig(config: ProfileConfig): void {
  if (!config.profile?.name) throw new Error('Config missing: profile.name');
  if (!config.profile?.username) throw new Error('Config missing: profile.username');
  if (!config.profile?.headline) throw new Error('Config missing: profile.headline');
  if (!config.skills) throw new Error('Config missing: skills');
  if (!Array.isArray(config.projects)) throw new Error('Config missing: projects array');
  if (!config.social) throw new Error('Config missing: social');
}
