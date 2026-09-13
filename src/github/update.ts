import { readFileSync, writeFileSync, existsSync } from 'fs';
import { join } from 'path';

export async function updateGitHubReadme(
  readmeContent: string,
  username: string,
  token: string,
  dryRun = false
): Promise<{ success: boolean; message: string }> {
  if (!token) {
    return { success: false, message: 'GITHUB_TOKEN is required for updating README' };
  }

  const repo = `${username}/${username}`;
  const apiUrl = `https://api.github.com/repos/${repo}/contents/README.md`;

  const headers = {
    Accept: 'application/vnd.github.v3+json',
    Authorization: `Bearer ${token}`,
    'User-Agent': 'github-readme-automation',
    'Content-Type': 'application/json',
  };

  try {
    const existingResponse = await fetch(apiUrl, { headers });

    let existingSha: string | null = null;
    let existingContent = '';

    if (existingResponse.ok) {
      const existingData = (await existingResponse.json()) as { sha: string; content: string };
      existingSha = existingData.sha;
      existingContent = Buffer.from(existingData.content, 'base64').toString('utf-8');
    } else if (existingResponse.status === 404) {
      existingSha = null;
    } else {
      return {
        success: false,
        message: `Failed to fetch existing README: ${existingResponse.status} ${existingResponse.statusText}`,
      };
    }

    if (existingContent === readmeContent) {
      return { success: true, message: 'No changes detected. README is up to date.' };
    }

    if (dryRun) {
      return {
        success: true,
        message: `Dry run: README would be updated. ${existingSha ? 'Updating existing file.' : 'Creating new file.'}`,
      };
    }

    const encodedContent = Buffer.from(readmeContent).toString('base64');

    const body: Record<string, string> = {
      message: 'docs: update profile README',
      content: encodedContent,
    };

    if (existingSha) {
      body.sha = existingSha;
    }

    const updateResponse = await fetch(apiUrl, {
      method: 'PUT',
      headers,
      body: JSON.stringify(body),
    });

    if (!updateResponse.ok) {
      const errorData = await updateResponse.text();
      return {
        success: false,
        message: `Failed to update README: ${updateResponse.status} ${updateResponse.statusText}\n${errorData}`,
      };
    }

    const result = (await updateResponse.json()) as { content?: { html_url?: string } };
    const url = result.content?.html_url ?? `https://github.com/${repo}`;

    return { success: true, message: `README updated successfully.\nView at: ${url}` };
  } catch (err) {
    return {
      success: false,
      message: `Network error while updating README: ${(err as Error).message}`,
    };
  }
}
