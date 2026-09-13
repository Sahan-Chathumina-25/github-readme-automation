import type { ThemeConfig, SkillPercentages } from './theme.js';

export interface ProfileConfig {
  profile: ProfileInfo;
  theme: ThemeConfig;
  skillPercentages: SkillPercentages;
  education: Education[];
  certifications: Certification[];
  skills: Skills;
  projects: Project[];
  ctf: CtfEntry[];
  labs: LabEntry[];
  social: SocialLinks;
  currentlyLearning: string[];
  featuredRepos?: string[];
}

export interface ProfileInfo {
  name: string;
  username: string;
  headline: string;
  location: string;
  about?: string;
}

export interface Education {
  degree: string;
  institution: string;
  status: 'Completed' | 'In Progress' | 'Planned';
  year?: string;
}

export interface Certification {
  name: string;
  provider: string;
  status: 'Completed' | 'In Progress' | 'Planned';
  year: string;
  credential?: string;
  module?: string;
}

export interface Skills {
  cybersecurity: SkillItem[];
  networking: SkillItem[];
  linux: SkillItem[];
  programming: SkillItem[];
  tools: SkillItem[];
}

export interface SkillItem {
  name: string;
  level: 'Learning' | 'Practicing' | 'Intermediate' | 'Advanced';
}

export interface Project {
  name: string;
  description: string;
  technologies: string[];
  category: string;
  status: 'Completed' | 'In Progress' | 'Learning' | 'Planned';
  github?: string;
  featured?: boolean;
}

export interface CtfEntry {
  platform: string;
  category: string;
  challenge: string;
  difficulty: string;
  skillsLearned: string[];
  writeup?: string;
}

export interface LabEntry {
  name: string;
  technology: string[];
  objective: string;
  status: 'Completed' | 'In Progress' | 'Learning' | 'Planned';
  repository?: string;
}

export interface SocialLinks {
  github: string;
  linkedin?: string;
  email?: string;
  twitter?: string;
  website?: string;
}

export interface GitHubData {
  user: GitHubUser;
  repositories: GitHubRepository[];
  topLanguages: Record<string, number>;
  totalStars: number;
  totalForks: number;
}

export interface GitHubUser {
  login: string;
  name: string;
  bio: string;
  public_repos: number;
  followers: number;
  following: number;
  avatar_url: string;
  created_at: string;
}

export interface GitHubRepository {
  name: string;
  description: string | null;
  html_url: string;
  language: string | null;
  stargazers_count: number;
  forks_count: number;
  topics: string[];
  updated_at: string;
  created_at: string;
  fork: boolean;
  archived: boolean;
}
