import type { ProfileConfig } from '../types';

export function generateAboutCard(config: ProfileConfig): string {
  const W = 800;
  const H = 200;
  const t = config.theme;
  const name = config.profile.name;
  const headline = config.profile.headline;
  const about = config.profile.about || '';
  const focusAreas = ['Cybersecurity', 'Networking', 'Linux', 'WordPress', 'Full Stack'];
  const stats = [
    { label: 'CCNA', value: '3/3' },
    { label: 'Labs', value: '8+' },
    { label: 'CTF', value: 'Active' },
  ];

  let svg = `<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 ${W} ${H}" width="${W}" height="${H}">`;
  svg += `<defs>`;
  svg += `<style>
    .about-name { font-family:'Segoe UI',system-ui,sans-serif; font-size:18px; font-weight:700; fill:${t.highlight}; }
    .about-headline { font-family:'Segoe UI',system-ui,sans-serif; font-size:10px; fill:${t.primary}; letter-spacing:0.5px; }
    .about-text { font-family:'Segoe UI',system-ui,sans-serif; font-size:10px; fill:${t.muted}; }
    .focus-pill { font-family:'Segoe UI',system-ui,sans-serif; font-size:9px; fill:${t.primary}; }
    .stat-value { font-family:'Segoe UI',system-ui,sans-serif; font-size:14px; font-weight:700; fill:${t.highlight}; }
    .stat-label { font-family:'Segoe UI',system-ui,sans-serif; font-size:8px; fill:${t.muted}; letter-spacing:1px; }
  </style>`;
  svg += `</defs>`;

  // Background
  svg += `<rect width="${W}" height="${H}" fill="${t.surface}" rx="8"/>`;

  // Left accent line
  svg += `<rect x="0" y="20" width="3" height="${H - 40}" rx="1.5" fill="${t.primary}" opacity="0.5"/>`;

  // Name
  svg += `<text x="30" y="38" class="about-name">${name}</text>`;

  // Headline
  svg += `<text x="30" y="56" class="about-headline">${headline}</text>`;

  // About text — wrap manually
  const maxChars = 85;
  const words = about.split(' ');
  let lines: string[] = [];
  let currentLine = '';
  words.forEach((word) => {
    if ((currentLine + ' ' + word).trim().length > maxChars) {
      lines.push(currentLine.trim());
      currentLine = word;
    } else {
      currentLine += ' ' + word;
    }
  });
  if (currentLine.trim()) lines.push(currentLine.trim());

  lines.slice(0, 3).forEach((line, i) => {
    svg += `<text x="30" y="${78 + i * 14}" class="about-text">${line}</text>`;
  });

  // Focus pills
  let pillX = 30;
  const pillY = H - 36;
  focusAreas.forEach((area) => {
    const pw = area.length * 5.5 + 16;
    svg += `<rect x="${pillX}" y="${pillY}" width="${pw}" height="20" rx="10" fill="${t.surfaceAlt}" stroke="${t.border}" stroke-width="0.5"/>`;
    svg += `<text x="${pillX + pw / 2}" y="${pillY + 13}" text-anchor="middle" class="focus-pill">${area}</text>`;
    pillX += pw + 6;
  });

  // Stats — right side
  const statsX = W - 160;
  stats.forEach((stat, i) => {
    const sy = 40 + i * 50;
    svg += `<text x="${statsX}" y="${sy}" class="stat-value">${stat.value}</text>`;
    svg += `<text x="${statsX}" y="${sy + 14}" class="stat-label">${stat.label}</text>`;
    if (i < stats.length - 1) {
      svg += `<line x1="${statsX}" y1="${sy + 22}" x2="${statsX + 60}" y2="${sy + 22}" stroke="${t.border}" stroke-width="0.5"/>`;
    }
  });

  // Subtle corner accents
  svg += `<line x1="${W - 30}" y1="10" x2="${W - 10}" y2="10" stroke="${t.border}" stroke-width="0.5"/>`;
  svg += `<line x1="${W - 10}" y1="10" x2="${W - 10}" y2="30" stroke="${t.border}" stroke-width="0.5"/>`;
  svg += `<line x1="10" y1="${H - 10}" x2="30" y2="${H - 10}" stroke="${t.border}" stroke-width="0.5"/>`;
  svg += `<line x1="10" y1="${H - 30}" x2="10" y2="${H - 10}" stroke="${t.border}" stroke-width="0.5"/>`;

  svg += `</svg>`;
  return svg;
}
