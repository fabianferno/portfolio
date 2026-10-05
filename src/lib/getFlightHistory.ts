import { Octokit } from '@octokit/core'
import flightHistoryFallback from '@/data/flights.json'

export interface FlightHistory {
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

const fallback = flightHistoryFallback as FlightHistory

/**
 * Loads the latest flight history from the private fabianferno/flights repo.
 * Never throws: falls back to the bundled snapshot so the page always renders.
 */
export async function getFlightHistory(): Promise<{
  history: FlightHistory
  live: boolean
}> {
  if (!token) {
    console.warn('[flights] GitHub token not configured, using bundled snapshot.')
    return { history: fallback, live: false }
  }

  try {
    const octokit = new Octokit({ auth: token })
    const response = await octokit.request(
      'GET /repos/{owner}/{repo}/contents/{path}',
      {
        owner: 'fabianferno',
        repo: 'flights',
        path: 'fabian-flight-history.json',
        // Raw media type returns the file body directly (no base64, no 1MB cap).
        mediaType: { format: 'raw' },
      }
    )

    const body =
      typeof response.data === 'string'
        ? response.data
        : JSON.stringify(response.data)
    const history = JSON.parse(body) as FlightHistory

    if (!Array.isArray(history.flights) || !history.stats) {
      throw new Error('Unexpected flight history shape')
    }

    return { history, live: true }
  } catch (error) {
    const status =
      typeof error === 'object' && error !== null && 'status' in error
        ? (error as { status?: number }).status
        : undefined
    console.error(
      '[flights] Failed to fetch from GitHub, using bundled snapshot:',
      status ?? 'unknown',
      error instanceof Error ? error.message : error
    )
    return { history: fallback, live: false }
  }
}
