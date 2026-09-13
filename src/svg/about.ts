import type { ThemeConfig } from '../theme.js';

function escapeXml(str: string): string {
  return str.replace(/&/g, '&amp;').replace(/</g, '&lt;').replace(/>/g, '&gt;').replace(/"/g, '&quot;');
}

export interface AboutSection {
  name: string;
  tagline: string;
  stats: { label: string; value: string }[];
  focus: string[];
}

export function generateAboutSection(data: AboutSection, theme: ThemeConfig): string {
  const width = 800;
  const height = 340;
  const padding = 40;
  const cardX = padding;
  const cardY = padding;
  const cardW = width - padding * 2;
  const cardH = height - padding * 2;
  const radius = 16;

  return `<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 ${width} ${height}" width="${width}" height="${height}">
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
      <stop offset="0%" style="stop-color:${theme.primary};stop-opacity:1"/>
      <stop offset="100%" style="stop-color:${theme.secondary};stop-opacity:1"/>
    </linearGradient>
    <filter id="ab-glow">
      <feGaussianBlur stdDeviation="4" result="b"/>
      <feMerge><feMergeNode in="b"/><feMergeNode in="SourceGraphic"/></feMerge>
    </filter>
    <filter id="ab-soft">
      <feGaussianBlur stdDeviation="1.5"/>
    </filter>
    <clipPath id="ab-clip">
      <rect x="${cardX}" y="${cardY}" width="${cardW}" height="${cardH}" rx="${radius}"/>
    </clipPath>
  </defs>

  <!-- Background glow -->
  <ellipse cx="${width / 2}" cy="${height / 2}" rx="300" ry="150" fill="${theme.primary}" opacity="0.03" filter="url(#ab-soft)"/>

  <!-- Card background -->
  <rect x="${cardX}" y="${cardY}" width="${cardW}" height="${cardH}" rx="${radius}" fill="url(#ab-card)"/>
  <rect x="${cardX}" y="${cardY}" width="${cardW}" height="${cardH}" rx="${radius}" fill="none" stroke="url(#ab-border)" stroke-width="1"/>

  <!-- Top accent line -->
  <rect x="${cardX + 20}" y="${cardY}" width="80" height="2" rx="1" fill="url(#ab-accent)" opacity="0.8"/>

  <!-- Section label -->
  <text x="${cardX + 24}" y="${cardY + 32}" font-family="'SF Mono','Cascadia Code','Consolas',monospace" font-size="10" fill="${theme.primary}" letter-spacing="2" opacity="0.7">PROFILE</text>

  <!-- Vertical accent bar -->
  <rect x="${cardX + 24}" y="${cardY + 50}" width="2" height="50" rx="1" fill="url(#ab-accent)" opacity="0.6"/>

  <!-- Name -->
  <text x="${cardX + 40}" y="${cardY + 68}" font-family="'Segoe UI','Inter',Arial,sans-serif" font-size="22" font-weight="700" fill="${theme.highlight}">${escapeXml(data.name)}</text>

  <!-- Tagline -->
  <text x="${cardX + 40}" y="${cardY + 90}" font-family="'SF Mono','Cascadia Code','Consolas',monospace" font-size="12" fill="${theme.primary}" letter-spacing="0.5">${escapeXml(data.tagline)}</text>

  <!-- Animated cursor -->
  <rect x="${cardX + 40 + data.tagline.length * 7.2}" y="${cardY + 79}" width="8" height="14" fill="${theme.primary}" opacity="0.7">
    <animate attributeName="opacity" values="0.7;0;0.7" dur="1.2s" repeatCount="indefinite"/>
  </rect>

  <!-- Divider line -->
  <line x1="${cardX + 24}" y1="${cardY + 110}" x2="${cardX + cardW - 24}" y2="${cardY + 110}" stroke="${theme.border}" stroke-width="0.5" opacity="0.5"/>

  <!-- Description text -->
  <foreignObject x="${cardX + 24}" y="${cardY + 120}" width="${cardW - 48}" height="80">
    <div xmlns="http://www.w3.org/1999/xhtml" style="font-family:'Segoe UI',Arial,sans-serif;font-size:13px;line-height:1.6;color:${theme.muted};">
      Building secure systems. Exploring networks. Learning cybersecurity through hands-on projects.
    </div>
  </foreignObject>

  <!-- Focus areas -->
  ${data.focus.map((f, i) => {
    const fx = cardX + 24 + i * 180;
    const fy = cardY + 210;
    return `
  <rect x="${fx}" y="${fy}" width="165" height="36" rx="8" fill="${theme.surfaceAlt}" stroke="${theme.border}" stroke-width="0.5" opacity="0.8"/>
  <circle cx="${fx + 14}" cy="${fy + 18}" r="3" fill="${theme.primary}" opacity="0.8">
    <animate attributeName="opacity" values="0.5;1;0.5" dur="${2 + i * 0.5}s" repeatCount="indefinite"/>
  </circle>
  <text x="${fx + 24}" y="${fy + 22}" font-family="'SF Mono','Cascadia Code','Consolas',monospace" font-size="11" fill="${theme.highlight}">${escapeXml(f)}</text>`;
  }).join('\n')}

  <!-- Stats row -->
  <line x1="${cardX + 24}" y1="${cardY + 260}" x2="${cardX + cardW - 24}" y2="${cardY + 260}" stroke="${theme.border}" stroke-width="0.5" opacity="0.3"/>

  ${data.stats.map((stat, i) => {
    const sx = cardX + 24 + i * ((cardW - 48) / data.stats.length);
    const sy = cardY + 282;
    return `
  <text x="${sx}" y="${sy}" font-family="'SF Mono','Cascadia Code','Consolas',monospace" font-size="10" fill="${theme.muted}" letter-spacing="1">${escapeXml(stat.label.toUpperCase())}</text>
  <text x="${sx}" y="${sy + 22}" font-family="'Segoe UI','Inter',Arial,sans-serif" font-size="16" font-weight="700" fill="${theme.highlight}">${escapeXml(stat.value)}</text>`;
  }).join('\n')}

  <!-- Bottom accent -->
  <rect x="${cardX + cardW - 100}" y="${cardY + cardH - 2}" width="80" height="2" rx="1" fill="url(#ab-accent)" opacity="0.4"/>

  <!-- Corner decorations -->
  <path d="M ${cardX + radius} ${cardY + 4} L ${cardX + 12} ${cardY + 4} L ${cardX + 4} ${cardY + 12} L ${cardX + 4} ${cardY + radius}" fill="none" stroke="${theme.primary}" stroke-width="0.5" opacity="0.3"/>
  <path d="M ${cardX + cardW - radius} ${cardY + cardH - 4} L ${cardX + cardW - 12} ${cardY + cardH - 4} L ${cardX + cardW - 4} ${cardY + cardH - 12} L ${cardX + cardW - 4} ${cardY + cardH - radius}" fill="none" stroke="${theme.primary}" stroke-width="0.5" opacity="0.3"/>
</svg>`;
}
