import type { ProfileConfig, GitHubData, SkillItem } from '../types.js';

const LEVEL_COLORS: Record<string, string> = {
  Learning: 'blue',
  Practicing: 'cyan',
  Intermediate: 'green',
  Advanced: 'brightgreen',
};

function badge(label: string, color: string): string {
  return `![${label}](https://img.shields.io/badge/${encodeURIComponent(label)}-${encodeURIComponent(color)})`;
}

function skillBadge(skill: SkillItem): string {
  const color = LEVEL_COLORS[skill.level] ?? 'grey';
  return `[**${skill.name}**](https://img.shields.io/badge/${encodeURIComponent(skill.name)}-${encodeURIComponent(skill.level)}-${color})`;
}

function skillBadges(skills: SkillItem[]): string {
  return skills
    .map(
      (s) =>
        `![${s.name}](https://img.shields.io/badge/${encodeURIComponent(s.name)}-${encodeURIComponent(s.level)}-${LEVEL_COLORS[s.level] ?? 'grey'})`
    )
    .join(' ');
}

function linkBadge(label: string, url: string, color: string): string {
  return `[![${label}](https://img.shields.io/badge/${encodeURIComponent(label)}-${encodeURIComponent(color)}?style=for-the-badge&logo=${label.toLowerCase()}&logoColor=white)](${url})`;
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

export function generateREADME(config: ProfileConfig, githubData?: GitHubData): string {
  const sections: string[] = [];

  sections.push(renderHero(config));
  sections.push(renderAbout(config));
  sections.push(renderSkills(config));
  sections.push(renderFeaturedProjects(config, githubData));
  sections.push(renderProjects(config));
  sections.push(renderCtf(config));
  sections.push(renderLinuxLabs(config));
  sections.push(renderNetworkingLabs(config));
  sections.push(renderCertifications(config));
  sections.push(renderEducation(config));
  sections.push(renderCurrentlyLearning(config));
  sections.push(renderGitHubStats(config, githubData));
  sections.push(renderConnect(config));
  sections.push(renderFooter());

  return sections.filter(Boolean).join('\n\n');
}

function renderHero(config: ProfileConfig): string {
  const { profile } = config;
  return `<div align="center">

<img src="assets/profile-banner.svg" alt="${profile.name} - Banner" width="100%"/>

# ${profile.name}

### ${profile.headline}

<img src="assets/profile-animation.svg" alt="Network animation" width="600"/>

</div>`;
}

function renderAbout(config: ProfileConfig): string {
  const about = config.profile.about ?? `Building secure systems. Exploring networks. Learning cybersecurity through hands-on projects.`;
  return `<div align="center">

## About Me

${about}

</div>`;
}

function renderSkills(config: ProfileConfig): string {
  const { skills } = config;
  let md = `## Skills\n\n`;

  if (skills.cybersecurity.length > 0) {
    md += `### Cybersecurity\n\n${skillBadges(skills.cybersecurity)}\n\n`;
  }
  if (skills.networking.length > 0) {
    md += `### Networking\n\n${skillBadges(skills.networking)}\n\n`;
  }
  if (skills.linux.length > 0) {
    md += `### Linux & System Administration\n\n${skillBadges(skills.linux)}\n\n`;
  }
  if (skills.programming.length > 0) {
    md += `### Programming & Development\n\n${skillBadges(skills.programming)}\n\n`;
  }
  if (skills.tools.length > 0) {
    md += `### Tools\n\n${skillBadges(skills.tools)}\n\n`;
  }

  return md;
}

function renderFeaturedProjects(config: ProfileConfig, githubData?: GitHubData): string {
  const featuredFromConfig = config.projects.filter((p) => p.featured);
  const featured =
    featuredFromConfig.length > 0
      ? featuredFromConfig
      : githubData
        ? getTopProjects(config, githubData)
        : config.projects.slice(0, 6);

  if (featured.length === 0) return '';

  let md = `## Featured Projects\n\n<table>\n<tr>\n`;

  featured.slice(0, 6).forEach((project, i) => {
    if (i > 0 && i % 3 === 0) md += `</tr>\n<tr>\n`;
    const techBadges = project.technologies
      .map((t) => `![${t}](https://img.shields.io/badge/${encodeURIComponent(t)}-grey?style=flat)`)
      .join(' ');
    md += `<td width="33%" valign="top">

### ${project.name}

${project.description}

${techBadges}

${statusBadge(project.status)}
${project.github ? `\n[View Repository](${project.github})` : ''}
</td>\n`;
  });

  md += `</tr>\n</table>\n`;
  return md;
}

function getTopProjects(config: ProfileConfig, githubData: GitHubData) {
  return config.projects
    .sort((a, b) => {
      const aRepo = githubData.repositories.find((r) => r.name.toLowerCase() === a.name.toLowerCase());
      const bRepo = githubData.repositories.find((r) => r.name.toLowerCase() === b.name.toLowerCase());
      return (bRepo?.stargazers_count ?? 0) - (aRepo?.stargazers_count ?? 0);
    })
    .slice(0, 6);
}

function renderProjects(config: ProfileConfig): string {
  if (config.projects.length === 0) return '';

  let md = `## Projects\n\n`;

  for (const project of config.projects) {
    const techBadges = project.technologies
      .map((t) => `![${t}](https://img.shields.io/badge/${encodeURIComponent(t)}-blueviolet?style=flat)`)
      .join(' ');

    md += `### ${project.name}\n\n`;
    md += `${project.description}\n\n`;
    md += `**Tech:** ${techBadges}\n\n`;
    md += `**Status:** ${statusBadge(project.status)}\n\n`;
    if (project.github) {
      md += `[View on GitHub](${project.github})\n\n`;
    }
    md += `---\n\n`;
  }

  return md;
}

function renderCtf(config: ProfileConfig): string {
  if (config.ctf.length === 0) return '';

  let md = `## CTF Portfolio\n\n`;
  md += `| Platform | Category | Challenge | Difficulty | Skills |\n`;
  md += `|----------|----------|-----------|------------|--------|\n`;

  for (const entry of config.ctf) {
    const skills = entry.skillsLearned.join(', ');
    md += `| ${entry.platform} | ${entry.category} | ${entry.challenge} | ${entry.difficulty} | ${skills} |\n`;
  }

  return md;
}

function renderLinuxLabs(config: ProfileConfig): string {
  const linuxLabs = config.labs.filter((l) =>
    l.technology.some((t) =>
      ['linux', 'centos', 'rocky', 'bash', 'ssh', 'apache', 'firewalld', 'systemd', 'selinux', 'auditd'].includes(
        t.toLowerCase()
      )
    )
  );

  if (linuxLabs.length === 0) return '';

  let md = `## Linux Labs\n\n`;
  md += `| Lab | Technology | Objective | Status |\n`;
  md += `|-----|-----------|-----------|--------|\n`;

  for (const lab of linuxLabs) {
    md += `| ${lab.name} | ${lab.technology.join(', ')} | ${lab.objective} | ${statusBadge(lab.status)} |\n`;
  }

  return md;
}

function renderNetworkingLabs(config: ProfileConfig): string {
  const netLabs = config.labs.filter((l) =>
    l.technology.some((t) =>
      ['networking', 'cisco', 'vlan', 'routing', 'switching', 'dns', 'dhcp', 'haproxy', 'subnetting'].includes(
        t.toLowerCase()
      )
    )
  );

  if (netLabs.length === 0) return '';

  let md = `## Networking Labs\n\n`;
  md += `| Lab | Technology | Objective | Status |\n`;
  md += `|-----|-----------|-----------|--------|\n`;

  for (const lab of netLabs) {
    md += `| ${lab.name} | ${lab.technology.join(', ')} | ${lab.objective} | ${statusBadge(lab.status)} |\n`;
  }

  return md;
}

function renderCertifications(config: ProfileConfig): string {
  if (config.certifications.length === 0) return '';

  let md = `## Certifications & Courses\n\n`;

  for (const cert of config.certifications) {
    md += `- **${cert.name}** — ${cert.provider} `;
    md += `${statusBadge(cert.status)}`;
    if (cert.year) md += ` (${cert.year})`;
    if (cert.credential) md += ` — [Credential](${cert.credential})`;
    md += `\n`;
  }

  return md;
}

function renderEducation(config: ProfileConfig): string {
  if (config.education.length === 0) return '';

  let md = `## Education\n\n`;

  for (const edu of config.education) {
    md += `- **${edu.degree}** — ${edu.institution} `;
    md += `${statusBadge(edu.status)}`;
    if (edu.year) md += ` (${edu.year})`;
    md += `\n`;
  }

  return md;
}

function renderCurrentlyLearning(config: ProfileConfig): string {
  if (config.currentlyLearning.length === 0) return '';

  let md = `## Currently Learning\n\n`;
  md += config.currentlyLearning.map((topic) => `- ${topic}`).join('\n');
  return md;
}

function renderGitHubStats(config: ProfileConfig, githubData?: GitHubData): string {
  const username = config.profile.username;

  let md = `## GitHub Statistics\n\n`;
  md += `<div align="center">\n\n`;
  md += `<img src="https://github-readme-stats.vercel.app/api?username=${username}&show_icons=true&theme=dark&hide_border=true" alt="GitHub Stats" height="165"/>\n\n`;
  md += `<img src="https://github-readme-stats.vercel.app/api/top-langs/?username=${username}&layout=compact&theme=dark&hide_border=true" alt="Top Languages" height="165"/>\n\n`;
  md += `</div>\n`;

  if (githubData) {
    md += `\n<div align="center">\n\n`;
    md += `![Profile Views](https://komarev.com/ghpvc/?username=${username}&color=blue&style=flat)\n\n`;
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
  if (social.email) badges.push(`[![Email](https://img.shields.io/badge/Email-D14836?style=for-the-badge&logo=gmail&logoColor=white)](mailto:${social.email})`);
  if (social.twitter) badges.push(linkBadge('Twitter', social.twitter, '1DA1F2'));
  if (social.website) badges.push(linkBadge('Website', social.website, '00d4ff'));

  md += badges.join('\n\n');
  md += `\n\n</div>`;

  return md;
}

function renderFooter(): string {
  return `<div align="center">

<img src="assets/profile-animation.svg" alt="Footer animation" width="400"/>

</div>`;
}
