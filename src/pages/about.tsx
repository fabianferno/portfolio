import Image from 'next/image'
import Head from 'next/head'
import Link from 'next/link'
import clsx from 'clsx'
import { ComponentType, ReactNode } from 'react'

import { Container } from '@/components/Container'
import {
  XIcon,
  InstagramIcon,
  GitHubIcon,
  LinkedInIcon,
  FarcasterIcon,
  YouTubeIcon,
  TelegramIcon,
} from '@/components/SocialIcons'
import portraitImage from '@/images/portrait.png'

interface SocialLinkProps {
  className?: string
  href: string
  children: ReactNode
  icon: ComponentType<{ className?: string }>
}

function SocialLink({ className, href, children, icon: Icon }: SocialLinkProps) {
  return (
    <li className={clsx(className, 'flex')}>
      <Link
        href={href}
        className="group flex text-sm font-medium text-zinc-800 transition hover:text-teal-500 dark:text-zinc-200 dark:hover:text-teal-500"
      >
        <Icon className="h-6 w-6 flex-none fill-zinc-500 transition group-hover:fill-teal-500" />
        <span className="ml-4">{children}</span>
      </Link>
    </li>
  )
}

function MailIcon(props: { className?: string }) {
  return (
    <svg viewBox="0 0 24 24" aria-hidden="true" {...props}>
      <path
        fillRule="evenodd"
        d="M6 5a3 3 0 0 0-3 3v8a3 3 0 0 0 3 3h12a3 3 0 0 0 3-3V8a3 3 0 0 0-3-3H6Zm.245 2.187a.75.75 0 0 0-.99 1.126l6.25 5.5a.75.75 0 0 0 .99 0l6.25-5.5a.75.75 0 0 0-.99-1.126L12 12.251 6.245 7.187Z"
      />
    </svg>
  )
}

export default function About() {
  return (
    <>
      <Head>
        <title>About - Fabian Ferno</title>
        <meta
          name="description"
          content="I build things that connect people — on the web, on-chain, and in the real world."
        />
      </Head>
      <Container className="mt-16 sm:mt-32">
        <div className="grid grid-cols-1 gap-y-16 lg:grid-cols-2 lg:grid-rows-[auto_1fr] lg:gap-y-12">
          <div className="lg:pl-20">
            <div className="max-w-xs px-2.5 lg:max-w-none">
              <Image
                src={portraitImage}
                alt=""
                sizes="(min-width: 1024px) 32rem, 20rem"
                className="aspect-square rounded-3xl bg-zinc-100 object-cover shadow-lg dark:bg-zinc-800"
              />
            </div>
          </div>
          <div className="lg:order-first lg:row-span-2">
            <h1 className="text-4xl font-bold tracking-tight text-zinc-800 dark:text-zinc-100 sm:text-5xl">
              I build things that connect people — on the web, on-chain, and in the real world.
            </h1>
            <div className="mt-6 space-y-7 text-base text-zinc-600 dark:text-zinc-400">

              <p>
                check out my <Link href="/career" className="dark:text-teal-500 text-teal-600 font-bold hover:text-teal-600 dark:hover:text-teal-400">career</Link> page for extended details of the following:
              </p>
              <ul role="list" className="list-disc pl-5 space-y-2">
                <li>
                  Used to work in the governance, grants and public good space as lead engineer at <Link target="_blank" href="https://karmahq.xyz" className="dark:text-teal-500 text-teal-600 font-bold hover:text-teal-600 dark:hover:text-teal-400">Karma</Link> contributing to protocols like <Link target="_blank" href="https://gitcoin.co" className="dark:text-teal-500 text-teal-600 font-bold hover:text-teal-600 dark:hover:text-teal-400">Gitcoin</Link>, <Link target="_blank" href="https://octant.app" className="dark:text-teal-500 text-teal-600 font-bold hover:text-teal-600 dark:hover:text-teal-400">Octant</Link>, etc. Most notable work was leading the development of <Link target="_blank" href="https://karmahq.xyz" className="dark:text-teal-500 text-teal-600 font-bold hover:text-teal-600 dark:hover:text-teal-400">Grantee Accountability Protocol</Link>(GAP) which is now used by ecosystems like Gitcoin, Celo and Polygon as their grants tooling.
                </li>
                <li>
                  Exited a b2b nft analytics startup as a cofounder - <Link target="_blank" href="https://blitzcrafthq.com" className="dark:text-teal-500 text-teal-600 font-bold hover:text-teal-600 dark:hover:text-teal-400">blitzcrafthq.com</Link> (prev nftconomy.com)
                </li>
                <li>
                  Currently building an AI call centre stack for customer XP at <Link target="_blank" href="https://tenorilabs.ai" className="dark:text-teal-500 text-teal-600 font-bold hover:text-teal-600 dark:hover:text-teal-400">TenoriLabs</Link> for businesses in APAC
                </li>
                <li>
                  Also cofounded one of India’s largest fitness/wellness community app - (<Link target="_blank" href="https://cloka.in" className="dark:text-teal-500 text-teal-600 font-bold hover:text-teal-600 dark:hover:text-teal-400">cloka.in</Link>)
                </li>
                <li>
                  Launched one of my hackathon projects - <Link target="_blank" href="https://whim.bet" className="dark:text-teal-500 text-teal-600 font-bold hover:text-teal-600 dark:hover:text-teal-400">Whim.bet</Link> an agentic prediction market platform for twitch livestreams - with the <Link target="_blank" href="https://virtuals.io" className="dark:text-teal-500 text-teal-600 font-bold hover:text-teal-600 dark:hover:text-teal-400">Virtuals Protocol</Link> on their Genesis Cohort w/ over <Link target="_blank" href="https://app.uniswap.org/explore/tokens/base/0x39a1CCE09D7354Ac2DB86c6b02924360a10E4793?inputCurrency=NATIVE" className="dark:text-teal-500 text-teal-600 font-bold hover:text-teal-600 dark:hover:text-teal-400">9m total volume</Link> last year
                </li>
                <li>
                  But I’m mostly known for my <Link target="_blank" href="https://ethglobal.com" className="dark:text-teal-500 text-teal-600 font-bold hover:text-teal-600 dark:hover:text-teal-400">EthGlobal</Link> records - most hacks + finalist titles (x6) topping 85+ hackathons over last 3 years
                </li>
              </ul>
              <p className="mt-8">
                Outside of work, I love <Link target="_blank" href="https://www.strava.com/athletes/168385610" className="dark:text-teal-500 text-teal-600 font-bold hover:text-teal-600 dark:hover:text-teal-400">running</Link>, travel, and trying to produce music (i can play the violin and guitar now!)
              </p>
            </div>
          </div>
          <div className="lg:pl-20">
            <ul role="list">
              <SocialLink
                href="https://x.com/fabianferno"
                icon={XIcon}
              >
                Follow on X
              </SocialLink>
              <SocialLink
                href="https://farcaster.xyz/fabianferno"
                icon={FarcasterIcon}
                className="mt-4"
              >
                Follow on Farcaster
              </SocialLink>
              <SocialLink
                href="https://www.instagram.com/super.skywalker/"
                icon={InstagramIcon}
                className="mt-4"
              >
                Follow on Instagram
              </SocialLink>
              <SocialLink
                href="https://www.github.com/fabianferno"
                icon={GitHubIcon}
                className="mt-4"
              >
                Follow on GitHub
              </SocialLink>
              <SocialLink
                href="https://www.linkedin.com/in/fabianferno/"
                icon={LinkedInIcon}
                className="mt-4"
              >
                Follow on LinkedIn
              </SocialLink>
              <SocialLink
                href="https://youtube.com/@fabianferno"
                icon={YouTubeIcon}
                className="mt-4"
              >
                Follow on YouTube
              </SocialLink>
              <SocialLink
                href="https://t.me/fabianferno"
                icon={TelegramIcon}
                className="mt-4"
              >
                DM on Telegram
              </SocialLink>
              <SocialLink
                href="mailto:fabian@planetaria.tech"
                icon={MailIcon}
                className="mt-8 border-t border-zinc-100 pt-8 dark:border-zinc-700/40"
              >
                hi@fabianferno.com
              </SocialLink>
            </ul>
          </div>
        </div>
      </Container>
    </>
  )
}
