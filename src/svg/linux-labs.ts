import type { ThemeConfig } from '../theme.js';

function esc(str: string): string {
  return str.replace(/&/g, '&amp;').replace(/</g, '&lt;').replace(/>/g, '&gt;').replace(/"/g, '&quot;');
}

export interface LabEntry {
  name: string;
  technology: string[];
  objective: string;
  status: 'Completed' | 'In Progress' | 'Planned' | 'Learning';
}

export function generateLabDashboard(labs: LabEntry[], theme: ThemeConfig, title: string): string {
  if (labs.length === 0) return '';

  const w = 700;
  const rowH = 56;
  const gap = 6;
  const pad = 24;
  const totalH = labs.length * (rowH + gap) + pad * 2 + 30;

  const statusColor = (s: string) => {
    if (s === 'Completed') return theme.success;
    if (s === 'In Progress') return theme.primary;
    if (s === 'Learning') return theme.secondary;
    return theme.muted;
  };

  const statusLabel = (s: string) => s.toUpperCase();

  const rows = labs.map((lab, i) => {
    const y = pad + 30 + i * (rowH + gap);
    const color = statusColor(lab.status);
    const delay = i * 0.12;

    return `
  <g opacity="0" transform="translate(0, 6)">
    <animate attributeName="opacity" values="0;1" dur="0.4s" begin="${delay}s" fill="freeze"/>
    <animateTransform attributeName="transform" type="translate" values="0 6;0 0" dur="0.4s" begin="${delay}s" fill="freeze"/>

    <rect x="${pad}" y="${y}" width="${w - pad * 2}" height="${rowH}" rx="8" fill="${theme.surface}" opacity="0.8"/>
    <rect x="${pad}" y="${y}" width="${w - pad * 2}" height="${rowH}" rx="8" fill="none" stroke="${theme.border}" stroke-width="0.5"/>

    <rect x="${pad}" y="${y + 8}" width="3" height="${rowH - 16}" rx="1.5" fill="${color}" opacity="0.7"/>

    <text x="${pad + 16}" y="${y + 20}" font-family="'Segoe UI','Inter',Arial,sans-serif" font-size="13" font-weight="600" fill="${theme.highlight}">${esc(lab.name)}</text>

    <text x="${pad + 16}" y="${y + 36}" font-family="'Segoe UI','Inter',Arial,sans-serif" font-size="10" fill="${theme.muted}">${esc(lab.objective.length > 55 ? lab.objective.substring(0, 52) + '...' : lab.objective)}</text>

    <text x="${pad + 16}" y="${y + 50}" font-family="'SF Mono','Consolas',monospace" font-size="8" fill="${theme.muted}" opacity="0.5">${esc(lab.technology.join('  •  '))}</text>

    <rect x="${w - pad - 90}" y="${y + 12}" width="76" height="22" rx="11" fill="${theme.surfaceAlt}" stroke="${color}" stroke-width="0.8" opacity="0.8"/>
    <circle cx="${w - pad - 80}" cy="${y + 23}" r="3" fill="${color}" opacity="0.8"/>
    <text x="${w - pad - 52}" y="${y + 28}" text-anchor="middle" font-family="'SF Mono','Consolas',monospace" font-size="8" fill="${color}" letter-spacing="0.5">${statusLabel(lab.status)}</text>
  </g>`;
  }).join('');

  return `<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 ${w} ${totalH}" width="${w}" height="${totalH}">
  <defs>
    <linearGradient id="ld-accent" x1="0%" y1="0%" x2="100%" y2="0%">
      <stop offset="0%" style="stop-color:${theme.primary};stop-opacity:0.6"/>
      <stop offset="100%" style="stop-color:${theme.secondary};stop-opacity:0.6"/>
    </linearGradient>
  </defs>

  <text x="${pad}" y="${pad + 14}" font-family="'SF Mono','Cascadia Code','Consolas',monospace" font-size="10" fill="${theme.primary}" letter-spacing="1.5" opacity="0.7">${esc(title.toUpperCase())}</text>
  <line x1="${pad}" y1="${pad + 22}" x2="${w - pad}" y2="${pad + 22}" stroke="url(#ld-accent)" stroke-width="0.5" opacity="0.3"/>

  ${rows}
</svg>`;
}
