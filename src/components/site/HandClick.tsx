import { useEffect, useRef, useState } from 'react'
import { motion } from 'motion/react'

// Keyed clips live in /public/hands (webm VP9-alpha, mov HEVC-alpha for Safari).
// Only tap-like gestures; grab/slide/zoom don't fit a click.
// Value = ms into the clip when the finger lands; the real click fires then.
const TAP_MS: Record<string, number> = {
  '1-click-2-fingers': 450,
  '1-click-palm': 500,
}

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
// Scale the hand so roughly this many px of it (at full size) fit between the
// fingertip and the screen edge, instead of mostly sitting off-screen.
const HAND_FIT = 120
const MIN_SCALE = 0.4
const MAX_SCALE = 0.6
// The hand only ever comes from a screen edge: if the arm would need to stretch
// more than this to reach it, the click just goes through with no hand.
const MAX_STRETCH = 60
const ROTATE: Record<Edge, number> = { bottom: 0, left: 90, top: 180, right: -90 }

const BUTTON_SELECTOR = 'button, [role="button"]'
const CARD_SELECTOR = '[data-hand]'

interface Play {
  id: number
  src: string
  x: number
  y: number
  edge: Edge
  scale: number
  gap: number
}

function pickClip(previous?: string) {
  let options = Object.keys(TAP_MS).filter((c) => c !== previous)
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
  let pending = useRef<ReturnType<typeof setTimeout> | null>(null)
  let replaying = useRef(false)
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
      if (replaying.current || reduceMotion.matches) return
      let target = e.target
      if (!(target instanceof Element)) return

      let vw = window.innerWidth
      let vh = window.innerHeight
      let x: number
      let y: number

      let button = target.closest<HTMLElement>(BUTTON_SELECTOR)
      let card = target.closest<HTMLElement>(CARD_SELECTOR)
      let nearEdge = false
      let box: DOMRect | null = null
      if (button && !(button as HTMLButtonElement).disabled) {
        let r = button.getBoundingClientRect()
        nearEdge =
          Math.min(r.left, r.top, vw - r.right, vh - r.bottom) <= EDGE_REACH
        box = r
        // Popover menu rows are <button role="menuitem">; they never get a hand.
        if (button.hasAttribute('data-no-hand') || button.matches('[role="menuitem"]')) return
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

      // Edge buttons: tap the side facing away from the edge, which leaves
      // more room for the hand between the fingertip and the edge.
      if (nearEdge && box) {
        if (edge === 'bottom') y -= box.height * 0.25
        else if (edge === 'top') y += box.height * 0.25
        else if (edge === 'left') x += box.width * 0.25
        else x -= box.width * 0.25
        distances = { left: x, right: vw - x, top: y, bottom: vh - y }
      }
      let scale = Math.min(MAX_SCALE, Math.max(MIN_SCALE, distances[edge] / HAND_FIT))

      let reach = distances[edge] / scale - ARM + 2
      if (reach > MAX_STRETCH) return

      // Hold the real click until the finger lands; swallow extra clicks
      // while a hand is still on its way.
      e.preventDefault()
      e.stopImmediatePropagation()
      if (pending.current) return

      let clip = nextClip.current
      let src = blobs.current[clip] ?? urlFor(clip)
      delete blobs.current[clip]
      prefetch()

      let click = new MouseEvent('click', {
        bubbles: true,
        cancelable: true,
        composed: true,
        view: window,
        detail: e.detail,
        button: e.button,
        clientX: e.clientX,
        clientY: e.clientY,
        screenX: e.screenX,
        screenY: e.screenY,
        ctrlKey: e.ctrlKey,
        shiftKey: e.shiftKey,
        altKey: e.altKey,
        metaKey: e.metaKey,
      })
      pending.current = setTimeout(() => {
        pending.current = null
        if (!target.isConnected) return
        replaying.current = true
        try {
          target.dispatchEvent(click)
        } finally {
          replaying.current = false
        }
      }, TAP_MS[clip])

      setPlay({
        id: ++counter.current,
        src,
        x,
        y,
        edge,
        scale,
        // Arm length below the fingertip; stretch the last rows to reach the edge.
        gap: Math.max(0, reach),
      })
    }

    document.addEventListener('click', onClick, true)
    return () => {
      document.removeEventListener('click', onClick, true)
      if (pending.current) clearTimeout(pending.current)
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
      if (current?.src.startsWith('blob:')) {
        URL.revokeObjectURL(current.src)
      }
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
            transform: `rotate(${ROTATE[play.edge]}deg) scale(${play.scale})`,
            filter: 'drop-shadow(0 8px 12px rgba(0,0,0,0.28))',
          }}
        >
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 0.12 }}
            style={{ position: 'absolute', inset: 0 }}
          >
          <HandVideo
            src={play.src}
            onEnded={done}
            style={{
              display: 'block',
              width: SHOW_W,
              height: SHOW_H,
            }}
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
          </motion.div>
        </div>
      )}
    </div>
  )
}
