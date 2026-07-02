import { NextResponse } from "next/server";
import { getPublicGithubRepositories } from "@/lib/github";

export const dynamic = "force-dynamic";

const GITHUB_USERNAME = "roposropos";

export async function GET() {
  const repositories = await getPublicGithubRepositories(GITHUB_USERNAME, {
    fresh: true
  });
  const projectRepositories = repositories.filter(
    (repository) => repository.name.toLowerCase() !== GITHUB_USERNAME
  );
  const repoCount = projectRepositories.length;

  return NextResponse.json(
    {
      repoCount,
      repositories: projectRepositories
    },
    {
      headers: {
        "Cache-Control": "no-store, max-age=0"
      }
    }
  );
}
