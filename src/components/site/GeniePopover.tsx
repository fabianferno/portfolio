import {
  ReactNode,
  RefObject,
  useEffect,
  useLayoutEffect,
  useRef,
  useState,
} from 'react'
import { animate } from 'motion/react'

import { CloudSurface } from './CloudSurface'

// macOS-style genie. While opening/closing, the menu is sliced into thin
// horizontal strips (clones of its content). Each strip is squeezed and pulled
// toward the dock button by how far along it is: strips nearest the button
// arrive first, the top lags behind, which gives the S-curved neck. The frosted
// body is a separate top-level layer clipped to the same silhouette, so its
// backdrop blur matches the real menu and the windows.

type Phase = 'gone' | 'opening' | 'open' | 'closing'

const RADIUS = 28
const NECK_WIDTH = 44
const LAG = 0.9
const TARGET_DROP = 14

const clamp01 = (x: number) => Math.min(1, Math.max(0, x))
const smooth = (x: number) => x * x * (3 - 2 * x)
const lerp = (a: number, b: number, t: number) => a + (b - a) * t

interface GeniePopoverProps {
  open: boolean
  // Last shown section stays mounted while the menu closes.
  sectionKey: string | null
  left: number
  bottom: number
  originX: number
  width: number
  popoverRef: RefObject<HTMLDivElement | null>
  children: ReactNode
}

interface RunGenieOptions {
  root: HTMLElement
  overlay: HTMLElement
  content: HTMLElement
  opening: boolean
  from: number
  // Neck x relative to the root's left edge.
  originX: number
  // Absolute viewport y the neck pulls toward; defaults to just below the root.
  originY?: number
  maxStrips?: number
  onProgress: (p: number) => void
  onDone: () => void
}

export function runGenie({
  root,
  overlay,
  content,
  opening,
  from,
  originX,
  originY,
  maxStrips = 48,
  onProgress,
  onDone,
}: RunGenieOptions) {
  let rect = root.getBoundingClientRect()
  let contentRect = content.getBoundingClientRect()
  let W = rect.width
  let H = rect.height
  let count = Math.max(14, Math.min(maxStrips, Math.round(H / 13)))
  let h = H / count
  // Strip bounds snapped to device pixels so they tile exactly: an overlap
  // would draw translucent content twice, a gap or anti-aliased seam shows
  // the glass through, and both read as lines across icons.
  let dpr = window.devicePixelRatio || 1
  let snap = (v: number) => Math.round(v * dpr) / dpr
  let edge = (i: number) =>
    snap(rect.top + (i >= count ? H : i * h)) - rect.top
  let sMin = NECK_WIDTH / W
  let by = originY === undefined ? H + TARGET_DROP : originY - rect.top

  overlay.replaceChildren()

  // Frosted body, clipped to the genie silhouette. It spans the viewport so the
  // neck can leave the menu's box; it only blurs. The tint and rim live in
  // children laid out over the menu's real box so they match the settled
  // surface exactly (same gradient, mist and edge glow) and nothing shifts
  // when the real menu takes over.
  let glass = document.createElement('div')
  glass.className = 'cloud-surface'
  glass.style.cssText = 'position:fixed;inset:0;border-radius:0;'
  let body = document.createElement('div')
  body.className = 'cloud-surface__body'
  body.style.cssText = 'border-radius:0;box-shadow:none;background:none;'
  let tint = document.createElement('div')
  tint.style.cssText = `position:absolute;left:${rect.left}px;top:${
    rect.top
  }px;width:${W}px;height:${Math.max(
    H,
    by + 24
  )}px;background:linear-gradient(180deg,rgba(34,92,168,0.62) 0,rgba(14,62,130,0.72) ${H}px);`
  let rim = document.createElement('div')
  rim.style.cssText = `position:absolute;left:${rect.left}px;top:${rect.top}px;width:${W}px;height:${H}px;border-radius:${RADIUS}px;overflow:hidden;box-shadow:inset 0 0 0 1px rgba(255,255,255,0.28),inset 0 0 34px rgba(255,255,255,0.22);`
  rim.innerHTML =
    '<div class="cloud-surface__puffs"></div><div class="cloud-surface__puffs cloud-surface__puffs--alt"></div>'
  body.append(tint, rim)
  // Outer glow and drop shadow of the real surface; grows in with the genie so
  // it is already at full strength when the real menu takes over.
  let shadow = document.createElement('div')
  shadow.style.cssText = `position:absolute;left:${rect.left}px;top:${rect.top}px;width:${W}px;height:${H}px;border-radius:${RADIUS}px;box-shadow:0 0 36px rgba(255,255,255,0.22),0 22px 56px rgba(6,36,90,0.35);`
  glass.append(shadow, body)
  overlay.appendChild(glass)

  let strips: HTMLElement[] = []
  for (let i = 0; i < count; i++) {
    let y0 = edge(i)
    let sh = edge(i + 1) - y0
    let strip = document.createElement('div')
    strip.style.cssText = `position:fixed;left:${rect.left}px;top:${
      rect.top + y0
    }px;width:${W}px;height:${sh}px;overflow:hidden;transform-origin:50% 0;will-change:transform;`
    let inner = document.createElement('div')
    inner.className = 'cloud-surface font-geist'
    inner.style.cssText = `position:absolute;left:0;top:${-y0}px;width:${W}px;height:${H}px;overflow:visible;`
    let clone = content.cloneNode(true) as HTMLElement
    clone.removeAttribute('data-genie-content')
    // Cloned iframes would reload once per strip; swap in blank stand-ins.
    clone.querySelectorAll('iframe').forEach((frame) => {
      let stand = document.createElement('div')
      stand.style.cssText = `width:100%;height:${
        frame.getAttribute('height') ?? frame.clientHeight
      }px;border-radius:16px;background:#fff;`
      frame.replaceWith(stand)
    })
    clone.style.cssText += `;position:absolute;left:${
      contentRect.left - rect.left
    }px;top:${contentRect.top - rect.top}px;width:${
      contentRect.width
    }px;pointer-events:none;`
    inner.appendChild(clone)
    strip.appendChild(inner)
    overlay.appendChild(strip)
    strips.push(strip)
  }

  // Silhouette sample rows: the strips are ~13px tall, far too coarse for the
  // 28px corner arcs, so rows are dense inside the corner bands.
  let rows: number[] = []
  for (let y = 0; y < H; ) {
    rows.push(y)
    y += y < RADIUS || y >= H - RADIUS ? RADIUS / 10 : h
  }
  rows.push(H)

  // How far the point at row y has travelled toward the dock button.
  let travel = (q: number, y: number) =>
    smooth(clamp01(q * (1 + LAG) - (1 - y / H) * LAG))

  let apply = (p: number) => {
    onProgress(p)
    shadow.style.opacity = String(p)
    let q = 1 - p

    // Each strip edge moves once and is shared by the strips above and below
    // it, snapped to device pixels, so neighbours always meet with no seam.
    let pos: number[] = []
    for (let i = 0; i <= count; i++) {
      let y = edge(i)
      let p = snap(rect.top + lerp(y, by, travel(q, y))) - rect.top
      // Never let an edge pass the one above it, which would flip a strip
      // when the target sits inside the box (a tall window near the dock).
      pos.push(i > 0 ? Math.max(p, pos[i - 1]) : p)
    }
    for (let i = 0; i < count; i++) {
      let y0 = edge(i)
      let sh = edge(i + 1) - y0
      let yc = y0 + sh / 2
      let A = travel(q, yc)
      let s = lerp(1, sMin, Math.pow(A, 0.7))
      let sy = sh > 0 ? (pos[i + 1] - pos[i]) / sh : 0
      let cx = lerp(W / 2, originX, A)
      strips[i].style.transform = `translate(${(cx - W / 2).toFixed(2)}px, ${(
        pos[i] - y0
      ).toFixed(3)}px) scale(${s.toFixed(4)}, ${sy.toFixed(4)})`
    }

    let left: string[] = []
    let right: string[] = []
    for (let y of rows) {
      let A = travel(q, y)
      let s = lerp(1, sMin, Math.pow(A, 0.7))
      let cx = lerp(W / 2, originX, A)
      let Y = lerp(y, by, A)
      let d = Math.min(y, H - y)
      let inset =
        d < RADIUS ? RADIUS - Math.sqrt(RADIUS * RADIUS - (RADIUS - d) ** 2) : 0
      let half = (s * W) / 2 - inset * s
      left.push(
        `${(rect.left + cx - half).toFixed(1)}px ${(rect.top + Y).toFixed(1)}px`
      )
      right.push(
        `${(rect.left + cx + half).toFixed(1)}px ${(rect.top + Y).toFixed(1)}px`
      )
    }
    body.style.clipPath = `polygon(${left.join(', ')}, ${right
      .reverse()
      .join(', ')})`
  }

  let to = opening ? 1 : 0
  apply(from)
  let controls = animate(from, to, {
    duration: opening ? 0.62 : 0.5,
    ease: opening ? [0.22, 0.75, 0.25, 1] : [0.5, 0, 0.8, 0.45],
    onUpdate: apply,
    onComplete: onDone,
  })

  return () => {
    controls.stop()
    overlay.replaceChildren()
  }
}

export function GeniePopover({
  open,
  sectionKey,
  left,
  bottom,
  originX,
  width,
  popoverRef,
  children,
}: GeniePopoverProps) {
  let [phase, setPhase] = useState<Phase>('gone')
  let [run, setRun] = useState(0)
  let overlayRef = useRef<HTMLDivElement>(null)
  let progress = useRef(0)
  let lastKey = useRef<string | null>(null)

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
    if (phase !== 'opening' && phase !== 'closing') return
    let root = popoverRef.current
    let overlay = overlayRef.current
    let ul = root?.querySelector<HTMLElement>('[data-genie-content]')
    let reduce = window.matchMedia('(prefers-reduced-motion: reduce)').matches
    let finish = () => {
      progress.current = phase === 'opening' ? 1 : 0
      lastKey.current = phase === 'opening' ? lastKey.current : null
      setPhase(phase === 'opening' ? 'open' : 'gone')
    }
    if (!root || !overlay || !ul || reduce) {
      finish()
      return
    }

    return runGenie({
      root,
      overlay,
      content: ul,
      opening: phase === 'opening',
      from: progress.current,
      originX,
      onProgress: (p) => (progress.current = p),
      onDone: finish,
    })
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [phase, run])

  if (phase === 'gone') return null

  let animating = phase === 'opening' || phase === 'closing'

  return (
    <>
      <div
        ref={popoverRef}
        className="fixed z-[990] font-geist text-white"
        style={{
          left,
          bottom,
          width,
          visibility: animating ? 'hidden' : 'visible',
        }}
      >
        <CloudSurface borderRadius={RADIUS}>{children}</CloudSurface>
      </div>
      <div
        ref={overlayRef}
        aria-hidden="true"
        className="pointer-events-none fixed inset-0 z-[991]"
      />
    </>
  )
}
