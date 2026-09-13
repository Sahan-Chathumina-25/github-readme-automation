import type { GitHubData, GitHubRepository, GitHubUser } from '../types.js';

const GITHUB_API = 'https://api.github.com';

interface FetchOptions {
  token?: string;
}

async function githubFetch<T>(endpoint: string, options: FetchOptions = {}): Promise<T> {
  const headers: Record<string, string> = {
    Accept: 'application/vnd.github.v3+json',
    'User-Agent': 'github-readme-automation',
  };

  if (options.token) {
    headers.Authorization = `Bearer ${options.token}`;
  }

  const response = await fetch(`${GITHUB_API}${endpoint}`, { headers });

  if (!response.ok) {
    if (response.status === 401) {
      throw new Error('GitHub authentication failed. Check GITHUB_TOKEN permissions.');
    }
    if (response.status === 403) {
      throw new Error('GitHub API rate limit exceeded. Try again later or use a token.');
    }
    if (response.status === 404) {
      throw new Error(`GitHub resource not found: ${endpoint}`);
    }
    throw new Error(`GitHub API error: ${response.status} ${response.statusText}`);
  }

  return response.json() as Promise<T>;
}

export async function fetchGitHubData(username: string, token?: string): Promise<GitHubData> {
  const fetchOpts: FetchOptions = token ? { token } : {};

  const [user, repos] = await Promise.all([
    githubFetch<GitHubUser>(`/users/${username}`, fetchOpts),
    githubFetch<GitHubRepository[]>(`/users/${username}/repos?per_page=100&sort=updated`, fetchOpts),
  ]);

  const publicRepos = repos.filter((r) => !r.fork && !r.archived);

  const topLanguages = computeTopLanguages(publicRepos);
  const totalStars = publicRepos.reduce((sum, r) => sum + r.stargazers_count, 0);
  const totalForks = publicRepos.reduce((sum, r) => sum + r.forks_count, 0);

  return {
    user,
    repositories: publicRepos,
    topLanguages,
    totalStars,
    totalForks,
  };
}

function computeTopLanguages(repos: GitHubRepository[]): Record<string, number> {
  const langs: Record<string, number> = {};
  for (const repo of repos) {
    if (repo.language) {
      langs[repo.language] = (langs[repo.language] || 0) + 1;
    }
  }
  return Object.fromEntries(
    Object.entries(langs).sort(([, a], [, b]) => b - a).slice(0, 10)
  );
}

export function scoreRepository(repo: GitHubRepository, categoryKeywords: string[]): number {
  let score = 0;

  score += repo.stargazers_count * 2;
  score += repo.forks_count * 3;

  const hasTopics = repo.topics.length > 0;
  if (hasTopics) score += 5;

  if (repo.description && repo.description.length > 20) score += 5;

  const age = Date.now() - new Date(repo.updated_at).getTime();
  const daysSinceUpdate = age / (1000 * 60 * 60 * 24);
  if (daysSinceUpdate < 30) score += 10;
  else if (daysSinceUpdate < 90) score += 5;

  const nameAndTopics = `${repo.name} ${repo.topics.join(' ')}`.toLowerCase();
  for (const kw of categoryKeywords) {
    if (nameAndTopics.includes(kw.toLowerCase())) {
      score += 8;
      break;
    }
  }

  return score;
}

export function getFeaturedRepositories(
  repos: GitHubRepository[],
  manualOverrides?: string[],
  maxCount = 6
): GitHubRepository[] {
  if (manualOverrides && manualOverrides.length > 0) {
    const overridden = manualOverrides
      .map((name) => repos.find((r) => r.name === name))
      .filter((r): r is GitHubRepository => r !== undefined);
    if (overridden.length >= maxCount) return overridden.slice(0, maxCount);
    const remaining = repos
      .filter((r) => !manualOverrides.includes(r.name))
      .sort((a, b) => scoreRepoSimple(b) - scoreRepoSimple(a));
    return [...overridden, ...remaining].slice(0, maxCount);
  }

  const keywords = ['cyber', 'security', 'network', 'linux', 'hack', 'ctf', 'firewall', 'bash', 'automation'];
  return [...repos]
    .sort((a, b) => scoreRepository(b, keywords) - scoreRepository(a, keywords))
    .slice(0, maxCount);
}

function scoreRepoSimple(repo: GitHubRepository): number {
  return repo.stargazers_count * 2 + repo.forks_count * 3 + (repo.description ? 5 : 0);
}
