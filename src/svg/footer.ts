import type { ThemeConfig } from '../theme.js';

export function generateCinematicFooter(theme: ThemeConfig): string {
  const w = 600;
  const h = 160;

  return `<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 ${w} ${h}" width="${w}" height="${h}">
  <defs>
    <linearGradient id="cf-accent" x1="0%" y1="0%" x2="100%" y2="0%">
      <stop offset="0%" style="stop-color:${theme.primary};stop-opacity:0.8"/>
      <stop offset="50%" style="stop-color:${theme.secondary};stop-opacity:0.8"/>
      <stop offset="100%" style="stop-color:${theme.primary};stop-opacity:0.8"/>
    </linearGradient>
    <filter id="cf-glow">
      <feGaussianBlur stdDeviation="2" result="b"/>
      <feMerge><feMergeNode in="b"/><feMergeNode in="SourceGraphic"/></feMerge>
    </filter>
    <filter id="cf-soft">
      <feGaussianBlur stdDeviation="30"/>
    </filter>
  </defs>

  <rect width="${w}" height="${h}" fill="${theme.background}"/>
  <ellipse cx="${w / 2}" cy="${h / 2}" rx="200" ry="60" fill="${theme.primary}" opacity="0.02" filter="url(#cf-soft)"/>

  <line x1="50" y1="20" x2="${w - 50}" y2="20" stroke="${theme.border}" stroke-width="0.5" opacity="0.3"/>

  <line x1="50" y1="20" x2="50" y2="20" stroke="url(#cf-accent)" stroke-width="1.5" filter="url(#cf-glow)">
    <animate attributeName="x2" values="50;${w - 50}" dur="1.5s" fill="freeze"/>
  </line>

  <circle cx="${w / 2}" cy="20" r="0" fill="${theme.primary}" filter="url(#cf-glow)">
    <animate attributeName="r" values="0;4;2" dur="1.5s" fill="freeze"/>
    <animate attributeName="opacity" values="0;0.8;0.6" dur="1.5s" fill="freeze"/>
  </circle>

  <text x="${w / 2}" y="50" text-anchor="middle" font-family="'SF Mono','Consolas',monospace" font-size="10" fill="${theme.muted}" letter-spacing="2" opacity="0">
    SYSTEM STATUS
    <animate attributeName="opacity" values="0;0.5" dur="0.5s" begin="0.8s" fill="freeze"/>
  </text>

  <text x="${w / 2}" y="72" text-anchor="middle" font-family="'SF Mono','Consolas',monospace" font-size="14" fill="${theme.primary}" letter-spacing="1" opacity="0">
    ● ONLINE
    <animate attributeName="opacity" values="0;1" dur="0.3s" begin="1s" fill="freeze"/>
  </text>

  <circle cx="${w / 2 - 50}" cy="68" r="3" fill="${theme.success}" opacity="0">
    <animate attributeName="opacity" values="0;0.7" dur="0.3s" begin="1s" fill="freeze"/>
    <animate attributeName="opacity" values="0.5;1;0.5" dur="2s" repeatCount="indefinite" begin="1.3s"/>
  </circle>

  <text x="${w / 2}" y="100" text-anchor="middle" font-family="'Segoe UI','Inter',Arial,sans-serif" font-size="14" font-weight="600" fill="${theme.highlight}" letter-spacing="5" opacity="0">
    BUILD  •  LEARN  •  SECURE
    <animate attributeName="opacity" values="0;1" dur="0.5s" begin="1.3s" fill="freeze"/>
  </text>

  <text x="${w / 2}" y="122" text-anchor="middle" font-family="'SF Mono','Consolas',monospace" font-size="8" fill="${theme.muted}" letter-spacing="2" opacity="0">
    CYBERSECURITY  •  NETWORK ENGINEERING  •  LINUX  •  FULL STACK DEVELOPMENT
    <animate attributeName="opacity" values="0;0.4" dur="0.5s" begin="1.6s" fill="freeze"/>
  </text>

  <circle cx="${w / 2 - 30}" cy="140" r="1.5" fill="${theme.primary}" opacity="0">
    <animate attributeName="opacity" values="0;0.4" dur="0.3s" begin="1.8s" fill="freeze"/>
  </circle>
  <circle cx="${w / 2}" cy="140" r="1.5" fill="${theme.secondary}" opacity="0">
    <animate attributeName="opacity" values="0;0.4" dur="0.3s" begin="1.9s" fill="freeze"/>
  </circle>
  <circle cx="${w / 2 + 30}" cy="140" r="1.5" fill="${theme.primary}" opacity="0">
    <animate attributeName="opacity" values="0;0.4" dur="0.3s" begin="2s" fill="freeze"/>
  </circle>

  <line x1="${w / 2}" y1="152" x2="${w / 2}" y2="152" stroke="url(#cf-accent)" stroke-width="0.8" opacity="0.3">
    <animate attributeName="x1" values="${w / 2};50" dur="1s" begin="2.1s" fill="freeze"/>
    <animate attributeName="x2" values="${w / 2};${w - 50}" dur="1s" begin="2.1s" fill="freeze"/>
  </line>
</svg>`;
}
