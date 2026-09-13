import type { ThemeConfig } from '../theme.js';

function esc(str: string): string {
  return str.replace(/&/g, '&amp;').replace(/</g, '&lt;').replace(/>/g, '&gt;').replace(/"/g, '&quot;');
}

export function generateNetworkArchitecture(theme: ThemeConfig): string {
  const w = 800;
  const h = 520;

  const cx = w / 2;
  const layerH = 80;

  interface NodeDef {
    x: number;
    y: number;
    r: number;
    label: string;
    color: string;
    sublabel?: string;
  }

  const nodes: NodeDef[] = [
    { x: cx, y: 40, r: 22, label: 'INTERNET', color: theme.primary },
    { x: cx, y: 40 + layerH, r: 20, label: 'FIREWALL', color: theme.warning, sublabel: 'EDGE SECURITY' },
    { x: cx, y: 40 + layerH * 2, r: 20, label: 'LOAD BALANCER', color: theme.secondary, sublabel: 'HAPROXY' },
    { x: cx - 120, y: 40 + layerH * 3, r: 18, label: 'WEB SRV 01', color: theme.secondary, sublabel: 'APACHE' },
    { x: cx + 120, y: 40 + layerH * 3, r: 18, label: 'WEB SRV 02', color: theme.secondary, sublabel: 'APACHE' },
    { x: cx, y: 40 + layerH * 4, r: 20, label: 'APP LAYER', color: theme.primary, sublabel: 'APPLICATION' },
    { x: cx, y: 40 + layerH * 5, r: 20, label: 'DATABASE', color: theme.success, sublabel: 'MySQL' },
    { x: cx, y: 40 + layerH * 6, r: 16, label: 'BACKUP', color: theme.muted, sublabel: 'MONITORING' },
  ];

  const connections: [number, number][] = [
    [0, 1], [1, 2], [2, 3], [2, 4], [3, 5], [4, 5], [5, 6], [6, 7],
  ];

  const connLines = connections.map(([from, to]) => {
    const a = nodes[from];
    const b = nodes[to];
    return `<line x1="${a.x}" y1="${a.y + a.r}" x2="${b.x}" y2="${b.y - b.r}" stroke="${theme.primary}" stroke-width="1" opacity="0.2"/>`;
  }).join('\n    ');

  const packets = connections.map(([from, to], i) => {
    const a = nodes[from];
    const b = nodes[to];
    const dur = 2.5 + i * 0.3;
    return `<circle r="2.5" fill="${theme.primary}" opacity="0.8" filter="url(#na-glow)">
      <animateMotion dur="${dur}s" repeatCount="indefinite" path="M${a.x},${a.y + a.r} L${b.x},${b.y - b.r}"/>
    </circle>`;
  }).join('\n    ');

  const nodeElements = nodes.map((n, i) => `
    <circle cx="${n.x}" cy="${n.y}" r="${n.r}" fill="${theme.surface}" stroke="${n.color}" stroke-width="1.5" opacity="0">
      <animate attributeName="opacity" values="0;1" dur="0.5s" begin="${i * 0.15}s" fill="freeze"/>
    </circle>
    <text x="${n.x}" y="${n.y + 1}" text-anchor="middle" font-family="'SF Mono','Consolas',monospace" font-size="${n.r > 18 ? 8 : 7}" fill="${n.color}" opacity="0">
      ${esc(n.label)}
      <animate attributeName="opacity" values="0;1" dur="0.3s" begin="${i * 0.15 + 0.2}s" fill="freeze"/>
    </text>
    ${n.sublabel ? `<text x="${n.x}" y="${n.y + 12}" text-anchor="middle" font-family="'SF Mono','Consolas',monospace" font-size="6" fill="${theme.muted}" opacity="0">
      ${esc(n.sublabel)}
      <animate attributeName="opacity" values="0;0.6" dur="0.3s" begin="${i * 0.15 + 0.3}s" fill="freeze"/>
    </text>` : ''}
    <circle cx="${n.x}" cy="${n.y}" r="${n.r + 6}" fill="none" stroke="${n.color}" stroke-width="0.5" opacity="0">
      <animate attributeName="opacity" values="0;0.15;0" dur="3s" repeatCount="indefinite" begin="${i * 0.2}s"/>
      <animate attributeName="r" values="${n.r + 4};${n.r + 10};${n.r + 4}" dur="3s" repeatCount="indefinite" begin="${i * 0.2}s"/>
    </circle>`).join('\n');

  const layerLabels = [
    { y: 40 + layerH - 12, label: 'LAYER 01 — EDGE SECURITY' },
    { y: 40 + layerH * 2 - 12, label: 'LAYER 02 — TRAFFIC MANAGEMENT' },
    { y: 40 + layerH * 3 - 12, label: 'LAYER 03 — WEB TIER' },
    { y: 40 + layerH * 4 - 12, label: 'LAYER 04 — APPLICATION' },
    { y: 40 + layerH * 5 - 12, label: 'LAYER 05 — DATA' },
    { y: 40 + layerH * 6 - 12, label: 'LAYER 06 — MONITORING & BACKUP' },
  ];

  const labels = layerLabels.map(l => `
    <text x="${w - 30}" y="${l.y}" text-anchor="end" font-family="'SF Mono','Consolas',monospace" font-size="7" fill="${theme.muted}" opacity="0.35" letter-spacing="0.5">${esc(l.label)}</text>`).join('\n');

  return `<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 ${w} ${h}" width="${w}" height="${h}">
  <defs>
    <linearGradient id="na-accent" x1="0%" y1="0%" x2="100%" y2="0%">
      <stop offset="0%" style="stop-color:${theme.primary};stop-opacity:0.8"/>
      <stop offset="100%" style="stop-color:${theme.secondary};stop-opacity:0.8"/>
    </linearGradient>
    <filter id="na-glow">
      <feGaussianBlur stdDeviation="2" result="b"/>
      <feMerge><feMergeNode in="b"/><feMergeNode in="SourceGraphic"/></feMerge>
    </filter>
    <filter id="na-soft">
      <feGaussianBlur stdDeviation="50"/>
    </filter>
  </defs>

  <rect width="${w}" height="${h}" fill="${theme.background}"/>
  <ellipse cx="${w / 2}" cy="${h / 2}" rx="300" ry="200" fill="${theme.primary}" opacity="0.02" filter="url(#na-soft)"/>

  <g opacity="0.015" stroke="${theme.primary}" stroke-width="0.5">
    ${Array.from({ length: Math.floor(h / 50) + 1 }, (_, i) => `<line x1="0" y1="${i * 50}" x2="${w}" y2="${i * 50}"/>`).join('\n    ')}
    ${Array.from({ length: Math.floor(w / 100) + 1 }, (_, i) => `<line x1="${i * 100}" y1="0" x2="${i * 100}" y2="${h}"/>`).join('\n    ')}
  </g>

  <g opacity="0.15">
    <rect x="30" y="28" width="2" height="${h - 56}" rx="1" fill="${theme.primary}" opacity="0.1"/>
  </g>

  <g>
    ${connLines}
  </g>

  <g>
    ${packets}
  </g>

  <g>
    ${nodeElements}
  </g>

  ${labels}

  <rect x="30" y="${h - 20}" width="${w - 60}" height="0.5" fill="url(#na-accent)" opacity="0.2"/>
</svg>`;
}
