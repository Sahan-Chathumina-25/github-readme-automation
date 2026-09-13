import type { ProfileConfig } from '../types';

export function generateCertifications(config: ProfileConfig): string {
  const W = 800;
  const certs = config.certifications;
  const t = config.theme;

  // Separate CCNA modules from other certs
  const ccnaModules = certs.filter(c => c.name.startsWith('CCNA'));
  const otherCerts = certs.filter(c => !c.name.startsWith('CCNA'));

  const headerH = 50;
  const timelineX = 120;
  const certH = 60;
  const ccnaH = ccnaModules.length * 36 + 40;
  const otherH = otherCerts.length * certH;
  const gap = 20;
  const H = headerH + ccnaH + gap + otherH + 40;

  let svg = `<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 ${W} ${H}" width="${W}" height="${H}">`;
  svg += `<defs>`;
  svg += `<style>
    @keyframes checkPulse { 0%,100%{opacity:0.8} 50%{opacity:1} }
    .cert-name { font-family:'Segoe UI',system-ui,sans-serif; font-size:12px; font-weight:600; fill:${t.highlight}; }
    .cert-provider { font-family:'Segoe UI',system-ui,sans-serif; font-size:10px; fill:${t.muted}; }
    .cert-year { font-family:'Segoe UI',system-ui,sans-serif; font-size:9px; fill:${t.muted}; }
    .module-text { font-family:'Segoe UI',system-ui,sans-serif; font-size:10px; fill:${t.highlight}; }
    .module-num { font-family:'Segoe UI',system-ui,sans-serif; font-size:9px; font-weight:600; fill:${t.primary}; }
    .ccna-title { font-family:'Segoe UI',system-ui,sans-serif; font-size:13px; font-weight:700; fill:${t.highlight}; }
    .ccna-sub { font-family:'Segoe UI',system-ui,sans-serif; font-size:10px; fill:${t.muted}; }
  </style>`;
  svg += `</defs>`;

  // Background
  svg += `<rect width="${W}" height="${H}" fill="${t.background}" rx="8"/>`;

  // Header
  svg += `<text x="40" y="32" font-family="'Segoe UI',system-ui,sans-serif" font-size="14" font-weight="700" fill="${t.highlight}">CERTIFICATIONS &amp; COURSES</text>`;

  // Timeline vertical line
  const tlStartY = headerH + 10;
  const tlEndY = H - 20;
  svg += `<line x1="${timelineX}" y1="${tlStartY}" x2="${timelineX}" y2="${tlEndY}" stroke="${t.border}" stroke-width="1.5"/>`;

  // CCNA Section
  let currentY = tlStartY + 20;

  // CCNA header node
  svg += `<circle cx="${timelineX}" cy="${currentY}" r="6" fill="${t.primary}" opacity="0.8"/>`;
  svg += `<circle cx="${timelineX}" cy="${currentY}" r="10" fill="none" stroke="${t.primary}" stroke-width="1" opacity="0.3"/>`;
  svg += `<text x="${timelineX + 20}" y="${currentY + 4}" class="ccna-title">CCNA — Cisco Certified Network Associate</text>`;
  svg += `<text x="${timelineX + 20}" y="${currentY + 18}" class="ccna-sub">Cisco Networking Academy · 3 Modules · All Completed</text>`;

  currentY += 30;

  // CCNA modules
  ccnaModules.forEach((mod, i) => {
    const modY = currentY + i * 36;
    const isCompleted = mod.status === 'Completed';

    // Branch line from main timeline
    svg += `<line x1="${timelineX}" y1="${modY}" x2="${timelineX + 10}" y2="${modY}" stroke="${t.border}" stroke-width="1"/>`;

    // Module node
    svg += `<circle cx="${timelineX + 14}" cy="${modY}" r="4" fill="${isCompleted ? t.success : t.warning}" opacity="0.8"/>`;

    // Module number
    const modNum = mod.module || `Module 0${i + 1}`;
    svg += `<text x="${timelineX + 26}" y="${modY + 4}" class="module-num">${modNum}</text>`;

    // Module name
    const shortName = mod.name.replace('CCNA: ', '');
    svg += `<text x="${timelineX + 80}" y="${modY + 4}" class="module-text">${shortName}</text>`;

    // Status check
    if (isCompleted) {
      svg += `<text x="${W - 40}" y="${modY + 4}" text-anchor="end" font-family="'Segoe UI',system-ui,sans-serif" font-size="9" fill="${t.success}">✓ COMPLETED</text>`;
    }
  });

  currentY += ccnaModules.length * 36 + gap;

  // Other certifications
  otherCerts.forEach((cert, i) => {
    const certY = currentY + i * certH;
    const isCompleted = cert.status === 'Completed';

    // Timeline node
    svg += `<circle cx="${timelineX}" cy="${certY + 10}" r="5" fill="${isCompleted ? t.success : t.warning}" opacity="0.8"/>`;

    // Connector line
    svg += `<line x1="${timelineX + 5}" y1="${certY + 10}" x2="${timelineX + 16}" y2="${certY + 10}" stroke="${t.border}" stroke-width="1"/>`;

    // Card
    svg += `<rect x="${timelineX + 20}" y="${certY - 6}" width="400" height="44" rx="6" fill="${t.surface}" stroke="${t.border}" stroke-width="1"/>`;

    // Cert name
    svg += `<text x="${timelineX + 34}" y="${certY + 12}" class="cert-name">${cert.name}</text>`;

    // Provider + year
    svg += `<text x="${timelineX + 34}" y="${certY + 26}" class="cert-provider">${cert.provider} · ${cert.year}</text>`;

    // Status badge
    const badgeColor = isCompleted ? t.success : t.warning;
    svg += `<text x="${W - 40}" y="${certY + 14}" text-anchor="end" font-family="'Segoe UI',system-ui,sans-serif" font-size="9" fill="${badgeColor}">✓ ${cert.status.toUpperCase()}</text>`;
  });

  svg += `</svg>`;
  return svg;
}
