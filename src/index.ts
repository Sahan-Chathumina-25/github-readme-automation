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
  generateSkillCircleRow,
  generateNetworkTopology,
  generateFooterAnimation,
  generateAboutCard,
  generateTerminalSection,
  generateNetworkArchitecture,
  generateCyberLabs,
  generateLabDashboard,
  generateNetworkLabs,
  generateCertifications,
  generateCinematicFooter,
} from './svg/index.js';

const PROJECT_ROOT = process.cwd();
const GENERATED_DIR = join(PROJECT_ROOT, 'generated');
const GENERATED_README = join(GENERATED_DIR, 'README.md');
const ASSETS_DIR = join(PROJECT_ROOT, 'assets');

function generateAssets(theme: ThemeConfig, skillPcts: SkillPercentages): void {
  if (!existsSync(ASSETS_DIR)) {
    mkdirSync(ASSETS_DIR, { recursive: true });
  }

  const banner = generateHeroBanner('Sahan Chathumina', 'Cybersecurity | Network Engineering | Linux | Full Stack Development | Ethical Hacking', theme);
  writeFileSync(join(ASSETS_DIR, 'profile-banner.svg'), banner, 'utf-8');
  console.log('  Generated assets/profile-banner.svg');

  const skillCircles = generateSkillCircleRow(
    [
      { label: 'Cybersecurity', percentage: skillPcts.cybersecurity },
      { label: 'Networking', percentage: skillPcts.networking },
      { label: 'Linux', percentage: skillPcts.linux },
      { label: 'Full Stack Dev', percentage: skillPcts.fullstack },
    ],
    theme
  );
  writeFileSync(join(ASSETS_DIR, 'skill-circles.svg'), skillCircles, 'utf-8');
  console.log('  Generated assets/skill-circles.svg');

  const topology = generateNetworkTopology(theme);
  writeFileSync(join(ASSETS_DIR, 'network-topology.svg'), topology, 'utf-8');
  console.log('  Generated assets/network-topology.svg');

  const footer = generateFooterAnimation(theme);
  writeFileSync(join(ASSETS_DIR, 'footer-animation.svg'), footer, 'utf-8');
  console.log('  Generated assets/footer-animation.svg');

  const aboutCard = generateAboutCard({
    name: 'Sahan Chathumina',
    tagline: 'Cybersecurity • Network Engineering • Linux • Full Stack Development',
    description: 'Building secure systems. Exploring networks. Developing practical digital solutions. An undergraduate studying Ethical Hacking & Network Security with a passion for understanding how systems work and how to secure them.',
    focus: ['CYBERSECURITY', 'NETWORKING', 'LINUX', 'FULL STACK'],
    stats: [
      { label: 'FOCUS', value: 'Security' },
      { label: 'SYSTEMS', value: 'Linux' },
      { label: 'STACK', value: 'WordPress' },
      { label: 'STATUS', value: 'Learning' },
    ],
  }, theme);
  writeFileSync(join(ASSETS_DIR, 'about-card.svg'), aboutCard, 'utf-8');
  console.log('  Generated assets/about-card.svg');

  const terminal = generateTerminalSection(
    'sahan.chathumina',
    'cyberlab',
    ['Cybersecurity Student', 'Network Engineering', 'Linux', 'Full Stack Development'],
    ['WordPress', 'PHP', 'MySQL', 'HTML', 'CSS', 'JavaScript'],
    ['Security', 'Networks', 'Systems', 'Web'],
    theme
  );
  writeFileSync(join(ASSETS_DIR, 'terminal.svg'), terminal, 'utf-8');
  console.log('  Generated assets/terminal.svg');

  const netArch = generateNetworkArchitecture(theme);
  writeFileSync(join(ASSETS_DIR, 'network-architecture.svg'), netArch, 'utf-8');
  console.log('  Generated assets/network-architecture.svg');

  const config = loadConfig();

  const cyberLabs = generateCyberLabs(config.ctf, theme);
  writeFileSync(join(ASSETS_DIR, 'cyber-labs.svg'), cyberLabs, 'utf-8');
  console.log('  Generated assets/cyber-labs.svg');

  const linuxLabs = config.labs.filter((l) =>
    l.technology.some((t) =>
      ['linux', 'centos', 'rocky', 'bash', 'ssh', 'apache', 'firewalld', 'systemd', 'selinux', 'auditd'].includes(t.toLowerCase())
    )
  );
  const linuxDashboard = generateLabDashboard(
    linuxLabs.map(l => ({ name: l.name, technology: l.technology, objective: l.objective, status: l.status })),
    theme,
    'Linux Labs'
  );
  writeFileSync(join(ASSETS_DIR, 'linux-labs.svg'), linuxDashboard, 'utf-8');
  console.log('  Generated assets/linux-labs.svg');

  const netLabs = config.labs.filter((l) =>
    l.technology.some((t) =>
      ['networking', 'cisco', 'vlan', 'routing', 'switching', 'dns', 'dhcp', 'haproxy', 'subnetting'].includes(t.toLowerCase())
    )
  );
  const networkDashboard = generateNetworkLabs(
    netLabs.map(l => ({ name: l.name, technology: l.technology, objective: l.objective, status: l.status })),
    theme
  );
  writeFileSync(join(ASSETS_DIR, 'network-labs.svg'), networkDashboard, 'utf-8');
  console.log('  Generated assets/network-labs.svg');

  const certs = generateCertifications(config.certifications, theme);
  writeFileSync(join(ASSETS_DIR, 'certifications.svg'), certs, 'utf-8');
  console.log('  Generated assets/certifications.svg');

  const cinematicFooter = generateCinematicFooter(theme);
  writeFileSync(join(ASSETS_DIR, 'footer-cinematic.svg'), cinematicFooter, 'utf-8');
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

      const theme: ThemeConfig = (config as any).theme ?? DEFAULT_THEME;
      const skillPcts: SkillPercentages = (config as any).skillPercentages ?? { cybersecurity: 45, networking: 50, linux: 55, programming: 35, fullstack: 30 };

      console.log('Generating visual assets...');
      generateAssets(theme, skillPcts);

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
      const skillPcts: SkillPercentages = (config as any).skillPercentages ?? { cybersecurity: 45, networking: 50, linux: 55, programming: 35, fullstack: 30 };

      let githubData = undefined;
      try {
        githubData = await fetchGitHubData(config.profile.username, token);
      } catch { /* continue */ }

      generateAssets(theme, skillPcts);
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
  console.error('Fatal error:', (err as Error).message);
  process.exit(1);
});
