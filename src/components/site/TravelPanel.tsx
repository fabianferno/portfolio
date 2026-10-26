import { ComponentProps, useEffect, useState } from 'react'
import dynamic from 'next/dynamic'

// Canvas dot matrix — client-only.
const FlightMap = dynamic(() => import('@/components/FlightMap'), {
  ssr: false,
})

type Flights = ComponentProps<typeof FlightMap>['flights']

export function TravelPanel() {
  const [flights, setFlights] = useState<Flights | null>(null)

  useEffect(() => {
    let cancelled = false
    fetch('/api/flights')
      .then((r) => r.json())
      .then((h) => !cancelled && setFlights(h.flights))
      .catch(() => {})
    return () => {
      cancelled = true
    }
  }, [])

  if (!flights) {
    return (
      <div className="flex aspect-[2/1] w-full items-center justify-center rounded-2xl bg-[#0a0a0a] text-sm text-white/50">
        Plotting dots…
      </div>
    )
  }

  return (
    <div className="overflow-hidden rounded-2xl shadow-[0_10px_30px_-12px_rgba(0,0,0,0.5)]">
      <FlightMap flights={flights} compact places />
    </div>
  )
}
