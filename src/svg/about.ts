import type { ThemeConfig } from '../theme.js';

function esc(str: string): string {
  return str.replace(/&/g, '&amp;').replace(/</g, '&lt;').replace(/>/g, '&gt;').replace(/"/g, '&quot;');
}

export interface AboutData {
  name: string;
  tagline: string;
  description: string;
  focus: string[];
  stats: { label: string; value: string }[];
}

export function generateAboutCard(data: AboutData, theme: ThemeConfig): string {
  const w = 800;
  const h = 340;
  const p = 30;
  const r = 14;

  const focusPills = data.focus.map((f, i) => {
    const fx = p + 20 + i * 178;
    const fy = 205;
    return `
    <rect x="${fx}" y="${fy}" width="165" height="34" rx="8" fill="${theme.surfaceAlt}" stroke="${theme.border}" stroke-width="0.5" opacity="0.85"/>
    <circle cx="${fx + 14}" cy="${fy + 17}" r="3" fill="${theme.primary}" opacity="0.8">
      <animate attributeName="opacity" values="0.5;1;0.5" dur="${2.5 + i * 0.4}s" repeatCount="indefinite"/>
    </circle>
    <text x="${fx + 24}" y="${fy + 21}" font-family="'SF Mono','Cascadia Code','Consolas',monospace" font-size="11" fill="${theme.highlight}">${esc(f)}</text>`;
  }).join('\n');

  const statItems = data.stats.map((s, i) => {
    const sx = p + 20 + i * ((w - p * 2 - 40) / data.stats.length);
    return `
    <text x="${sx}" y="272" font-family="'SF Mono','Cascadia Code','Consolas',monospace" font-size="10" fill="${theme.muted}" letter-spacing="1">${esc(s.label.toUpperCase())}</text>
    <text x="${sx}" y="296" font-family="'Segoe UI','Inter',Arial,sans-serif" font-size="16" font-weight="700" fill="${theme.highlight}">${esc(s.value)}</text>`;
  }).join('\n');

  return `<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 ${w} ${h}" width="${w}" height="${h}">
  <defs>
    <linearGradient id="ab-card" x1="0%" y1="0%" x2="100%" y2="100%">
      <stop offset="0%" style="stop-color:${theme.surface};stop-opacity:0.95"/>
      <stop offset="100%" style="stop-color:${theme.surfaceAlt};stop-opacity:0.9"/>
    </linearGradient>
    <linearGradient id="ab-border" x1="0%" y1="0%" x2="100%" y2="100%">
      <stop offset="0%" style="stop-color:${theme.primary};stop-opacity:0.4"/>
      <stop offset="50%" style="stop-color:${theme.secondary};stop-opacity:0.2"/>
      <stop offset="100%" style="stop-color:${theme.primary};stop-opacity:0.1"/>
    </linearGradient>
    <linearGradient id="ab-accent" x1="0%" y1="0%" x2="100%" y2="0%">
      <stop offset="0%" style="stop-color:${theme.primary}"/>
      <stop offset="100%" style="stop-color:${theme.secondary}"/>
    </linearGradient>
    <filter id="ab-glow">
      <feGaussianBlur stdDeviation="3" result="b"/>
      <feMerge><feMergeNode in="b"/><feMergeNode in="SourceGraphic"/></feMerge>
    </filter>
    <filter id="ab-soft">
      <feGaussianBlur stdDeviation="40"/>
    </filter>
    <clipPath id="ab-clip">
      <rect x="${p}" y="${p}" width="${w - p * 2}" height="${h - p * 2}" rx="${r}"/>
    </clipPath>
  </defs>

  <g clip-path="url(#ab-clip)">
    <rect width="${w}" height="${h}" fill="${theme.background}"/>

    <ellipse cx="${w / 2}" cy="${h / 2}" rx="280" ry="120" fill="${theme.primary}" opacity="0.03" filter="url(#ab-soft)"/>

    <rect x="${p}" y="${p}" width="${w - p * 2}" height="${h - p * 2}" rx="${r}" fill="url(#ab-card)"/>
    <rect x="${p}" y="${p}" width="${w - p * 2}" height="${h - p * 2}" rx="${r}" fill="none" stroke="url(#ab-border)" stroke-width="1"/>

    <rect x="${p + 20}" y="${p}" width="80" height="2" rx="1" fill="url(#ab-accent)" opacity="0.8"/>

    <text x="${p + 24}" y="${p + 32}" font-family="'SF Mono','Cascadia Code','Consolas',monospace" font-size="10" fill="${theme.primary}" letter-spacing="2" opacity="0.7">PROFILE</text>

    <rect x="${p + 24}" y="${p + 50}" width="2" height="45" rx="1" fill="url(#ab-accent)" opacity="0.6"/>

    <text x="${p + 40}" y="${p + 68}" font-family="'Segoe UI','Inter',Arial,sans-serif" font-size="22" font-weight="700" fill="${theme.highlight}">${esc(data.name)}</text>

    <text x="${p + 40}" y="${p + 90}" font-family="'SF Mono','Cascadia Code','Consolas',monospace" font-size="12" fill="${theme.primary}" letter-spacing="0.5">${esc(data.tagline)}</text>

    <rect x="${p + 40 + data.tagline.length * 7.2}" y="${p + 79}" width="8" height="14" fill="${theme.primary}" opacity="0.7">
      <animate attributeName="opacity" values="0.7;0;0.7" dur="1.2s" repeatCount="indefinite"/>
    </rect>

    <line x1="${p + 24}" y1="${p + 108}" x2="${w - p - 24}" y2="${p + 108}" stroke="${theme.border}" stroke-width="0.5" opacity="0.5"/>

    <foreignObject x="${p + 24}" y="${p + 118}" width="${w - p * 2 - 48}" height="70">
      <div xmlns="http://www.w3.org/1999/xhtml" style="font-family:'Segoe UI',Arial,sans-serif;font-size:13px;line-height:1.6;color:${theme.muted};">
        ${esc(data.description)}
      </div>
    </foreignObject>

    ${focusPills}

    <line x1="${p + 24}" y1="255" x2="${w - p - 24}" y2="255" stroke="${theme.border}" stroke-width="0.5" opacity="0.3"/>

    ${statItems}

    <rect x="${w - p - 100}" y="${h - p - 2}" width="80" height="2" rx="1" fill="url(#ab-accent)" opacity="0.4"/>

    <path d="M ${p + r} ${p + 4} L ${p + 12} ${p + 4} L ${p + 4} ${p + 12} L ${p + 4} ${p + r}" fill="none" stroke="${theme.primary}" stroke-width="0.5" opacity="0.3"/>
    <path d="M ${w - p - r} ${h - p - 4} L ${w - p - 12} ${h - p - 4} L ${w - p - 4} ${h - p - 12} L ${w - p - 4} ${h - p - r}" fill="none" stroke="${theme.primary}" stroke-width="0.5" opacity="0.3"/>

    <rect x="0" y="0" width="${w}" height="1.5" fill="${theme.primary}" opacity="0.06">
      <animate attributeName="y" values="0;${h};0" dur="8s" repeatCount="indefinite"/>
    </rect>
  </g>
</svg>`;
}
