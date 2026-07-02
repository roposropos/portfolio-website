const GITHUB_REVALIDATE_SECONDS = 60 * 10;

type GithubFetchOptions = {
  fresh?: boolean;
};

type GitHubUserResponse = {
  public_repos?: number;
};

type GitHubRepositoryResponse = {
  id?: number;
  name?: string;
  full_name?: string;
  html_url?: string;
  description?: string | null;
  language?: string | null;
  stargazers_count?: number;
  forks_count?: number;
  fork?: boolean;
  archived?: boolean;
  updated_at?: string;
  topics?: string[];
};

export type GithubRepository = {
  id: number;
  name: string;
  fullName: string;
  url: string;
  description: string | null;
  language: string | null;
  stars: number;
  forks: number;
  isFork: boolean;
  isArchived: boolean;
  updatedAt: string | null;
  topics: string[];
};

function getGithubHeaders() {
  const headers: Record<string, string> = {
    Accept: "application/vnd.github+json"
  };

  if (process.env.GITHUB_TOKEN) {
    headers.Authorization = `Bearer ${process.env.GITHUB_TOKEN}`;
  }

  return headers;
}

function getGithubCacheOptions(options: GithubFetchOptions) {
  if (options.fresh) {
    return {
      cache: "no-store" as const
    };
  }

  return {
    next: {
      revalidate: GITHUB_REVALIDATE_SECONDS
    }
  };
}

export async function getPublicGithubRepoCount(
  username: string,
  options: GithubFetchOptions = {}
) {
  try {
    const response = await fetch(`https://api.github.com/users/${username}`, {
      headers: getGithubHeaders(),
      ...getGithubCacheOptions(options)
    });

    if (!response.ok) {
      return null;
    }

    const data = (await response.json()) as GitHubUserResponse;

    return typeof data.public_repos === "number" ? data.public_repos : null;
  } catch {
    return null;
  }
}

export async function getPublicGithubRepositories(
  username: string,
  options: GithubFetchOptions = {}
) {
  try {
    const response = await fetch(
      `https://api.github.com/users/${username}/repos?type=owner&sort=updated&direction=desc&per_page=100`,
      {
        headers: getGithubHeaders(),
        ...getGithubCacheOptions(options)
      }
    );

    if (!response.ok) {
      return [];
    }

    const data = (await response.json()) as GitHubRepositoryResponse[];

    return data
      .filter((repository) => repository.id && repository.name && repository.html_url)
      .map((repository) => ({
        id: repository.id ?? 0,
        name: repository.name ?? "",
        fullName: repository.full_name ?? repository.name ?? "",
        url: repository.html_url ?? "",
        description: repository.description ?? null,
        language: repository.language ?? null,
        stars: repository.stargazers_count ?? 0,
        forks: repository.forks_count ?? 0,
        isFork: repository.fork ?? false,
        isArchived: repository.archived ?? false,
        updatedAt: repository.updated_at ?? null,
        topics: repository.topics ?? []
      })) satisfies GithubRepository[];
  } catch {
    return [];
  }
}
