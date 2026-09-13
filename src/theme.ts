export interface ThemeConfig {
  background: string;
  surface: string;
  surfaceAlt: string;
  primary: string;
  secondary: string;
  highlight: string;
  muted: string;
  border: string;
  glow: string;
  success: string;
  warning: string;
}

export const DEFAULT_THEME: ThemeConfig = {
  background: '#05070A',
  surface: '#0B1117',
  surfaceAlt: '#111820',
  primary: '#00D9FF',
  secondary: '#1479FF',
  highlight: '#EAF7FF',
  muted: '#7F95A5',
  border: '#1A2736',
  glow: 'rgba(0,217,255,0.15)',
  success: '#00FF88',
  warning: '#FFB800',
};

export interface SkillPercentages {
  cybersecurity: number;
  networking: number;
  linux: number;
  programming: number;
}

export interface FeaturedScoreWeights {
  activity: number;
  stars: number;
  recentActivity: number;
  relevance: number;
}

export const DEFAULT_FEATURED_WEIGHTS: FeaturedScoreWeights = {
  activity: 0.30,
  stars: 0.20,
  recentActivity: 0.25,
  relevance: 0.25,
};
