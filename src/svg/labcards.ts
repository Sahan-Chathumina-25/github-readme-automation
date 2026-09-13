import type { ThemeConfig } from '../theme.js';

function escapeXml(str: string): string {
  return str.replace(/&/g, '&amp;').replace(/</g, '&lt;').replace(/>/g, '&gt;').replace(/"/g, '&quot;');
}

export interface LabCard {
  name: string;
  technology: string[];
  objective: string;
  status: 'Completed' | 'In Progress' | 'Planned' | 'Learning';
}

export function generateLabCards(labs: LabCard[], theme: ThemeConfig, sectionTitle: string): string {
  if (labs.length === 0) return '';

  const width = 800;
  const cardH = 70;
  const gap = 10;
  const padding = 24;
  const totalH = labs.length * (cardH + gap) + padding * 2;

  const statusColor = (s: string) => {
    if (s === 'Completed') return theme.success;
    if (s === 'In Progress') return theme.primary;
    if (s === 'Learning') return theme.secondary;
    return theme.muted;
  };

  const cards = labs.map((lab, i) => {
    const y = padding + i * (cardH + gap);
    const color = statusColor(lab.status);
    const techStr = lab.technology.join('  •  ');
    const delay = i * 0.15;

    return `
  <!-- Card ${i + 1} -->
  <g opacity="0" transform="translate(0, 8)">
    <animate attributeName="opacity" values="0;1" dur="0.5s" begin="${delay}s" fill="freeze"/>
    <animateTransform attributeName="transform" type="translate" values="0 8;0 0" dur="0.5s" begin="${delay}s" fill="freeze"/>

    <rect x="${padding}" y="${y}" width="${width - padding * 2}" height="${cardH}" rx="10" fill="${theme.surface}" opacity="0.8"/>
    <rect x="${padding}" y="${y}" width="${width - padding * 2}" height="${cardH}" rx="10" fill="none" stroke="${theme.border}" stroke-width="0.5"/>

    <!-- Left accent -->
    <rect x="${padding}" y="${y + 10}" width="3" height="${cardH - 20}" rx="1.5" fill="${color}" opacity="0.7"/>

    <!-- Lab number -->
    <text x="${padding + 16}" y="${y + 22}" font-family="'SF Mono','Cascadia Code','Consolas',monospace" font-size="9" fill="${color}" letter-spacing="1.5" opacity="0.7">LAB ${String(i + 1).padStart(2, '0')}</text>

    <!-- Lab name -->
    <text x="${padding + 16}" y="${y + 40}" font-family="'Segoe UI','Inter',Arial,sans-serif" font-size="14" font-weight="600" fill="${theme.highlight}">${escapeXml(lab.name)}</text>

    <!-- Objective -->
    <text x="${padding + 16}" y="${y + 58}" font-family="'Segoe UI','Inter',Arial,sans-serif" font-size="11" fill="${theme.muted}">${escapeXml(lab.objective.length > 60 ? lab.objective.substring(0, 57) + '...' : lab.objective)}</text>

    <!-- Technology pills -->
    ${lab.technology.slice(0, 3).map((tech, ti) => {
      const tx = width - padding - 20 - ti * 80;
      const tw = tech.length * 7 + 16;
      return `
    <rect x="${tx - tw + 80}" y="${y + 12}" width="${tw}" height="20" rx="10" fill="${theme.surfaceAlt}" stroke="${theme.border}" stroke-width="0.5"/>
    <text x="${tx - tw + 80 + tw / 2}" y="${y + 26}" text-anchor="middle" font-family="'SF Mono','Consolas',monospace" font-size="9" fill="${theme.muted}">${escapeXml(tech)}</text>`;
    }).join('')}

    <!-- Status dot -->
    <circle cx="${width - padding - 16}" cy="${y + cardH / 2}" r="4" fill="${color}" opacity="0.8">
      <animate attributeName="opacity" values="0.5;1;0.5" dur="2s" repeatCount="indefinite" begin="${delay + 0.5}s"/>
    </circle>
  </g>`;
  }).join('');

  return `<div align="center">

## ${escapeXml(sectionTitle)}

<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 ${width} ${totalH}" width="${width}" height="${totalH}">
  <defs>
    <filter id="lc-glow">
      <feGaussianBlur stdDeviation="3" result="b"/>
      <feMerge><feMergeNode in="b"/><feMergeNode in="SourceGraphic"/></feMerge>
    </filter>
  </defs>
  ${cards}
</svg>

</div>`;
}

export function generateCtfCards(ctf: { platform: string; category: string; difficulty: string; skillsLearned: string[] }[], theme: ThemeConfig): string {
  if (ctf.length === 0) return '';

  const width = 800;
  const cardH = 60;
  const gap = 8;
  const padding = 24;
  const totalH = ctf.length * (cardH + gap) + padding * 2;

  const cards = ctf.map((entry, i) => {
    const y = padding + i * (cardH + gap);
    const delay = i * 0.12;

    return `
  <g opacity="0" transform="translate(0, 6)">
    <animate attributeName="opacity" values="0;1" dur="0.4s" begin="${delay}s" fill="freeze"/>
    <animateTransform attributeName="transform" type="translate" values="0 6;0 0" dur="0.4s" begin="${delay}s" fill="freeze"/>

    <rect x="${padding}" y="${y}" width="${width - padding * 2}" height="${cardH}" rx="10" fill="${theme.surface}" opacity="0.8"/>
    <rect x="${padding}" y="${y}" width="${width - padding * 2}" height="${cardH}" rx="10" fill="none" stroke="${theme.border}" stroke-width="0.5"/>

    <rect x="${padding}" y="${y + 8}" width="3" height="${cardH - 16}" rx="1.5" fill="${theme.secondary}" opacity="0.6"/>

    <text x="${padding + 16}" y="${y + 22}" font-family="'SF Mono','Consolas',monospace" font-size="9" fill="${theme.secondary}" letter-spacing="1" opacity="0.7">CTF ${String(i + 1).padStart(2, '0')}</text>
    <text x="${padding + 16}" y="${y + 38}" font-family="'Segoe UI',Arial,sans-serif" font-size="13" font-weight="600" fill="${theme.highlight}">${escapeXml(entry.category)}</text>
    <text x="${padding + 16}" y="${y + 52}" font-family="'Segoe UI',Arial,sans-serif" font-size="10" fill="${theme.muted}">${escapeXml(entry.platform)}  •  ${escapeXml(entry.difficulty)}</text>

    <text x="${width - padding - 16}" y="${y + 38}" text-anchor="end" font-family="'SF Mono',monospace" font-size="9" fill="${theme.primary}" opacity="0.7">${entry.skillsLearned.length} skills</text>
  </g>`;
  }).join('');

  return `<div align="center">

## Cybersecurity Lab

<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 ${width} ${totalH}" width="${width}" height="${totalH}">
  ${cards}
</svg>

</div>`;
}
