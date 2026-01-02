interface GitHubRepo {
  id: number;
  name: string;
  full_name: string;
  description: string;
  html_url: string;
  stargazers_count: number;
  forks_count: number;
  open_issues_count: number;
  language: string;
  created_at: string;
  updated_at: string;
  topics: string[];
}

export interface GitHubContributor {
  id: number;
  login: string;
  avatar_url: string;
  html_url: string;
  contributions: number;
}

export interface GitHubStats {
  stars: number;
  forks: number;
  contributors: number;
  commits: number;
  issues: number;
}

const GITHUB_API_BASE = 'https://api.github.com';
const REPO_OWNER = 'PraiseTechzw';
const REPO_NAME = 'OpenLaunch';

// Cache duration in milliseconds (5 minutes)
const CACHE_DURATION = 5 * 60 * 1000;

// Simple in-memory cache
const cache = new Map<string, { data: any; timestamp: number }>();

async function fetchWithCache<T>(key: string, fetcher: () => Promise<T>): Promise<T> {
  const cached = cache.get(key);
  const now = Date.now();
  
  if (cached && (now - cached.timestamp) < CACHE_DURATION) {
    return cached.data;
  }
  
  try {
    const data = await fetcher();
    cache.set(key, { data, timestamp: now });
    return data;
  } catch (error) {
    // If API fails, return cached data if available
    if (cached) {
      return cached.data;
    }
    throw error;
  }
}

export async function getRepoInfo(): Promise<GitHubRepo> {
  return fetchWithCache(`repo-${REPO_OWNER}-${REPO_NAME}`, async () => {
    const response = await fetch(`${GITHUB_API_BASE}/repos/${REPO_OWNER}/${REPO_NAME}`);
    if (!response.ok) {
      throw new Error(`GitHub API error: ${response.status}`);
    }
    return response.json();
  });
}

export async function getContributors(): Promise<GitHubContributor[]> {
  return fetchWithCache(`contributors-${REPO_OWNER}-${REPO_NAME}`, async () => {
    const response = await fetch(`${GITHUB_API_BASE}/repos/${REPO_OWNER}/${REPO_NAME}/contributors`);
    if (!response.ok) {
      throw new Error(`GitHub API error: ${response.status}`);
    }
    return response.json();
  });
}

export async function getRepoStats(): Promise<GitHubStats> {
  return fetchWithCache(`stats-${REPO_OWNER}-${REPO_NAME}`, async () => {
    const [repoInfo, contributors] = await Promise.all([
      getRepoInfo(),
      getContributors()
    ]);
    
    return {
      stars: repoInfo.stargazers_count,
      forks: repoInfo.forks_count,
      contributors: contributors.length,
      commits: contributors.reduce((sum, contributor) => sum + contributor.contributions, 0),
      issues: repoInfo.open_issues_count,
    };
  });
}

export async function getReadmeContent(): Promise<string> {
  return fetchWithCache(`readme-${REPO_OWNER}-${REPO_NAME}`, async () => {
    const response = await fetch(`${GITHUB_API_BASE}/repos/${REPO_OWNER}/${REPO_NAME}/readme`);
    if (!response.ok) {
      throw new Error(`GitHub API error: ${response.status}`);
    }
    const data = await response.json();
    return Buffer.from(data.content, 'base64').toString('utf-8');
  });
}

// Fallback data in case GitHub API is unavailable
export const fallbackStats: GitHubStats = {
  stars: 1,
  forks: 0,
  contributors: 1,
  commits: 10,
  issues: 0,
};

export const fallbackContributors: GitHubContributor[] = [
  {
    id: 1,
    login: 'PraiseTechzw',
    avatar_url: 'https://avatars.githubusercontent.com/u/1?v=4',
    html_url: 'https://github.com/PraiseTechzw',
    contributions: 10,
  },
];