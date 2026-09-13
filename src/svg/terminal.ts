import type { ThemeConfig } from '../theme.js';

function esc(str: string): string {
  return str.replace(/&/g, '&amp;').replace(/</g, '&lt;').replace(/>/g, '&gt;').replace(/"/g, '&quot;');
}

export function generateTerminalSection(
  username: string,
  hostname: string,
  identity: string[],
  stack: string[],
  focus: string[],
  theme: ThemeConfig
): string {
  const w = 700;
  const h = 360;
  const pad = 20;
  const lineH = 20;
  const startY = 55;

  const identityLines = identity.map((f, i) => ({
    text: f,
    delay: 0.8 + i * 0.25,
  }));

  const stackText = stack.join('  •  ');
  const focusText = focus.join('  •  ');

  return `<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 ${w} ${h}" width="${w}" height="${h}">
  <defs>
    <linearGradient id="t-bg" x1="0%" y1="0%" x2="100%" y2="100%">
      <stop offset="0%" style="stop-color:${theme.surface};stop-opacity:1"/>
      <stop offset="100%" style="stop-color:${theme.background};stop-opacity:1"/>
    </linearGradient>
    <linearGradient id="t-border" x1="0%" y1="0%" x2="100%" y2="0%">
      <stop offset="0%" style="stop-color:${theme.primary};stop-opacity:0.5"/>
      <stop offset="100%" style="stop-color:${theme.secondary};stop-opacity:0.2"/>
    </linearGradient>
    <linearGradient id="t-accent" x1="0%" y1="0%" x2="100%" y2="0%">
      <stop offset="0%" style="stop-color:${theme.primary}"/>
      <stop offset="100%" style="stop-color:${theme.secondary}"/>
    </linearGradient>
    <filter id="t-glow">
      <feGaussianBlur stdDeviation="2" result="b"/>
      <feMerge><feMergeNode in="b"/><feMergeNode in="SourceGraphic"/></feMerge>
    </filter>
    <clipPath id="t-clip">
      <rect x="0" y="0" width="${w}" height="${h}" rx="12"/>
    </clipPath>
  </defs>

  <g clip-path="url(#t-clip)">
    <rect width="${w}" height="${h}" rx="12" fill="url(#t-bg)"/>
    <rect width="${w}" height="${h}" rx="12" fill="none" stroke="url(#t-border)" stroke-width="1"/>

    <rect x="0" y="0" width="${w}" height="32" fill="${theme.surfaceAlt}" opacity="0.8"/>
    <circle cx="18" cy="16" r="5" fill="#FF5F56"/>
    <circle cx="36" cy="16" r="5" fill="#FFBD2E"/>
    <circle cx="54" cy="16" r="5" fill="#27C93F"/>
    <text x="${w / 2}" y="20" text-anchor="middle" font-family="'SF Mono','Cascadia Code','Consolas',monospace" font-size="11" fill="${theme.muted}">terminal — ${esc(hostname)}</text>

    <rect x="0" y="0" width="${w}" height="2" fill="${theme.primary}" opacity="0.06">
      <animate attributeName="y" values="0;${h};0" dur="6s" repeatCount="indefinite"/>
    </rect>

    <g>
      <text x="${pad}" y="${startY}" font-family="'SF Mono','Cascadia Code','Consolas',monospace" font-size="13" fill="${theme.primary}" opacity="0">
        $ whoami
        <animate attributeName="opacity" values="0;1" dur="0.3s" fill="freeze"/>
      </text>
      <text x="${pad}" y="${startY + lineH}" font-family="'SF Mono','Cascadia Code','Consolas',monospace" font-size="13" fill="${theme.highlight}" opacity="0">
        ${esc(username)}@${esc(hostname)}
        <animate attributeName="opacity" values="0;1" dur="0.3s" begin="0.3s" fill="freeze"/>
      </text>
    </g>

    <g>
      <text x="${pad}" y="${startY + lineH * 3}" font-family="'SF Mono','Cascadia Code','Consolas',monospace" font-size="13" fill="${theme.primary}" opacity="0">
        $ identity
        <animate attributeName="opacity" values="0;1" dur="0.3s" begin="0.6s" fill="freeze"/>
      </text>
      ${identityLines.map((line, i) => `
      <text x="${pad + 12}" y="${startY + lineH * (4 + i)}" font-family="'SF Mono','Cascadia Code','Consolas',monospace" font-size="12" fill="${theme.muted}" opacity="0">
        <tspan fill="${theme.primary}" opacity="0.6">▸</tspan> ${esc(line.text)}
        <animate attributeName="opacity" values="0;1" dur="0.4s" begin="${line.delay}s" fill="freeze"/>
      </text>`).join('\n')}
    </g>

    <g>
      <text x="${pad}" y="${startY + lineH * (6 + identity.length)}" font-family="'SF Mono','Cascadia Code','Consolas',monospace" font-size="13" fill="${theme.primary}" opacity="0">
        $ stack
        <animate attributeName="opacity" values="0;1" dur="0.3s" begin="${1.2 + identity.length * 0.25}s" fill="freeze"/>
      </text>
      <text x="${pad + 12}" y="${startY + lineH * (7 + identity.length)}" font-family="'SF Mono','Cascadia Code','Consolas',monospace" font-size="11" fill="${theme.muted}" opacity="0">
        ${esc(stackText)}
        <animate attributeName="opacity" values="0;1" dur="0.4s" begin="${1.5 + identity.length * 0.25}s" fill="freeze"/>
      </text>
    </g>

    <g>
      <text x="${pad}" y="${startY + lineH * (9 + identity.length)}" font-family="'SF Mono','Cascadia Code','Consolas',monospace" font-size="13" fill="${theme.primary}" opacity="0">
        $ focus
        <animate attributeName="opacity" values="0;1" dur="0.3s" begin="${1.8 + identity.length * 0.25}s" fill="freeze"/>
      </text>
      <text x="${pad + 12}" y="${startY + lineH * (10 + identity.length)}" font-family="'SF Mono','Cascadia Code','Consolas',monospace" font-size="11" fill="${theme.muted}" opacity="0">
        ${esc(focusText)}
        <animate attributeName="opacity" values="0;1" dur="0.4s" begin="${2.1 + identity.length * 0.25}s" fill="freeze"/>
      </text>
    </g>

    <rect x="${pad}" y="${startY + lineH * (11 + identity.length) + 2}" width="0" height="1" rx="0.5" fill="url(#t-accent)">
      <animate attributeName="width" from="0" to="350" dur="0.8s" begin="${2.4 + identity.length * 0.25}s" fill="freeze"/>
    </rect>

    <g>
      <text x="${pad}" y="${startY + lineH * (13 + identity.length)}" font-family="'SF Mono','Cascadia Code','Consolas',monospace" font-size="13" fill="${theme.primary}" opacity="0">
        $ status
        <animate attributeName="opacity" values="0;1" dur="0.3s" begin="${2.8 + identity.length * 0.25}s" fill="freeze"/>
      </text>
      <g opacity="0">
        <circle cx="${pad + 8}" cy="${startY + lineH * (14 + identity.length) - 4}" r="4" fill="${theme.success}" filter="url(#t-glow)"/>
        <animate attributeName="opacity" values="0;1" dur="0.3s" begin="${3.1 + identity.length * 0.25}s" fill="freeze"/>
        <animate attributeName="opacity" values="0.6;1;0.6" dur="2s" repeatCount="indefinite" begin="${3.4 + identity.length * 0.25}s"/>
      </g>
      <text x="${pad + 20}" y="${startY + lineH * (14 + identity.length)}" font-family="'SF Mono','Cascadia Code','Consolas',monospace" font-size="12" fill="${theme.highlight}" opacity="0">
        ● ONLINE
        <animate attributeName="opacity" values="0;1" dur="0.3s" begin="${3.1 + identity.length * 0.25}s" fill="freeze"/>
      </text>
    </g>

    <rect x="${pad}" y="${startY + lineH * (16 + identity.length)}" width="7" height="14" fill="${theme.primary}" opacity="0">
      <animate attributeName="opacity" values="0;0.7;0" dur="1.2s" repeatCount="indefinite" begin="${3.5 + identity.length * 0.25}s"/>
    </rect>
  </g>
</svg>`;
}
