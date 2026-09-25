import { NextApiRequest, NextApiResponse } from 'next'
import { Octokit } from '@octokit/core'

interface Project {
  html_url: string
  name: string
  description: string | null
  topics: string[] | undefined
  emoji: string
  private: boolean
  homepage?: string
}

// Server-only token. Prefer GITHUB_TOKEN (not exposed to the browser).
// Falls back to the legacy NEXT_PUBLIC_ var so existing setups keep working.
const token = process.env.GITHUB_TOKEN || process.env.NEXT_PUBLIC_GITHUB_TOKEN

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse<Project[] | { error: string }>
) {
  if (req.method !== 'GET') {
    res.status(405).json({ error: 'Method not allowed' })
    return
  }

  if (!token) {
    res
      .status(500)
      .json({ error: 'GitHub token is not configured on the server.' })
    return
  }

  try {
    const octokit = new Octokit({ auth: token })
    const response = await octokit.request('GET /user/repos', {
      per_page: 100,
      affiliation: 'owner',
      sort: 'updated',
    })

    const projects: Project[] = response.data
      .filter((project) => !project.topics?.includes('ignore'))
      .map((project) => ({
        html_url: project.html_url,
        name: project.name,
        description: project.description,
        topics: project.topics,
        private: project.private,
        homepage: project.homepage ?? undefined,
        // Generate a random emoji per repo for the card avatar.
        emoji: String.fromCodePoint(0x1f600 + Math.floor(Math.random() * 80)),
      }))

    // Cache at the CDN edge to cut down on GitHub API calls / rate limiting.
    res.setHeader(
      'Cache-Control',
      's-maxage=600, stale-while-revalidate=3600'
    )
    res.status(200).json(projects)
  } catch (error) {
    const status =
      typeof error === 'object' && error !== null && 'status' in error
        ? (error as { status?: number }).status
        : undefined
    const message =
      status === 401
        ? 'GitHub authentication failed — the configured token is invalid or expired.'
        : 'Failed to load projects from GitHub.'
    console.error(
      '[api/projects] GitHub request failed:',
      status ?? 'unknown',
      error instanceof Error ? error.message : error
    )
    res.status(502).json({ error: message })
  }
}
