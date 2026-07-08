import { Octokit } from "@octokit/rest";

const octokit = new Octokit({
  auth: process.env.GITHUB_TOKEN,
});

const GITHUB_USERNAME = "K4M0G3L0";
const LUMA_REPO = "luma-aios";

// Auto-calculate build day from real start date in CAT timezone
const BUILD_START = new Date("2026-06-17T00:00:00+02:00");
const TOTAL_DAYS = 90;

function getAutoDay(): number {
  const nowCAT = new Date(
    new Date().toLocaleString("en-US", { timeZone: "Africa/Johannesburg" })
  );
  const startCAT = new Date(
    BUILD_START.toLocaleString("en-US", { timeZone: "Africa/Johannesburg" })
  );
  const msPerDay = 1000 * 60 * 60 * 24;
  const day = Math.floor((nowCAT.getTime() - startCAT.getTime()) / msPerDay) + 1;
  return Math.max(1, Math.min(day, TOTAL_DAYS));
}

export interface GitHubCommit {
  sha: string;
  message: string;
  date: string;
  author: string;
  url: string;
  filesChanged?: number;
  additions?: number;
  deletions?: number;
}

export interface RepoStats {
  stars: number;
  forks: number;
  lastCommit: string;
  language: string;
  description: string;
}

export interface BuildProgress {
  currentDay: number;
  totalDays: number;
  percentComplete: number;
  currentModule: string;
  lastCommit: GitHubCommit | null;
  recentCommits: GitHubCommit[];
  stats: RepoStats | null;
}

// Cache for 5 minutes to avoid rate limiting
const CACHE_TTL = 5 * 60 * 1000;
const cache = new Map<string, { data: unknown; timestamp: number }>();

function getCache<T>(key: string): T | null {
  const item = cache.get(key);
  if (!item) return null;
  if (Date.now() - item.timestamp > CACHE_TTL) {
    cache.delete(key);
    return null;
  }
  return item.data as T;
}

function setCache(key: string, data: unknown): void {
  cache.set(key, { data, timestamp: Date.now() });
}

export async function getRecentCommits(
  repo: string = LUMA_REPO,
  count: number = 10
): Promise<GitHubCommit[]> {
  const cacheKey = `commits-${repo}-${count}`;
  const cached = getCache<GitHubCommit[]>(cacheKey);
  if (cached) return cached;

  try {
    const { data: commits } = await octokit.repos.listCommits({
      owner: GITHUB_USERNAME,
      repo,
      per_page: count,
    });

    const result: GitHubCommit[] = commits.map((c) => ({
      sha: c.sha.slice(0, 7),
      message: c.commit.message.split("\n")[0],
      date: c.commit.author?.date || new Date().toISOString(),
      author: c.commit.author?.name || GITHUB_USERNAME,
      url: c.html_url,
    }));

    setCache(cacheKey, result);
    return result;
  } catch (error) {
    console.error("GitHub API error:", error);
    return getMockCommits();
  }
}

export async function getRepoStats(
  repo: string = LUMA_REPO
): Promise<RepoStats | null> {
  const cacheKey = `stats-${repo}`;
  const cached = getCache<RepoStats>(cacheKey);
  if (cached) return cached;

  try {
    const { data } = await octokit.repos.get({
      owner: GITHUB_USERNAME,
      repo,
    });

    const result: RepoStats = {
      stars: data.stargazers_count,
      forks: data.forks_count,
      lastCommit: data.pushed_at || new Date().toISOString(),
      language: data.language || "Python",
      description: data.description || "",
    };

    setCache(cacheKey, result);
    return result;
  } catch {
    return null;
  }
}

export async function getBuildProgress(): Promise<BuildProgress> {
  const cacheKey = "build-progress";
  const cached = getCache<BuildProgress>(cacheKey);
  if (cached) return cached;

  const [commits, stats] = await Promise.all([
    getRecentCommits(LUMA_REPO, 10),
    getRepoStats(LUMA_REPO),
  ]);

  const currentDay = getAutoDay();
  const currentModule =
    process.env.BUILD_CURRENT_MODULE || "BuildOS";

  const result: BuildProgress = {
    currentDay,
    totalDays: TOTAL_DAYS,
    percentComplete: Math.round((currentDay / TOTAL_DAYS) * 100),
    currentModule,
    lastCommit: commits[0] || null,
    recentCommits: commits,
    stats,
  };

  setCache(cacheKey, result);
  return result;
}

export function expandCommitMessage(commitMsg: string): string {
  const expansions: Record<string, string> = {
    "feat: Day 1": "Initialized LUMA AIOS core architecture — FastAPI backend, React frontend, PostgreSQL database, and JWT authentication foundation.",
    "feat: Day 2": "Built Business DNA Engine — organizations, company profiles, user management, and industry classification.",
    "feat: Day 3": "Implemented LUMA Memory Core — structured business memory, vector embeddings, document RAG pipeline, and context retrieval engine.",
    "feat: Day 4": "Activated Multi-Agent Intelligence Framework — CEO Agent orchestrating Procurement, Finance, Logistics, and Security specialist agents.",
    "feat: Day 5": "BloomOS Opportunity Intelligence live — tender analysis, PPPFA scoring, bid decisions, and compliance checking.",
    "feat: Day 6": "LUMA Command Center deployed — real-time agent monitoring, LUMA Score algorithm, intelligence feed, and AI-generated recommendations.",
    "feat: Day 7": "Transparency Engine and Action Intelligence Engine complete — Decision Passports, confidence scoring, proactive notifications, and escalation.",
  };

  for (const [key, expansion] of Object.entries(expansions)) {
    if (commitMsg.toLowerCase().includes(key.toLowerCase())) {
      return expansion;
    }
  }

  return commitMsg;
}

function getMockCommits(): GitHubCommit[] {
  return [
    {
      sha: "a1b2c3d",
      message: "feat: Day 7 - Action Intelligence Engine (events, priority scoring, notifications, escalation)",
      date: new Date().toISOString(),
      author: "K4M0G3L0",
      url: "#",
    },
    {
      sha: "e4f5g6h",
      message: "feat: Day 6.5 - Transparency Engine (Decision Passports, confidence scoring, human review)",
      date: new Date(Date.now() - 86400000).toISOString(),
      author: "K4M0G3L0",
      url: "#",
    },
    {
      sha: "i7j8k9l",
      message: "feat: Day 6 - LUMA Command Center (dashboard, LUMA Score, agent monitoring)",
      date: new Date(Date.now() - 172800000).toISOString(),
      author: "K4M0G3L0",
      url: "#",
    },
    {
      sha: "m1n2o3p",
      message: "feat: Day 5 - BloomOS Opportunity Intelligence (tender engine + scoring + compliance)",
      date: new Date(Date.now() - 259200000).toISOString(),
      author: "K4M0G3L0",
      url: "#",
    },
    {
      sha: "q4r5s6t",
      message: "feat: Day 4 - Multi-Agent Intelligence Framework (CEO + 4 specialists)",
      date: new Date(Date.now() - 345600000).toISOString(),
      author: "K4M0G3L0",
      url: "#",
    },
  ];
}