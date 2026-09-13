import type { ThemeConfig } from '../theme.js';

export function generateNetworkTopology(theme: ThemeConfig, width = 700): string {
  const height = 320;

  return `<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 ${width} ${height}" width="${width}" height="${height}">
  <defs>
    <linearGradient id="nt-accent" x1="0%" y1="0%" x2="100%" y2="0%">
      <stop offset="0%" style="stop-color:${theme.primary};stop-opacity:0.8"/>
      <stop offset="100%" style="stop-color:${theme.secondary};stop-opacity:0.8"/>
    </linearGradient>
    <filter id="nt-glow">
      <feGaussianBlur stdDeviation="2" result="b"/>
      <feMerge><feMergeNode in="b"/><feMergeNode in="SourceGraphic"/></feMerge>
    </filter>
  </defs>

  <!-- Connections -->
  <g stroke="${theme.primary}" stroke-width="1" opacity="0.2">
    <line x1="350" y1="40" x2="350" y2="100"/>
    <line x1="350" y1="100" x2="175" y2="170"/>
    <line x1="350" y1="100" x2="525" y2="170"/>
    <line x1="175" y1="170" x2="100" y2="260"/>
    <line x1="175" y1="170" x2="250" y2="260"/>
    <line x1="525" y1="170" x2="450" y2="260"/>
    <line x1="525" y1="170" x2="600" y2="260"/>
  </g>

  <!-- Animated packets -->
  <circle r="2" fill="${theme.primary}" opacity="0.7" filter="url(#nt-glow)">
    <animateMotion dur="3s" repeatCount="indefinite" path="M350,40 L350,100 L175,170 L100,260"/>
  </circle>
  <circle r="2" fill="${theme.secondary}" opacity="0.6" filter="url(#nt-glow)">
    <animateMotion dur="3.5s" repeatCount="indefinite" path="M350,40 L350,100 L525,170 L600,260"/>
  </circle>

  <!-- Nodes -->
  <g filter="url(#nt-glow)">
    <circle cx="350" cy="40" r="18" fill="${theme.surface}" stroke="${theme.primary}" stroke-width="1.5"/>
    <text x="350" y="44" text-anchor="middle" font-family="'SF Mono','Consolas',monospace" font-size="9" fill="${theme.primary}">INTERNET</text>

    <circle cx="350" cy="100" r="16" fill="${theme.surface}" stroke="${theme.warning}" stroke-width="1.5"/>
    <text x="350" y="104" text-anchor="middle" font-family="'SF Mono','Consolas',monospace" font-size="8" fill="${theme.warning}">FIREWALL</text>

    <circle cx="175" cy="170" r="16" fill="${theme.surface}" stroke="${theme.secondary}" stroke-width="1.5"/>
    <text x="175" y="174" text-anchor="middle" font-family="'SF Mono','Consolas',monospace" font-size="8" fill="${theme.secondary}">WEB SRV</text>

    <circle cx="525" cy="170" r="16" fill="${theme.surface}" stroke="${theme.secondary}" stroke-width="1.5"/>
    <text x="525" y="174" text-anchor="middle" font-family="'SF Mono','Consolas',monospace" font-size="8" fill="${theme.secondary}">DNS</text>

    <circle cx="100" cy="260" r="14" fill="${theme.surface}" stroke="${theme.muted}" stroke-width="1"/>
    <text x="100" y="264" text-anchor="middle" font-family="'SF Mono','Consolas',monospace" font-size="7" fill="${theme.muted}">SSH</text>

    <circle cx="250" cy="260" r="14" fill="${theme.surface}" stroke="${theme.muted}" stroke-width="1"/>
    <text x="250" y="264" text-anchor="middle" font-family="'SF Mono','Consolas',monospace" font-size="7" fill="${theme.muted}">APACHE</text>

    <circle cx="450" cy="260" r="14" fill="${theme.surface}" stroke="${theme.muted}" stroke-width="1"/>
    <text x="450" y="264" text-anchor="middle" font-family="'SF Mono','Consolas',monospace" font-size="7" fill="${theme.muted}">DHCP</text>

    <circle cx="600" cy="260" r="14" fill="${theme.surface}" stroke="${theme.muted}" stroke-width="1"/>
    <text x="600" y="264" text-anchor="middle" font-family="'SF Mono','Consolas',monospace" font-size="7" fill="${theme.muted}">DB</text>
  </g>
</svg>`;
}

export function generateFooterAnimation(theme: ThemeConfig, width = 600): string {
  const height = 80;

  return `<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 ${width} ${height}" width="${width}" height="${height}">
  <defs>
    <linearGradient id="fa-accent" x1="0%" y1="0%" x2="100%" y2="0%">
      <stop offset="0%" style="stop-color:${theme.primary};stop-opacity:0.6"/>
      <stop offset="50%" style="stop-color:${theme.secondary};stop-opacity:0.6"/>
      <stop offset="100%" style="stop-color:${theme.primary};stop-opacity:0.6"/>
    </linearGradient>
  </defs>

  <line x1="50" y1="40" x2="${width - 50}" y2="40" stroke="${theme.border}" stroke-width="0.5" opacity="0.3"/>
  <line x1="50" y1="40" x2="50" y2="40" stroke="url(#fa-accent)" stroke-width="1.5">
    <animate attributeName="x2" values="50;${width - 50};50" dur="4s" repeatCount="indefinite"/>
  </line>

  <circle cx="${width / 2}" cy="40" r="3" fill="${theme.primary}" opacity="0.6">
    <animate attributeName="opacity" values="0.4;0.9;0.4" dur="2s" repeatCount="indefinite"/>
  </circle>
</svg>`;
}

export function generateSectionDivider(theme: ThemeConfig, width = 800): string {
  return `<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 ${width} 20" width="${width}" height="20">
  <defs>
    <linearGradient id="sd-g" x1="0%" y1="0%" x2="100%" y2="0%">
      <stop offset="0%" style="stop-color:${theme.primary};stop-opacity:0"/>
      <stop offset="45%" style="stop-color:${theme.primary};stop-opacity:0.4"/>
      <stop offset="50%" style="stop-color:${theme.secondary};stop-opacity:0.6"/>
      <stop offset="55%" style="stop-color:${theme.primary};stop-opacity:0.4"/>
      <stop offset="100%" style="stop-color:${theme.primary};stop-opacity:0"/>
    </linearGradient>
  </defs>
  <line x1="0" y1="10" x2="${width}" y2="10" stroke="url(#sd-g)" stroke-width="1"/>
  <circle cx="${width / 2}" cy="10" r="2.5" fill="${theme.primary}" opacity="0.5"/>
</svg>`;
}
