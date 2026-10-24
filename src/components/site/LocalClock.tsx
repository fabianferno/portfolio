import { useEffect, useState } from 'react'

let formatter = new Intl.DateTimeFormat('en-GB', {
  hour: '2-digit',
  minute: '2-digit',
  second: '2-digit',
  hour12: false,
  timeZone: 'Asia/Kolkata',
})

// Rendered client-side only so server and client markup never disagree on the time.
export function LocalClock() {
  let [time, setTime] = useState<string | null>(null)

  useEffect(() => {
    let tick = () => setTime(formatter.format(new Date()))
    tick()
    let id = setInterval(tick, 1000)
    return () => clearInterval(id)
  }, [])

  return (
    <time className="tabular-nums" suppressHydrationWarning>
      {time ?? '--:--:--'}
    </time>
  )
}
