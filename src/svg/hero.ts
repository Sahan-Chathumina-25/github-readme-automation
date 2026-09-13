import type { ThemeConfig } from '../theme.js';

function escapeXml(str: string): string {
  return str.replace(/&/g, '&amp;').replace(/</g, '&lt;').replace(/>/g, '&gt;').replace(/"/g, '&quot;');
}

export function generateHeroBanner(
  name: string,
  headline: string,
  theme: ThemeConfig,
  width = 1280,
  height = 400
): string {
  const lines = headline.split(' | ');
  const tagline = lines.join('  •  ');

  return `<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 ${width} ${height}" width="${width}" height="${height}">
  <defs>
    <linearGradient id="hb-bg" x1="0%" y1="0%" x2="100%" y2="100%">
      <stop offset="0%" style="stop-color:${theme.background};stop-opacity:1"/>
      <stop offset="50%" style="stop-color:${theme.surface};stop-opacity:1"/>
      <stop offset="100%" style="stop-color:${theme.background};stop-opacity:1"/>
    </linearGradient>
    <linearGradient id="hb-accent" x1="0%" y1="0%" x2="100%" y2="0%">
      <stop offset="0%" style="stop-color:${theme.primary};stop-opacity:0.9"/>
      <stop offset="100%" style="stop-color:${theme.secondary};stop-opacity:0.9"/>
    </linearGradient>
    <radialGradient id="hb-glow" cx="50%" cy="45%" r="50%">
      <stop offset="0%" style="stop-color:${theme.primary};stop-opacity:0.06"/>
      <stop offset="100%" style="stop-color:${theme.primary};stop-opacity:0"/>
    </radialGradient>
    <filter id="hb-blur">
      <feGaussianBlur stdDeviation="2" result="b"/>
      <feMerge><feMergeNode in="b"/><feMergeNode in="SourceGraphic"/></feMerge>
    </filter>
  </defs>

  <rect width="${width}" height="${height}" fill="url(#hb-bg)"/>
  <rect width="${width}" height="${height}" fill="url(#hb-glow)"/>

  <!-- Grid -->
  <g opacity="0.025" stroke="${theme.primary}" stroke-width="0.5">
    ${Array.from({ length: Math.floor(height / 50) + 1 }, (_, i) => `<line x1="0" y1="${i * 50}" x2="${width}" y2="${i * 50}"/>`).join('\n    ')}
    ${Array.from({ length: Math.floor(width / 100) + 1 }, (_, i) => `<line x1="${i * 100}" y1="0" x2="${i * 100}" y2="${height}"/>`).join('\n    ')}
  </g>

  <!-- Network nodes -->
  <g filter="url(#hb-blur)">
    <g stroke="${theme.primary}" stroke-width="0.8" opacity="0.1">
      <line x1="120" y1="90" x2="300" y2="70"/>
      <line x1="300" y1="70" x2="500" y2="110"/>
      <line x1="500" y1="110" x2="720" y2="80"/>
      <line x1="720" y1="80" x2="920" y2="130"/>
      <line x1="920" y1="130" x2="1120" y2="95"/>
      <line x1="120" y1="90" x2="200" y2="250"/>
      <line x1="300" y1="70" x2="400" y2="270"/>
      <line x1="500" y1="110" x2="600" y2="290"/>
      <line x1="720" y1="80" x2="820" y2="280"/>
      <line x1="920" y1="130" x2="1020" y2="260"/>
      <line x1="200" y1="250" x2="400" y2="270"/>
      <line x1="400" y1="270" x2="600" y2="290"/>
      <line x1="600" y1="290" x2="820" y2="280"/>
      <line x1="820" y1="280" x2="1020" y2="260"/>
    </g>

    <!-- Packets -->
    <circle r="2.5" fill="${theme.primary}" opacity="0.8">
      <animateMotion dur="6s" repeatCount="indefinite" path="M120,90 L300,70 L500,110 L720,80 L920,130 L1120,95"/>
    </circle>
    <circle r="2" fill="${theme.secondary}" opacity="0.6">
      <animateMotion dur="7s" repeatCount="indefinite" path="M1120,95 L920,130 L720,80 L500,110 L300,70 L120,90"/>
    </circle>
    <circle r="2" fill="${theme.primary}" opacity="0.5">
      <animateMotion dur="8s" repeatCount="indefinite" path="M120,90 L200,250 L400,270 L600,290 L820,280 L1020,260"/>
    </circle>

    <!-- Nodes -->
    <circle cx="120" cy="90" r="4" fill="${theme.primary}" opacity="0.7">
      <animate attributeName="opacity" values="0.7;1;0.7" dur="3s" repeatCount="indefinite"/>
    </circle>
    <circle cx="300" cy="70" r="3.5" fill="${theme.secondary}" opacity="0.6"/>
    <circle cx="500" cy="110" r="5" fill="${theme.primary}" opacity="0.8">
      <animate attributeName="opacity" values="0.8;1;0.8" dur="4s" repeatCount="indefinite"/>
    </circle>
    <circle cx="720" cy="80" r="3.5" fill="${theme.secondary}" opacity="0.6"/>
    <circle cx="920" cy="130" r="4" fill="${theme.primary}" opacity="0.7"/>
    <circle cx="1120" cy="95" r="3" fill="${theme.secondary}" opacity="0.5"/>
    <circle cx="200" cy="250" r="2.5" fill="${theme.primary}" opacity="0.4"/>
    <circle cx="400" cy="270" r="2.5" fill="${theme.secondary}" opacity="0.4"/>
    <circle cx="600" cy="290" r="2.5" fill="${theme.primary}" opacity="0.4"/>
    <circle cx="820" cy="280" r="2.5" fill="${theme.secondary}" opacity="0.4"/>
    <circle cx="1020" cy="260" r="2.5" fill="${theme.primary}" opacity="0.4"/>
  </g>

  <!-- Scanline -->
  <rect x="0" y="0" width="${width}" height="1.5" fill="url(#hb-accent)" opacity="0.2">
    <animate attributeName="y" values="0;${height};0" dur="10s" repeatCount="indefinite"/>
  </rect>

  <!-- Cursor -->
  <g transform="translate(60, 365)" opacity="0.5">
    <text font-family="'SF Mono','Cascadia Code','Consolas',monospace" font-size="11" fill="${theme.primary}" opacity="0.3">$&gt;_</text>
    <rect x="68" y="-10" width="7" height="14" fill="${theme.primary}" opacity="0.7">
      <animate attributeName="opacity" values="0.7;0;0.7" dur="1.2s" repeatCount="indefinite"/>
    </rect>
  </g>

  <!-- Status -->
  <g transform="translate(1120, 365)" font-family="'SF Mono','Cascadia Code','Consolas',monospace" font-size="10" fill="${theme.muted}" opacity="0.3">
    <circle cx="-10" cy="-3" r="3" fill="${theme.success}" opacity="0.5">
      <animate attributeName="opacity" values="0.5;0.9;0.5" dur="2s" repeatCount="indefinite"/>
    </circle>
    <text>SECURE</text>
  </g>

  <!-- Name -->
  <text x="${width / 2}" y="${height / 2 - 20}" text-anchor="middle" font-family="'Segoe UI','Inter',Arial,sans-serif" font-size="44" font-weight="700" fill="${theme.highlight}" letter-spacing="6" filter="url(#hb-blur)">
    ${escapeXml(name.toUpperCase())}
  </text>

  <!-- Accent line -->
  <rect x="${width / 2 - 200}" y="${height / 2 + 5}" width="400" height="1.5" rx="1" fill="url(#hb-accent)" opacity="0.5"/>

  <!-- Tagline -->
  <text x="${width / 2}" y="${height / 2 + 40}" text-anchor="middle" font-family="'Segoe UI','Inter',Arial,sans-serif" font-size="15" fill="${theme.muted}" letter-spacing="3.5">
    ${escapeXml(tagline.toUpperCase())}
  </text>

  <line x1="180" y1="${height - 15}" x2="${width - 180}" y2="${height - 15}" stroke="url(#hb-accent)" stroke-width="0.8" opacity="0.12"/>
</svg>`;
}
