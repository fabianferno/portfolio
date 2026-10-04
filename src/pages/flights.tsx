import Head from 'next/head'
import { useMemo, useState } from 'react'
import dynamic from 'next/dynamic'
import { motion } from 'framer-motion'
import { Card } from '@/components/Card'
import { SimpleLayout } from '@/components/SimpleLayout'
import SafeLayout from '@/components/SafeLayout'
import flightHistory from '@/data/flights.json'

// WebGL scene — client-only, so it never runs during SSR.
const FlightMap = dynamic(() => import('@/components/FlightMap'), {
  ssr: false,
  loading: () => (
    <div className="flex h-[420px] w-full items-center justify-center text-sm text-zinc-400 sm:h-[520px]">
      Charting routes…
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
}

const history = flightHistory as FlightHistory

const STATUS_FILTERS = ['all', 'flown', 'confirmed', 'cancelled'] as const
type StatusFilter = (typeof STATUS_FILTERS)[number]

const statusStyles: Record<string, string> = {
  flown:
    'bg-orange-100 text-orange-700 dark:bg-orange-500/10 dark:text-orange-300',
  confirmed:
    'bg-amber-100 text-amber-700 dark:bg-amber-500/10 dark:text-amber-300',
  cancelled:
    'bg-slate-100 text-slate-600 dark:bg-slate-500/10 dark:text-slate-300',
}

function formatDate(iso: string) {
  return new Date(iso).toLocaleDateString('en-US', {
    day: 'numeric',
    month: 'short',
    year: 'numeric',
  })
}

function formatTime(iso: string) {
  // Preserve the original local time as written in the ISO string
  // (avoids shifting by the viewer's timezone).
  const match = iso.match(/T(\d{2}:\d{2})/)
  return match ? match[1] : ''
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

function FlightCard({ flight }: { flight: Flight }) {
  const badge =
    statusStyles[flight.status] ??
    'bg-zinc-100 text-zinc-600 dark:bg-zinc-800 dark:text-zinc-300'

  return (
    <Card as="li">
      <div className="flex items-center justify-between gap-4">
        <span className="text-sm font-medium text-zinc-500 dark:text-zinc-400">
          {flight.airline.name} · {flight.flightNumber}
        </span>
        <span
          className={`inline-flex items-center rounded-full px-2.5 py-0.5 text-xs font-medium capitalize ${badge}`}
        >
          {flight.status}
        </span>
      </div>

      <div className="mt-4 flex items-center gap-3">
        <div className="text-center">
          <div className="text-xl font-bold text-zinc-800 dark:text-zinc-100">
            {flight.departureAirport.iata}
          </div>
          <div className="text-xs text-zinc-500 dark:text-zinc-400">
            {flight.departureAirport.city}
          </div>
          <div className="mt-1 text-xs text-zinc-400">
            {formatTime(flight.departureDateTime)}
          </div>
        </div>

        <div className="flex flex-1 items-center">
          <span className="h-px flex-1 bg-zinc-200 dark:bg-zinc-700" />
          <svg
            viewBox="0 0 24 24"
            fill="currentColor"
            className="mx-1 h-4 w-4 text-teal-500"
            aria-hidden="true"
          >
            <path d="M21 16v-2l-8-5V3.5a1.5 1.5 0 0 0-3 0V9l-8 5v2l8-2.5V19l-2 1.5V22l3.5-1 3.5 1v-1.5L13 19v-5.5L21 16Z" />
          </svg>
          <span className="h-px flex-1 bg-zinc-200 dark:bg-zinc-700" />
        </div>

        <div className="text-center">
          <div className="text-xl font-bold text-zinc-800 dark:text-zinc-100">
            {flight.arrivalAirport.iata}
          </div>
          <div className="text-xs text-zinc-500 dark:text-zinc-400">
            {flight.arrivalAirport.city}
          </div>
          <div className="mt-1 text-xs text-zinc-400">
            {formatTime(flight.arrivalDateTime)}
          </div>
        </div>
      </div>

      <div className="mt-4 flex items-center justify-between text-xs text-zinc-500 dark:text-zinc-400">
        <span>{formatDate(flight.departureDateTime)}</span>
        {flight.cabinClass ? <span>{flight.cabinClass}</span> : null}
      </div>
    </Card>
  )
}

export default function Flights() {
  const [filter, setFilter] = useState<StatusFilter>('all')

  const flights = useMemo(() => {
    const sorted = [...history.flights].sort(
      (a, b) =>
        new Date(b.departureDateTime).getTime() -
        new Date(a.departureDateTime).getTime()
    )
    return filter === 'all'
      ? sorted
      : sorted.filter((f) => f.status === filter)
  }, [filter])

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
            <FlightMap flights={flights} />
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
              <span className="ml-auto">drag to orbit · scroll to zoom</span>
            </p>
          </div>

          <div className="mt-10 flex flex-wrap gap-2">
            {STATUS_FILTERS.map((status) => {
              const active = filter === status
              return (
                <button
                  key={status}
                  onClick={() => setFilter(status)}
                  className={`rounded-full px-4 py-1.5 text-sm font-medium capitalize transition ${
                    active
                      ? 'bg-zinc-800 text-white dark:bg-zinc-100 dark:text-zinc-900'
                      : 'bg-zinc-100 text-zinc-600 hover:bg-zinc-200 dark:bg-zinc-800 dark:text-zinc-300 dark:hover:bg-zinc-700'
                  }`}
                >
                  {status}
                  {status !== 'all' ? (
                    <span className="ml-1.5 opacity-60">
                      {stats.byStatus[status] ?? 0}
                    </span>
                  ) : null}
                </button>
              )
            })}
          </div>

          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 1 }}
          >
            <ul
              role="list"
              className="mt-10 grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-3"
            >
              {flights.map((flight, index) => (
                <FlightCard
                  key={`${flight.flightNumber}-${flight.departureDateTime}-${index}`}
                  flight={flight}
                />
              ))}
            </ul>
          </motion.div>

          <p className="mt-12 text-sm text-zinc-500 dark:text-zinc-400">
            Snapshot generated {formatDate(history.generatedAt)} · {history.source}
          </p>
        </SafeLayout>
      </SimpleLayout>
    </>
  )
}
