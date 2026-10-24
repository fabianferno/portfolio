import { useEffect, useMemo, useRef, useState } from 'react'
import landPolygons from '@/data/world-land.json'
import countryShapes from '@/data/country-shapes.json'
import { airportCoords, airportCountry, countryIcons } from '@/data/airports'

interface Airport {
  iata: string
  city: string
}
interface Flight {
  departureAirport: Airport
  arrivalAirport: Airport
  status: string
}

const LAND = (landPolygons as [number, number][][]).filter(
  (ring) => Math.max(...ring.map(([, lat]) => lat)) > -55
)
// Outer borders of every country we have an airport in (ISO code -> rings).
const COUNTRIES = countryShapes as unknown as Record<string, [number, number][][]>

// --- Dot grid ----------------------------------------------------------------
// Equirectangular grid, latitude slightly stretched so the continents read
// like the classic dot-matrix world map.
const COLS = 96
const LNG_STEP = 360 / COLS
const LAT_TOP = 84
const LAT_STEP = 3
const ROWS = Math.ceil((LAT_TOP + 56) / LAT_STEP)
const DOT_R = 0.36 // radius, in cell units
const ICON_ROWS = ROWS - 4 // icon fits inside this many rows

const col = (lng: number) => (lng + 180) / LNG_STEP
const row = (lat: number) => (LAT_TOP - lat) / LAT_STEP

const C = {
  bg: '#0a0a0a',
  dot: [255, 255, 255],
  visited: [20, 184, 166], // teal-500, every country with an airport here
  highlight: [153, 246, 228], // teal-200, the country you're hovering
  flown: '#ff9e6b',
  confirmed: '#ffd15c',
  cancelled: '#5a6b82',
}
const STATUS_COLOR: Record<string, string> = {
  flown: C.flown,
  confirmed: C.confirmed,
  cancelled: C.cancelled,
}
const STATUS_RANK: Record<string, number> = { flown: 3, confirmed: 2, cancelled: 1 }

const MORPH_MS = 900
const HOLD_MS = 700 // how long the highlighted country shows before morphing
const HIGHLIGHT_FADE_MS = 250
const STAGGER_MS = 380
const LEAVE_DELAY_MS = 220
const HIT_RADIUS_PX = 18

interface Target {
  x: number
  y: number
  a: number
  country?: string
}

// Rasterise rings at 4x grid resolution and return each cell's coverage (0-1).
const S = 4
function coverage(rings: [number, number][][]): Float32Array {
  const cv = document.createElement('canvas')
  cv.width = COLS * S
  cv.height = ROWS * S
  const ctx = cv.getContext('2d', { willReadFrequently: true })!
  ctx.fillStyle = '#fff'
  ctx.beginPath()
  for (const ring of rings) {
    ring.forEach(([lng, lat], i) => {
      const x = col(lng) * S
      const y = row(lat) * S
      if (i) ctx.lineTo(x, y)
      else ctx.moveTo(x, y)
    })
    ctx.closePath()
  }
  ctx.fill()
  const data = ctx.getImageData(0, 0, cv.width, cv.height).data
  const out = new Float32Array(COLS * ROWS)
  for (let r = 0; r < ROWS; r++)
    for (let c = 0; c < COLS; c++) {
      let cover = 0
      for (let dy = 0; dy < S; dy++)
        for (let dx = 0; dx < S; dx++)
          cover += data[((r * S + dy) * cv.width + c * S + dx) * 4 + 3]
      out[r * COLS + c] = cover / (S * S * 255)
    }
  return out
}

// Keep cells that are mostly land and tag each with the country covering most
// of it. Airports always get a dot so small islands (SIN, CMB) show.
function landDots(): Target[] {
  const land = coverage(LAND)
  const countries = Object.entries(COUNTRIES).map(
    ([code, rings]) => [code, coverage(rings)] as const
  )
  const cells = new Set<number>()
  const dots: Target[] = []
  for (let i = 0; i < COLS * ROWS; i++) {
    if (land[i] <= 0.3) continue
    let country: string | undefined
    let best = 0
    for (const [code, cover] of countries)
      if (cover[i] > best) {
        best = cover[i]
        country = code
      }
    cells.add(i)
    dots.push({ x: (i % COLS) + 0.5, y: Math.floor(i / COLS) + 0.5, a: 1, country })
  }
  for (const [iata, [lng, lat]] of Object.entries(airportCoords)) {
    const i = Math.floor(row(lat)) * COLS + Math.floor(col(lng))
    if (cells.has(i)) continue
    cells.add(i)
    dots.push({
      x: (i % COLS) + 0.5,
      y: Math.floor(i / COLS) + 0.5,
      a: 1,
      country: airportCountry[iata],
    })
  }
  return dots
}

// Draw the emoji big, crop to its bounds, then downsample onto the dot grid.
// Coverage decides which cells get a dot — a solid white silhouette.
function iconDots(emoji: string): Target[] {
  const BIG = 256
  const big = document.createElement('canvas')
  big.width = big.height = BIG
  const bctx = big.getContext('2d', { willReadFrequently: true })!
  bctx.textAlign = 'center'
  bctx.textBaseline = 'middle'
  bctx.font = `${BIG * 0.8}px "Apple Color Emoji","Segoe UI Emoji","Noto Color Emoji",sans-serif`
  bctx.fillText(emoji, BIG / 2, BIG / 2)
  const px = bctx.getImageData(0, 0, BIG, BIG).data
  let x0 = BIG,
    y0 = BIG,
    x1 = 0,
    y1 = 0
  for (let y = 0; y < BIG; y++)
    for (let x = 0; x < BIG; x++)
      if (px[(y * BIG + x) * 4 + 3] > 40) {
        if (x < x0) x0 = x
        if (x > x1) x1 = x
        if (y < y0) y0 = y
        if (y > y1) y1 = y
      }
  if (x1 <= x0 || y1 <= y0) return []

  const bw = x1 - x0 + 1
  const bh = y1 - y0 + 1
  // Grid cells are square on screen, so keep the emoji's own aspect.
  const h = ICON_ROWS
  const w = Math.min(COLS - 4, Math.round((h * bw) / bh))
  const small = document.createElement('canvas')
  small.width = w
  small.height = h
  const sctx = small.getContext('2d', { willReadFrequently: true })!
  sctx.imageSmoothingEnabled = true
  sctx.imageSmoothingQuality = 'high'
  sctx.drawImage(big, x0, y0, bw, bh, 0, 0, w, h)
  const sp = sctx.getImageData(0, 0, w, h).data

  const ox = Math.floor((COLS - w) / 2)
  const oy = Math.floor((ROWS - h) / 2)
  const dots: Target[] = []
  for (let r = 0; r < h; r++)
    for (let c = 0; c < w; c++)
      if (sp[(r * w + c) * 4 + 3] / 255 >= 0.4)
        dots.push({ x: ox + c + 0.5, y: oy + r + 0.5, a: 1 })
  return dots
}

// Column-major order keeps every particle's flight short and gives the morph
// a left-to-right sweep instead of random criss-crossing.
const byColumn = (p: Target, q: Target) => p.x - q.x || p.y - q.y

const easeInOut = (t: number) =>
  t < 0.5 ? 4 * t * t * t : 1 - Math.pow(-2 * t + 2, 3) / 2

export default function FlightMap({ flights }: { flights: Flight[] }) {
  const wrapRef = useRef<HTMLDivElement>(null)
  const canvasRef = useRef<HTMLCanvasElement>(null)
  const [active, setActive] = useState<string | null>(null)

  const airports = useMemo(() => {
    const map = new Map<string, { iata: string; city: string; status: string }>()
    const add = (a: Airport, status: string) => {
      if (!airportCoords[a.iata]) return
      const existing = map.get(a.iata)
      if (!existing || STATUS_RANK[status] > STATUS_RANK[existing.status]) {
        map.set(a.iata, { iata: a.iata, city: a.city, status })
      }
    }
    for (const f of flights) {
      add(f.departureAirport, f.status)
      add(f.arrivalAirport, f.status)
    }
    return Array.from(map.values()).map((a) => {
      const [lng, lat] = airportCoords[a.iata]
      // Snap to the centre of the grid dot the airport falls in.
      return {
        ...a,
        x: Math.floor(col(lng)) + 0.5,
        y: Math.floor(row(lat)) + 0.5,
        country: airportCountry[a.iata],
      }
    })
  }, [flights])

  // Animation state lives in a ref so the rAF loop never re-renders React.
  const engine = useRef<{
    map: Target[]
    icons: Map<string, Target[]>
    // Per particle: from, to, start time.
    fx: Float32Array
    fy: Float32Array
    fa: Float32Array
    tx: Float32Array
    ty: Float32Array
    ta: Float32Array
    t0: Float32Array
    // Country of the map dot each particle settles on.
    mapCountry: (string | undefined)[]
    shape: string | null
    origin: { x: number; y: number }
    highlight: string | null
    highlightAt: number
    settleAt: number
  } | null>(null)
  const airportsRef = useRef(airports)
  airportsRef.current = airports
  const visitedRef = useRef(new Set<string>())
  visitedRef.current = useMemo(
    () => new Set(airports.map((a) => a.country).filter(Boolean)),
    [airports]
  )
  const activeRef = useRef<string | null>(null)

  useEffect(() => {
    const canvas = canvasRef.current
    const wrap = wrapRef.current
    if (!canvas || !wrap) return
    const ctx = canvas.getContext('2d')!
    const reduceMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches

    const map = landDots().sort(byColumn)
    const icons = new Map<string, Target[]>()
    for (const [code, { emoji }] of Object.entries(countryIcons)) {
      icons.set(code, iconDots(emoji).sort(byColumn))
    }
    const P = Math.max(map.length, ...Array.from(icons.values(), (t) => t.length))
    const e = {
      map,
      icons,
      fx: new Float32Array(P),
      fy: new Float32Array(P),
      fa: new Float32Array(P),
      tx: new Float32Array(P),
      ty: new Float32Array(P),
      ta: new Float32Array(P),
      t0: new Float32Array(P),
      mapCountry: Array.from({ length: P }, (_, j) => map[Math.floor((j * map.length) / P)].country),
      shape: null as string | null,
      origin: { x: COLS / 2, y: ROWS / 2 },
      highlight: null as string | null,
      highlightAt: 0,
      settleAt: 0,
    }
    // Spread P particles over the shape's points; when several particles share
    // a point only the first is visible, the rest ride along transparent.
    const assign = (targets: Target[], into: [Float32Array, Float32Array, Float32Array]) => {
      let last = -1
      for (let j = 0; j < P; j++) {
        const k = Math.floor((j * targets.length) / P)
        const t = targets[k]
        into[0][j] = t.x
        into[1][j] = t.y
        into[2][j] = k === last ? 0 : t.a
        last = k
      }
    }
    assign(map, [e.fx, e.fy, e.fa])
    assign(map, [e.tx, e.ty, e.ta])
    engine.current = e

    let w = 0,
      h = 0,
      cell = 1
    const resize = () => {
      const rect = wrap.getBoundingClientRect()
      const dpr = window.devicePixelRatio || 1
      cell = Math.min(rect.width / COLS, rect.height / ROWS)
      w = rect.width
      h = rect.height
      canvas.width = Math.round(w * dpr)
      canvas.height = Math.round(h * dpr)
      canvas.style.width = `${w}px`
      canvas.style.height = `${h}px`
      ctx.setTransform(dpr, 0, 0, dpr, 0, 0)
    }
    resize()
    const ro = new ResizeObserver(resize)
    ro.observe(wrap)

    let raf = 0
    const draw = (now: number) => {
      const ox = (w - COLS * cell) / 2
      const oy = (h - ROWS * cell) / 2
      ctx.clearRect(0, 0, w, h)
      const r = cell * DOT_R
      const dur = reduceMotion ? 1 : MORPH_MS
      const fadeIn = Math.min(1, (now - e.highlightAt) / HIGHLIGHT_FADE_MS)
      for (let j = 0; j < P; j++) {
        let k = (now - e.t0[j]) / dur
        k = k <= 0 ? 0 : k >= 1 ? 1 : easeInOut(k)
        const a = e.fa[j] + (e.ta[j] - e.fa[j]) * k
        if (a < 0.02) continue
        const x = e.fx[j] + (e.tx[j] - e.fx[j]) * k
        const y = e.fy[j] + (e.ty[j] - e.fy[j]) * k
        // Visited countries are teal on the map, the hovered one brighter.
        // Colour fades in as dots land on the map and back to white as they
        // fly off into the object.
        const country = e.mapCountry[j]
        const onMap = e.shape ? 1 - k : k
        let [cr, cg, cb] = C.dot
        if (country && visitedRef.current.has(country)) {
          const [vr, vg, vb] = C.visited
          cr += (vr - cr) * onMap
          cg += (vg - cg) * onMap
          cb += (vb - cb) * onMap
          if (country === e.highlight) {
            const m = onMap * fadeIn
            const [hr, hg, hb] = C.highlight
            cr += (hr - cr) * m
            cg += (hg - cg) * m
            cb += (hb - cb) * m
          }
        }
        ctx.fillStyle = `rgba(${cr}, ${cg}, ${cb}, ${a})`
        ctx.beginPath()
        ctx.arc(ox + x * cell, oy + y * cell, r, 0, Math.PI * 2)
        ctx.fill()
      }

      // Airports sit on top; they dim while an object is on screen so they
      // stay hoverable without fighting the shape.
      const dim = e.shape ? 0.45 : 1
      const pulse = (now % 2400) / 2400
      for (const ap of airportsRef.current) {
        const x = ox + ap.x * cell
        const y = oy + ap.y * cell
        const color = STATUS_COLOR[ap.status] ?? '#94a3b8'
        const isActive = activeRef.current === ap.iata
        ctx.globalAlpha = (isActive ? 1 : dim) * (1 - pulse) * 0.7
        ctx.strokeStyle = color
        ctx.lineWidth = 1.4
        ctx.beginPath()
        ctx.arc(x, y, r + pulse * cell * 1.6, 0, Math.PI * 2)
        ctx.stroke()
        ctx.globalAlpha = isActive ? 1 : dim
        ctx.fillStyle = color
        ctx.beginPath()
        ctx.arc(x, y, r * (isActive ? 1.4 : 1), 0, Math.PI * 2)
        ctx.fill()
      }
      ctx.globalAlpha = 1
      raf = requestAnimationFrame(draw)
    }
    raf = requestAnimationFrame(draw)

    return () => {
      cancelAnimationFrame(raf)
      ro.disconnect()
      engine.current = null
    }
  }, [])

  // Morph to the active country's object (or back to the map).
  const morphTo = (shape: string | null, origin: { x: number; y: number }) => {
    const e = engine.current
    if (!e || e.shape === shape) return
    const targets = (shape && e.icons.get(shape)) || e.map
    if (!targets.length) return
    const now = performance.now()
    const P = e.fx.length
    const maxD = Math.hypot(COLS, ROWS)
    let last = -1
    let settleAt = now
    for (let j = 0; j < P; j++) {
      // Freeze the current in-flight position as the new start.
      let k = (now - e.t0[j]) / MORPH_MS
      k = k <= 0 ? 0 : k >= 1 ? 1 : easeInOut(k)
      e.fx[j] = e.fx[j] + (e.tx[j] - e.fx[j]) * k
      e.fy[j] = e.fy[j] + (e.ty[j] - e.fy[j]) * k
      e.fa[j] = e.fa[j] + (e.ta[j] - e.fa[j]) * k
      const idx = Math.floor((j * targets.length) / P)
      const t = targets[idx]
      e.tx[j] = t.x
      e.ty[j] = t.y
      e.ta[j] = idx === last ? 0 : t.a
      last = idx
      // Ripple outward from the hovered airport.
      const d = Math.hypot(e.fx[j] - origin.x, e.fy[j] - origin.y) / maxD
      e.t0[j] = now + d * STAGGER_MS * 1.6
      settleAt = Math.max(settleAt, e.t0[j] + MORPH_MS)
    }
    e.shape = shape
    e.origin = origin
    e.settleAt = settleAt
  }

  // Hover sequence: back to the map if needed, light up the country's dots,
  // hold a beat, then fly them into the country's object.
  const morphTimer = useRef<ReturnType<typeof setTimeout>>(undefined)
  const show = (country: string | null, origin: { x: number; y: number }) => {
    const e = engine.current
    if (!e) return
    clearTimeout(morphTimer.current)
    if (country !== e.highlight) {
      e.highlight = country
      e.highlightAt = performance.now()
    }
    if (!country || !e.icons.get(country)?.length) return morphTo(null, origin)
    if (e.shape === country) return
    if (e.shape) morphTo(null, origin)
    const wait = Math.max(0, e.settleAt - performance.now()) + HOLD_MS
    morphTimer.current = setTimeout(() => morphTo(country, origin), wait)
  }

  const leaveTimer = useRef<ReturnType<typeof setTimeout>>(undefined)
  const setHover = (iata: string | null) => {
    clearTimeout(leaveTimer.current)
    if (iata === activeRef.current) return
    const apply = () => {
      activeRef.current = iata
      setActive(iata)
      const ap = airportsRef.current.find((a) => a.iata === iata)
      show(ap?.country ?? null, ap ? { x: ap.x, y: ap.y } : engine.current?.origin ?? { x: 0, y: 0 })
    }
    if (iata) apply()
    else leaveTimer.current = setTimeout(apply, LEAVE_DELAY_MS)
  }
  useEffect(
    () => () => {
      clearTimeout(leaveTimer.current)
      clearTimeout(morphTimer.current)
    },
    []
  )

  const hitTest = (clientX: number, clientY: number) => {
    const wrap = wrapRef.current
    if (!wrap) return null
    const rect = wrap.getBoundingClientRect()
    const cell = Math.min(rect.width / COLS, rect.height / ROWS)
    const ox = (rect.width - COLS * cell) / 2
    const oy = (rect.height - ROWS * cell) / 2
    let best: string | null = null
    let bestD = HIT_RADIUS_PX
    for (const ap of airports) {
      const d = Math.hypot(
        clientX - rect.left - (ox + ap.x * cell),
        clientY - rect.top - (oy + ap.y * cell)
      )
      if (d < bestD) {
        bestD = d
        best = ap.iata
      }
    }
    return best
  }

  const activeAirport = airports.find((a) => a.iata === active)
  const activeIcon = activeAirport?.country ? countryIcons[activeAirport.country] : null

  return (
    <div className="relative overflow-hidden rounded-3xl bg-[#0a0a0a] px-4 pb-6 pt-8 sm:px-8 sm:pt-10">
      <div
        ref={wrapRef}
        className={`relative aspect-[96/47] w-full ${active ? 'cursor-pointer' : ''}`}
        onPointerMove={(ev) => setHover(hitTest(ev.clientX, ev.clientY))}
        onPointerLeave={() => setHover(null)}
        onPointerDown={(ev) => {
          // Touch: tap a dot to morph, tap elsewhere to reset.
          if (ev.pointerType !== 'mouse') setHover(hitTest(ev.clientX, ev.clientY))
        }}
      >
        <canvas ref={canvasRef} className="absolute inset-0" aria-hidden="true" />
      </div>

      <div className="mt-4 flex min-h-[64px] items-end justify-between gap-4 text-white">
        <div aria-live="polite">
          {activeAirport ? (
            <>
              <div className="text-2xl font-semibold tracking-tight sm:text-4xl">
                {activeIcon?.name ?? activeAirport.city}
              </div>
              <div className="mt-1 text-sm text-zinc-400">
                {activeAirport.city} · {activeAirport.iata}
                {activeIcon ? <> · {activeIcon.thing}</> : null}
              </div>
            </>
          ) : (
            <div className="text-sm text-zinc-400">
              hover a dot to see where it takes you
            </div>
          )}
        </div>
      </div>
    </div>
  )
}
