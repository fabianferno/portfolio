import Head from 'next/head'
import Link from 'next/link'
import { useEffect, useState } from 'react'
import { AnimatePresence, motion } from 'motion/react'

const events = [
  'band.jpg',
  'eth-india-2022.jpg',
  'eth-sg.JPG',
  'ethglobal-paris.jpg',
  'gm-vietnam.jpg',
  'home.jpg',
  'neocast-hk.jpg',
  'pattarai-2.jpg',
  'pattarai.jpg',
  'riot.JPG',
  'vitalik.jpg',
  'web3-chennai-2.jpg',
  'web3-chennai.jpg',
].map((f) => `/photos/${f}`)

const travel = [
  'IMG_3218',
  'IMG_3219',
  'IMG_3220',
  'IMG_3221',
  'IMG_3222',
  'IMG_3224',
  'IMG_3225',
  'IMG_3226',
  'IMG_3227',
  'IMG_3236',
  'IMG_3238',
].map((f) => `/gallery/${f}.JPG`)

const images = [...events, ...travel]

export default function Gallery() {
  const [active, setActive] = useState<number | null>(null)

  useEffect(() => {
    if (active === null) return
    const onKey = (e: KeyboardEvent) => {
      if (e.key === 'Escape') setActive(null)
      if (e.key === 'ArrowRight') setActive((i) => (i === null ? i : (i + 1) % images.length))
      if (e.key === 'ArrowLeft')
        setActive((i) => (i === null ? i : (i - 1 + images.length) % images.length))
    }
    window.addEventListener('keydown', onKey)
    return () => window.removeEventListener('keydown', onKey)
  }, [active])

  return (
    <>
      <Head>
        <title>Gallery - Fabian Ferno</title>
        <meta
          name="description"
          content="Photos from hackathons, conferences, communities and travel."
        />
      </Head>
      <main className="min-h-[100svh] bg-white px-5 pb-24 pt-8 font-geist text-zinc-900 sm:px-10">
        <header className="mb-10 flex items-center justify-between text-xs uppercase tracking-[0.14em]">
          <Link href="/" className="hover:text-zinc-500">
            ← Fabian Ferno
          </Link>
          <span className="text-zinc-500">Gallery · {images.length} photos</span>
        </header>

        <div className="columns-2 gap-3 sm:columns-3 lg:columns-4">
          {images.map((src, i) => (
            <motion.button
              key={src}
              type="button"
              onClick={() => setActive(i)}
              initial={{ opacity: 0, y: 16 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ type: 'spring', stiffness: 180, damping: 24, delay: Math.min(i, 12) * 0.04 }}
              className="mb-3 block w-full overflow-hidden rounded-lg bg-zinc-100"
            >
              {/* eslint-disable-next-line @next/next/no-img-element */}
              <img
                src={src}
                alt=""
                loading="lazy"
                className="block w-full transition-transform duration-500 hover:scale-[1.03]"
              />
            </motion.button>
          ))}
        </div>
      </main>

      <AnimatePresence>
        {active !== null && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            onClick={() => setActive(null)}
            className="fixed inset-0 z-50 flex items-center justify-center bg-white/95 p-4 backdrop-blur"
          >
            {/* eslint-disable-next-line @next/next/no-img-element */}
            <img
              src={images[active]}
              alt=""
              className="max-h-full max-w-full rounded-lg object-contain"
            />
            <span className="absolute right-5 top-5 text-xs uppercase tracking-[0.14em] text-zinc-500">
              Esc to close · ← →
            </span>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  )
}
