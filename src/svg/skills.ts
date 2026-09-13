import type { ThemeConfig } from '../theme.js';

function escapeXml(str: string): string {
  return str.replace(/&/g, '&amp;').replace(/</g, '&lt;').replace(/>/g, '&gt;').replace(/"/g, '&quot;');
}

export interface SkillCircle {
  label: string;
  percentage: number;
}

export function generateSkillCircle(
  skill: SkillCircle,
  theme: ThemeConfig,
  size = 140
): string {
  const cx = size / 2;
  const cy = size / 2;
  const radius = size / 2 - 12;
  const circumference = 2 * Math.PI * radius;
  const offset = circumference - (skill.percentage / 100) * circumference;
  const strokeColor = skill.percentage >= 75 ? theme.primary : skill.percentage >= 50 ? theme.secondary : theme.muted;

  return `<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 ${size} ${size + 30}" width="${size}" height="${size + 30}">
  <defs>
    <linearGradient id="sc-${skill.label.replace(/\s/g, '')}" x1="0%" y1="0%" x2="100%" y2="100%">
      <stop offset="0%" style="stop-color:${theme.primary};stop-opacity:1"/>
      <stop offset="100%" style="stop-color:${theme.secondary};stop-opacity:1"/>
    </linearGradient>
    <filter id="sc-glow-${skill.label.replace(/\s/g, '')}">
      <feGaussianBlur stdDeviation="3" result="b"/>
      <feMerge><feMergeNode in="b"/><feMergeNode in="SourceGraphic"/></feMerge>
    </filter>
  </defs>

  <circle cx="${cx}" cy="${cy}" r="${radius}" fill="none" stroke="${theme.border}" stroke-width="6" opacity="0.5"/>

  <circle cx="${cx}" cy="${cy}" r="${radius}" fill="none" stroke="url(#sc-${skill.label.replace(/\s/g, '')})" stroke-width="6" stroke-linecap="round" stroke-dasharray="${circumference}" stroke-dashoffset="${offset}" transform="rotate(-90 ${cx} ${cy})" filter="url(#sc-glow-${skill.label.replace(/\s/g, '')})">
    <animate attributeName="stroke-dashoffset" from="${circumference}" to="${offset}" dur="1.5s" fill="freeze" calcMode="spline" keySplines="0.4 0 0.2 1"/>
  </circle>

  <text x="${cx}" y="${cy + 2}" text-anchor="middle" font-family="'Segoe UI','Inter',Arial,sans-serif" font-size="22" font-weight="700" fill="${theme.highlight}">${skill.percentage}%</text>

  <text x="${cx}" y="${size + 20}" text-anchor="middle" font-family="'Segoe UI','Inter',Arial,sans-serif" font-size="12" fill="${theme.muted}" letter-spacing="0.5">${escapeXml(skill.label)}</text>
</svg>`;
}

export function generateSkillCircleRow(
  skills: SkillCircle[],
  theme: ThemeConfig,
  circleSize = 140,
  gap = 20
): string {
  const totalWidth = skills.length * circleSize + (skills.length - 1) * gap;
  const totalHeight = circleSize + 30;

  const circles = skills.map((skill, i) => {
    const x = i * (circleSize + gap);
    const svg = generateSkillCircle(skill, theme, circleSize);
    const inner = svg.replace(/<svg[^>]*>/, '').replace(/<\/svg>/, '');
    return `<g transform="translate(${x}, 0)">${inner}</g>`;
  }).join('\n  ');

  return `<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 ${totalWidth} ${totalHeight}" width="${totalWidth}" height="${totalHeight}">
  ${circles}
</svg>`;
}
