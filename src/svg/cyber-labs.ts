import type { ProfileConfig } from '../types';

export function generateCyberLabs(config: ProfileConfig): string {
  const W = 800;
  const t = config.theme;
  const ctf = config.ctf;

  // Build cards from CTF data
  const cards = ctf.map(entry => ({
    platform: entry.platform,
    category: entry.category,
    description: entry.challenge,
    difficulty: entry.difficulty,
    skills: entry.skillsLearned,
  }));

  // Also add category cards for security practice areas
  const categories = [
    { name: 'Network Security', desc: 'Firewall configuration, traffic analysis, network monitoring', tools: ['firewalld', 'Wireshark', 'tcpdump'] },
    { name: 'Web Security', desc: 'Web application security, HTTP analysis, security testing', tools: ['Burp Suite', 'OWASP', 'HTTP'] },
    { name: 'Security Automation', desc: 'Python scripts for scanning, port detection, automation', tools: ['Python', 'Nmap', 'Bash'] },
  ];

  const cardW = 230;
  const cardH = 120;
  const gap = 20;
  const cols = 3;
  const totalW = cols * cardW + (cols - 1) * gap;
  const startX = (W - totalW) / 2;
  const headerH = 50;
  const catH = 100;
  const catGap = 16;
  const totalCategoriesH = categories.length * catH + (categories.length - 1) * catGap;
  const totalCardsH = cards.length > 0 ? cardH + 20 : 0;
  const H = headerH + totalCategoriesH + 30 + totalCardsH + 40;

  let svg = `<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 ${W} ${H}" width="${W}" height="${H}">`;
  svg += `<defs>`;
  svg += `<style>
    @keyframes statusPulse { 0%,100%{opacity:0.6} 50%{opacity:1} }
    .card-title { font-family:'Segoe UI',system-ui,sans-serif; font-size:13px; font-weight:600; fill:${t.highlight}; }
    .card-desc { font-family:'Segoe UI',system-ui,sans-serif; font-size:10px; fill:${t.muted}; }
    .tool-pill { font-family:'Segoe UI',system-ui,sans-serif; font-size:9px; fill:${t.primary}; }
    .section-label { font-family:'Segoe UI',system-ui,sans-serif; font-size:10px; font-weight:600; letter-spacing:1.5px; }
    .diff-text { font-family:'Segoe UI',system-ui,sans-serif; font-size:9px; }
  </style>`;
  svg += `</defs>`;

  // Background
  svg += `<rect width="${W}" height="${H}" fill="${t.background}" rx="8"/>`;

  // Header
  svg += `<text x="40" y="32" font-family="'Segoe UI',system-ui,sans-serif" font-size="14" font-weight="700" fill="${t.highlight}">CYBERSECURITY LAB</text>`;
  svg += `<text x="40" y="46" font-family="'Segoe UI',system-ui,sans-serif" font-size="10" fill="${t.muted}">Security Practice &amp; Offensive/Defensive Lab</text>`;

  // Category cards — 3 across
  let catY = headerH + 10;
  categories.forEach((cat, i) => {
    const x = startX + i * (cardW + gap);
    const y = catY;

    svg += `<rect x="${x}" y="${y}" width="${cardW}" height="${catH}" rx="6" fill="${t.surface}" stroke="${t.border}" stroke-width="1"/>`;
    svg += `<rect x="${x}" y="${y}" width="3" height="${catH}" rx="1.5" fill="${t.primary}" opacity="0.6"/>`;
    svg += `<text x="${x + 14}" y="${y + 20}" class="card-title">${cat.name}</text>`;
    svg += `<text x="${x + 14}" y="${y + 36}" class="card-desc">${cat.desc}</text>`;

    // Tool pills
    let pillX = x + 14;
    cat.tools.forEach((tool) => {
      const pillW = tool.length * 5.5 + 12;
      svg += `<rect x="${pillX}" y="${y + catH - 28}" width="${pillW}" height="18" rx="9" fill="${t.surfaceAlt}" stroke="${t.border}" stroke-width="0.5"/>`;
      svg += `<text x="${pillX + pillW / 2}" y="${y + catH - 16}" text-anchor="middle" class="tool-pill">${tool}</text>`;
      pillX += pillW + 6;
    });
  });

  // CTF Cards section
  if (cards.length > 0) {
    const ctfY = catY + totalCategoriesH + 20;
    svg += `<text x="40" y="${ctfY}" class="section-label" fill="${t.muted}">CTF / SECURITY CHALLENGES</text>`;

    cards.forEach((card, i) => {
      const col = i % cols;
      const row = Math.floor(i / cols);
      const x = startX + col * (cardW + gap);
      const y = ctfY + 16 + row * (cardH + gap);

      svg += `<rect x="${x}" y="${y}" width="${cardW}" height="${cardH}" rx="6" fill="${t.surface}" stroke="${t.border}" stroke-width="1"/>`;

      // Platform badge
      svg += `<rect x="${x + 10}" y="${y + 10}" width="${card.platform.length * 5.5 + 12}" height="18" rx="9" fill="${t.surfaceAlt}" stroke="${t.border}" stroke-width="0.5"/>`;
      svg += `<text x="${x + 16}" y="${y + 22}" class="tool-pill">${card.platform}</text>`;

      // Category
      svg += `<text x="${x + 10}" y="${y + 44}" class="card-title" font-size="11">${card.category}</text>`;

      // Description
      svg += `<text x="${x + 10}" y="${y + 60}" class="card-desc">${card.description}</text>`;

      // Difficulty bar
      const diffW = cardW - 20;
      const diffH = 4;
      const diffY = y + cardH - 30;
      svg += `<rect x="${x + 10}" y="${diffY}" width="${diffW}" height="${diffH}" rx="2" fill="${t.surfaceAlt}"/>`;
      const fillW = card.difficulty.includes('Medium') ? diffW * 0.6 : diffW * 0.3;
      svg += `<rect x="${x + 10}" y="${diffY}" width="${fillW}" height="${diffH}" rx="2" fill="${t.primary}" opacity="0.6"/>`;
      svg += `<text x="${x + 10}" y="${diffY + 14}" class="diff-text" fill="${t.muted}">${card.difficulty}</text>`;

      // Skills
      let skX = x + diffW + 16;
      card.skills.slice(0, 2).forEach((sk) => {
        const skW = sk.length * 5 + 10;
        svg += `<rect x="${skX}" y="${diffY + 4}" width="${skW}" height="14" rx="7" fill="${t.surfaceAlt}" stroke="${t.border}" stroke-width="0.5"/>`;
        svg += `<text x="${skX + skW / 2}" y="${diffY + 14}" text-anchor="middle" font-family="'Segoe UI',system-ui,sans-serif" font-size="7" fill="${t.muted}">${sk}</text>`;
        skX += skW + 4;
      });
    });
  }

  svg += `</svg>`;
  return svg;
}
