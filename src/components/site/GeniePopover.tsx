import {
  ReactNode,
  RefObject,
  useEffect,
  useLayoutEffect,
  useRef,
  useState,
} from 'react'
import { getFontEmbedCSS, toCanvas } from 'html-to-image'

import { CloudSurface } from './CloudSurface'

// macOS-style genie, after ui-layouts' mac-genie. The surface is snapshotted to
// a canvas, then redrawn one pixel row at a time on a full-screen canvas: every
// row is squeezed toward the dock button and dropped onto it, rows nearest the
// dock first, so the top lags behind and forms the curved neck. Opening plays
// the same timeline backwards, so an interrupted genie simply reverses from
// wherever it is.

type Phase = 'gone' | 'opening' | 'open' | 'closing'

const RADIUS = 28
const TARGET_DROP = 14
const DURATION = 500
const SNAPSHOT_TIMEOUT = 900
const BLANK =
  'data:image/gif;base64,R0lGODlhAQABAIAAAAAAAP///yH5BAEAAAAALAAAAAABAAEAAAIBRAA7'

const clamp01 = (x: number) => Math.min(1, Math.max(0, x))
const lerp = (a: number, b: number, t: number) => a + (b - a) * t
const easeInOut = (t: number) =>
  t < 0.5 ? 4 * t * t * t : 1 - Math.pow(-2 * t + 2, 3) / 2
const easeIn = (t: number) => t * t
const easeOut = (t: number) => 1 - (1 - t) * (1 - t)

export interface Point {
  x: number
  y: number
}

export const prefersReducedMotion = () =>
  window.matchMedia('(prefers-reduced-motion: reduce)').matches

// The snapshot rasterizes with classic scrollbars, which the live page never
// shows; this rides along with the font CSS into the snapshot's stylesheet.
const SNAPSHOT_CSS =
  '*{scrollbar-width:none!important}*::-webkit-scrollbar{display:none!important}'

// Embedding the web fonts is the slow part of a snapshot and never changes, so
// it is done once and shared.
let fontCSS: Promise<string> | null = null
export function warmGenie() {
  if (!fontCSS)
    fontCSS = getFontEmbedCSS(document.body)
      .catch(() => '')
      .then((css) => css + SNAPSHOT_CSS)
  return fontCSS
}

// Resolves to null when the snapshot fails or, if a timeout is given, takes
// too long; callers then show the surface without a genie rather than leave a
// gap. Background shots pass no timeout.
export async function snapshotSurface(
  node: HTMLElement,
  timeout = SNAPSHOT_TIMEOUT
) {
  let shot = warmGenie().then((css) =>
    toCanvas(node, {
      pixelRatio: Math.min(window.devicePixelRatio || 1, 2),
      cacheBust: false,
      fontEmbedCSS: css,
      imagePlaceholder: BLANK,
    })
  )
  let late = new Promise<null>((resolve) => {
    if (timeout < Infinity) setTimeout(() => resolve(null), timeout)
  })
  try {
    return await Promise.race([shot, late])
  } catch {
    return null
  }
}

export function whenIdle(cb: () => void) {
  let w = window as Window & {
    requestIdleCallback?: (cb: () => void, opts?: { timeout: number }) => number
    cancelIdleCallback?: (id: number) => void
  }
  if (w.requestIdleCallback && w.cancelIdleCallback) {
    let id = w.requestIdleCallback(cb, { timeout: 1000 })
    return () => w.cancelIdleCallback!(id)
  }
  let id = window.setTimeout(cb, 50)
  return () => clearTimeout(id)
}

// A snapshot taken right after a click competes with everything else that
// click sets off and can take a second, so a settled surface is shot ahead of
// time instead: once when idle, and again whenever it scrolls or an image in it
// finishes loading. The genie can then leave without waiting.
export function keepShotFresh(
  surface: HTMLElement,
  onShot: (image: HTMLCanvasElement) => void
) {
  let alive = true
  let timer = 0
  let cancelIdle = () => {}
  let shoot = () => {
    cancelIdle()
    cancelIdle = whenIdle(() =>
      snapshotSurface(surface, Infinity).then((image) => {
        if (alive && image) onShot(image)
      })
    )
  }
  let later = () => {
    clearTimeout(timer)
    timer = window.setTimeout(shoot, 200)
  }
  surface.addEventListener('scroll', later, true)
  surface.addEventListener('load', later, true)
  shoot()
  return () => {
    alive = false
    cancelIdle()
    clearTimeout(timer)
    surface.removeEventListener('scroll', later, true)
    surface.removeEventListener('load', later, true)
  }
}

interface RunGenieOptions {
  image: HTMLCanvasElement
  // Where the surface sits when fully open.
  rect: DOMRect
  // Viewport point the neck pulls into.
  dock: Point
  // 1 is fully open, 0 is inside the dock.
  from: number
  to: number
  zIndex: number
  onProgress?: (p: number) => void
  // The canvas is removed right after this returns, so reveal the real surface
  // synchronously in here and both changes land in the same paint.
  onDone: () => void
}

export function runGenie({
  image,
  rect,
  dock,
  from,
  to,
  zIndex,
  onProgress,
  onDone,
}: RunGenieOptions) {
  let vw = window.innerWidth
  let vh = window.innerHeight
  let dpr = Math.min(window.devicePixelRatio || 1, 2)
  let canvas = document.createElement('canvas')
  canvas.width = Math.round(vw * dpr)
  canvas.height = Math.round(vh * dpr)
  canvas.setAttribute('aria-hidden', 'true')
  canvas.style.cssText = `position:fixed;left:0;top:0;width:${vw}px;height:${vh}px;pointer-events:none;z-index:${zIndex};`
  document.body.appendChild(canvas)
  let ctx = canvas.getContext('2d')!
  ctx.setTransform(dpr, 0, 0, dpr, 0, 0)
  ctx.imageSmoothingQuality = 'high'

  let W = rect.width
  let H = rect.height
  let rows = Math.max(1, Math.ceil(H))
  let scale = image.height / H
  // Row edges snapped to device pixels so neighbouring rows tile exactly: an
  // overlap draws translucent pixels twice and a gap lets the page through,
  // and both read as lines across the content.
  let snap = (v: number) => Math.round(v * dpr) / dpr
  let edges = new Float64Array(rows + 1)

  // t runs the minimize timeline: 0 is open, 1 is inside the dock.
  let draw = (t: number) => {
    ctx.clearRect(0, 0, vw, vh)
    for (let i = 0; i <= rows; i++) {
      let y = Math.min(i, H)
      let start = (1 - y / H) * 0.2
      let drop = easeIn(clamp01((t - start) / (1 - start)))
      let edge = snap(lerp(rect.top + y, dock.y, drop))
      // Never let an edge pass the one above it, which would flip a row when
      // the dock sits inside the box (a tall window near the dock).
      edges[i] = i > 0 ? Math.max(edge, edges[i - 1]) : edge
    }
    for (let i = 0; i < rows; i++) {
      let h = edges[i + 1] - edges[i]
      if (h <= 0) continue
      let start = (1 - Math.min(i + 0.5, H) / H) * 0.65
      let squeeze = easeInOut(clamp01((t - start) / (1 - start)))
      let left = lerp(rect.left, dock.x, squeeze)
      let width = lerp(rect.left + W, dock.x, squeeze) - left
      if (width < 0.8) continue
      ctx.drawImage(
        image,
        0,
        i * scale,
        image.width,
        Math.min(1, H - i) * scale,
        left,
        edges[i],
        width,
        h
      )
    }
    // Soft flash on the dock button as the surface lands in it.
    if (t > 0.75) {
      let a = easeOut((t - 0.75) / 0.25) * 0.3
      let glow = ctx.createRadialGradient(dock.x, dock.y, 0, dock.x, dock.y, 55)
      glow.addColorStop(0, `rgba(255,255,255,${a.toFixed(3)})`)
      glow.addColorStop(1, 'rgba(255,255,255,0)')
      ctx.fillStyle = glow
      ctx.fillRect(dock.x - 55, dock.y - 55, 110, 110)
    }
  }

  let span = Math.abs(to - from) * DURATION
  let begin: number | null = null
  let raf = 0
  let frame = (now: number) => {
    if (begin === null) begin = now
    let k = span > 0 ? clamp01((now - begin) / span) : 1
    let p = lerp(from, to, k)
    onProgress?.(p)
    draw(1 - p)
    if (k < 1) {
      raf = requestAnimationFrame(frame)
    } else {
      onDone()
      canvas.remove()
    }
  }
  // First frame now, so callers can hide the real surface in the same paint.
  draw(1 - from)
  raf = requestAnimationFrame(frame)

  return () => {
    cancelAnimationFrame(raf)
    canvas.remove()
  }
}

interface GeniePopoverProps {
  open: boolean
  // Last shown section stays mounted while the menu closes.
  sectionKey: string | null
  left: number
  bottom: number
  originX: number
  width: number
  popoverRef: RefObject<HTMLDivElement | null>
  // Every menu, rendered offscreen once at idle so each has a snapshot ready
  // before it is first opened.
  prerender: { key: string; content: ReactNode }[]
  children: ReactNode
}

export function GeniePopover({
  open,
  sectionKey,
  left,
  bottom,
  originX,
  width,
  popoverRef,
  prerender,
  children,
}: GeniePopoverProps) {
  let [phase, setPhase] = useState<Phase>('gone')
  let [run, setRun] = useState(0)
  let [stage, setStage] = useState<'off' | 'on' | 'done'>('off')
  let progress = useRef(0)
  let shots = useRef(new Map<string, HTMLCanvasElement>())
  let lastKey = useRef<string | null>(null)
  let stageRef = useRef<HTMLDivElement>(null)

  // Mounted client-side only, after first paint.
  useEffect(() => setStage('on'), [])

  useEffect(() => {
    let stage = stageRef.current
    if (!stage) return
    stage.setAttribute('inert', '')
    let alive = true
    let cancel = whenIdle(async () => {
      for (let el of Array.from(stage!.children) as HTMLElement[]) {
        let key = el.dataset.key!
        if (shots.current.has(key)) continue
        let image = await snapshotSurface(
          el.firstElementChild as HTMLElement,
          Infinity
        )
        if (!alive) return
        if (image) shots.current.set(key, image)
      }
      setStage('done')
    })
    return () => {
      alive = false
      cancel()
    }
  }, [stage])

  useEffect(() => {
    if (open) {
      let switched = lastKey.current !== null && lastKey.current !== sectionKey
      lastKey.current = sectionKey
      if (switched) progress.current = 0
      if (phase === 'gone' || phase === 'closing' || switched) {
        setPhase('opening')
        setRun((n) => n + 1)
      }
    } else if (phase === 'opening' || phase === 'open') {
      setPhase('closing')
      setRun((n) => n + 1)
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [open, sectionKey])

  useLayoutEffect(() => {
    let root = popoverRef.current
    let surface = root?.firstElementChild as HTMLElement | null
    let key = lastKey.current
    if (!root || !surface || key === null) return
    if (phase === 'open') {
      return keepShotFresh(surface, (image) => shots.current.set(key!, image))
    }
    if (phase !== 'opening' && phase !== 'closing') return
    let opening = phase === 'opening'
    let cancelled = false
    let stop: (() => void) | undefined

    let finish = () => {
      progress.current = opening ? 1 : 0
      if (opening) root!.style.opacity = '1'
      else lastKey.current = null
      setPhase(opening ? 'open' : 'gone')
    }

    let play = (image: HTMLCanvasElement | null) => {
      if (cancelled) return
      if (!image) return finish()
      shots.current.set(key!, image)
      let rect = surface!.getBoundingClientRect()
      root!.style.opacity = '0'
      stop = runGenie({
        image,
        rect,
        dock: { x: rect.left + originX, y: rect.bottom + TARGET_DROP },
        from: progress.current,
        to: opening ? 1 : 0,
        zIndex: 991,
        onProgress: (p) => (progress.current = p),
        onDone: finish,
      })
    }

    let cached = shots.current.get(key)
    if (prefersReducedMotion()) finish()
    // Reopened while a settled menu waited for its closing snapshot.
    else if (opening && progress.current === 1) finish()
    else if (cached) play(cached)
    else snapshotSurface(surface).then(play)

    return () => {
      cancelled = true
      stop?.()
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [phase, run])

  return (
    <>
      {stage === 'on' && (
        <div
          ref={stageRef}
          aria-hidden="true"
          className="pointer-events-none fixed left-[-10000px] top-0 font-geist text-white"
          style={{ width }}
        >
          {prerender.map(({ key, content }) => (
            <div key={key} data-key={key}>
              <CloudSurface borderRadius={RADIUS}>{content}</CloudSurface>
            </div>
          ))}
        </div>
      )}
      {phase !== 'gone' && (
        <div
          ref={popoverRef}
          className="fixed z-[990] font-geist text-white"
          style={{
            left,
            bottom,
            width,
            opacity: phase === 'opening' ? 0 : undefined,
            pointerEvents: phase === 'open' ? undefined : 'none',
          }}
        >
          <CloudSurface borderRadius={RADIUS}>{children}</CloudSurface>
        </div>
      )}
    </>
  )
}
