import type { ProfileConfig, GitHubData, SkillItem } from '../types.js';
import type { ThemeConfig, SkillPercentages, FeaturedScoreWeights } from '../theme.js';
import { DEFAULT_THEME, DEFAULT_FEATURED_WEIGHTS } from '../theme.js';

interface GeneratorOptions {
  theme?: ThemeConfig;
  skillPercentages?: SkillPercentages;
  featuredWeights?: FeaturedScoreWeights;
}

function statusBadge(status: string): string {
  const colors: Record<string, string> = {
    Completed: 'brightgreen',
    'In Progress': 'yellow',
    Learning: 'blue',
    Planned: 'lightgrey',
  };
  return `![${status}](https://img.shields.io/badge/${encodeURIComponent(status)}-${colors[status] ?? 'grey'})`;
}

function shieldBadge(name: string, value: string, color: string): string {
  return `![${name}](https://img.shields.io/badge/${encodeURIComponent(name)}-${encodeURIComponent(value)}-${color})`;
}

function linkBadge(label: string, url: string, color: string): string {
  return `[![${label}](https://img.shields.io/badge/${encodeURIComponent(label)}-${encodeURIComponent(color)}?style=flat&logo=${label.toLowerCase()}&logoColor=white)](${url})`;
}

function divider(): string {
  return `\n\n<div align="center"><img src="assets/section-divider.svg" alt="" width="800" height="20"/></div>\n\n`;
}

export function generateREADME(
  config: ProfileConfig,
  githubData?: GitHubData,
  options: GeneratorOptions = {}
): string {
  const theme = options.theme ?? DEFAULT_THEME;

  const sections: string[] = [];

  sections.push(renderHero(config));
  sections.push(renderAbout());
  sections.push(renderTerminal(config));
  sections.push(renderSkillCircles());
  sections.push(renderSkills(config));
  sections.push(divider());
  sections.push(renderNetworkArchitecture());
  sections.push(renderFeaturedProjects(config, githubData, theme));
  sections.push(divider());
  sections.push(renderCyberLabs(config));
  sections.push(renderLinuxLabs(config));
  sections.push(renderNetworkingLabs(config));
  sections.push(divider());
  sections.push(renderCertifications(config));
  sections.push(renderEducation(config));
  sections.push(renderCurrentlyLearning(config));
  sections.push(divider());
  sections.push(renderGitHubStats(config, githubData, theme));
  sections.push(renderConnect(config));
  sections.push(renderFooter());

  return sections.filter(Boolean).join('\n\n');
}

function renderHero(config: ProfileConfig): string {
  return `<div align="center">

<img src="assets/profile-banner.svg" alt="${config.profile.name} — Cybersecurity Portfolio Banner" width="100%"/>

</div>`;
}

function renderAbout(): string {
  return `<div align="center">

## About Me

<img src="assets/about-card.svg" alt="About Me — Identity panel with profile summary, focus areas, and statistics" width="800"/>

</div>`;
}

function renderTerminal(config: ProfileConfig): string {
  return `<div align="center">

## Who Am I

<img src="assets/terminal.svg" alt="Terminal interface showing identity, stack, focus, and status" width="700"/>

</div>`;
}

function renderSkillCircles(): string {
  return `<div align="center">

## Skill Overview

<img src="assets/skill-circles.svg" alt="Skill proficiency percentages — Cybersecurity, Networking, Linux, Full Stack Development" width="680"/>

</div>`;
}

function renderSkills(config: ProfileConfig): string {
  const { skills } = config;
  let md = `## Skills & Technologies\n\n`;

  if (skills.cybersecurity.length > 0) {
    md += `### Cybersecurity\n\n`;
    md += skills.cybersecurity.map((s) => shieldBadge(s.name, s.level, s.level === 'Advanced' ? 'brightgreen' : s.level === 'Intermediate' ? 'green' : s.level === 'Practicing' ? 'cyan' : 'blue')).join(' ');
    md += '\n\n';
  }
  if (skills.networking.length > 0) {
    md += `### Networking\n\n`;
    md += skills.networking.map((s) => shieldBadge(s.name, s.level, s.level === 'Practicing' ? 'cyan' : 'blue')).join(' ');
    md += '\n\n';
  }
  if (skills.linux.length > 0) {
    md += `### Linux & Systems\n\n`;
    md += skills.linux.map((s) => shieldBadge(s.name, s.level, s.level === 'Practicing' ? 'cyan' : 'blue')).join(' ');
    md += '\n\n';
  }
  if (skills.fullstack.length > 0) {
    md += `### Full Stack Development\n\n`;
    md += skills.fullstack.map((s: any) => shieldBadge(s.name, s.level, s.level === 'Practicing' ? 'cyan' : 'blue')).join(' ');
    md += '\n\n';
  }
  if (skills.tools.length > 0) {
    md += `### Tools\n\n`;
    md += skills.tools.map((s) => shieldBadge(s.name, s.level, s.level === 'Practicing' ? 'cyan' : 'blue')).join(' ');
    md += '\n\n';
  }

  return md;
}

function renderNetworkArchitecture(): string {
  return `<div align="center">

## Network Architecture

<img src="assets/network-architecture.svg" alt="Advanced network architecture — Internet, Firewall, Load Balancer, Web Tier, Application Layer, Database, Backup" width="800"/>

</div>`;
}

function renderFeaturedProjects(
  config: ProfileConfig,
  githubData: GitHubData | undefined,
  theme: ThemeConfig
): string {
  const featuredFromConfig = config.projects.filter((p) => p.featured);
  const featured = featuredFromConfig.length > 0 ? featuredFromConfig : config.projects.slice(0, 6);

  if (featured.length === 0) return '';

  let md = `## Featured Projects\n\n<table>\n<tr>\n`;

  featured.slice(0, 6).forEach((project, i) => {
    if (i > 0 && i % 3 === 0) md += `</tr>\n<tr>\n`;
    const techStr = project.technologies.join(' • ');
    md += `<td width="33%" valign="top">

> **PROJECT ${String(i + 1).padStart(2, '0')}**

### ${project.name}

${project.description}

<sub>${techStr}</sub>

${statusBadge(project.status)}
${project.github ? `\n<sub>[Repository](${project.github})</sub>` : ''}
</td>\n`;
  });

  md += `</tr>\n</table>\n`;
  return md;
}

function renderCyberLabs(config: ProfileConfig): string {
  if (config.ctf.length === 0) return '';

  return `<div align="center">

## Cybersecurity Lab

<img src="assets/cyber-labs.svg" alt="Cybersecurity CTF lab cards with difficulty bars and skill indicators" width="700"/>

</div>`;
}

function renderLinuxLabs(config: ProfileConfig): string {
  const linuxLabs = config.labs.filter((l) =>
    l.technology.some((t) =>
      ['linux', 'centos', 'rocky', 'bash', 'ssh', 'apache', 'firewalld', 'systemd', 'selinux', 'auditd'].includes(t.toLowerCase())
    )
  );

  if (linuxLabs.length === 0) return '';

  return `<div align="center">

## Linux Labs

<img src="assets/linux-labs.svg" alt="Linux lab dashboard with status indicators and technology labels" width="700"/>

</div>`;
}

function renderNetworkingLabs(config: ProfileConfig): string {
  const netLabs = config.labs.filter((l) =>
    l.technology.some((t) =>
      ['networking', 'cisco', 'vlan', 'routing', 'switching', 'dns', 'dhcp', 'haproxy', 'subnetting'].includes(t.toLowerCase())
    )
  );

  if (netLabs.length === 0) return '';

  return `<div align="center">

## Networking Labs

<img src="assets/network-labs.svg" alt="Network operations dashboard with lab nodes, status indicators, and progress bars" width="700"/>

</div>`;
}

function renderCertifications(config: ProfileConfig): string {
  if (config.certifications.length === 0) return '';

  return `<div align="center">

## Certifications & Courses

<img src="assets/certifications.svg" alt="Certification timeline — Red Hat, CCNA 3 modules, Diploma in English" width="700"/>

</div>`;
}

function renderEducation(config: ProfileConfig): string {
  if (config.education.length === 0) return '';

  let md = `## Education\n\n`;
  for (const edu of config.education) {
    md += `- **${edu.degree}** — ${edu.institution} ${statusBadge(edu.status)}`;
    if (edu.year) md += ` (${edu.year})`;
    md += '\n';
  }
  return md;
}

function renderCurrentlyLearning(config: ProfileConfig): string {
  if (config.currentlyLearning.length === 0) return '';

  let md = `## Currently Learning\n\n`;
  md += `> ● **ACTIVE**\n\n`;
  md += config.currentlyLearning.map((topic) => `- ${topic}`).join('\n');
  return md;
}

function renderGitHubStats(config: ProfileConfig, githubData: GitHubData | undefined, theme: ThemeConfig): string {
  const username = config.profile.username;

  let md = `## GitHub Statistics\n\n`;
  md += `<div align="center">\n\n`;
  md += `<img src="https://github-readme-stats.vercel.app/api?username=${username}&show_icons=true&theme=dark&hide_border=true&bg_color=${encodeURIComponent(theme.surface)}&title_color=${encodeURIComponent(theme.primary)}&text_color=${encodeURIComponent(theme.highlight)}&icon_color=${encodeURIComponent(theme.primary)}" alt="GitHub Stats" height="165"/>\n\n`;
  md += `<img src="https://github-readme-stats.vercel.app/api/top-langs/?username=${username}&layout=compact&theme=dark&hide_border=true&bg_color=${encodeURIComponent(theme.surface)}&title_color=${encodeURIComponent(theme.primary)}&text_color=${encodeURIComponent(theme.highlight)}&lang_count=6" alt="Top Languages" height="165"/>\n\n`;
  md += `</div>\n`;

  if (githubData) {
    md += `\n<div align="center">\n\n`;
    md += `![Profile Views](https://komarev.com/ghpvc/?username=${username}&color=${encodeURIComponent(theme.primary)}&style=flat)\n\n`;
    md += `</div>\n`;
  }

  return md;
}

function renderConnect(config: ProfileConfig): string {
  const { social } = config;
  let md = `<div align="center">\n\n## Connect With Me\n\n`;

  const badges: string[] = [];
  if (social.github) badges.push(linkBadge('GitHub', `https://github.com/${social.github}`, '181717'));
  if (social.linkedin) badges.push(linkBadge('LinkedIn', social.linkedin, '0A66C2'));
  if (social.email) badges.push(`[![Email](https://img.shields.io/badge/Email-D14836?style=flat&logo=gmail&logoColor=white)](mailto:${social.email})`);
  if (social.twitter) badges.push(linkBadge('Twitter', social.twitter, '1DA1F2'));
  if (social.website) badges.push(linkBadge('Website', social.website, '00d4ff'));

  md += badges.join('\n\n');
  md += `\n\n</div>`;
  return md;
}

function renderFooter(): string {
  return `<div align="center">

## Footer

<img src="assets/footer-cinematic.svg" alt="Cinematic footer — BUILD • LEARN • SECURE — System Status: ONLINE" width="600"/>

</div>`;
}
