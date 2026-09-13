import type { ThemeConfig } from '../theme.js';

function escapeXml(str: string): string {
  return str.replace(/&/g, '&amp;').replace(/</g, '&lt;').replace(/>/g, '&gt;').replace(/"/g, '&quot;');
}

export interface AdvancedTimelineItem {
  year: string;
  title: string;
  subtitle?: string;
  status?: 'Completed' | 'In Progress' | 'Planned';
}

export function generateAdvancedTimeline(
  items: AdvancedTimelineItem[],
  theme: ThemeConfig,
  sectionTitle: string
): string {
  const width = 700;
  const itemH = 90;
  const gap = 10;
  const padding = 50;
  const lineX = 40;
  const totalH = items.length * (itemH + gap) + 40;

  const statusColor = (s?: string) => {
    if (s === 'Completed') return theme.success;
    if (s === 'In Progress') return theme.primary;
    return theme.muted;
  };

  const statusLabel = (s?: string) => {
    if (s === 'Completed') return 'COMPLETED';
    if (s === 'In Progress') return 'IN PROGRESS';
    return 'PLANNED';
  };

  const entries = items.map((item, i) => {
    const y = 30 + i * (itemH + gap);
    const color = statusColor(item.status);
    const label = statusLabel(item.status);
    const delay = i * 0.2;

    return `
  <!-- Item ${i + 1} -->
  <g opacity="0">
    <animate attributeName="opacity" values="0;1" dur="0.5s" begin="${delay}s" fill="freeze"/>

    <!-- Connection line -->
    ${i < items.length - 1 ? `<line x1="${lineX}" y1="${y + 12}" x2="${lineX}" y2="${y + itemH + gap - 4}" stroke="${theme.border}" stroke-width="1.5" stroke-dasharray="4 4" opacity="0.3"/>` : ''}

    <!-- Outer glow ring -->
    <circle cx="${lineX}" cy="${y + 6}" r="12" fill="none" stroke="${color}" stroke-width="0.5" opacity="0.3">
      <animate attributeName="r" values="10;14;10" dur="3s" repeatCount="indefinite" begin="${delay}s"/>
      <animate attributeName="opacity" values="0.3;0.1;0.3" dur="3s" repeatCount="indefinite" begin="${delay}s"/>
    </circle>

    <!-- Main node -->
    <circle cx="${lineX}" cy="${y + 6}" r="7" fill="${theme.background}" stroke="${color}" stroke-width="2"/>
    <circle cx="${lineX}" cy="${y + 6}" r="3" fill="${color}" opacity="0.8">
      <animate attributeName="opacity" values="0.5;1;0.5" dur="2s" repeatCount="indefinite" begin="${delay + 0.5}s"/>
    </circle>

    <!-- Card -->
    <rect x="${padding}" y="${y - 14}" width="${width - padding - 20}" height="${itemH}" rx="10" fill="${theme.surface}" opacity="0.7"/>
    <rect x="${padding}" y="${y - 14}" width="${width - padding - 20}" height="${itemH}" rx="10" fill="none" stroke="${theme.border}" stroke-width="0.5"/>

    <!-- Accent glow on left -->
    <rect x="${padding}" y="${y - 4}" width="2" height="${itemH - 20}" rx="1" fill="${color}" opacity="0.5"/>

    <!-- Year -->
    <text x="${padding + 16}" y="${y + 4}" font-family="'SF Mono','Consolas',monospace" font-size="11" font-weight="600" fill="${color}">${escapeXml(item.year)}</text>

    <!-- Title -->
    <text x="${padding + 16}" y="${y + 24}" font-family="'Segoe UI','Inter',Arial,sans-serif" font-size="15" font-weight="600" fill="${theme.highlight}">${escapeXml(item.title)}</text>

    <!-- Subtitle -->
    ${item.subtitle ? `<text x="${padding + 16}" y="${y + 42}" font-family="'Segoe UI','Inter',Arial,sans-serif" font-size="12" fill="${theme.muted}">${escapeXml(item.subtitle)}</text>` : ''}

    <!-- Status badge -->
    <rect x="${width - padding - 100}" y="${y + 4}" width="80" height="22" rx="11" fill="${theme.surfaceAlt}" stroke="${color}" stroke-width="0.8" opacity="0.8"/>
    <text x="${width - padding - 60}" y="${y + 19}" text-anchor="middle" font-family="'SF Mono',monospace" font-size="8" fill="${color}" letter-spacing="0.5">${label}</text>
  </g>`;
  }).join('');

  return `<div align="center">

## ${escapeXml(sectionTitle)}

<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 ${width} ${totalH}" width="${width}" height="${totalH}">
  <!-- Vertical line -->
  <line x1="${lineX}" y1="10" x2="${lineX}" y2="${totalH - 30}" stroke="${theme.border}" stroke-width="1" opacity="0.2"/>
  ${entries}
</svg>

</div>`;
}
