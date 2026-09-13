import type { ProfileConfig } from '../types';

export function generateLinuxLabs(config: ProfileConfig): string {
  const W = 800;
  const t = config.theme;
  const labs = config.labs.filter(l =>
    l.technology.some(tech =>
      ['Linux', 'SSH', 'Apache', 'BIND', 'DHCP', 'firewalld', 'SELinux', 'systemd', 'CentOS', 'Bash'].includes(tech)
    )
  );

  const cardW = 170;
  const cardH = 100;
  const gap = 14;
  const cols = 4;
  const totalW = cols * cardW + (cols - 1) * gap;
  const startX = (W - totalW) / 2;
  const headerH = 50;
  const rows = Math.ceil(labs.length / cols);
  const H = headerH + rows * (cardH + gap) + 20;

  let svg = `<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 ${W} ${H}" width="${W}" height="${H}">`;
  svg += `<defs>`;
  svg += `<style>
    @keyframes blink { 0%,100%{opacity:1} 50%{opacity:0} }
    .lab-name { font-family:'Segoe UI',system-ui,sans-serif; font-size:11px; font-weight:600; fill:${t.highlight}; }
    .lab-obj { font-family:'Segoe UI',system-ui,sans-serif; font-size:8px; fill:${t.muted}; }
    .lab-tech { font-family:'Segoe UI',system-ui,sans-serif; font-size:8px; fill:${t.primary}; }
    .status-text { font-family:'Segoe UI',system-ui,sans-serif; font-size:8px; }
  </style>`;
  svg += `</defs>`;

  // Background
  svg += `<rect width="${W}" height="${H}" fill="${t.background}" rx="8"/>`;

  // Header
  svg += `<text x="40" y="32" font-family="'Segoe UI',system-ui,sans-serif" font-size="14" font-weight="700" fill="${t.highlight}">LINUX LABS</text>`;
  svg += `<text x="40" y="46" font-family="'Segoe UI',system-ui,sans-serif" font-size="10" fill="${t.muted}">Server Administration &amp; System Configuration</text>`;

  // Terminal cursor in header
  svg += `<rect x="330" y="36" width="7" height="12" fill="${t.primary}" opacity="0.8">
    <animate attributeName="opacity" values="0.8;0;0.8" dur="1.2s" repeatCount="indefinite"/>
  </rect>`;

  labs.forEach((lab, i) => {
    const col = i % cols;
    const row = Math.floor(i / cols);
    const x = startX + col * (cardW + gap);
    const y = headerH + 10 + row * (cardH + gap);

    const isCompleted = lab.status === 'Completed';
    const isInProgress = lab.status === 'In Progress';
    const statusColor = isCompleted ? t.success : isInProgress ? t.warning : t.primary;

    // Card
    svg += `<rect x="${x}" y="${y}" width="${cardW}" height="${cardH}" rx="6" fill="${t.surface}" stroke="${t.border}" stroke-width="1"/>`;

    // Top accent line
    svg += `<rect x="${x}" y="${y}" width="${cardW}" height="2" rx="1" fill="${statusColor}" opacity="0.5"/>`;

    // Terminal prompt
    svg += `<text x="${x + 10}" y="${y + 22}" font-family="'Courier New',monospace" font-size="9" fill="${t.muted}">$</text>`;

    // Lab name
    svg += `<text x="${x + 20}" y="${y + 22}" class="lab-name">${lab.name}</text>`;

    // Status dot + text
    svg += `<circle cx="${x + 12}" cy="${y + 38}" r="3" fill="${statusColor}" opacity="0.8">
      <animate attributeName="opacity" values="0.6;1;0.6" dur="2s" repeatCount="indefinite" begin="${i * 0.2}s"/>
    </circle>`;
    svg += `<text x="${x + 20}" y="${y + 42}" class="status-text" fill="${statusColor}">${lab.status.toUpperCase()}</text>`;

    // Objective (truncated)
    const objText = lab.objective.length > 35 ? lab.objective.substring(0, 35) + '...' : lab.objective;
    svg += `<text x="${x + 10}" y="${y + 60}" class="lab-obj">${objText}</text>`;

    // Technology pills
    let pillX = x + 10;
    lab.technology.slice(0, 3).forEach((tech) => {
      const pw = tech.length * 4.5 + 8;
      svg += `<rect x="${pillX}" y="${y + cardH - 22}" width="${pw}" height="14" rx="7" fill="${t.surfaceAlt}" stroke="${t.border}" stroke-width="0.5"/>`;
      svg += `<text x="${pillX + pw / 2}" y="${y + cardH - 12}" text-anchor="middle" class="lab-tech">${tech}</text>`;
      pillX += pw + 4;
    });
  });

  svg += `</svg>`;
  return svg;
}
