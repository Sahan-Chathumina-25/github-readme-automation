import { describe, it, expect } from 'vitest';
import { scoreRepository, getFeaturedRepositories } from '../src/github/api.js';
import type { GitHubRepository } from '../src/types.js';

function makeRepo(overrides: Partial<GitHubRepository> = {}): GitHubRepository {
  return {
    name: 'test-repo',
    description: 'A test repository for testing purposes',
    html_url: 'https://github.com/test/test-repo',
    language: 'Python',
    stargazers_count: 5,
    forks_count: 2,
    topics: ['test'],
    updated_at: new Date().toISOString(),
    created_at: new Date().toISOString(),
    fork: false,
    archived: false,
    ...overrides,
  };
}

describe('Featured Repository Algorithm', () => {
  it('scores repos with more stars higher', () => {
    const repo1 = makeRepo({ stargazers_count: 0 });
    const repo2 = makeRepo({ stargazers_count: 10 });
    const keywords = ['cyber', 'security'];

    expect(scoreRepository(repo2, keywords)).toBeGreaterThan(scoreRepository(repo1, keywords));
  });

  it('scores repos with security keywords higher', () => {
    const security = makeRepo({ name: 'security-scanner', topics: ['security'] });
    const generic = makeRepo({ name: 'todo-app', topics: ['todo'] });
    const keywords = ['security', 'cyber'];

    expect(scoreRepository(security, keywords)).toBeGreaterThan(scoreRepository(generic, keywords));
  });

  it('scores repos with descriptions higher', () => {
    const withDesc = makeRepo({ description: 'A detailed description of the project' });
    const noDesc = makeRepo({ description: null });
    const keywords: string[] = [];

    expect(scoreRepository(withDesc, keywords)).toBeGreaterThan(scoreRepository(noDesc, keywords));
  });

  it('returns correct number of featured repos', () => {
    const repos = [
      makeRepo({ name: 'a' }),
      makeRepo({ name: 'b' }),
      makeRepo({ name: 'c' }),
      makeRepo({ name: 'd' }),
      makeRepo({ name: 'e' }),
      makeRepo({ name: 'f' }),
      makeRepo({ name: 'g' }),
    ];

    const featured = getFeaturedRepositories(repos, undefined, 6);
    expect(featured.length).toBe(6);
  });

  it('respects manual overrides', () => {
    const repos = [
      makeRepo({ name: 'alpha' }),
      makeRepo({ name: 'beta' }),
      makeRepo({ name: 'gamma' }),
    ];

    const featured = getFeaturedRepositories(repos, ['gamma', 'alpha'], 6);
    expect(featured[0].name).toBe('gamma');
    expect(featured[1].name).toBe('alpha');
  });

  it('handles empty repos array', () => {
    const featured = getFeaturedRepositories([], undefined, 6);
    expect(featured.length).toBe(0);
  });
});
