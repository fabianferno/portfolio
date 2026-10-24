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

    let rect = root.getBoundingClientRect()
    let ulRect = ul.getBoundingClientRect()
    let W = rect.width
    let H = rect.height
    let count = Math.max(14, Math.min(48, Math.round(H / 13)))
    let h = H / count
    let sMin = NECK_WIDTH / W
    let by = H + TARGET_DROP

    overlay.replaceChildren()

    // Frosted body: same classes as the real surface so the blur is identical.
    let glass = document.createElement('div')
    glass.className = 'cloud-surface'
    glass.style.cssText = 'position:fixed;inset:0;border-radius:0;'
    let body = document.createElement('div')
    body.className = 'cloud-surface__body'
    body.style.borderRadius = '0'
    body.style.boxShadow = 'none'
    body.innerHTML =
      '<div class="cloud-surface__puffs"></div><div class="cloud-surface__puffs cloud-surface__puffs--alt"></div>'
    glass.appendChild(body)
    overlay.appendChild(glass)

    let strips: HTMLElement[] = []
    for (let i = 0; i < count; i++) {
      let y0 = i * h
      let strip = document.createElement('div')
      strip.style.cssText = `position:fixed;left:${rect.left}px;top:${rect.top + y0}px;width:${W}px;height:${h + 1}px;overflow:hidden;will-change:transform;box-shadow:inset 1px 0 0 rgba(255,255,255,0.3),inset -1px 0 0 rgba(255,255,255,0.3)${
        i === 0 ? ',inset 0 1px 0 rgba(255,255,255,0.3)' : ''
      }${i === count - 1 ? ',inset 0 -1px 0 rgba(255,255,255,0.3)' : ''};`
      let inner = document.createElement('div')
      inner.className = 'cloud-surface font-geist'
      inner.style.cssText = `position:absolute;left:0;top:${-y0}px;width:${W}px;height:${H}px;overflow:visible;`
      let clone = ul!.cloneNode(true) as HTMLElement
      clone.removeAttribute('data-genie-content')
      clone.style.cssText += `;position:absolute;left:${ulRect.left - rect.left}px;top:${ulRect.top - rect.top}px;width:${ulRect.width}px;pointer-events:none;`
      inner.appendChild(clone)
      strip.appendChild(inner)
      overlay.appendChild(strip)
      strips.push(strip)
    }

    let apply = (p: number) => {
      progress.current = p
      let q = 1 - p
      let left: string[] = []
      let right: string[] = []
      let pt = (i: number, edge: 'top' | 'mid' | 'bottom') => {
        let yc = i * h + h / 2
        let z = yc / H
        let A = smooth(clamp01(q * (1 + LAG) - (1 - z) * LAG))
        let s = lerp(1, sMin, Math.pow(A, 0.7))
        let sy = lerp(1, 0.15, A)
        let cx = lerp(W / 2, originX, A)
        let cy = lerp(yc, by, A)
        let y =
          edge === 'top'
            ? cy - (h / 2) * sy - (yc - i * h) * 0 // top boundary of strip
            : edge === 'bottom'
              ? cy + (h / 2) * sy
              : cy
        let d = edge === 'top' ? 0 : edge === 'bottom' ? 0 : Math.min(yc, H - yc)
        let inset = d < RADIUS ? RADIUS - Math.sqrt(RADIUS * RADIUS - (RADIUS - d) ** 2) : 0
        let half = (s * W) / 2 - inset * s
        return {
          l: `${(rect.left + cx - half).toFixed(1)}px ${(rect.top + y).toFixed(1)}px`,
          r: `${(rect.left + cx + half).toFixed(1)}px ${(rect.top + y).toFixed(1)}px`,
          A,
          s,
          sy,
          cx,
          cy,
          yc,
        }
      }
      for (let i = 0; i < count; i++) {
        let a = pt(i, i === 0 ? 'top' : 'mid')
        strips[i].style.transform = `translate(${(a.cx - W / 2).toFixed(2)}px, ${(a.cy - a.yc).toFixed(2)}px) scale(${a.s.toFixed(4)}, ${a.sy.toFixed(4)})`
        if (i === 0) {
          // top edge, rounded in by the full corner radius
          let top = pt(0, 'top')
          let inset = RADIUS * top.s
          left.push(
            `${(rect.left + top.cx - (top.s * W) / 2 + inset).toFixed(1)}px ${(rect.top + top.cy - (h / 2) * top.sy).toFixed(1)}px`
          )
          right.push(
            `${(rect.left + top.cx + (top.s * W) / 2 - inset).toFixed(1)}px ${(rect.top + top.cy - (h / 2) * top.sy).toFixed(1)}px`
          )
        }
        left.push(a.l)
        right.push(a.r)
        if (i === count - 1) {
          let bot = pt(i, 'bottom')
          let inset = RADIUS * bot.s
          left.push(
            `${(rect.left + bot.cx - (bot.s * W) / 2 + inset).toFixed(1)}px ${(rect.top + bot.cy + (h / 2) * bot.sy).toFixed(1)}px`
          )
          right.push(
            `${(rect.left + bot.cx + (bot.s * W) / 2 - inset).toFixed(1)}px ${(rect.top + bot.cy + (h / 2) * bot.sy).toFixed(1)}px`
          )
        }
      }
      body.style.clipPath = `polygon(${left.join(', ')}, ${right.reverse().join(', ')})`
    }

    let from = progress.current
    let to = phase === 'opening' ? 1 : 0
    apply(from)
    let controls = animate(from, to, {
      duration: phase === 'opening' ? 0.62 : 0.5,
      ease: phase === 'opening' ? [0.22, 0.75, 0.25, 1] : [0.5, 0, 0.8, 0.45],
      onUpdate: apply,
      onComplete: finish,
    })

    return () => {
      controls.stop()
      overlay!.replaceChildren()
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [phase, run])

  if (phase === 'gone') return null

  let animating = phase === 'opening' || phase === 'closing'

  return (
    <>
      <div
        ref={popoverRef}
        className="fixed z-[55] font-geist text-white"
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
        className="pointer-events-none fixed inset-0 z-[56]"
      />
    </>
  )
}
