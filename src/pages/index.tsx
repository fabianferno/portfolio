import { useEffect, useRef, useState } from 'react'
import Head from 'next/head'
import { motion } from 'motion/react'
import { SpeakerWaveIcon, SpeakerXMarkIcon } from '@heroicons/react/24/solid'

import { CloudBackground } from '@/components/site/CloudBackground'
import { LocalClock } from '@/components/site/LocalClock'
import { MusicPlayer } from '@/components/site/MusicPlayer'

// Adaptive HLS stream (480p/720p/1080p) served from CloudFront.
const MONTAGE_HLS =
  'https://d4cav6svopnda.cloudfront.net/montage/v1/master.m3u8'

// The montage is long, so start each visit at a random scene (leaving a few
// seconds of runway before the end).
function seekToRandomScene(video: HTMLVideoElement) {
  if (!Number.isFinite(video.duration)) return
  video.currentTime = Math.random() * Math.max(0, video.duration - 15)
  // Seeking can interrupt autoplay's pending play(), so nudge it again.
  video.play().catch(() => {})
}

export default function Home() {
  let videoRef = useRef<HTMLVideoElement>(null)
  let [muted, setMuted] = useState(true)

  // Safari plays HLS natively; everywhere else hls.js feeds the same <video>.
  useEffect(() => {
    let video = videoRef.current
    if (!video) return
    if (video.canPlayType('application/vnd.apple.mpegurl')) {
      video.src = MONTAGE_HLS
      return
    }

    let hls: import('hls.js').default | undefined
    let cancelled = false
    import('hls.js').then(({ default: Hls }) => {
      if (cancelled || !Hls.isSupported()) return
      hls = new Hls({ capLevelToPlayerSize: true })
      hls.loadSource(MONTAGE_HLS)
      hls.attachMedia(video)
    })
    return () => {
      cancelled = true
      hls?.destroy()
    }
  }, [])

  return (
    <>
      <Head>
        <title>Fabian Ferno</title>
        <meta
          name="description"
          content="Fabian Ferno — founder and engineer building things that connect people, on the web, on-chain, and in the real world."
        />
      </Head>

      <div className="relative h-[100svh] overflow-hidden bg-[#085cb3] font-geist text-white">
        <CloudBackground />

        <div className="absolute inset-0 z-20 flex items-center justify-center px-4 pb-20 pt-16 sm:px-8 md:pb-28 md:pt-12">
          <motion.div
            initial={{ opacity: 0, scale: 0.96, y: 20 }}
            animate={{ opacity: 1, scale: 1, y: 0 }}
            transition={{
              type: 'spring',
              stiffness: 120,
              damping: 22,
              mass: 1,
            }}
            className="relative h-full w-full overflow-hidden rounded-2xl bg-black/30 shadow-[0_24px_80px_rgba(0,0,0,0.45)] ring-1 ring-white/25 md:h-[calc(100svh-18rem)] md:w-[min(100vw-4rem,2200px,calc((100svh-7rem)*16/9))]"
          >
          <video
            ref={videoRef}
            className="h-full w-full object-cover"
            poster="/video/montage-poster.jpg"
            autoPlay
            muted
            loop
            playsInline
            preload="metadata"
            onLoadedMetadata={(e) => {
              let video = e.currentTarget
              if (video.dataset.seeked) return
              video.dataset.seeked = '1'
              seekToRandomScene(video)
            }}
          />
          <button
            type="button"
            data-no-hand
            aria-label={muted ? 'Unmute video' : 'Mute video'}
            aria-pressed={!muted}
            onClick={() => {
              let video = videoRef.current
              if (!video) return
              video.muted = !video.muted
              setMuted(video.muted)
            }}
            className="absolute bottom-3 right-3 flex h-9 w-9 items-center justify-center rounded-full bg-[rgba(14,62,130,0.55)] text-white ring-1 ring-white/30 backdrop-blur-xl transition-transform hover:scale-105 active:scale-95">
            {muted ? (
              <SpeakerXMarkIcon className="h-4 w-4" />
            ) : (
              <SpeakerWaveIcon className="h-4 w-4" />
            )}
          </button>
          </motion.div>
        </div>

        <motion.footer
          initial={{ opacity: 0, y: 12 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{
            type: 'spring',
            stiffness: 140,
            damping: 24,
            delay: 0.25,
          }}
          className="absolute inset-x-0 bottom-0 z-30 hover:z-[1001] flex h-14 items-center justify-center px-4 text-[11px] uppercase tracking-[0.14em] [text-shadow:0_1px_8px_rgba(0,0,0,0.35)] sm:px-8 sm:text-xs"
        >
          <div className="flex w-full items-center justify-between gap-6 md:w-[min(100vw-4rem,1600px,calc((100svh-7rem)*16/9))]">
            <div className="flex items-center gap-10 sm:gap-14">
              <span className="flex items-center gap-3">
                Fabian Ferno
                <span className="group relative">
                  <button
                    type="button"
                    aria-label="Scripts"
                    onClick={() =>
                      window.dispatchEvent(new Event('open-scripts'))
                    }
                    className="flex h-6 w-6 items-center justify-center rounded-full text-white/75 outline-none transition-colors hover:bg-white/15 hover:text-white focus-visible:ring-2 focus-visible:ring-white/60"
                  >
                    {/* Pen nib, so it doesn't read as an "edit" icon. */}
                    <svg
                      aria-hidden="true"
                      viewBox="0 0 24 24"
                      fill="none"
                      stroke="currentColor"
                      strokeWidth={1.75}
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      className="h-4 w-4"
                    >
                      <path d="M15.707 21.293a1 1 0 0 1-1.414 0l-1.586-1.586a1 1 0 0 1 0-1.414l5.586-5.586a1 1 0 0 1 1.414 0l1.586 1.586a1 1 0 0 1 0 1.414z" />
                      <path d="m18 13-1.375-6.874a1 1 0 0 0-.746-.776L3.235 2.028a1 1 0 0 0-1.207 1.207L5.35 15.879a1 1 0 0 0 .776.746L13 18" />
                      <path d="m2.3 2.3 7.286 7.286" />
                      <circle cx="11" cy="11" r="2" />
                    </svg>
                  </button>
                  <span
                    role="tooltip"
                    className="pointer-events-none absolute bottom-full left-1/2 mb-3 -translate-x-1/2 translate-y-1 rounded-md bg-[rgba(14,62,130,0.85)] px-2.5 py-1.5 text-[11px] tracking-[0.12em] text-white opacity-0 ring-1 ring-white/30 backdrop-blur-xl transition duration-150 group-focus-within:translate-y-0 group-focus-within:opacity-100 group-hover:translate-y-0 group-hover:opacity-100"
                  >
                    Scripts
                  </span>
                </span>
              </span>
              <span className="hidden text-white/75 md:inline">
                Engineer · Traveller · Amateur Musician
              </span>
            </div>
            <div className="flex items-center gap-6 sm:gap-10">
              <span className="group relative hidden cursor-default text-white/75 md:inline">
                Chennai, India
                <span
                  role="tooltip"
                  className="pointer-events-none absolute bottom-full left-1/2 mb-3 w-56 -translate-x-1/2 translate-y-1 rounded-xl bg-[rgba(14,62,130,0.85)] px-3 py-2 text-center text-[11px] normal-case leading-snug tracking-normal text-white opacity-0 ring-1 ring-white/30 backdrop-blur-xl transition duration-150 group-hover:translate-y-0 group-hover:opacity-100"
                >
                  The clouds here change with the live weather where you are
                  right now.
                </span>
              </span>
              <LocalClock />
              <MusicPlayer />
            </div>
          </div>
        </motion.footer>
      </div>
    </>
  )
}
