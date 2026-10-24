import { ReactNode, useEffect, useRef } from 'react'
import { AppProps } from 'next/app'
import Head from 'next/head'
import { useRouter } from 'next/router'

import { Footer } from '@/components/Footer'
import { Header } from '@/components/Header'
import GradualBlur from '@/blocks/Animations/GradualBlur/GradualBlur';
import { BottomNav } from '@/components/site/BottomNav'
import { HandClick } from '@/components/site/HandClick'

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
  let isOldSite = router.pathname === '/old' || router.pathname.startsWith('/old/')

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
      {isOldSite ? (
        <OldSiteShell>
          <Component previousPathname={previousPathname} {...pageProps} />
        </OldSiteShell>
      ) : (
        <>
          <Component previousPathname={previousPathname} {...pageProps} />
          <BottomNav />
          <HandClick />
        </>
      )}
    </>
  )
}

function OldSiteShell({ children }: { children: ReactNode }) {
  return (
    <>
      <div className="fixed inset-0 flex justify-center sm:px-8">
        <div className="flex w-full max-w-7xl lg:px-8">
          <div className="mx-3 w-full bg-zinc-800 bg-gradient-to-br from-zinc-300 to-zinc-100 dark:from-zinc-900/70 dark:to-black ring-1 ring-zinc-100 dark:ring-zinc-300/20" />
        </div>
      </div>
      <div className="relative">
        <Header />
        <main className='md:px-0 px-3'>
          {children}
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
