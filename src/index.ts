import { loadConfig } from './config.js';
import { generateREADME } from './generator/readme.js';
import { validateMarkdown } from './validators/markdown.js';
import { fetchGitHubData } from './github/api.js';
import { updateGitHubReadme } from './github/update.js';
import { startPreviewServer } from './utils/preview.js';
import { writeFileSync, readFileSync, existsSync, mkdirSync } from 'fs';
import { join } from 'path';

const GENERATED_DIR = join(process.cwd(), 'generated');
const GENERATED_README = join(GENERATED_DIR, 'README.md');

async function main() {
  const command = process.argv[2] ?? 'generate';

  const token = process.env.GITHUB_TOKEN;
  const username = process.env.GITHUB_USERNAME ?? 'Sahan-Chathumina-25';

  switch (command) {
    case 'generate': {
      console.log('Loading profile configuration...');
      const config = loadConfig();

      let githubData = undefined;
      if (token) {
        console.log('Fetching GitHub data...');
        try {
          githubData = await fetchGitHubData(config.profile.username, token);
          console.log(`  Found ${githubData.repositories.length} repositories, ${githubData.totalStars} total stars`);
        } catch (err) {
          console.warn(`  Warning: Could not fetch GitHub data: ${(err as Error).message}`);
          console.warn('  Continuing with config-only data...');
        }
      } else {
        console.log('No GITHUB_TOKEN found. Skipping GitHub API calls.');
      }

      console.log('Generating README...');
      const readme = generateREADME(config, githubData);

      console.log('Validating README...');
      const validation = validateMarkdown(readme);

      if (validation.warnings.length > 0) {
        console.log('Warnings:');
        for (const w of validation.warnings) {
          console.log(`  - ${w}`);
        }
      }

      if (!validation.valid) {
        console.error('Validation failed:');
        for (const e of validation.errors) {
          console.error(`  - ${e}`);
        }
        process.exit(1);
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
        for (const e of result.errors) {
          console.error(`  - ${e}`);
        }
      }
      if (result.warnings.length > 0) {
        console.warn('Warnings:');
        for (const w of result.warnings) {
          console.warn(`  - ${w}`);
        }
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
        console.error('Set it in your .env file or environment.');
        process.exit(1);
      }

      console.log('Generating README for update...');
      const config = loadConfig();
      let githubData = undefined;
      try {
        githubData = await fetchGitHubData(config.profile.username, token);
      } catch {
        // Continue without GitHub data
      }
      const readme = generateREADME(config, githubData);

      const validation = validateMarkdown(readme);
      if (!validation.valid) {
        console.error('Cannot update: README validation failed.');
        for (const e of validation.errors) {
          console.error(`  - ${e}`);
        }
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
      console.log('Usage: ts-node src/index.ts [generate|validate|preview|update]');
      process.exit(1);
  }
}

main().catch((err) => {
  console.error('Fatal error:', (err as Error).message);
  process.exit(1);
});
