import type { ThemeConfig } from '../theme.js';

function escapeXml(str: string): string {
  return str.replace(/&/g, '&amp;').replace(/</g, '&lt;').replace(/>/g, '&gt;').replace(/"/g, '&quot;');
}

export interface LanguageStat {
  name: string;
  percentage: number;
}

export function generateLanguageBars(
  languages: LanguageStat[],
  theme: ThemeConfig,
  width = 500,
  barHeight = 22
): string {
  const rowHeight = barHeight + 14;
  const totalHeight = languages.length * rowHeight + 10;
  const maxBarWidth = width - 180;

  const bars = languages.map((lang, i) => {
    const y = i * rowHeight + 5;
    const barW = (lang.percentage / 100) * maxBarWidth;
    const id = `lb-${lang.name.replace(/[^a-zA-Z0-9]/g, '')}`;

    return `
  <text x="0" y="${y + barHeight / 2 + 4}" font-family="'SF Mono','Cascadia Code','Consolas',monospace" font-size="12" fill="${theme.muted}">${escapeXml(lang.name)}</text>
  <rect x="130" y="${y}" width="${maxBarWidth}" height="${barHeight}" rx="4" fill="${theme.surfaceAlt}" opacity="0.6"/>
  <rect x="130" y="${y}" width="0" height="${barHeight}" rx="4" fill="url(#lbg-${id})">
    <animate attributeName="width" from="0" to="${barW}" dur="1.2s" fill="freeze" calcMode="spline" keySplines="0.4 0 0.2 1" begin="0.${i}s"/>
  </rect>
  <text x="${130 + maxBarWidth + 10}" y="${y + barHeight / 2 + 4}" font-family="'SF Mono','Cascadia Code','Consolas',monospace" font-size="11" fill="${theme.primary}" opacity="0.8">${lang.percentage}%</text>
  <defs>
    <linearGradient id="lbg-${id}" x1="0%" y1="0%" x2="100%" y2="0%">
      <stop offset="0%" style="stop-color:${theme.primary};stop-opacity:0.9"/>
      <stop offset="100%" style="stop-color:${theme.secondary};stop-opacity:0.9"/>
    </linearGradient>
  </defs>`;
  }).join('');

  return `<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 ${width} ${totalHeight}" width="${width}" height="${totalHeight}">
  ${bars}
</svg>`;
}
