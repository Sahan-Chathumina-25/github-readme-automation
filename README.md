# GitHub Profile README Automation

Automated GitHub Profile README Generator for cybersecurity professionals.

## Features

- **Profile README Generator** — Generates a complete, professional GitHub profile README
- **GitHub API Integration** — Fetches repos, stars, languages, and activity
- **Featured Repository Scoring** — Automatically ranks and selects top projects
- **SVG Animations** — Professional cybersecurity-themed animated banner and hero
- **Markdown Validation** — Validates README before publishing
- **Preview Server** — Local preview with dark/light mode
- **GitHub Actions** — Automated weekly README updates
- **Configurable** — All data driven from `config/profile.json`

## Quick Start

```bash
npm install
npm run generate
```

This creates `generated/README.md` with your profile.

## Commands

| Command | Description |
|---------|-------------|
| `npm run generate` | Generate README from config |
| `npm run validate` | Validate generated README |
| `npm run preview` | Start local preview server |
| `npm run update` | Update GitHub profile README |
| `npm test` | Run tests |

## Configuration

Edit `config/profile.json` to customize your profile. All README content is driven from this file.

## GitHub Token Setup

1. Go to https://github.com/settings/tokens
2. Create a token with `repo` and `read:user` scopes
3. Create `.env` file:

```
GITHUB_TOKEN=your_token_here
GITHUB_USERNAME=your_username
```

## GitHub Actions

The included workflow (`.github/workflows/update-readme.yml`) runs weekly to keep your README fresh. Add these secrets to your repository:

- `GITHUB_TOKEN` — automatically available
- `GITHUB_USERNAME` — your GitHub username

## Architecture

```
config/profile.json
      ↓
GitHub API (optional)
      ↓
Data normalization
      ↓
README generator
      ↓
Markdown validation
      ↓
Preview / GitHub update
```

## Project Structure

```
src/
├── index.ts              # Main entry point
├── config.ts             # Configuration loader
├── types.ts              # TypeScript types
├── generator/
│   └── readme.ts         # README template engine
├── github/
│   ├── api.ts            # GitHub API client
│   └── update.ts         # GitHub README updater
├── validators/
│   └── markdown.ts       # Markdown validation
├── utils/
│   └── preview.ts        # Preview server
├── animation/            # Animation generators
└── templates/            # Template helpers
```

## License

MIT
