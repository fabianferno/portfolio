import { useEffect, useRef, useState } from 'react'

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

interface Clip {
  box: HTMLDivElement
  video: HTMLVideoElement
  slice: HTMLDivElement
  // Canvas fed from the main video (webm); Safari's HEVC alpha doesn't
  // survive drawImage, so there it's a second video of the same clip.
  sliceMedia: HTMLCanvasElement | HTMLVideoElement
}

function pickClip(previous?: string) {
  let options = Object.keys(TAP_MS).filter((c) => c !== previous)
  return options[Math.floor(Math.random() * options.length)]
}

function usesHevcAlpha() {
  let ua = navigator.userAgent
  return /AppleWebKit/.test(ua) && !/Chrome\/|Chromium|Android|Edg\/|OPR\//.test(ua)
}

// Copy the bottom rows of each video frame into the slice canvas, which is
// stretched to carry the arm out to the screen edge.
function drawSlice(video: HTMLVideoElement, canvas: HTMLCanvasElement) {
  let ctx = canvas.getContext('2d')
  if (!ctx) return () => {}
  let w = video.videoWidth
  let h = video.videoHeight
  let rows = Math.round((h * SLICE) / SHOW_H)
  canvas.width = w
  canvas.height = rows
  let id = 0
  let useVfc = 'requestVideoFrameCallback' in video
  let tick = () => {
    ctx!.clearRect(0, 0, w, rows)
    ctx!.drawImage(video, 0, h - rows, w, rows, 0, 0, w, rows)
    id = useVfc ? video.requestVideoFrameCallback(tick) : requestAnimationFrame(tick)
  }
  tick()
  return () => (useVfc ? video.cancelVideoFrameCallback(id) : cancelAnimationFrame(id))
}

export function HandClick() {
  let [ext, setExt] = useState<'webm' | 'mov' | null>(null)
  let [srcs, setSrcs] = useState<Record<string, string>>({})
  let wrap = useRef<HTMLDivElement>(null)
  let clips = useRef<Record<string, Partial<Clip>>>({})
  let nextClip = useRef<string>('')
  let pending = useRef<ReturnType<typeof setTimeout> | null>(null)
  let replaying = useRef(false)

  useEffect(() => {
    let format: 'webm' | 'mov' = usesHevcAlpha() ? 'mov' : 'webm'
    setExt(format)
    let reduceMotion = window.matchMedia('(prefers-reduced-motion: reduce)')
    let urls: string[] = []
    let active: { clip: Partial<Clip>; stopDraw: () => void; timer: ReturnType<typeof setTimeout> } | null =
      null

    // Pull every clip into memory once; each gets a persistent, preloaded
    // <video> so a tap only has to rewind and play.
    Object.keys(TAP_MS).forEach((clip) => {
      fetch(`/hands/${clip}.${format}`)
        .then((res) => (res.ok ? res.blob() : Promise.reject()))
        .then((blob) => {
          let url = URL.createObjectURL(blob)
          urls.push(url)
          setSrcs((s) => ({ ...s, [clip]: url }))
        })
        .catch(() => {})
    })
    nextClip.current = pickClip()

    // Rewind while hidden so the next tap starts on a decoded first frame.
    let hide = () => {
      if (!active) return
      let { clip, stopDraw, timer } = active
      active = null
      stopDraw()
      clearTimeout(timer)
      if (wrap.current) wrap.current.style.visibility = 'hidden'
      for (let v of [clip.video, clip.sliceMedia]) {
        if (v instanceof HTMLVideoElement) {
          v.pause()
          v.currentTime = 0
        }
      }
    }

    let show = (name: string, x: number, y: number, edge: Edge, scale: number, gap: number) => {
      let el = wrap.current
      let clip = clips.current[name]
      if (!el || !clip.box || !clip.video || !clip.slice || !clip.sliceMedia) return
      hide()
      Object.assign(el.style, {
        left: `${x - ANCHOR_X}px`,
        top: `${y - ANCHOR_Y}px`,
        transform: `rotate(${ROTATE[edge]}deg) scale(${scale})`,
        visibility: 'visible',
      })
      for (let c of Object.values(clips.current)) {
        if (c.box) c.box.style.visibility = c === clip ? 'inherit' : 'hidden'
      }
      clip.slice.style.display = gap > 0 ? 'block' : 'none'
      clip.slice.style.transform = `scaleY(${gap / SLICE})`

      let { video, sliceMedia } = clip
      let stopDraw = () => {}
      if (gap > 0) {
        if (sliceMedia instanceof HTMLCanvasElement) stopDraw = drawSlice(video, sliceMedia)
        else sliceMedia.play().catch(() => {})
      }
      video.onended = hide
      video.play().catch(hide)
      el.animate([{ opacity: 0 }, { opacity: 1 }], { duration: 120 })
      // Never leave a hand stuck if `ended` doesn't fire.
      active = { clip, stopDraw, timer: setTimeout(hide, 3000) }
    }

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

      // Clip still loading: let the click through without a hand.
      let clip = nextClip.current
      if (!clips.current[clip]?.video?.src) return

      // Hold the real click until the finger lands; swallow extra clicks
      // while a hand is still on its way.
      e.preventDefault()
      e.stopImmediatePropagation()
      if (pending.current) return
      nextClip.current = pickClip(clip)

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

      // Arm length below the fingertip; stretch the last rows to reach the edge.
      show(clip, x, y, edge, scale, Math.max(0, reach))
    }

    document.addEventListener('click', onClick, true)
    return () => {
      document.removeEventListener('click', onClick, true)
      if (pending.current) clearTimeout(pending.current)
      hide()
      urls.forEach(URL.revokeObjectURL)
    }
  }, [])

  let ref = (clip: string, key: keyof Clip) => (el: HTMLElement | null) => {
    if (!el) return
    if (el instanceof HTMLVideoElement) el.muted = true
    ;(clips.current[clip] ??= {})[key] = el as never
  }

  // React doesn't reliably apply `muted` before playback, so the ref sets it.
  let video = (clip: string, key: 'video' | 'sliceMedia', style: React.CSSProperties) => (
    <video
      ref={ref(clip, key)}
      src={srcs[clip]}
      muted
      playsInline
      preload="auto"
      style={{ display: 'block', width: SHOW_W, height: SHOW_H, ...style }}
    />
  )

  return (
    <div
      aria-hidden="true"
      className="pointer-events-none fixed inset-0 z-[99999] overflow-hidden"
    >
      <div
        ref={wrap}
        style={{
          position: 'absolute',
          width: SHOW_W,
          height: SHOW_H,
          transformOrigin: `${ANCHOR_X}px ${ANCHOR_Y}px`,
          visibility: 'hidden',
          filter: 'drop-shadow(0 8px 12px rgba(0,0,0,0.28))',
        }}
      >
        {ext &&
          Object.keys(srcs).map((clip) => (
            <div
              key={clip}
              ref={ref(clip, 'box')}
              style={{ position: 'absolute', inset: 0, visibility: 'hidden' }}
            >
              {video(clip, 'video', {})}
              <div
                ref={ref(clip, 'slice')}
                style={{
                  position: 'absolute',
                  top: SHOW_H - 1,
                  left: 0,
                  width: SHOW_W,
                  height: SLICE,
                  overflow: 'hidden',
                  transformOrigin: 'top',
                  display: 'none',
                }}
              >
                {ext === 'mov' ? (
                  video(clip, 'sliceMedia', { marginTop: -(SHOW_H - SLICE) })
                ) : (
                  <canvas
                    ref={ref(clip, 'sliceMedia')}
                    style={{ display: 'block', width: SHOW_W, height: SLICE }}
                  />
                )}
              </div>
            </div>
          ))}
      </div>
    </div>
  )
}
