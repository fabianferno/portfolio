import Head from 'next/head'
import dynamic from 'next/dynamic'
import { SimpleLayout } from '@/components/SimpleLayout'
import SafeLayout from '@/components/SafeLayout'
import { GetStaticProps } from 'next'
import { getFlightHistory } from '@/lib/getFlightHistory'

// Canvas dot matrix — client-only, so it never runs during SSR.
const FlightMap = dynamic(() => import('@/components/FlightMap'), {
  ssr: false,
  loading: () => (
    <div className="flex aspect-[2/1] w-full items-center justify-center rounded-3xl bg-[#0a0a0a] text-sm text-zinc-500">
      Plotting dots…
    </div>
  ),
})

interface Airport {
  iata: string
  city: string
}

interface Airline {
  name: string
  iata: string
}

interface Flight {
  airline: Airline
  flightNumber: string
  bookingReference?: string
  departureAirport: Airport
  arrivalAirport: Airport
  departureDateTime: string
  arrivalDateTime: string
  passengerName: string
  cabinClass?: string
  status: string
  ticketSource?: string
  subject?: string
  notes?: string
}

interface FlightHistory {
  generatedAt: string
  source: string
  passenger: string
  flights: Flight[]
  stats: {
    totalSegments: number
    airlines: string[]
    dateRange: { earliest: string; latest: string }
    byStatus: Record<string, number>
  }
  coverageNotes?: string
}

function Stat({ label, value }: { label: string; value: string | number }) {
  return (
    <div className="rounded-2xl border border-zinc-100 p-4 dark:border-zinc-700/40">
      <dt className="text-sm text-zinc-500 dark:text-zinc-400">{label}</dt>
      <dd className="mt-1 text-2xl font-semibold text-zinc-800 dark:text-zinc-100">
        {value}
      </dd>
    </div>
  )
}

interface FlightsProps {
  history: FlightHistory
}

// ISR: rebuilt at most every 10 minutes with the latest data from the
// public flights repo; falls back to the bundled snapshot if GitHub fails.
export const getStaticProps: GetStaticProps<FlightsProps> = async () => {
  const { history } = await getFlightHistory()
  return {
    props: { history: history as FlightHistory },
    revalidate: 600,
  }
}

export default function Flights({ history }: FlightsProps) {
  const { stats } = history

  return (
    <>
      <Head>
        <title>Flights - Fabian Ferno</title>
        <meta
          name="description"
          content="A log of the flights I've taken, mined from my inbox — where I've been and where I'm headed next."
        />
      </Head>
      <SimpleLayout
        title="every place i’ve flown to, and back from."
        intro="a running log of my flight segments, quietly mined from my inbox. from a first hop out of paris to wherever i'm headed next — the routes, the airlines, and the ones that never took off."
      >
        <SafeLayout>
          <dl className="grid grid-cols-2 gap-4 sm:grid-cols-4">
            <Stat label="Segments" value={stats.totalSegments} />
            <Stat label="Flown" value={stats.byStatus.flown ?? 0} />
            <Stat label="Airlines" value={stats.airlines.length} />
            <Stat
              label="Since"
              value={new Date(stats.dateRange.earliest).getFullYear()}
            />
          </dl>

          <div className="mt-10">
            <FlightMap flights={history.flights} />
            <p className="mt-3 flex flex-wrap items-center gap-x-4 gap-y-1 text-xs text-zinc-500 dark:text-zinc-400">
              <span className="inline-flex items-center gap-1.5">
                <span className="h-2 w-2 rounded-full bg-[#ff9e6b]" /> Flown
              </span>
              <span className="inline-flex items-center gap-1.5">
                <span className="h-2 w-2 rounded-full bg-[#ffd15c]" /> Confirmed
              </span>
              <span className="inline-flex items-center gap-1.5">
                <span className="h-2 w-2 rounded-full bg-[#5a6b82]" /> Cancelled
              </span>
            </p>
          </div>
        </SafeLayout>
      </SimpleLayout>
    </>
  )
}
