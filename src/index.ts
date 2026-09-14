import { loadConfig } from './config.js';
import { generateREADME } from './generator/readme.js';
import { validateMarkdown } from './validators/markdown.js';
import { fetchGitHubData } from './github/api.js';
import { updateGitHubReadme } from './github/update.js';
import { startPreviewServer } from './utils/preview.js';
import { writeFileSync, readFileSync, existsSync, mkdirSync } from 'fs';
import { join } from 'path';
import type { ThemeConfig, SkillPercentages } from './theme.js';
import { DEFAULT_THEME } from './theme.js';
import {
  generateHeroBanner,
  generateSkillCircles,
  generateNetworkTopology,
  generateFooterAnimation,
  generateAboutCard,
  generateTerminal,
  generateNetworkArchitecture,
  generateCyberLabs,
  generateLinuxLabs,
  generateNetworkLabs,
  generateCertifications,
  generateFooter,
  generateSectionDivider,
} from './svg/index.js';
import type { ProfileConfig } from './types.js';

const PROJECT_ROOT = process.cwd();
const GENERATED_DIR = join(PROJECT_ROOT, 'generated');
const GENERATED_README = join(GENERATED_DIR, 'README.md');
const ASSETS_DIR = join(PROJECT_ROOT, 'assets');

function generateAssets(config: ProfileConfig, theme: ThemeConfig, skillPcts: SkillPercentages): void {
  if (!existsSync(ASSETS_DIR)) {
    mkdirSync(ASSETS_DIR, { recursive: true });
  }

  // Hero banner
  const banner = generateHeroBanner(config.profile.name, config.profile.headline, theme);
  writeFileSync(join(ASSETS_DIR, 'profile-banner.svg'), banner, 'utf-8');
  console.log('  Generated assets/profile-banner.svg');

  // Skill overview (circles with percentages)
  const skillCircles = generateSkillCircles(config);
  writeFileSync(join(ASSETS_DIR, 'skill-overview.svg'), skillCircles, 'utf-8');
  console.log('  Generated assets/skill-overview.svg');

  // Network topology (legacy, kept as fallback)
  const topology = generateNetworkTopology(theme);
  writeFileSync(join(ASSETS_DIR, 'network-topology.svg'), topology, 'utf-8');
  console.log('  Generated assets/network-topology.svg');

  // Footer animation (legacy, kept as fallback)
  const footerAnim = generateFooterAnimation(theme);
  writeFileSync(join(ASSETS_DIR, 'footer-animation.svg'), footerAnim, 'utf-8');
  console.log('  Generated assets/footer-animation.svg');

  // Section divider
  const sectionDivider = generateSectionDivider(theme);
  writeFileSync(join(ASSETS_DIR, 'section-divider.svg'), sectionDivider, 'utf-8');
  console.log('  Generated assets/section-divider.svg');

  // About card
  const aboutCard = generateAboutCard(config);
  writeFileSync(join(ASSETS_DIR, 'about-me.svg'), aboutCard, 'utf-8');
  console.log('  Generated assets/about-me.svg');

  // Terminal
  const terminal = generateTerminal(config);
  writeFileSync(join(ASSETS_DIR, 'terminal.svg'), terminal, 'utf-8');
  console.log('  Generated assets/terminal.svg');

  // Network architecture
  const netArch = generateNetworkArchitecture(theme);
  writeFileSync(join(ASSETS_DIR, 'network-architecture.svg'), netArch, 'utf-8');
  console.log('  Generated assets/network-architecture.svg');

  // Cyber labs
  const cyberLabs = generateCyberLabs(config);
  writeFileSync(join(ASSETS_DIR, 'cyber-labs.svg'), cyberLabs, 'utf-8');
  console.log('  Generated assets/cyber-labs.svg');

  // Linux labs
  const linuxLabs = generateLinuxLabs(config);
  writeFileSync(join(ASSETS_DIR, 'linux-labs.svg'), linuxLabs, 'utf-8');
  console.log('  Generated assets/linux-labs.svg');

  // Network labs
  const networkLabs = generateNetworkLabs(config);
  writeFileSync(join(ASSETS_DIR, 'networking-labs.svg'), networkLabs, 'utf-8');
  console.log('  Generated assets/networking-labs.svg');

  // Certifications
  const certs = generateCertifications(config);
  writeFileSync(join(ASSETS_DIR, 'certifications-new.svg'), certs, 'utf-8');
  console.log('  Generated assets/certifications-new.svg');

  // Footer
  const footer = generateFooter(config);
  writeFileSync(join(ASSETS_DIR, 'footer-cinematic.svg'), footer, 'utf-8');
  console.log('  Generated assets/footer-cinematic.svg');
}

async function main() {
  const args = process.argv.slice(2);
  const command = args[0] ?? 'generate';
  const dryRun = args.includes('--dry-run');

  const token = process.env.GITHUB_TOKEN;
  const username = process.env.GITHUB_USERNAME ?? 'Sahan-Chathumina-25';

  switch (command) {
    case 'generate': {
      console.log('Loading profile configuration...');
      const config = loadConfig();
      console.log('Config loaded successfully');

      const theme: ThemeConfig = (config as any).theme ?? DEFAULT_THEME;
      const skillPcts: SkillPercentages = (config as any).skillPercentages ?? { cybersecurity: 45, networking: 60, linux: 60, fullstack: 75 };

      console.log('Generating visual assets...');
      try {
        generateAssets(config, theme, skillPcts);
        console.log('Assets generated successfully');
      } catch (err) {
        console.error('Error generating assets:', err);
        process.exit(1);
      }

      let githubData = undefined;
      if (token) {
        console.log('Fetching GitHub data...');
        try {
          githubData = await fetchGitHubData(config.profile.username, token);
          console.log(`  Found ${githubData.repositories.length} repositories, ${githubData.totalStars} total stars`);
        } catch (err) {
          console.warn(`  Warning: Could not fetch GitHub data: ${(err as Error).message}`);
        }
      } else {
        console.log('No GITHUB_TOKEN found. Skipping GitHub API calls.');
      }

      console.log('Generating cinematic README...');
      const readme = generateREADME(config, githubData, { theme, skillPercentages: skillPcts });

      console.log('Validating README...');
      const validation = validateMarkdown(readme);

      if (validation.warnings.length > 0) {
        console.log('Warnings:');
        for (const w of validation.warnings) console.log(`  - ${w}`);
      }

      if (!validation.valid) {
        console.error('Validation failed:');
        for (const e of validation.errors) console.error(`  - ${e}`);
        process.exit(1);
      }

      if (dryRun) {
        console.log('Dry run — not writing files.');
        console.log(`README size: ${(readme.length / 1024).toFixed(1)} KB, ${readme.split('\n').length} lines`);
        break;
      }

      if (!existsSync(GENERATED_DIR)) {
        mkdirSync(GENERATED_DIR, { recursive: true });
      }

      writeFileSync(GENERATED_README, readme, 'utf-8');
      console.log(`README generated: ${GENERATED_README}`);
      console.log(`  Size: ${(readme.length / 1024).toFixed(1)} KB`);
      console.log(`  Lines: ${readme.split('\n').length}`);
      console.log('Done!');
      break;
    }

    case 'validate': {
      console.log('Validating existing README...');
      if (!existsSync(GENERATED_README)) {
        console.error('No generated README found. Run `generate` first.');
        process.exit(1);
      }
      const content = readFileSync(GENERATED_README, 'utf-8');
      const result = validateMarkdown(content);
      if (result.errors.length > 0) {
        console.error('Errors:');
        for (const e of result.errors) console.error(`  - ${e}`);
      }
      if (result.warnings.length > 0) {
        console.warn('Warnings:');
        for (const w of result.warnings) console.warn(`  - ${w}`);
      }
      console.log(result.valid ? 'Validation passed.' : 'Validation failed.');
      break;
    }

    case 'preview': {
      if (!existsSync(GENERATED_README)) {
        console.error('No generated README found. Run `generate` first.');
        process.exit(1);
      }
      startPreviewServer(GENERATED_README);
      break;
    }

    case 'update': {
      if (!token) {
        console.error('GITHUB_TOKEN is required for updating README.');
        process.exit(1);
      }

      console.log('Generating README for update...');
      const config = loadConfig();
      const theme: ThemeConfig = (config as any).theme ?? DEFAULT_THEME;
      const skillPcts: SkillPercentages = (config as any).skillPercentages ?? { cybersecurity: 45, networking: 60, linux: 60, fullstack: 75 };

      let githubData = undefined;
      try {
        githubData = await fetchGitHubData(config.profile.username, token);
      } catch { /* continue */ }

      generateAssets(config, theme, skillPcts);
      const readme = generateREADME(config, githubData, { theme, skillPercentages: skillPcts });

      const validation = validateMarkdown(readme);
      if (!validation.valid) {
        console.error('Cannot update: README validation failed.');
        process.exit(1);
      }

      console.log('Updating GitHub profile README...');
      const result = await updateGitHubReadme(readme, config.profile.username, token);
      console.log(result.message);
      if (!result.success) process.exit(1);
      break;
    }

    default:
      console.error(`Unknown command: ${command}`);
      console.log('Usage: ts-node src/index.ts [generate|validate|preview|update] [--dry-run]');
      process.exit(1);
  }
}

main().catch((err) => {
  console.error('Fatal error:', err);
  process.exit(1);
});
