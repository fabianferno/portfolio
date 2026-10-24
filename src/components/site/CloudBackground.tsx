import { useEffect, useRef } from 'react'

// Cloud background: sky, cloud and weather.
// Adapted from "Cloud Generator" by Bálint Ferenczy (CodePen qENdpoL).
const lerp = (a: number, b: number, t: number) => a + (b - a) * t

// Free, key-less APIs: ipwho.is for IP geolocation, Open-Meteo for weather.
const GEO_URL = 'https://ipwho.is/?fields=success,latitude,longitude'
const FALLBACK_COORDS = { lat: 13.0827, lon: 80.2707 } // Chennai
const weatherUrl = (lat: number, lon: number) =>
  `https://api.open-meteo.com/v1/forecast?latitude=${lat}&longitude=${lon}&current=weather_code,cloud_cover,precipitation`

async function locateByIp(signal: AbortSignal) {
  try {
    let cached = sessionStorage.getItem('cloud-coords')
    if (cached) return JSON.parse(cached) as typeof FALLBACK_COORDS
  } catch {}
  try {
    let res = await fetch(GEO_URL, { signal })
    let geo = await res.json()
    if (geo.success) {
      let coords = { lat: geo.latitude, lon: geo.longitude }
      try {
        sessionStorage.setItem('cloud-coords', JSON.stringify(coords))
      } catch {}
      return coords
    }
  } catch {}
  return FALLBACK_COORDS
}
const REFRESH_MS = 10 * 60 * 1000

// Maps a WMO weather code plus cloud cover to a 0-100 "storminess".
function stormLevel(code: number, cover: number, precipitation: number) {
  if (code >= 95) return 100
  if (code >= 80) return 80
  if (code >= 61 && code <= 67) return 75
  if (code >= 71 && code <= 77) return 65
  if (code >= 51 && code <= 57) return 60
  if (code === 45 || code === 48) return 50
  return Math.min(100, cover * 0.4 + precipitation * 20)
}

export function CloudBackground() {
  let skyRef = useRef<HTMLDivElement>(null)
  let cloudRef = useRef<HTMLTextAreaElement>(null)
  let glowRef = useRef<HTMLDivElement>(null)
  let shadowRefs = useRef<(SVGFEFloodElement | null)[]>([])

  useEffect(() => {
    let cloud = cloudRef.current!
    let sky = skyRef.current!
    let glow = glowRef.current!

    // Cloud eases toward the cursor.
    let target = { x: 0, y: 0 }
    let pos = { x: 0, y: 0 }
    let frame = 0
    let tick = () => {
      pos.x += (target.x - pos.x) * 0.06
      pos.y += (target.y - pos.y) * 0.06
      cloud.style.transform = `translate(calc(-50% + ${pos.x}px), calc(-50% + ${pos.y}px))`
      frame = requestAnimationFrame(tick)
    }
    frame = requestAnimationFrame(tick)
    let onMove = (e: PointerEvent) => {
      target = {
        x: e.clientX - window.innerWidth / 2,
        y: e.clientY - window.innerHeight / 2,
      }
    }
    window.addEventListener('pointermove', onMove)

    let lightning: ReturnType<typeof setTimeout> | null = null
    let flash = () => {
      let r = cloud.getBoundingClientRect()
      let size = Math.max(r.width, r.height) / 3
      glow.style.width = glow.style.height = `${size * 1.4}px`
      glow.style.left = `${
        r.left + r.width / 2 + (Math.random() - 0.5) * r.width * 0.6
      }px`
      glow.style.top = `${
        r.top + r.height / 2 + Math.random() * r.height * 0.3 - r.height * 0.15
      }px`
      glow.classList.remove('flash')
      void glow.offsetWidth
      glow.classList.add('flash')
    }
    let schedule = () => {
      lightning = setTimeout(() => {
        flash()
        schedule()
      }, 300 + Math.random() * 1200)
    }

    let applyWeather = (value: number) => {
      let t = value / 100
      if (value >= 99) {
        if (!lightning) schedule()
      } else if (lightning) {
        clearTimeout(lightning)
        lightning = null
      }
      sky.style.filter = `saturate(${lerp(100, 30, t)}%) brightness(${lerp(
        100,
        50,
        t
      )}%)`
      let opacities = [
        lerp(0, 0.4, t),
        lerp(0.1, 0.4, t),
        lerp(0.2, 0.6, t),
        lerp(0.2, 0.7, t),
      ]
      shadowRefs.current.forEach((el, i) =>
        el?.setAttribute('flood-opacity', String(opacities[i]))
      )
    }
    applyWeather(0)

    // Ease the visible weather toward the latest API reading.
    let current = 0
    let goal = 0
    let ease = setInterval(() => {
      if (Math.abs(goal - current) < 0.5) {
        if (current !== goal) applyWeather((current = goal))
        return
      }
      current += (goal - current) * 0.08
      applyWeather(current)
    }, 50)

    let controller: AbortController | null = null
    let fetchWeather = async () => {
      controller?.abort()
      controller = new AbortController()
      try {
        let { lat, lon } = await locateByIp(controller.signal)
        let res = await fetch(weatherUrl(lat, lon), {
          signal: controller.signal,
        })
        if (!res.ok) return
        let { current: c } = await res.json()
        goal = stormLevel(c.weather_code, c.cloud_cover, c.precipitation)
      } catch {
        // keep the last known weather
      }
    }
    fetchWeather()
    let refresh = setInterval(fetchWeather, REFRESH_MS)

    return () => {
      cancelAnimationFrame(frame)
      window.removeEventListener('pointermove', onMove)
      clearInterval(ease)
      clearInterval(refresh)
      controller?.abort()
      if (lightning) clearTimeout(lightning)
    }
  }, [])

  return (
    <>
      <div ref={skyRef} className="cloud-sky" aria-hidden="true" />
      <svg
        className="cloud-defs"
        xmlns="http://www.w3.org/2000/svg"
        aria-hidden="true"
      >
        <filter
          id="cloud-filter"
          x="-50%"
          y="-50%"
          width="200%"
          height="200%"
          style={{ colorInterpolationFilters: 'sRGB' }}
        >
          <feTurbulence
            type="fractalNoise"
            seed="462"
            baseFrequency="0.011"
            numOctaves="5"
            result="noise1"
          />
          <feTurbulence
            type="fractalNoise"
            seed="462"
            baseFrequency="0.011"
            numOctaves="2"
            result="noise2"
          />
          <feGaussianBlur in="SourceGraphic" stdDeviation="20" />
          <feDisplacementMap
            in="blur1"
            scale="100"
            in2="noise1"
            result="cloud1"
          />
          <feFlood
            ref={(el) => {
              shadowRefs.current[0] = el
            }}
            floodColor="rgb(215,215,215)"
            floodOpacity="0.2"
          />
          <feComposite operator="in" in2="SourceGraphic" />
          <feOffset dx="-10" dy="-3" />
          <feMorphology radius="20" />
          <feGaussianBlur stdDeviation="20" />
          <feDisplacementMap scale="100" in2="noise1" result="cloud2" />
          <feFlood
            ref={(el) => {
              shadowRefs.current[1] = el
            }}
            floodColor="rgb(66,105,146)"
            floodOpacity="0.2"
          />
          <feComposite operator="in" in2="SourceGraphic" />
          <feOffset dx="-10" dy="40" />
          <feMorphology radius="0 40" />
          <feGaussianBlur stdDeviation="20" />
          <feDisplacementMap scale="80" in2="noise2" result="cloud3" />
          <feFlood
            ref={(el) => {
              shadowRefs.current[2] = el
            }}
            floodColor="rgb(0,0,0)"
            floodOpacity="0.4"
          />
          <feComposite operator="in" in2="SourceGraphic" />
          <feOffset dx="20" dy="60" />
          <feMorphology radius="0 65" />
          <feGaussianBlur stdDeviation="30" />
          <feDisplacementMap scale="100" in2="noise2" result="cloud4" />
          <feFlood
            ref={(el) => {
              shadowRefs.current[3] = el
            }}
            floodColor="rgb(0,0,0)"
            floodOpacity="0.4"
          />
          <feComposite operator="in" in2="SourceGraphic" />
          <feOffset dx="20" dy="70" />
          <feMorphology radius="0 200" />
          <feGaussianBlur stdDeviation="30" />
          <feDisplacementMap scale="100" in2="noise2" result="cloud5" />
          <feMerge>
            <feMergeNode in="cloud1" />
            <feMergeNode in="cloud2" />
            <feMergeNode in="cloud3" />
            <feMergeNode in="cloud4" />
            <feMergeNode in="cloud5" />
          </feMerge>
        </filter>
      </svg>
      <div className="cloud-container">
        <textarea
          ref={cloudRef}
          className="cloud"
          readOnly
          aria-hidden="true"
          tabIndex={-1}
        />
      </div>
      <div ref={glowRef} className="cloud-lightning" aria-hidden="true" />
    </>
  )
}
