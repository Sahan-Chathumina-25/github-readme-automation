import type { ThemeConfig } from '../theme.js';

function esc(str: string): string {
  return str.replace(/&/g, '&amp;').replace(/</g, '&lt;').replace(/>/g, '&gt;').replace(/"/g, '&quot;');
}

export interface SkillCircle {
  label: string;
  percentage: number;
}

export function generateSkillCircle(
  skill: SkillCircle,
  theme: ThemeConfig,
  size = 150
): string {
  const cx = size / 2;
  const cy = size / 2;
  const radius = size / 2 - 16;
  const circumference = 2 * Math.PI * radius;
  const offset = circumference - (skill.percentage / 100) * circumference;
  const id = skill.label.replace(/\s/g, '');

  return `<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 ${size} ${size + 30}" width="${size}" height="${size + 30}">
  <defs>
    <linearGradient id="sc-grad-${id}" x1="0%" y1="0%" x2="100%" y2="100%">
      <stop offset="0%" style="stop-color:${theme.primary};stop-opacity:1"/>
      <stop offset="100%" style="stop-color:${theme.secondary};stop-opacity:1"/>
    </linearGradient>
    <filter id="sc-glow-${id}">
      <feGaussianBlur stdDeviation="3" result="b"/>
      <feMerge><feMergeNode in="b"/><feMergeNode in="SourceGraphic"/></feMerge>
    </filter>
    <radialGradient id="sc-glass-${id}" cx="40%" cy="35%" r="55%">
      <stop offset="0%" style="stop-color:${theme.highlight};stop-opacity:0.06"/>
      <stop offset="100%" style="stop-color:${theme.highlight};stop-opacity:0"/>
    </radialGradient>
  </defs>

  <circle cx="${cx}" cy="${cy}" r="${radius + 8}" fill="none" stroke="${theme.border}" stroke-width="0.5" opacity="0.2"/>

  <circle cx="${cx}" cy="${cy}" r="${radius}" fill="none" stroke="${theme.border}" stroke-width="5" opacity="0.3"/>

  <circle cx="${cx}" cy="${cy}" r="${radius}" fill="none" stroke="url(#sc-grad-${id})" stroke-width="5" stroke-linecap="round" stroke-dasharray="${circumference}" stroke-dashoffset="${offset}" transform="rotate(-90 ${cx} ${cy})" filter="url(#sc-glow-${id})">
    <animate attributeName="stroke-dashoffset" from="${circumference}" to="${offset}" dur="1.8s" fill="freeze" calcMode="spline" keySplines="0.4 0 0.2 1"/>
  </circle>

  <circle cx="${cx}" cy="${cy}" r="${radius - 10}" fill="url(#sc-glass-${id})" opacity="0.5"/>

  <circle cx="${cx}" cy="${cy - radius}" r="3" fill="${theme.primary}" opacity="0">
    <animate attributeName="opacity" values="0;0.8;0" dur="2s" repeatCount="indefinite" begin="1.8s"/>
    <animateMotion dur="6s" repeatCount="indefinite" begin="1.8s" path="M0,0 A${radius},${radius} 0 1,1 -0.1,0"/>
  </circle>

  <text x="${cx}" y="${cy + 4}" text-anchor="middle" font-family="'Segoe UI','Inter',Arial,sans-serif" font-size="24" font-weight="700" fill="${theme.highlight}">${skill.percentage}%</text>

  <text x="${cx}" y="${size + 18}" text-anchor="middle" font-family="'Segoe UI','Inter',Arial,sans-serif" font-size="11" fill="${theme.muted}" letter-spacing="0.5">${esc(skill.label)}</text>
</svg>`;
}

export function generateSkillCircleRow(
  skills: SkillCircle[],
  theme: ThemeConfig,
  circleSize = 150,
  gap = 24
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
