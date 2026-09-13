import type { ThemeConfig } from '../theme.js';

export function generateAnimatedFooter(theme: ThemeConfig): string {
  const width = 600;
  const height = 120;

  return `<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 ${width} ${height}" width="${width}" height="${height}">
  <defs>
    <linearGradient id="ft-accent" x1="0%" y1="0%" x2="100%" y2="0%">
      <stop offset="0%" style="stop-color:${theme.primary};stop-opacity:0.8"/>
      <stop offset="50%" style="stop-color:${theme.secondary};stop-opacity:0.8"/>
      <stop offset="100%" style="stop-color:${theme.primary};stop-opacity:0.8"/>
    </linearGradient>
    <filter id="ft-glow">
      <feGaussianBlur stdDeviation="2" result="b"/>
      <feMerge><feMergeNode in="b"/><feMergeNode in="SourceGraphic"/></feMerge>
    </filter>
  </defs>

  <!-- Top divider line -->
  <line x1="50" y1="15" x2="${width - 50}" y2="15" stroke="${theme.border}" stroke-width="0.5" opacity="0.3"/>

  <!-- Animated accent line -->
  <line x1="50" y1="15" x2="50" y2="15" stroke="url(#ft-accent)" stroke-width="1.5" filter="url(#ft-glow)">
    <animate attributeName="x2" values="50;${width - 50}" dur="1.5s" fill="freeze"/>
  </line>

  <!-- Center pulse dot -->
  <circle cx="${width / 2}" cy="15" r="0" fill="${theme.primary}" filter="url(#ft-glow)">
    <animate attributeName="r" values="0;4;2" dur="1.5s" fill="freeze"/>
    <animate attributeName="opacity" values="0;0.8;0.6" dur="1.5s" fill="freeze"/>
  </circle>

  <!-- Status text -->
  <text x="${width / 2}" y="45" text-anchor="middle" font-family="'SF Mono','Consolas',monospace" font-size="10" fill="${theme.muted}" letter-spacing="2" opacity="0">
    SYSTEM STATUS
    <animate attributeName="opacity" values="0;0.5" dur="0.5s" begin="0.8s" fill="freeze"/>
  </text>

  <text x="${width / 2}" y="62" text-anchor="middle" font-family="'SF Mono','Consolas',monospace" font-size="13" fill="${theme.primary}" letter-spacing="1" opacity="0">
    ● ONLINE
    <animate attributeName="opacity" values="0;1" dur="0.3s" begin="1s" fill="freeze"/>
  </text>

  <circle cx="${width / 2 - 48}" cy="58" r="3" fill="${theme.success}" opacity="0">
    <animate attributeName="opacity" values="0;0.7" dur="0.3s" begin="1s" fill="freeze"/>
    <animate attributeName="opacity" values="0.5;1;0.5" dur="2s" repeatCount="indefinite" begin="1.3s"/>
  </circle>

  <!-- Tagline -->
  <text x="${width / 2}" y="88" text-anchor="middle" font-family="'Segoe UI','Inter',Arial,sans-serif" font-size="14" font-weight="600" fill="${theme.highlight}" letter-spacing="4" opacity="0">
    BUILD  •  LEARN  •  SECURE
    <animate attributeName="opacity" values="0;1" dur="0.5s" begin="1.3s" fill="freeze"/>
  </text>

  <!-- Bottom decorative dots -->
  <circle cx="${width / 2 - 30}" cy="105" r="1.5" fill="${theme.primary}" opacity="0">
    <animate attributeName="opacity" values="0;0.4" dur="0.3s" begin="1.5s" fill="freeze"/>
  </circle>
  <circle cx="${width / 2}" cy="105" r="1.5" fill="${theme.secondary}" opacity="0">
    <animate attributeName="opacity" values="0;0.4" dur="0.3s" begin="1.6s" fill="freeze"/>
  </circle>
  <circle cx="${width / 2 + 30}" cy="105" r="1.5" fill="${theme.primary}" opacity="0">
    <animate attributeName="opacity" values="0;0.4" dur="0.3s" begin="1.7s" fill="freeze"/>
  </circle>

  <!-- Bottom line reveal -->
  <line x1="${width / 2}" y1="115" x2="${width / 2}" y2="115" stroke="url(#ft-accent)" stroke-width="0.8" opacity="0.3">
    <animate attributeName="x1" values="${width / 2};50" dur="1s" begin="1.8s" fill="freeze"/>
    <animate attributeName="x2" values="${width / 2};${width - 50}" dur="1s" begin="1.8s" fill="freeze"/>
  </line>
</svg>`;
}
