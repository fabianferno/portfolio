import { useEffect, useRef } from 'react'
import { AppProps } from 'next/app'
import Head from 'next/head'
import { useRouter } from 'next/router'

import { Footer } from '@/components/Footer'
import { Header } from '@/components/Header'
import GradualBlur from '@/blocks/Animations/GradualBlur/GradualBlur';

import '@/styles/tailwind.css'
import 'focus-visible'

function usePrevious<T>(value: T): T | undefined {
  let ref = useRef<T | undefined>(undefined)

  useEffect(() => {
    ref.current = value
  }, [value])

  return ref.current
}

export default function App({ Component, pageProps }: AppProps) {
  let router = useRouter()
  let previousPathname = usePrevious(router.pathname)

  return (
    <>
      <Head>
        <meta
          property="og:image"
          content={`${process.env.NEXT_PUBLIC_SITE_URL}/banner.png`}
          key="og:image"
        />
        <meta
          name="twitter:image"
          content={`${process.env.NEXT_PUBLIC_SITE_URL}/banner.png`}
          key="twitter:image"
        />
        <meta name="twitter:card" content="summary_large_image" key="twitter:card" />
      </Head>
      <div className="fixed inset-0 flex justify-center sm:px-8">
        <div className="flex w-full max-w-7xl lg:px-8">
          <div className="mx-3 w-full bg-zinc-800 bg-gradient-to-br from-zinc-300 to-zinc-100 dark:from-zinc-900/70 dark:to-black ring-1 ring-zinc-100 dark:ring-zinc-300/20" />
        </div>
      </div>
      <div className="relative">
        <Header />
        <main className='md:px-0 px-3'>
          <Component previousPathname={previousPathname} {...pageProps} />
        </main>
        <GradualBlur
          target="page"
          position="bottom"
          height="6rem"
          strength={3}
          divCount={5}
          curve="bezier"
          exponential={true}
          opacity={1}
        />
        <Footer />

      </div>
    </>
  )
}
