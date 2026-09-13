import type { ThemeConfig } from '../theme.js';

function escapeXml(str: string): string {
  return str.replace(/&/g, '&amp;').replace(/</g, '&lt;').replace(/>/g, '&gt;').replace(/"/g, '&quot;');
}

export interface TimelineItem {
  year: string;
  title: string;
  subtitle?: string;
  status?: 'Completed' | 'In Progress' | 'Planned';
}

export function generateTimeline(
  items: TimelineItem[],
  theme: ThemeConfig,
  width = 600
): string {
  const nodeRadius = 6;
  const rowHeight = 70;
  const totalHeight = items.length * rowHeight + 30;
  const lineX = 60;

  const statusColor = (s?: string) => {
    if (s === 'Completed') return theme.success;
    if (s === 'In Progress') return theme.primary;
    return theme.muted;
  };

  const entries = items.map((item, i) => {
    const y = i * rowHeight + 30;
    const color = statusColor(item.status);

    return `
  <circle cx="${lineX}" cy="${y}" r="${nodeRadius}" fill="${theme.background}" stroke="${color}" stroke-width="2"/>
  <circle cx="${lineX}" cy="${y}" r="2.5" fill="${color}">
    <animate attributeName="opacity" values="0.6;1;0.6" dur="2s" repeatCount="indefinite" begin="${i * 0.3}s"/>
  </circle>
  <text x="${lineX + 20}" y="${y - 8}" font-family="'SF Mono','Cascadia Code','Consolas',monospace" font-size="13" font-weight="600" fill="${color}">${escapeXml(item.year)}</text>
  <text x="${lineX + 20}" y="${y + 8}" font-family="'Segoe UI','Inter',Arial,sans-serif" font-size="14" fill="${theme.highlight}">${escapeXml(item.title)}</text>
  ${item.subtitle ? `<text x="${lineX + 20}" y="${y + 24}" font-family="'Segoe UI','Inter',Arial,sans-serif" font-size="12" fill="${theme.muted}">${escapeXml(item.subtitle)}</text>` : ''}`;
  }).join('');

  const lineEnd = (items.length - 1) * rowHeight + 30;

  return `<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 ${width} ${totalHeight}" width="${width}" height="${totalHeight}">
  <line x1="${lineX}" y1="20" x2="${lineX}" y2="${lineEnd}" stroke="${theme.border}" stroke-width="1.5" opacity="0.4"/>
  ${entries}
</svg>`;
}
