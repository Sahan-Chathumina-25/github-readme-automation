import type { ThemeConfig } from '../theme.js';

function escapeXml(str: string): string {
  return str.replace(/&/g, '&amp;').replace(/</g, '&lt;').replace(/>/g, '&gt;').replace(/"/g, '&quot;');
}

export function generateTerminalSection(
  username: string,
  hostname: string,
  focus: string[],
  status: string[],
  theme: ThemeConfig
): string {
  const width = 700;
  const height = 300;
  const padding = 20;
  const lineH = 20;
  const startY = 50;

  const focusLines = focus.map((f, i) => ({
    text: f,
    delay: 0.8 + i * 0.3,
  }));

  const statusText = status.join('  •  ');

  return `<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 ${width} ${height}" width="${width}" height="${height}">
  <defs>
    <linearGradient id="term-bg" x1="0%" y1="0%" x2="100%" y2="100%">
      <stop offset="0%" style="stop-color:${theme.surface};stop-opacity:1"/>
      <stop offset="100%" style="stop-color:${theme.background};stop-opacity:1"/>
    </linearGradient>
    <linearGradient id="term-border" x1="0%" y1="0%" x2="100%" y2="0%">
      <stop offset="0%" style="stop-color:${theme.primary};stop-opacity:0.5"/>
      <stop offset="100%" style="stop-color:${theme.secondary};stop-opacity:0.2"/>
    </linearGradient>
    <linearGradient id="term-accent" x1="0%" y1="0%" x2="100%" y2="0%">
      <stop offset="0%" style="stop-color:${theme.primary}"/>
      <stop offset="100%" style="stop-color:${theme.secondary}"/>
    </linearGradient>
    <filter id="term-glow">
      <feGaussianBlur stdDeviation="2" result="b"/>
      <feMerge><feMergeNode in="b"/><feMergeNode in="SourceGraphic"/></feMerge>
    </filter>
    <clipPath id="term-clip">
      <rect x="0" y="0" width="${width}" height="${height}" rx="12"/>
    </clipPath>
  </defs>

  <g clip-path="url(#term-clip)">
    <rect width="${width}" height="${height}" rx="12" fill="url(#term-bg)"/>
    <rect width="${width}" height="${height}" rx="12" fill="none" stroke="url(#term-border)" stroke-width="1"/>

    <!-- Title bar -->
    <rect x="0" y="0" width="${width}" height="32" fill="${theme.surfaceAlt}" opacity="0.8"/>
    <circle cx="18" cy="16" r="5" fill="#FF5F56"/>
    <circle cx="36" cy="16" r="5" fill="#FFBD2E"/>
    <circle cx="54" cy="16" r="5" fill="#27C93F"/>
    <text x="${width / 2}" y="20" text-anchor="middle" font-family="'SF Mono','Cascadia Code','Consolas',monospace" font-size="11" fill="${theme.muted}">terminal — ${hostname}</text>

    <!-- Scanline effect -->
    <rect x="0" y="0" width="${width}" height="2" fill="${theme.primary}" opacity="0.08">
      <animate attributeName="y" values="0;${height};0" dur="4s" repeatCount="indefinite"/>
    </rect>

    <!-- whoami command -->
    <g>
      <text x="${padding}" y="${startY}" font-family="'SF Mono','Cascadia Code','Consolas',monospace" font-size="13" fill="${theme.primary}" opacity="0">
        $ whoami
        <animate attributeName="opacity" values="0;1" dur="0.3s" fill="freeze"/>
      </text>
      <text x="${padding}" y="${startY + lineH}" font-family="'SF Mono','Cascadia Code','Consolas',monospace" font-size="13" fill="${theme.highlight}" opacity="0">
        ${escapeXml(username)}@${escapeXml(hostname)}
        <animate attributeName="opacity" values="0;1" dur="0.3s" begin="0.3s" fill="freeze"/>
      </text>
    </g>

    <!-- focus command -->
    <g>
      <text x="${padding}" y="${startY + lineH * 3}" font-family="'SF Mono','Cascadia Code','Consolas',monospace" font-size="13" fill="${theme.primary}" opacity="0">
        $ focus
        <animate attributeName="opacity" values="0;1" dur="0.3s" begin="0.6s" fill="freeze"/>
      </text>

      ${focusLines.map((line, i) => `
      <text x="${padding + 12}" y="${startY + lineH * (4 + i)}" font-family="'SF Mono','Cascadia Code','Consolas',monospace" font-size="12" fill="${theme.muted}" opacity="0">
        <tspan fill="${theme.primary}" opacity="0.6">▸</tspan> ${escapeXml(line.text)}
        <animate attributeName="opacity" values="0;1" dur="0.4s" begin="${line.delay}s" fill="freeze"/>
      </text>`).join('\n')}

      <!-- Colored reveal line under focus -->
      <rect x="${padding}" y="${startY + lineH * (4 + focus.length) + 4}" width="0" height="1" rx="0.5" fill="url(#term-accent)">
        <animate attributeName="width" from="0" to="400" dur="0.8s" begin="${0.8 + focus.length * 0.3}s" fill="freeze"/>
      </rect>
    </g>

    <!-- status command -->
    <g>
      <text x="${padding}" y="${startY + lineH * (6 + focus.length)}" font-family="'SF Mono','Cascadia Code','Consolas',monospace" font-size="13" fill="${theme.primary}" opacity="0">
        $ status
        <animate attributeName="opacity" values="0;1" dur="0.3s" begin="${1.5 + focus.length * 0.3}s" fill="freeze"/>
      </text>

      <g opacity="0">
        <circle cx="${padding + 8}" cy="${startY + lineH * (7 + focus.length) - 4}" r="4" fill="${theme.success}" filter="url(#term-glow)"/>
        <animate attributeName="opacity" values="0;1" dur="0.3s" begin="${1.8 + focus.length * 0.3}s" fill="freeze"/>
        <animate attributeName="opacity" values="0.6;1;0.6" dur="2s" repeatCount="indefinite" begin="${2.1 + focus.length * 0.3}s"/>
      </g>

      <text x="${padding + 20}" y="${startY + lineH * (7 + focus.length)}" font-family="'SF Mono','Cascadia Code','Consolas',monospace" font-size="12" fill="${theme.highlight}" opacity="0">
        ${escapeXml(statusText)}
        <animate attributeName="opacity" values="0;1" dur="0.3s" begin="${1.8 + focus.length * 0.3}s" fill="freeze"/>
      </text>
    </g>

    <!-- Blinking cursor -->
    <rect x="${padding}" y="${startY + lineH * (9 + focus.length)}" width="7" height="14" fill="${theme.primary}" opacity="0">
      <animate attributeName="opacity" values="0;0.7;0" dur="1.2s" repeatCount="indefinite" begin="${2.2 + focus.length * 0.3}s"/>
    </rect>
  </g>
</svg>`;
}
