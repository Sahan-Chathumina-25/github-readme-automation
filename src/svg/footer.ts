import type { ProfileConfig } from '../types';

export function generateFooter(config: ProfileConfig): string {
  const W = 600;
  const H = 120;
  const t = config.theme;
  const name = config.profile.name;

  let svg = `<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 ${W} ${H}" width="${W}" height="${H}">`;
  svg += `<defs>`;
  svg += `<style>
    @keyframes beamMove { 0%{x1:-100;x2:100} 100%{x1:700;x2:900} }
    .footer-tagline { font-family:'Segoe UI',system-ui,sans-serif; font-size:12px; font-weight:600; letter-spacing:3px; fill:${t.highlight}; }
    .footer-sub { font-family:'Segoe UI',system-ui,sans-serif; font-size:9px; fill:${t.muted}; letter-spacing:1px; }
    .footer-name { font-family:'Segoe UI',system-ui,sans-serif; font-size:10px; fill:${t.muted}; }
  </style>`;

  // Light beam gradient
  svg += `<linearGradient id="beam-g" x1="0%" y1="0%" x2="100%" y2="0%">
    <stop offset="0%" stop-color="${t.primary}" stop-opacity="0"/>
    <stop offset="40%" stop-color="${t.primary}" stop-opacity="0.08"/>
    <stop offset="50%" stop-color="${t.primary}" stop-opacity="0.15"/>
    <stop offset="60%" stop-color="${t.primary}" stop-opacity="0.08"/>
    <stop offset="100%" stop-color="${t.primary}" stop-opacity="0"/>
  </linearGradient>`;
  svg += `</defs>`;

  // Background
  svg += `<rect width="${W}" height="${H}" fill="${t.background}" rx="8"/>`;

  // Top line
  svg += `<line x1="40" y1="16" x2="${W - 40}" y2="16" stroke="${t.border}" stroke-width="0.5"/>`;

  // Moving light beam
  svg += `<line x1="-100" y1="16" x2="100" y2="16" stroke="url(#beam-g)" stroke-width="2">
    <animate attributeName="x1" from="-100" to="700" dur="4s" repeatCount="indefinite"/>
    <animate attributeName="x2" from="100" to="900" dur="4s" repeatCount="indefinite"/>
  </line>`;

  // Tagline
  svg += `<text x="${W / 2}" y="48" text-anchor="middle" class="footer-tagline">BUILD · LEARN · SECURE</text>`;

  // Categories
  svg += `<text x="${W / 2}" y="66" text-anchor="middle" class="footer-sub">Cybersecurity  |  Networking  |  Linux  |  Full Stack  |  WordPress</text>`;

  // Name
  svg += `<text x="${W / 2}" y="86" text-anchor="middle" class="footer-name">${name}</text>`;

  // Bottom line
  svg += `<line x1="40" y1="${H - 16}" x2="${W - 40}" y2="${H - 16}" stroke="${t.border}" stroke-width="0.5"/>`;

  // Status dot
  svg += `<circle cx="${W / 2}" cy="${H - 16}" r="3" fill="${t.success}" opacity="0.7">
    <animate attributeName="opacity" values="0.5;0.9;0.5" dur="2s" repeatCount="indefinite"/>
  </circle>`;

  svg += `</svg>`;
  return svg;
}
