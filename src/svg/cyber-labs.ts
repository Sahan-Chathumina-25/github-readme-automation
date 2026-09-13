import type { ThemeConfig } from '../theme.js';

function esc(str: string): string {
  return str.replace(/&/g, '&amp;').replace(/</g, '&lt;').replace(/>/g, '&gt;').replace(/"/g, '&quot;');
}

export interface CtfEntry {
  platform: string;
  category: string;
  challenge: string;
  difficulty: string;
  skillsLearned: string[];
}

export function generateCyberLabs(ctf: CtfEntry[], theme: ThemeConfig): string {
  if (ctf.length === 0) return '';

  const w = 700;
  const cardH = 72;
  const gap = 10;
  const pad = 24;
  const totalH = ctf.length * (cardH + gap) + pad * 2;

  const diffWidth = (d: string): number => {
    if (d.includes('Hard') || d.includes('Advanced')) return 90;
    if (d.includes('Medium')) return 60;
    return 35;
  };

  const cards = ctf.map((entry, i) => {
    const y = pad + i * (cardH + gap);
    const delay = i * 0.15;
    const dw = diffWidth(entry.difficulty);

    return `
  <g opacity="0" transform="translate(0, 8)">
    <animate attributeName="opacity" values="0;1" dur="0.5s" begin="${delay}s" fill="freeze"/>
    <animateTransform attributeName="transform" type="translate" values="0 8;0 0" dur="0.5s" begin="${delay}s" fill="freeze"/>

    <rect x="${pad}" y="${y}" width="${w - pad * 2}" height="${cardH}" rx="10" fill="${theme.surface}" opacity="0.85"/>
    <rect x="${pad}" y="${y}" width="${w - pad * 2}" height="${cardH}" rx="10" fill="none" stroke="${theme.border}" stroke-width="0.5"/>

    <rect x="${pad}" y="${y + 10}" width="3" height="${cardH - 20}" rx="1.5" fill="${theme.secondary}" opacity="0.6"/>

    <text x="${pad + 16}" y="${y + 22}" font-family="'SF Mono','Cascadia Code','Consolas',monospace" font-size="9" fill="${theme.secondary}" letter-spacing="1" opacity="0.7">CTF ${String(i + 1).padStart(2, '0')}</text>
    <text x="${pad + 16}" y="${y + 40}" font-family="'Segoe UI','Inter',Arial,sans-serif" font-size="14" font-weight="600" fill="${theme.highlight}">${esc(entry.category)}</text>
    <text x="${pad + 16}" y="${y + 56}" font-family="'Segoe UI','Inter',Arial,sans-serif" font-size="10" fill="${theme.muted}">${esc(entry.platform)}  •  ${esc(entry.challenge)}</text>

    <text x="${pad + 16}" y="${y + 68}" font-family="'SF Mono','Consolas',monospace" font-size="8" fill="${theme.muted}" opacity="0.6">DIFFICULTY</text>
    <rect x="${pad + 80}" y="${y + 61}" width="100" height="4" rx="2" fill="${theme.surfaceAlt}"/>
    <rect x="${pad + 80}" y="${y + 61}" width="${dw}" height="4" rx="2" fill="${theme.primary}" opacity="0.7">
      <animate attributeName="width" from="0" to="${dw}" dur="0.8s" begin="${delay + 0.3}s" fill="freeze"/>
    </rect>

    ${entry.skillsLearned.slice(0, 3).map((sk, si) => {
      const sx = w - pad - 20 - si * 85;
      const sw = sk.length * 6.5 + 16;
      return `
    <rect x="${sx - sw + 85}" y="${y + 12}" width="${sw}" height="20" rx="10" fill="${theme.surfaceAlt}" stroke="${theme.border}" stroke-width="0.5"/>
    <text x="${sx - sw + 85 + sw / 2}" y="${y + 26}" text-anchor="middle" font-family="'SF Mono','Consolas',monospace" font-size="8" fill="${theme.muted}">${esc(sk)}</text>`;
    }).join('')}

    <circle cx="${w - pad - 16}" cy="${y + cardH / 2}" r="4" fill="${theme.success}" opacity="0.7">
      <animate attributeName="opacity" values="0.5;1;0.5" dur="2s" repeatCount="indefinite" begin="${delay + 0.5}s"/>
    </circle>
  </g>`;
  }).join('');

  return `<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 ${w} ${totalH}" width="${w}" height="${totalH}">
  ${cards}
</svg>`;
}
