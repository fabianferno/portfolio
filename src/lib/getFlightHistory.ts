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

const SOURCE_URL =
  'https://raw.githubusercontent.com/fabianferno/flights/HEAD/fabian-flight-history.json'

const fallback = flightHistoryFallback as FlightHistory

/**
 * Loads the latest flight history from the public fabianferno/flights repo.
 * Never throws: falls back to the bundled snapshot so the page always renders.
 */
export async function getFlightHistory(): Promise<{
  history: FlightHistory
  live: boolean
}> {
  try {
    const response = await fetch(SOURCE_URL)
    if (!response.ok) {
      throw new Error(`HTTP ${response.status}`)
    }
    const history = (await response.json()) as FlightHistory

    if (!Array.isArray(history.flights) || !history.stats) {
      throw new Error('Unexpected flight history shape')
    }

    return { history, live: true }
  } catch (error) {
    console.error(
      '[flights] Failed to fetch from GitHub, using bundled snapshot:',
      error instanceof Error ? error.message : error
    )
    return { history: fallback, live: false }
  }
}
