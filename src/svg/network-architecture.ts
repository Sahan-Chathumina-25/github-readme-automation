import type { ThemeConfig } from '../theme';

export function generateNetworkArchitecture(theme: ThemeConfig): string {
  const W = 800;
  const H = 620;

  // Layer definitions — clean, horizontal layout
  const layers = [
    { label: 'INTERNET', sub: 'External Users', y: 30, color: theme.muted },
    { label: 'SECURITY', sub: 'Edge Firewall & VPN', y: 130, color: theme.warning },
    { label: 'LOAD BALANCING', sub: 'HAProxy', y: 230, color: theme.primary },
    { label: 'WEB TIER', sub: 'Apache / Nginx (x2)', y: 330, color: theme.secondary },
    { label: 'APPLICATION', sub: 'Services Layer', y: 430, color: theme.secondary },
    { label: 'DATABASE', sub: 'MySQL Primary / Replica', y: 530, color: theme.success },
  ];

  // Supporting services — right side column
  const services = [
    { icon: '◈', name: 'DNS' },
    { icon: '◈', name: 'DHCP' },
    { icon: '◈', name: 'SSH' },
    { icon: '◈', name: 'TLS/SSL' },
    { icon: '◈', name: 'Monitoring' },
    { icon: '◈', name: 'Logging' },
    { icon: '◈', name: 'Backup' },
  ];

  let svg = `<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 ${W} ${H}" width="${W}" height="${H}">`;
  svg += `<defs>`;
  svg += `<style>
    @keyframes pulse { 0%,100%{opacity:0.6} 50%{opacity:1} }
    @keyframes flow { 0%{stroke-dashoffset:12} 100%{stroke-dashoffset:0} }
    .layer-label { font-family:'Segoe UI',system-ui,sans-serif; font-size:10px; font-weight:600; letter-spacing:1.5px; }
    .layer-sub { font-family:'Segoe UI',system-ui,sans-serif; font-size:9px; }
    .node-text { font-family:'Segoe UI',system-ui,sans-serif; font-size:12px; font-weight:500; fill:${theme.highlight}; }
    .service-text { font-family:'Segoe UI',system-ui,sans-serif; font-size:9px; fill:${theme.muted}; }
  </style>`;

  // Connection line gradient
  svg += `<linearGradient id="conn-g" x1="0%" y1="0%" x2="0%" y2="100%">
    <stop offset="0%" stop-color="${theme.primary}" stop-opacity="0.3"/>
    <stop offset="50%" stop-color="${theme.primary}" stop-opacity="0.6"/>
    <stop offset="100%" stop-color="${theme.primary}" stop-opacity="0.3"/>
  </linearGradient>`;

  // Node glow filter
  svg += `<filter id="node-glow" x="-20%" y="-20%" width="140%" height="140%">
    <feGaussianBlur stdDeviation="3" result="blur"/>
    <feMerge><feMergeNode in="blur"/><feMergeNode in="SourceGraphic"/></feMerge>
  </filter>`;
  svg += `</defs>`;

  // Background
  svg += `<rect width="${W}" height="${H}" fill="${theme.background}" rx="8"/>`;

  // Connection lines between layers (center vertical line)
  for (let i = 0; i < layers.length - 1; i++) {
    const y1 = layers[i].y + 30;
    const y2 = layers[i + 1].y;
    svg += `<line x1="400" y1="${y1}" x2="400" y2="${y2}" stroke="url(#conn-g)" stroke-width="1.5"/>`;
    // Small animated packet
    svg += `<circle r="2.5" fill="${theme.primary}" opacity="0.8">
      <animateMotion dur="${3 + i * 0.5}s" repeatCount="indefinite" path="M400,${y1} L400,${y2}"/>
    </circle>`;
  }

  // Layer boxes
  layers.forEach((layer, i) => {
    const boxW = 260;
    const boxH = 48;
    const boxX = 400 - boxW / 2;
    const boxY = layer.y;

    // Box background
    svg += `<rect x="${boxX}" y="${boxY}" width="${boxW}" height="${boxH}" rx="6" fill="${theme.surface}" stroke="${layer.color}" stroke-width="1" opacity="0.9"/>`;

    // Left accent line
    svg += `<rect x="${boxX}" y="${boxY + 8}" width="3" height="${boxH - 16}" rx="1.5" fill="${layer.color}" opacity="0.7"/>`;

    // Layer label
    svg += `<text x="${boxX + 14}" y="${boxY + 20}" class="layer-label" fill="${layer.color}">${layer.label}</text>`;

    // Sub label
    svg += `<text x="${boxX + 14}" y="${boxY + 35}" class="layer-sub" fill="${theme.muted}">${layer.sub}</text>`;

    // Status dot
    svg += `<circle cx="${boxX + boxW - 16}" cy="${boxY + boxH / 2}" r="4" fill="${theme.success}" opacity="0.7">
      <animate attributeName="opacity" values="0.5;0.9;0.5" dur="3s" repeatCount="indefinite" begin="${i * 0.3}s"/>
    </circle>`;

    // Web tier — show two servers
    if (layer.label === 'WEB TIER') {
      const sW = 80;
      const sH = 28;
      [-55, 55].forEach((offset, si) => {
        const sx = 400 + offset - sW / 2;
        const sy = boxY + boxH + 6;
        svg += `<rect x="${sx}" y="${sy}" width="${sW}" height="${sH}" rx="4" fill="${theme.surfaceAlt}" stroke="${theme.border}" stroke-width="0.5"/>`;
        svg += `<text x="${sx + sW / 2}" y="${sy + 17}" text-anchor="middle" font-family="'Segoe UI',system-ui,sans-serif" font-size="9" fill="${theme.muted}">Server ${si + 1}</text>`;
        // Connection from main box to servers
        svg += `<line x1="400" y1="${boxY + boxH}" x2="${sx + sW / 2}" y2="${sy}" stroke="${theme.border}" stroke-width="0.8" stroke-dasharray="3,3"/>`;
      });
    }

    // Database — show primary/replica split
    if (layer.label === 'DATABASE') {
      const dW = 90;
      const dH = 28;
      [-50, 50].forEach((offset, di) => {
        const dx = 400 + offset - dW / 2;
        const dy = boxY + boxH + 6;
        svg += `<rect x="${dx}" y="${dy}" width="${dW}" height="${dH}" rx="4" fill="${theme.surfaceAlt}" stroke="${theme.border}" stroke-width="0.5"/>`;
        svg += `<text x="${dx + dW / 2}" y="${dy + 17}" text-anchor="middle" font-family="'Segoe UI',system-ui,sans-serif" font-size="9" fill="${theme.muted}">${di === 0 ? 'Primary' : 'Replica'}</text>`;
        svg += `<line x1="400" y1="${boxY + boxH}" x2="${dx + dW / 2}" y2="${dy}" stroke="${theme.border}" stroke-width="0.8" stroke-dasharray="3,3"/>`;
      });
    }
  });

  // Supporting services — right column
  const svcX = 620;
  const svcStartY = 80;
  svg += `<rect x="${svcX - 10}" y="${svcStartY - 10}" width="160" height="${services.length * 22 + 20}" rx="6" fill="${theme.surface}" stroke="${theme.border}" stroke-width="0.5" opacity="0.6"/>`;
  svg += `<text x="${svcX + 65}" y="${svcStartY + 4}" text-anchor="middle" font-family="'Segoe UI',system-ui,sans-serif" font-size="9" font-weight="600" letter-spacing="1" fill="${theme.muted}">SUPPORTING</text>`;

  services.forEach((svc, i) => {
    const sy = svcStartY + 20 + i * 22;
    svg += `<text x="${svcX}" y="${sy}" class="service-text">${svc.icon} ${svc.name}</text>`;
  });

  // Backup / Monitoring layer at bottom
  const backupY = 590;
  svg += `<rect x="150" y="${backupY}" width="500" height="24" rx="4" fill="${theme.surfaceAlt}" stroke="${theme.border}" stroke-width="0.5" opacity="0.5"/>`;
  svg += `<text x="400" y="${backupY + 16}" text-anchor="middle" font-family="'Segoe UI',system-ui,sans-serif" font-size="9" fill="${theme.muted}">BACKUP  ·  MONITORING  ·  LOGGING</text>`;

  // Connection from database to backup
  svg += `<line x1="400" y1="578" x2="400" y2="${backupY}" stroke="${theme.border}" stroke-width="0.8" stroke-dasharray="3,3"/>`;

  svg += `</svg>`;
  return svg;
}
