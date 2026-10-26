import { useEffect, useRef, useState } from 'react'
import Head from 'next/head'
import { motion } from 'motion/react'
import { SpeakerWaveIcon, SpeakerXMarkIcon } from '@heroicons/react/24/solid'

import { CloudBackground } from '@/components/site/CloudBackground'
import { LocalClock } from '@/components/site/LocalClock'

// The montage is long, so start each visit at a random scene (leaving a few
// seconds of runway before the end).
function seekToRandomScene(video: HTMLVideoElement) {
  if (!Number.isFinite(video.duration)) return
  video.currentTime = Math.random() * Math.max(0, video.duration - 15)
}

export default function Home() {
  let videoRef = useRef<HTMLVideoElement>(null)
  let [muted, setMuted] = useState(true)

  // Metadata may already be in before hydration attaches handlers.
  useEffect(() => {
    let video = videoRef.current
    if (video && video.readyState >= 1 && !video.dataset.seeked) {
      video.dataset.seeked = '1'
      seekToRandomScene(video)
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
            src="/video/montage.mp4"
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
          className="absolute inset-x-0 bottom-0 z-30 flex h-14 items-center justify-center px-4 text-[11px] uppercase tracking-[0.14em] [text-shadow:0_1px_8px_rgba(0,0,0,0.35)] sm:px-8 sm:text-xs"
        >
          <div className="flex w-full items-center justify-between gap-6 md:w-[min(100vw-4rem,1600px,calc((100svh-7rem)*16/9))]">
            <div className="flex items-center gap-10 sm:gap-14">
              <span>Fabian Ferno</span>
              <span className="hidden text-white/75 md:inline">
                Founder · Engineer · Hacker
              </span>
            </div>
            <div className="flex items-center gap-6 sm:gap-10">
              <span className="hidden text-white/75 md:inline">
                Chennai, India
              </span>
              <LocalClock />
              <span className="hidden sm:inline">
                {new Date().getFullYear()}
              </span>
            </div>
          </div>
        </motion.footer>
      </div>
    </>
  )
}
