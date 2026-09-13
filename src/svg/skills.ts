import type { ProfileConfig } from '../types';

interface SkillCategory {
  name: string;
  skills: { name: string; level: string }[];
  color: string;
  icon: string;
}

export function generateSkillCircles(config: ProfileConfig): string {
  const W = 680;
  const H = 320;
  const t = config.theme;
  const sp = config.skillPercentages;

  const categories: SkillCategory[] = [
    { name: 'Cybersecurity', skills: config.skills.cybersecurity, color: t.primary, icon: '🛡' },
    { name: 'Networking', skills: config.skills.networking, color: t.secondary, icon: '🌐' },
    { name: 'Linux & Systems', skills: config.skills.linux, color: t.success, icon: '⚙' },
    { name: 'Full Stack', skills: config.skills.programming, color: '#FFB800', icon: '⚡' },
  ];

  const cardW = 148;
  const cardH = 230;
  const gap = 16;
  const totalW = categories.length * cardW + (categories.length - 1) * gap;
  const startX = (W - totalW) / 2;
  const startY = 50;

  let svg = `<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 ${W} ${H}" width="${W}" height="${H}">`;
  svg += `<defs>`;
  svg += `<style>
    .cat-name { font-family:'Segoe UI',system-ui,sans-serif; font-size:11px; font-weight:600; fill:${t.highlight}; }
    .pct-text { font-family:'Segoe UI',system-ui,sans-serif; font-size:16px; font-weight:700; fill:${t.highlight}; }
    .skill-name { font-family:'Segoe UI',system-ui,sans-serif; font-size:8px; fill:${t.muted}; }
    .skill-level { font-family:'Segoe UI',system-ui,sans-serif; font-size:7px; }
  </style>`;
  svg += `</defs>`;

  // Background
  svg += `<rect width="${W}" height="${H}" fill="${t.background}" rx="8"/>`;

  // Title
  svg += `<text x="${W / 2}" y="28" text-anchor="middle" font-family="'Segoe UI',system-ui,sans-serif" font-size="12" font-weight="600" fill="${t.muted}" letter-spacing="2">SKILL OVERVIEW</text>`;

  categories.forEach((cat, i) => {
    const x = startX + i * (cardW + gap);
    const y = startY;
    const pctKey = cat.name === 'Cybersecurity' ? 'cybersecurity' : cat.name === 'Networking' ? 'networking' : cat.name.includes('Linux') ? 'linux' : 'fullstack';
    const pct = sp[pctKey] || 0;
    const radius = 42;
    const cx = x + cardW / 2;
    const cy = y + 60;
    const circumference = 2 * Math.PI * radius;
    const dashOffset = circumference * (1 - pct / 100);

    // Card background
    svg += `<rect x="${x}" y="${y}" width="${cardW}" height="${cardH}" rx="8" fill="${t.surface}" stroke="${t.border}" stroke-width="1"/>`;

    // Category icon
    svg += `<text x="${cx}" y="${y + 16}" text-anchor="middle" font-size="12">${cat.icon}</text>`;

    // Category name
    svg += `<text x="${cx}" y="${y + 30}" text-anchor="middle" class="cat-name">${cat.name}</text>`;

    // Progress ring — background
    svg += `<circle cx="${cx}" cy="${cy}" r="${radius}" fill="none" stroke="${t.surfaceAlt}" stroke-width="5"/>`;

    // Progress ring — fill
    svg += `<circle cx="${cx}" cy="${cy}" r="${radius}" fill="none" stroke="${cat.color}" stroke-width="5" stroke-linecap="round"
      stroke-dasharray="${circumference}" stroke-dashoffset="${circumference}" transform="rotate(-90 ${cx} ${cy})">
      <animate attributeName="stroke-dashoffset" from="${circumference}" to="${dashOffset}" dur="1.2s" fill="freeze" begin="0.3s"/>
    </circle>`;

    // Percentage text
    svg += `<text x="${cx}" y="${cy + 6}" text-anchor="middle" class="pct-text">${pct}%</text>`;

    // Skills list
    let sy = y + 120;
    cat.skills.slice(0, 5).forEach((skill) => {
      const lvlColor = skill.level === 'Practicing' ? t.primary : t.muted;
      svg += `<text x="${x + 12}" y="${sy}" class="skill-name">${skill.name}</text>`;
      svg += `<text x="${x + cardW - 12}" y="${sy}" text-anchor="end" class="skill-level" fill="${lvlColor}">${skill.level}</text>`;
      sy += 14;
    });

    // WordPress highlight for Full Stack
    if (cat.name === 'Full Stack') {
      svg += `<rect x="${x + 8}" y="${y + cardH - 28}" width="${cardW - 16}" height="20" rx="4" fill="${t.surfaceAlt}" stroke="${cat.color}" stroke-width="0.5" opacity="0.6"/>`;
      svg += `<text x="${cx}" y="${y + cardH - 14}" text-anchor="middle" font-family="'Segoe UI',system-ui,sans-serif" font-size="8" font-weight="600" fill="${cat.color}">WordPress Focus</text>`;
    }
  });

  svg += `</svg>`;
  return svg;
}
