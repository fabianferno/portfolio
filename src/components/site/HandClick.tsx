import { useEffect, useRef, useState } from 'react'

// Keyed clips live in /public/hands (webm VP9-alpha, mov HEVC-alpha for Safari).
const CLIPS = [
  '1-click-1-finger',
  '1-click-1-finger_1',
  '1-click-2-fingers',
  '1-click-palm',
  '2-click-1-finger',
  '2-click-2-fingers',
  '2-click-palm',
  'flick-off-down',
  'flick-off-up',
  'grab-to-down',
  'grab-to-up',
  'push-1-finger',
  'push-2-fingers',
  'push-palm',
  'put-hand-up',
  'slide-to-down-1-finger',
  'slide-to-down-palm',
  'slide-to-left-palm',
  'slide-to-right-1-finger',
  'slide-to-right-palm',
  'slide-to-up-palm',
  'zoom-in',
  'zoom-out',
]

type Edge = 'bottom' | 'left' | 'top' | 'right'

// Clips are 414x360 with the arm entering from the bottom and the fingertip
// near (46%, 17%) of the frame. Shown at 240px tall.
const SHOW_H = 240
const SHOW_W = Math.round((SHOW_H * 414) / 360)
const ANCHOR_X = Math.round(SHOW_W * 0.46)
const ANCHOR_Y = Math.round(SHOW_H * 0.17)
const ARM = SHOW_H - ANCHOR_Y
const SLICE = 10
const EDGE_REACH = 160
const ROTATE: Record<Edge, number> = { bottom: 0, left: 90, top: 180, right: -90 }

const BUTTON_SELECTOR = 'button, [role="button"], [role="menuitem"]'
const CARD_SELECTOR = '[data-hand], [role="menuitem"]'

interface Play {
  id: number
  src: string
  x: number
  y: number
  edge: Edge
  gap: number
}

function pickClip(previous?: string) {
  let options = CLIPS.filter((c) => c !== previous)
  return options[Math.floor(Math.random() * options.length)]
}

function usesHevcAlpha() {
  let ua = navigator.userAgent
  return /AppleWebKit/.test(ua) && !/Chrome\/|Chromium|Android|Edg\/|OPR\//.test(ua)
}

// React doesn't reliably apply `muted` before autoplay is evaluated, so set it
// and start playback ourselves.
function HandVideo({
  src,
  onEnded,
  style,
}: {
  src: string
  onEnded?: () => void
  style: React.CSSProperties
}) {
  return (
    <video
      ref={(el) => {
        if (!el) return
        el.muted = true
        el.play().catch(() => {})
      }}
      src={src}
      muted
      playsInline
      onEnded={onEnded}
      style={style}
    />
  )
}

export function HandClick() {
  let [play, setPlay] = useState<Play | null>(null)
  let nextClip = useRef<string>('')
  let blobs = useRef<Record<string, string>>({})
  let counter = useRef(0)
  let ext = useRef<'webm' | 'mov'>('webm')

  useEffect(() => {
    ext.current = usesHevcAlpha() ? 'mov' : 'webm'
    let reduceMotion = window.matchMedia('(prefers-reduced-motion: reduce)')

    let urlFor = (clip: string) => `/hands/${clip}.${ext.current}`

    // Fetch the upcoming clip into memory so playback starts with no network wait.
    let prefetch = () => {
      let clip = pickClip(nextClip.current)
      nextClip.current = clip
      if (blobs.current[clip]) return
      fetch(urlFor(clip))
        .then((res) => (res.ok ? res.blob() : Promise.reject()))
        .then((blob) => {
          blobs.current[clip] = URL.createObjectURL(blob)
        })
        .catch(() => {})
    }
    prefetch()

    let onClick = (e: MouseEvent) => {
      if (reduceMotion.matches) return
      let target = e.target
      if (!(target instanceof Element)) return

      let vw = window.innerWidth
      let vh = window.innerHeight
      let x: number
      let y: number

      let button = target.closest<HTMLElement>(BUTTON_SELECTOR)
      let card = target.closest<HTMLElement>(CARD_SELECTOR)
      let nearEdge = false
      if (button && !(button as HTMLButtonElement).disabled) {
        let r = button.getBoundingClientRect()
        nearEdge =
          Math.min(r.left, r.top, vw - r.right, vh - r.bottom) <= EDGE_REACH
        x = r.left + r.width / 2
        y = r.top + r.height / 2
      } else {
        x = y = 0
      }

      if (!nearEdge) {
        if (!card) return
        // Cards: tap where the pointer landed (element center for keyboard).
        if (e.detail > 0) {
          x = e.clientX
          y = e.clientY
        } else {
          let r = card.getBoundingClientRect()
          x = r.left + r.width / 2
          y = r.top + r.height / 2
        }
      }

      let distances: Record<Edge, number> = {
        left: x,
        right: vw - x,
        top: y,
        bottom: vh - y,
      }
      let edge = (Object.keys(distances) as Edge[]).reduce((a, b) =>
        distances[b] < distances[a] ? b : a
      )

      let clip = nextClip.current
      let src = blobs.current[clip] ?? urlFor(clip)
      delete blobs.current[clip]
      prefetch()

      setPlay({
        id: ++counter.current,
        src,
        x,
        y,
        edge,
        // Arm length below the fingertip; stretch the last rows to reach the edge.
        gap: Math.max(0, distances[edge] - ARM + 2),
      })
    }

    document.addEventListener('click', onClick, true)
    return () => {
      document.removeEventListener('click', onClick, true)
      Object.values(blobs.current).forEach(URL.revokeObjectURL)
      blobs.current = {}
    }
  }, [])

  // Release the in-memory clip once it's done, and never leave a hand stuck.
  useEffect(() => {
    if (!play) return
    let id = setTimeout(() => setPlay(null), 3000)
    return () => clearTimeout(id)
  }, [play])

  let done = () => {
    setPlay((current) => {
      if (current?.src.startsWith('blob:')) URL.revokeObjectURL(current.src)
      return null
    })
  }

  return (
    <div
      aria-hidden="true"
      className="pointer-events-none fixed inset-0 z-[99999] overflow-hidden"
    >
      {play && (
        <div
          key={play.id}
          style={{
            position: 'absolute',
            left: play.x - ANCHOR_X,
            top: play.y - ANCHOR_Y,
            width: SHOW_W,
            height: SHOW_H,
            transformOrigin: `${ANCHOR_X}px ${ANCHOR_Y}px`,
            transform: `rotate(${ROTATE[play.edge]}deg)`,
            filter: 'drop-shadow(0 8px 12px rgba(0,0,0,0.28))',
          }}
        >
          <HandVideo
            src={play.src}
            onEnded={done}
            style={{ display: 'block', width: SHOW_W, height: SHOW_H }}
          />
          {play.gap > 0 && (
            <div
              style={{
                position: 'absolute',
                top: SHOW_H - 1,
                left: 0,
                width: SHOW_W,
                height: SLICE,
                overflow: 'hidden',
                transform: `scaleY(${play.gap / SLICE})`,
                transformOrigin: 'top',
              }}
            >
              <HandVideo
                src={play.src}
                style={{
                  display: 'block',
                  width: SHOW_W,
                  height: SHOW_H,
                  marginTop: -(SHOW_H - SLICE),
                }}
              />
            </div>
          )}
        </div>
      )}
    </div>
  )
}
