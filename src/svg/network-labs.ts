import type { ThemeConfig } from '../theme.js';

function esc(str: string): string {
  return str.replace(/&/g, '&amp;').replace(/</g, '&lt;').replace(/>/g, '&gt;').replace(/"/g, '&quot;');
}

export interface NetLabEntry {
  name: string;
  technology: string[];
  objective: string;
  status: 'Completed' | 'In Progress' | 'Planned' | 'Learning';
}

export function generateNetworkLabs(labs: NetLabEntry[], theme: ThemeConfig): string {
  if (labs.length === 0) return '';

  const w = 700;
  const cardW = 200;
  const cardH = 120;
  const gap = 16;
  const pad = 24;
  const cols = 3;
  const rows = Math.ceil(labs.length / cols);
  const totalH = rows * (cardH + gap) + pad * 2 + 30;

  const statusColor = (s: string) => {
    if (s === 'Completed') return theme.success;
    if (s === 'In Progress') return theme.primary;
    if (s === 'Learning') return theme.secondary;
    return theme.muted;
  };

  const cards = labs.map((lab, i) => {
    const col = i % cols;
    const row = Math.floor(i / cols);
    const x = pad + col * (cardW + gap);
    const y = pad + 30 + row * (cardH + gap);
    const color = statusColor(lab.status);
    const delay = i * 0.1;

    return `
  <g opacity="0" transform="translate(0, 6)">
    <animate attributeName="opacity" values="0;1" dur="0.4s" begin="${delay}s" fill="freeze"/>
    <animateTransform attributeName="transform" type="translate" values="0 6;0 0" dur="0.4s" begin="${delay}s" fill="freeze"/>

    <rect x="${x}" y="${y}" width="${cardW}" height="${cardH}" rx="10" fill="${theme.surface}" opacity="0.85"/>
    <rect x="${x}" y="${y}" width="${cardW}" height="${cardH}" rx="10" fill="none" stroke="${theme.border}" stroke-width="0.5"/>

    <rect x="${x}" y="${y}" width="${cardW}" height="3" rx="1.5" fill="${color}" opacity="0.6"/>

    <circle cx="${x + cardW - 16}" cy="${y + 18}" r="4" fill="${color}" opacity="0.8">
      <animate attributeName="opacity" values="0.5;1;0.5" dur="2s" repeatCount="indefinite" begin="${delay + 0.3}s"/>
    </circle>

    <text x="${x + 14}" y="${y + 22}" font-family="'SF Mono','Consolas',monospace" font-size="8" fill="${color}" letter-spacing="1" opacity="0.7">NODE ${String(i + 1).padStart(2, '0')}</text>

    <text x="${x + 14}" y="${y + 40}" font-family="'Segoe UI','Inter',Arial,sans-serif" font-size="12" font-weight="600" fill="${theme.highlight}">${esc(lab.name.length > 22 ? lab.name.substring(0, 20) + '..' : lab.name)}</text>

    <text x="${x + 14}" y="${y + 56}" font-family="'Segoe UI','Inter',Arial,sans-serif" font-size="9" fill="${theme.muted}">${esc(lab.objective.length > 30 ? lab.objective.substring(0, 28) + '...' : lab.objective)}</text>

    <line x1="${x + 14}" y1="${y + 68}" x2="${x + cardW - 14}" y2="${y + 68}" stroke="${theme.border}" stroke-width="0.5" opacity="0.3"/>

    ${lab.technology.slice(0, 3).map((tech, ti) => {
      const tx = x + 14 + ti * 58;
      return `
    <rect x="${tx}" y="${y + 76}" width="${tech.length * 6 + 10}" height="16" rx="8" fill="${theme.surfaceAlt}" stroke="${theme.border}" stroke-width="0.5"/>
    <text x="${tx + (tech.length * 6 + 10) / 2}" y="${y + 87}" text-anchor="middle" font-family="'SF Mono','Consolas',monospace" font-size="7" fill="${theme.muted}">${esc(tech)}</text>`;
    }).join('')}

    <rect x="${x + 14}" y="${y + cardH - 22}" width="${cardW - 28}" height="3" rx="1.5" fill="${theme.surfaceAlt}"/>
    <rect x="${x + 14}" y="${y + cardH - 22}" width="${lab.status === 'Completed' ? cardW - 28 : lab.status === 'In Progress' ? (cardW - 28) * 0.5 : lab.status === 'Learning' ? (cardW - 28) * 0.3 : 0}" height="3" rx="1.5" fill="${color}" opacity="0.6">
      <animate attributeName="width" from="0" to="${lab.status === 'Completed' ? cardW - 28 : lab.status === 'In Progress' ? (cardW - 28) * 0.5 : lab.status === 'Learning' ? (cardW - 28) * 0.3 : 0}" dur="0.8s" begin="${delay + 0.3}s" fill="freeze"/>
    </rect>
  </g>`;
  }).join('');

  return `<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 ${w} ${totalH}" width="${w}" height="${totalH}">
  <defs>
    <linearGradient id="nl-accent" x1="0%" y1="0%" x2="100%" y2="0%">
      <stop offset="0%" style="stop-color:${theme.primary};stop-opacity:0.6"/>
      <stop offset="100%" style="stop-color:${theme.secondary};stop-opacity:0.6"/>
    </linearGradient>
  </defs>

  <text x="${pad}" y="${pad + 14}" font-family="'SF Mono','Cascadia Code','Consolas',monospace" font-size="10" fill="${theme.primary}" letter-spacing="1.5" opacity="0.7">NETWORK OPERATIONS</text>
  <line x1="${pad}" y1="${pad + 22}" x2="${w - pad}" y2="${pad + 22}" stroke="url(#nl-accent)" stroke-width="0.5" opacity="0.3"/>

  ${cards}
</svg>`;
}
