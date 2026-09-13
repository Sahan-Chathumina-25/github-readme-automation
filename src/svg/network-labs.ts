import type { ProfileConfig } from '../types';

export function generateNetworkLabs(config: ProfileConfig): string {
  const W = 800;
  const t = config.theme;
  const labs = config.labs.filter(l =>
    l.technology.some(tech =>
      ['Networking', 'Subnetting', 'VLAN', 'Switching', 'DNS', 'DHCP', 'firewalld'].includes(tech)
    )
  );

  // Categories
  const categories = [
    { name: 'ROUTING & SWITCHING', labs: labs.filter(l => l.technology.some(t => ['VLAN', 'Switching'].includes(t))) },
    { name: 'NETWORK SERVICES', labs: labs.filter(l => l.technology.some(t => ['DNS', 'DHCP'].includes(t))) },
    { name: 'SECURITY', labs: labs.filter(l => l.technology.some(t => ['firewalld', 'Networking'].includes(t) && !['DNS', 'DHCP', 'VLAN', 'Switching'].some(x => l.technology.includes(x)))) },
    { name: 'INFRASTRUCTURE', labs: labs.filter(l => l.technology.some(t => ['Subnetting'].includes(t))) },
  ].filter(c => c.labs.length > 0);

  const catW = 170;
  const catH = 130;
  const gap = 16;
  const totalW = categories.length * catW + (categories.length - 1) * gap;
  const startX = (W - totalW) / 2;
  const headerH = 50;
  const H = headerH + catH + 30;

  let svg = `<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 ${W} ${H}" width="${W}" height="${H}">`;
  svg += `<defs>`;
  svg += `<style>
    .cat-title { font-family:'Segoe UI',system-ui,sans-serif; font-size:9px; font-weight:600; letter-spacing:1.5px; }
    .lab-name { font-family:'Segoe UI',system-ui,sans-serif; font-size:10px; font-weight:500; fill:${t.highlight}; }
    .lab-status { font-family:'Segoe UI',system-ui,sans-serif; font-size:8px; }
    .lab-tech { font-family:'Segoe UI',system-ui,sans-serif; font-size:8px; fill:${t.muted}; }
  </style>`;
  svg += `</defs>`;

  // Background
  svg += `<rect width="${W}" height="${H}" fill="${t.background}" rx="8"/>`;

  // Header
  svg += `<text x="40" y="32" font-family="'Segoe UI',system-ui,sans-serif" font-size="14" font-weight="700" fill="${t.highlight}">NETWORKING LABS</text>`;
  svg += `<text x="40" y="46" font-family="'Segoe UI',system-ui,sans-serif" font-size="10" fill="${t.muted}">Network Operations &amp; Infrastructure</text>`;

  // Category columns
  categories.forEach((cat, ci) => {
    const x = startX + ci * (catW + gap);
    const y = headerH + 10;

    // Category box
    svg += `<rect x="${x}" y="${y}" width="${catW}" height="${catH}" rx="6" fill="${t.surface}" stroke="${t.border}" stroke-width="1"/>`;

    // Category header bar
    svg += `<rect x="${x}" y="${y}" width="${catW}" height="24" rx="6" fill="${t.surfaceAlt}"/>`;
    svg += `<rect x="${x}" y="${y + 18}" width="${catW}" height="6" fill="${t.surfaceAlt}"/>`;
    svg += `<text x="${x + catW / 2}" y="${y + 16}" text-anchor="middle" class="cat-title" fill="${t.primary}">${cat.name}</text>`;

    // Lab items
    cat.labs.forEach((lab, li) => {
      const ly = y + 32 + li * 24;
      const isCompleted = lab.status === 'Completed';
      const statusColor = isCompleted ? t.success : t.warning;

      // Status dot
      svg += `<circle cx="${x + 12}" cy="${ly + 4}" r="3" fill="${statusColor}" opacity="0.8"/>`;

      // Lab name
      svg += `<text x="${x + 20}" y="${ly + 8}" class="lab-name">${lab.name}</text>`;

      // Status text
      svg += `<text x="${x + catW - 10}" y="${ly + 8}" text-anchor="end" class="lab-status" fill="${statusColor}">${lab.status}</text>`;
    });

    // Connecting line between categories (not after last)
    if (ci < categories.length - 1) {
      const lineX = x + catW + gap / 2;
      svg += `<line x1="${lineX}" y1="${y + catH / 2}" x2="${lineX}" y2="${y + catH / 2}" stroke="${t.border}" stroke-width="1" stroke-dasharray="3,3"/>`;
    }
  });

  svg += `</svg>`;
  return svg;
}
