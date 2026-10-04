import { NextApiRequest, NextApiResponse } from 'next'
import { Octokit } from '@octokit/core'
import flightHistoryFallback from '@/data/flights.json'

interface FlightHistory {
  generatedAt: string
  source: string
  passenger: string
  flights: unknown[]
  stats: {
    totalSegments: number
    airlines: string[]
    dateRange: { earliest: string; latest: string }
    byStatus: Record<string, number>
  }
  coverageNotes?: string
}

// Server-only token. Prefer GITHUB_TOKEN (not exposed to the browser).
// Falls back to the legacy NEXT_PUBLIC_ var so existing setups keep working.
const token = process.env.GITHUB_TOKEN || process.env.NEXT_PUBLIC_GITHUB_TOKEN

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse<FlightHistory | { error: string }>
) {
  if (req.method !== 'GET') {
    res.status(405).json({ error: 'Method not allowed' })
    return
  }

  if (!token) {
    console.warn(
      '[api/flights] GitHub token not configured, serving static fallback.'
    )
    // No token: serve the bundled snapshot without failing.
    res.setHeader(
      'Cache-Control',
      's-maxage=3600, stale-while-revalidate=86400'
    )
    res.status(200).json(flightHistoryFallback as FlightHistory)
    return
  }

  try {
    const octokit = new Octokit({ auth: token })

    // Fetch the live JSON from the private fabianferno/flights repository
    const response = await octokit.request(
      'GET /repos/{owner}/{repo}/contents/{path}',
      {
        owner: 'fabianferno',
        repo: 'flights',
        path: 'fabian-flight-history.json',
      }
    )

    if (
      'content' in response.data &&
      typeof response.data.content === 'string'
    ) {
      // Decode Base64 content
      const decoded = Buffer.from(response.data.content, 'base64').toString(
        'utf-8'
      )
      const flightData: FlightHistory = JSON.parse(decoded)

      // Cache at the CDN edge for short ISR-style updates
      res.setHeader(
        'Cache-Control',
        's-maxage=600, stale-while-revalidate=3600'
      )
      res.status(200).json(flightData)
    } else {
      throw new Error('Unexpected response format from GitHub API')
    }
  } catch (error) {
    const status =
      typeof error === 'object' && error !== null && 'status' in error
        ? (error as { status?: number }).status
        : undefined

    console.error(
      '[api/flights] Failed to fetch from GitHub, serving static fallback:',
      status ?? 'unknown',
      error instanceof Error ? error.message : error
    )

    // On error: serve the bundled snapshot so the page still renders
    res.setHeader(
      'Cache-Control',
      's-maxage=3600, stale-while-revalidate=86400'
    )
    res.status(200).json(flightHistoryFallback as FlightHistory)
  }
}
