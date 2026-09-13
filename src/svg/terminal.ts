import type { ProfileConfig } from '../types';

export function generateTerminal(config: ProfileConfig): string {
  const W = 700;
  const H = 310;
  const t = config.theme;
  const name = config.profile.name;
  const focus = ['Network Security', 'Ethical Hacking', 'Linux Administration', 'Full Stack Development', 'WordPress'];
  const stack = ['Linux', 'Networking', 'Security', 'WordPress', 'Python', 'Bash'];
  const status = ['Learning', 'Building', 'Exploring'];

  let svg = `<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 ${W} ${H}" width="${W}" height="${H}">`;
  svg += `<defs>`;
  svg += `<style>
    @keyframes cursorBlink { 0%,100%{opacity:1} 50%{opacity:0} }
    .term-prompt { font-family:'Courier New',monospace; font-size:12px; font-weight:700; fill:${t.primary}; }
    .term-cmd { font-family:'Courier New',monospace; font-size:12px; fill:${t.highlight}; }
    .term-output { font-family:'Courier New',monospace; font-size:11px; fill:${t.muted}; }
    .term-name { font-family:'Segoe UI',system-ui,sans-serif; font-size:13px; font-weight:600; fill:${t.highlight}; }
    .term-item { font-family:'Segoe UI',system-ui,sans-serif; font-size:10px; fill:${t.muted}; }
  </style>`;
  svg += `</defs>`;

  // Background
  svg += `<rect width="${W}" height="${H}" fill="${t.surface}" rx="8"/>`;

  // Title bar
  svg += `<rect width="${W}" height="28" rx="8" fill="${t.surfaceAlt}"/>`;
  svg += `<rect x="0" y="20" width="${W}" height="8" fill="${t.surfaceAlt}"/>`;
  svg += `<circle cx="18" cy="14" r="5" fill="#FF5F56"/>`;
  svg += `<circle cx="36" cy="14" r="5" fill="#FFBD2E"/>`;
  svg += `<circle cx="54" cy="14" r="5" fill="#27C93F"/>`;
  svg += `<text x="${W / 2}" y="18" text-anchor="middle" font-family="'Segoe UI',system-ui,sans-serif" font-size="10" fill="${t.muted}">terminal — whoami</text>`;

  // Scanline effect (very subtle)
  svg += `<rect width="${W}" height="${H}" fill="url(#scanline)" opacity="0.03"/>`;
  svg += `<pattern id="scanline" patternUnits="userSpaceOnUse" width="4" height="4">
    <line x1="0" y1="0" x2="4" y2="0" stroke="${t.highlight}" stroke-width="0.5"/>
  </pattern>`;

  let y = 54;

  // $ whoami
  svg += `<text x="20" y="${y}" class="term-prompt">$</text>`;
  svg += `<text x="34" y="${y}" class="term-cmd">whoami</text>`;
  svg += `<text x="120" y="${y}" class="term-output" fill="${t.muted}" opacity="0.5">#</text>`;
  y += 22;
  svg += `<text x="34" y="${y}" class="term-name">${name}</text>`;
  y += 16;
  svg += `<text x="34" y="${y}" class="term-output">Cybersecurity &amp; Network Engineering Student</text>`;

  y += 28;

  // $ focus
  svg += `<text x="20" y="${y}" class="term-prompt">$</text>`;
  svg += `<text x="34" y="${y}" class="term-cmd">focus</text>`;
  y += 18;
  focus.forEach((f) => {
    svg += `<text x="34" y="${y}" class="term-item">→ ${f}</text>`;
    y += 14;
  });

  y += 10;

  // $ stack
  svg += `<text x="20" y="${y}" class="term-prompt">$</text>`;
  svg += `<text x="34" y="${y}" class="term-cmd">stack</text>`;
  y += 18;
  svg += `<text x="34" y="${y}" class="term-output">${stack.join('  ·  ')}</text>`;

  y += 24;

  // $ status
  svg += `<text x="20" y="${y}" class="term-prompt">$</text>`;
  svg += `<text x="34" y="${y}" class="term-cmd">status</text>`;
  y += 18;

  // Status with colored dots
  let statusX = 34;
  status.forEach((s, i) => {
    const color = i === 0 ? t.success : i === 1 ? t.primary : t.secondary;
    svg += `<circle cx="${statusX + 4}" cy="${y - 3}" r="3" fill="${color}" opacity="0.8"/>`;
    svg += `<text x="${statusX + 12}" y="${y}" class="term-item" fill="${color}">${s}</text>`;
    statusX += s.length * 6 + 30;
  });

  // Blinking cursor
  svg += `<rect x="20" y="${y + 10}" width="7" height="12" fill="${t.primary}" opacity="0.8">
    <animate attributeName="opacity" values="0.8;0;0.8" dur="1.2s" repeatCount="indefinite"/>
  </rect>`;

  // Border
  svg += `<rect width="${W}" height="${H}" fill="none" stroke="${t.border}" stroke-width="1" rx="8"/>`;

  svg += `</svg>`;
  return svg;
}
