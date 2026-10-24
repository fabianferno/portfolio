import Head from 'next/head'

import { CloudBackground } from '@/components/site/CloudBackground'
import { LocalClock } from '@/components/site/LocalClock'

export default function Home() {
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

        <div className="absolute inset-0 z-20 flex items-center justify-center px-4 pb-24 pt-16 sm:px-10">
          <video
            className="aspect-video w-full max-w-5xl rounded-2xl bg-black/30 object-cover shadow-[0_24px_80px_rgba(0,0,0,0.45)] ring-1 ring-white/25"
            src="/video/montage.mp4"
            poster="/video/montage-poster.jpg"
            autoPlay
            muted
            loop
            playsInline
            preload="metadata"
          />
        </div>

        <footer className="absolute inset-x-0 z-30 bottom-0 flex h-14 items-center justify-between gap-6 px-4 text-[11px] uppercase tracking-[0.14em] [text-shadow:0_1px_8px_rgba(0,0,0,0.35)] sm:px-7 sm:text-xs">
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
        </footer>
      </div>
    </>
  )
}
