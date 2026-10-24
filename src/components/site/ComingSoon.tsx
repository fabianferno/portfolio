import Head from 'next/head'
import Link from 'next/link'
import { motion } from 'motion/react'

export function ComingSoon({ title, oldHref }: { title: string; oldHref: string }) {
  return (
    <>
      <Head>
        <title>{`${title} - Fabian Ferno`}</title>
      </Head>
      <motion.div
        initial={{ opacity: 0, y: 16 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ type: 'spring', stiffness: 180, damping: 24 }}
        className="flex h-[100svh] flex-col items-center justify-center gap-4 bg-white font-geist text-zinc-900"
      >
        <h1 className="text-xs uppercase tracking-[0.14em]">{title}</h1>
        <p className="text-xs uppercase tracking-[0.14em] text-zinc-500">
          In progress ·{' '}
          <Link href={oldHref} className="underline underline-offset-4 hover:text-zinc-900">
            View the old version
          </Link>
        </p>
      </motion.div>
    </>
  )
}
