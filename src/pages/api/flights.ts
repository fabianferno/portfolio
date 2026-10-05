import { NextApiRequest, NextApiResponse } from 'next'
import { FlightHistory, getFlightHistory } from '@/lib/getFlightHistory'

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse<FlightHistory | { error: string }>
) {
  if (req.method !== 'GET') {
    res.status(405).json({ error: 'Method not allowed' })
    return
  }

  const { history, live } = await getFlightHistory()

  // Live data refreshes often; the bundled snapshot can be cached longer.
  res.setHeader(
    'Cache-Control',
    live
      ? 's-maxage=600, stale-while-revalidate=3600'
      : 's-maxage=3600, stale-while-revalidate=86400'
  )
  res.status(200).json(history)
}
