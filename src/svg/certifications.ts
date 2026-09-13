import type { ThemeConfig } from '../theme.js';

function esc(str: string): string {
  return str.replace(/&/g, '&amp;').replace(/</g, '&lt;').replace(/>/g, '&gt;').replace(/"/g, '&quot;');
}

export interface CertEntry {
  name: string;
  provider: string;
  status: string;
  year?: string;
  module?: string;
}

export function generateCertifications(certs: CertEntry[], theme: ThemeConfig): string {
  if (certs.length === 0) return '';

  const w = 700;
  const pad = 50;
  const lineX = 40;

  const statusColor = (s: string) => {
    if (s === 'Completed') return theme.success;
    if (s === 'In Progress') return theme.primary;
    return theme.muted;
  };

  const grouped: { provider: string; items: CertEntry[] }[] = [];
  for (const cert of certs) {
    const existing = grouped.find(g => g.provider === cert.provider);
    if (existing) {
      existing.items.push(cert);
    } else {
      grouped.push({ provider: cert.provider, items: [cert] });
    }
  }

  let totalItems = 0;
  const sections: string[] = [];

  for (const group of grouped) {
    const isMultiModule = group.items.length > 1 && group.items.some(c => c.module);

    if (isMultiModule) {
      const certName = group.items[0].name.replace(/:.*/, '');
      const year = group.items[0].year || '';
      const allCompleted = group.items.every(c => c.status === 'Completed');

      sections.push(`
  <!-- ${certName} Header -->
  <g opacity="0">
    <animate attributeName="opacity" values="0;1" dur="0.5s" begin="${totalItems * 0.2}s" fill="freeze"/>

    <circle cx="${lineX}" cy="${30 + totalItems * 80}" r="10" fill="${theme.background}" stroke="${allCompleted ? theme.success : theme.primary}" stroke-width="2"/>
    <circle cx="${lineX}" cy="${30 + totalItems * 80}" r="4" fill="${allCompleted ? theme.success : theme.primary}" opacity="0.8">
      <animate attributeName="opacity" values="0.5;1;0.5" dur="2s" repeatCount="indefinite"/>
    </circle>

    <rect x="${pad}" y="${30 + totalItems * 80 - 18}" width="${w - pad - 20}" height="36" rx="8" fill="${theme.surface}" opacity="0.7"/>
    <rect x="${pad}" y="${30 + totalItems * 80 - 18}" width="${w - pad - 20}" height="36" rx="8" fill="none" stroke="${allCompleted ? theme.success : theme.primary}" stroke-width="0.8" opacity="0.4"/>

    <text x="${pad + 16}" y="${30 + totalItems * 80 + 2}" font-family="'Segoe UI','Inter',Arial,sans-serif" font-size="15" font-weight="700" fill="${theme.highlight}">${esc(certName)}</text>
    <text x="${w - pad - 16}" y="${30 + totalItems * 80 + 2}" text-anchor="end" font-family="'SF Mono','Consolas',monospace" font-size="10" fill="${theme.muted}">${esc(year)}</text>
  </g>`);

      totalItems++;

      for (let j = 0; j < group.items.length; j++) {
        const item = group.items[j];
        const color = statusColor(item.status);
        const y = 30 + totalItems * 80;

        sections.push(`
  <!-- Module ${j + 1} -->
  <g opacity="0">
    <animate attributeName="opacity" values="0;1" dur="0.4s" begin="${totalItems * 0.2}s" fill="freeze"/>

    <line x1="${lineX}" y1="${y - 50}" x2="${lineX}" y2="${y - 10}" stroke="${theme.border}" stroke-width="1.5" stroke-dasharray="4 4" opacity="0.3"/>

    <circle cx="${lineX}" cy="${y}" r="6" fill="${theme.background}" stroke="${color}" stroke-width="1.5"/>
    <circle cx="${lineX}" cy="${y}" r="2.5" fill="${color}" opacity="0.8"/>

    <rect x="${pad + 20}" y="${y - 14}" width="${w - pad - 40}" height="56" rx="8" fill="${theme.surface}" opacity="0.6"/>
    <rect x="${pad + 20}" y="${y - 14}" width="${w - pad - 40}" height="56" rx="8" fill="none" stroke="${theme.border}" stroke-width="0.5"/>

    <rect x="${pad + 20}" y="${y - 4}" width="2" height="36" rx="1" fill="${color}" opacity="0.5"/>

    <text x="${pad + 36}" y="${y + 2}" font-family="'SF Mono','Consolas',monospace" font-size="8" fill="${color}" letter-spacing="1" opacity="0.7">${esc(item.module || `MODULE 0${j + 1}`)}</text>
    <text x="${pad + 36}" y="${y + 18}" font-family="'Segoe UI','Inter',Arial,sans-serif" font-size="12" font-weight="600" fill="${theme.highlight}">${esc(item.name.replace(/.*?:\s*/, ''))}</text>

    <rect x="${w - pad - 100}" y="${y + 2}" width="80" height="20" rx="10" fill="${theme.surfaceAlt}" stroke="${color}" stroke-width="0.8" opacity="0.8"/>
    <text x="${w - pad - 60}" y="${y + 16}" text-anchor="middle" font-family="'SF Mono','Consolas',monospace" font-size="7" fill="${color}" letter-spacing="0.5">${esc(item.status.toUpperCase())}</text>
  </g>`);

        totalItems++;
      }
    } else {
      for (const item of group.items) {
        const color = statusColor(item.status);
        const y = 30 + totalItems * 80;

        sections.push(`
  <!-- ${item.name} -->
  <g opacity="0">
    <animate attributeName="opacity" values="0;1" dur="0.5s" begin="${totalItems * 0.2}s" fill="freeze"/>

    ${totalItems > 0 ? `<line x1="${lineX}" y1="${y - 50}" x2="${lineX}" y2="${y - 10}" stroke="${theme.border}" stroke-width="1.5" stroke-dasharray="4 4" opacity="0.3"/>` : ''}

    <circle cx="${lineX}" cy="${y}" r="7" fill="${theme.background}" stroke="${color}" stroke-width="2"/>
    <circle cx="${lineX}" cy="${y}" r="3" fill="${color}" opacity="0.8">
      <animate attributeName="opacity" values="0.5;1;0.5" dur="2s" repeatCount="indefinite" begin="${totalItems * 0.2}s"/>
    </circle>

    <rect x="${pad}" y="${y - 14}" width="${w - pad - 20}" height="56" rx="10" fill="${theme.surface}" opacity="0.7"/>
    <rect x="${pad}" y="${y - 14}" width="${w - pad - 20}" height="56" rx="10" fill="none" stroke="${theme.border}" stroke-width="0.5"/>

    <rect x="${pad}" y="${y - 4}" width="2" height="36" rx="1" fill="${color}" opacity="0.5"/>

    <text x="${pad + 16}" y="${y + 4}" font-family="'SF Mono','Consolas',monospace" font-size="11" font-weight="600" fill="${color}">${esc(item.year || '')}</text>
    <text x="${pad + 16}" y="${y + 22}" font-family="'Segoe UI','Inter',Arial,sans-serif" font-size="14" font-weight="600" fill="${theme.highlight}">${esc(item.name)}</text>
    <text x="${pad + 16}" y="${y + 36}" font-family="'Segoe UI','Inter',Arial,sans-serif" font-size="11" fill="${theme.muted}">${esc(item.provider)}</text>

    <rect x="${w - pad - 90}" y="${y + 4}" width="76" height="22" rx="11" fill="${theme.surfaceAlt}" stroke="${color}" stroke-width="0.8" opacity="0.8"/>
    <text x="${w - pad - 52}" y="${y + 19}" text-anchor="middle" font-family="'SF Mono','Consolas',monospace" font-size="8" fill="${color}" letter-spacing="0.5">${esc(item.status.toUpperCase())}</text>
  </g>`);

        totalItems++;
      }
    }
  }

  const totalH = totalItems * 80 + 40;

  return `<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 ${w} ${totalH}" width="${w}" height="${totalH}">
  <line x1="${lineX}" y1="10" x2="${lineX}" y2="${totalH - 10}" stroke="${theme.border}" stroke-width="1" opacity="0.2"/>
  ${sections.join('\n')}
</svg>`;
}
