import Image from 'next/image'
import Head from 'next/head'
import Link from 'next/link'
import clsx from 'clsx'
import { ComponentType, ReactNode } from 'react'

import { Container } from '@/components/Container'
import {
  TwitterIcon,
  InstagramIcon,
  GitHubIcon,
  LinkedInIcon,
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
                I currently help run{' '}
                <a
                  href="https://cloka.in"
                  className="underline-none font-bold text-teal-500"
                  target="_blank"
                  rel="noopener noreferrer"
                >
                  Cloka
                </a>
                , Chennai&apos;s first and largest fitness community and app which I co-founded, where 7,000+ fitness enthusiasts move together across disciplines. At Cloka, I lead product, engineering, and community tech — building systems that blend social connection with movement. We&apos;ve partnered with Phoenix Marketcity, Starbucks, Blinkit, and more to create immersive, lifestyle-driven fitness experiences, including India&apos;s first &quot;Mallathon.&quot; Cloka is evolving into a tech-enabled collective where every run, lift, spar, or game strengthens both body and community.
              </p>
              <p>
                Previously, I served as Lead Engineer at{' '}
                <a
                  href="https://karmahq.xyz"
                  className="underline-none font-bold text-teal-500"
                  target="_blank"
                  rel="noopener noreferrer"
                >
                  KarmaHQ
                </a>
                , building the on-chain infrastructure powering grants, governance, and reputation for ecosystems like Gitcoin, Optimism, Celo, Arbitrum, and ENS DAO. I led the development of the Grantee Accountability Protocol (GAP), now adopted as a standard across multiple public goods organizations, and contributed to products like Karma AI and Delegate Dashboards — foundational tools driving transparent, data-backed coordination in Web3.
              </p>
              <p>
                As Interim CTO at{' '}
                <a
                  href="https://ungate.io"
                  className="underline-none font-bold text-teal-500"
                  target="_blank"
                  rel="noopener noreferrer"
                >
                  Ungate
                </a>
                , I helped pioneer verifiable AI infrastructure — leading the development of Wukong, the first AI AVS (Actively Validated Service) on EigenLayer Mainnet. Our work was spotlighted by the Eigen Foundation, enabling AI agents to operate inside Trusted Execution Environments (TEEs) with cryptographic proofs of behavior and state.
              </p>
              <p>
                Before that, I co-founded{' '}
                <a
                  href="https://blitzcrafthq.com"
                  className="underline-none font-bold text-teal-500"
                  target="_blank"
                  rel="noopener noreferrer"
                >
                  BlitzCraft
                </a>
                , a blockchain R&D company that built NFT analytics platforms used by Adidas, Nike, and Jump.Trade. We processed 20B+ blockchain data points, ranked #6 on ProductHunt, and joined Foundership&apos;s Polygon 0xCamp accelerator.
              </p>
              <p>
                Earlier in my journey, I led engineering at Dali, a creative intelligence platform for NFTs incubated at IIT Madras Research Park, and raised $150K in pre-seed capital. I also co-founded Pattarai, one of India&apos;s largest student engineering collectives with 850+ members, mentoring projects and launching LICET&apos;s 3600 sq ft FabLab.
              </p>
              <p>
                Across roles, I&apos;ve worked at the intersection of technology, community, and creativity — from verifiable AI to governance tooling, analytics, and real-world fitness experiences. My focus remains constant: building systems that empower people to connect, create, and move — whether online or on the ground.
              </p>
            </div>
          </div>
          <div className="lg:pl-20">
            <ul role="list">
              <SocialLink
                href="https://twitter.com/FabianFerno"
                icon={TwitterIcon}
              >
                Follow on Twitter
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
                href="mailto:fabian@planetaria.tech"
                icon={MailIcon}
                className="mt-8 border-t border-zinc-100 pt-8 dark:border-zinc-700/40"
              >
                hello@fabianferno.com
              </SocialLink>
            </ul>
          </div>
        </div>
      </Container>
    </>
  )
}
