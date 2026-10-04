import { useEffect, useMemo, useRef } from 'react'
import { gsap } from 'gsap'
import { MotionPathPlugin } from 'gsap/dist/MotionPathPlugin'
import landPolygons from '@/data/world-land.json'
import { airportCoords } from '@/data/airports'

if (typeof window !== 'undefined') {
  gsap.registerPlugin(MotionPathPlugin)
}

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

// --- Midnight & Amber palette ------------------------------------------------
const C = {
  oceanTop: '#152743',
  oceanBottom: '#0b1322',
  oceanSide: '#070d18',
  landTop: '#d9a441',
  landStroke: '#b9832d',
  landSide: '#7a4f1c',
  flown: '#ff9e6b',
  confirmed: '#ffd15c',
  cancelled: '#5a6b82',
  plane: '#fff3d6',
  node: '#ffd15c',
  ring: '#ffb86b',
}
const STATUS_COLOR: Record<string, string> = {
  flown: C.flown,
  confirmed: C.confirmed,
  cancelled: C.cancelled,
}

// Airliner silhouette, nose at +X (MotionPath autoRotate banks it into travel).
const PLANE =
  'M10 0 L2 -1.3 L-1 -1.6 L-2 -7.5 L-4 -7.5 L-4 -1.8 L-8 -1.3 L-8.5 -3.5 ' +
  'L-9.5 -3.5 L-9.8 -0.9 L-10 0 L-9.8 0.9 L-9.5 3.5 L-8.5 3.5 L-8 1.3 ' +
  'L-4 1.8 L-4 7.5 L-2 7.5 L-1 1.6 L2 1.3 Z'

// --- Two-point-perspective projector ----------------------------------------
// Map lies on the ground plane (X right, Z depth, Y up). Yaw + pitch + a
// perspective divide give two vanishing points (true isometric-ish 3D view).
const VIEW_W = 1000
const VIEW_H = 560
const YAW = (16 * Math.PI) / 180
const PITCH = (50 * Math.PI) / 180
const CAM_D = 85 // large camera distance => near-parallel (true isometric), minimal edge skew
const FOC = 60 // focal length (fit() rescales, so only the FOC/CAM_D ratio matters)
const LAND_Y = 0.32 // raised land surface
const cosY = Math.cos(YAW)
const sinY = Math.sin(YAW)
const cosP = Math.cos(PITCH)
const sinP = Math.sin(PITCH)

const wx = (lng: number) => (lng / 180) * 10
const wz = (lat: number) => -(lat / 90) * 5

function projectRaw(x: number, y: number, z: number): [number, number] {
  const x1 = x * cosY + z * sinY
  const z1 = -x * sinY + z * cosY
  const y2 = y * cosP - z1 * sinP
  const z2 = y * sinP + z1 * cosP
  const zc = z2 + CAM_D
  return [(FOC * x1) / zc, (-FOC * y2) / zc]
}

// Fit the landmasses into the lower part of the viewBox, leaving headroom at
// the top for arcs to rise into. Stable across filters.
const fit = (() => {
  const pts: [number, number][] = []
  for (const ring of LAND)
    for (const [lng, lat] of ring) pts.push(projectRaw(wx(lng), LAND_Y, wz(lat)))
  let minX = Infinity,
    maxX = -Infinity,
    minY = Infinity,
    maxY = -Infinity
  for (const [x, y] of pts) {
    if (x < minX) minX = x
    if (x > maxX) maxX = x
    if (y < minY) minY = y
    if (y > maxY) maxY = y
  }
  const bboxW = maxX - minX
  const bboxH = maxY - minY
  let scale = (VIEW_W - 48) / bboxW
  if (bboxH * scale > VIEW_H * 0.82) scale = (VIEW_H * 0.82) / bboxH
  const contentW = bboxW * scale
  const contentH = bboxH * scale
  const offX = (VIEW_W - contentW) / 2 - minX * scale
  const offY = VIEW_H - 40 - contentH - minY * scale
  return { scale, offX, offY }
})()

function toScreen(raw: [number, number]): [number, number] {
  return [raw[0] * fit.scale + fit.offX, raw[1] * fit.scale + fit.offY]
}
function worldPt(lng: number, lat: number, y = LAND_Y): [number, number] {
  return toScreen(projectRaw(wx(lng), y, wz(lat)))
}
function ringPath(ring: [number, number][], y: number) {
  return (
    ring
      .map(([lng, lat], i) => {
        const [sx, sy] = worldPt(lng, lat, y)
        return `${i ? 'L' : 'M'}${sx.toFixed(1)} ${sy.toFixed(1)}`
      })
      .join(' ') + ' Z'
  )
}

// Static path strings (computed once).
const LAND_TOP = LAND.map((r) => ringPath(r, LAND_Y))
const LAND_BASE = LAND.map((r) => ringPath(r, 0))

export default function FlightMap({ flights }: { flights: Flight[] }) {
  const svgRef = useRef<SVGSVGElement>(null)

  const routes = useMemo(() => {
    const rank: Record<string, number> = { flown: 3, confirmed: 2, cancelled: 1 }
    const map = new Map<string, { from: string; to: string; status: string }>()
    for (const f of flights) {
      const from = f.departureAirport.iata
      const to = f.arrivalAirport.iata
      if (!airportCoords[from] || !airportCoords[to]) continue
      const key = `${from}-${to}`
      const existing = map.get(key)
      if (!existing || rank[f.status] > rank[existing.status]) {
        map.set(key, { from, to, status: f.status })
      }
    }
    return Array.from(map.values())
  }, [flights])

  const arcs = useMemo(() => {
    return routes.map((r, i) => {
      const [flng, flat] = airportCoords[r.from]
      const [tlng, tlat] = airportCoords[r.to]
      // 3D endpoints + lifted control point, sampled and projected.
      const ax = wx(flng),
        az = wz(flat),
        bx = wx(tlng),
        bz = wz(tlat)
      const d3 = Math.hypot(bx - ax, az - bz)
      const lift = Math.min(d3 * 0.3 + 0.7, 3.0)
      const cxp = (ax + bx) / 2,
        czp = (az + bz) / 2,
        cyp = LAND_Y + lift
      const A: [number, number, number] = [ax, LAND_Y, az]
      const B: [number, number, number] = [bx, LAND_Y, bz]
      const Cc: [number, number, number] = [cxp, cyp, czp]
      const N = 26
      let d = ''
      for (let s = 0; s <= N; s++) {
        const t = s / N
        const mt = 1 - t
        const px = mt * mt * A[0] + 2 * mt * t * Cc[0] + t * t * B[0]
        const py = mt * mt * A[1] + 2 * mt * t * Cc[1] + t * t * B[1]
        const pz = mt * mt * A[2] + 2 * mt * t * Cc[2] + t * t * B[2]
        const [sx, sy] = toScreen(projectRaw(px, py, pz))
        d += `${s ? 'L' : 'M'}${sx.toFixed(1)} ${sy.toFixed(1)}`
      }
      return { ...r, i, d, color: STATUS_COLOR[r.status] ?? '#94a3b8', d3 }
    })
  }, [routes])

  const airports = useMemo(() => {
    const set = new Set<string>()
    for (const r of routes) {
      set.add(r.from)
      set.add(r.to)
    }
    return Array.from(set).map((iata) => {
      const [lng, lat] = airportCoords[iata]
      const [x, y] = worldPt(lng, lat)
      return { iata, x, y }
    })
  }, [routes])

  useEffect(() => {
    if (!svgRef.current) return
    const ctx = gsap.context(() => {
      arcs.forEach((arc) => {
        if (arc.status === 'cancelled') return
        const duration = 2.6 + arc.d3 * 1.1
        const delay = (arc.i % 8) * 0.4
        gsap.set(`#dot-${arc.i}`, { opacity: 0 })
        gsap.to(`#dot-${arc.i}`, {
          duration,
          delay,
          repeat: -1,
          ease: 'none',
          keyframes: { opacity: [0, 1, 1, 0], easeEach: 'none' },
          motionPath: {
            path: `#arc-${arc.i}`,
            align: `#arc-${arc.i}`,
            alignOrigin: [0.5, 0.5],
            autoRotate: true,
          },
        })
        gsap.to(`#trail-${arc.i}`, {
          strokeDashoffset: -32,
          duration: duration * 0.45,
          repeat: -1,
          ease: 'none',
          delay,
        })
      })
    }, svgRef)
    return () => ctx.revert()
  }, [arcs])

  return (
    <div className="h-[420px] w-full sm:h-[520px]">
      <svg
        ref={svgRef}
        viewBox={`0 0 ${VIEW_W} ${VIEW_H}`}
        preserveAspectRatio="xMidYMid meet"
        className="h-full w-full overflow-visible"
      >
        <defs>
          <filter id="planeGlow" x="-140%" y="-140%" width="380%" height="380%">
            <feDropShadow dx="0" dy="0" stdDeviation="1.2" floodColor={C.flown} floodOpacity="0.85" />
          </filter>
          <style>{`
            @keyframes ap-pulse { 0% { r: 2.6; opacity: .6 } 70%,100% { r: 10; opacity: 0 } }
            .ap-ring { animation: ap-pulse 2.6s ease-out infinite; transform-box: fill-box; }
          `}</style>
        </defs>

        {/* Landmasses: dark side copy for thickness, then lit amber top */}
        <g fill={C.landSide}>
          {LAND_BASE.map((d, i) => (
            <path key={i} d={d} />
          ))}
        </g>
        <g fill={C.landTop} stroke={C.landStroke} strokeWidth="0.6">
          {LAND_TOP.map((d, i) => (
            <path key={i} d={d} />
          ))}
        </g>

        {/* Flight arcs: dark casing for contrast on amber land, then the line */}
        {arcs.map((arc) => (
          <g key={`${arc.from}-${arc.to}`}>
            {arc.status !== 'cancelled' && (
              <path
                d={arc.d}
                fill="none"
                stroke={C.oceanBottom}
                strokeWidth="3"
                strokeOpacity="0.55"
                strokeLinecap="round"
              />
            )}
            <path
              id={`arc-${arc.i}`}
              d={arc.d}
              fill="none"
              stroke={arc.color}
              strokeWidth={arc.status === 'cancelled' ? 1 : 1.6}
              strokeOpacity={arc.status === 'cancelled' ? 0.3 : 0.75}
              strokeDasharray={arc.status === 'cancelled' ? '3 6' : undefined}
            />
            {arc.status !== 'cancelled' && (
              <path
                id={`trail-${arc.i}`}
                d={arc.d}
                fill="none"
                stroke="#fff3d6"
                strokeWidth="2"
                strokeLinecap="round"
                strokeDasharray="1 31"
                strokeOpacity="1"
              />
            )}
          </g>
        ))}

        {/* Airports */}
        {airports.map((a, i) => (
          <g key={a.iata} transform={`translate(${a.x.toFixed(1)} ${a.y.toFixed(1)})`}>
            <circle
              className="ap-ring"
              r="2.6"
              fill="none"
              stroke={C.ring}
              strokeWidth="1.4"
              style={{ animationDelay: `${(i % 6) * 0.4}s` }}
            />
            <circle r="2.3" fill={C.node} />
          </g>
        ))}

        {/* Travelling planes on top */}
        {arcs.map((arc) =>
          arc.status === 'cancelled' ? null : (
            <g key={`dot-${arc.i}`} id={`dot-${arc.i}`} filter="url(#planeGlow)">
              <path
                d={PLANE}
                transform="scale(1.05)"
                fill={C.plane}
                stroke="#3a2a10"
                strokeWidth="0.3"
              />
            </g>
          )
        )}
      </svg>
    </div>
  )
}
