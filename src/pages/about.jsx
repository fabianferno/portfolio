import Image from 'next/image'
import Head from 'next/head'
import Link from 'next/link'
import clsx from 'clsx'

import { Container } from '@/components/Container'
import {
  TwitterIcon,
  InstagramIcon,
  GitHubIcon,
  LinkedInIcon,
} from '@/components/SocialIcons'
import portraitImage from '@/images/portrait.png'

function SocialLink({ className, href, children, icon: Icon }) {
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

function MailIcon(props) {
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
          content="Hello there! I'm Fabian Ferno. I build things for the web. Read more about me here."
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
              Hello there, I&apos;m Fabian Ferno. I build things for the web.
            </h1>
            <div className="mt-6 space-y-7 text-base text-zinc-600 dark:text-zinc-400">
              <p>
                Co-founded & ran a blockchain R&D company that developed 4
                different NFT analytics products. Led a 23-member team across
                various verticals & built various aggregation pipelines for
                processing more than 20 billion data points from multiple
                blockchains and data sources using MongoDB, ZeroMQ & redis.
                Architected a highly scalable API platform and microservice
                architecture for blockchain data and deep analytics using big
                data solutions & distributed systems. Developed a deep analytics
                dashboard for Adidas, Nike & Jump.Trade (GuardianLink) -
                Asia&apos;s Largest NFT marketplace, outperforming platforms
                such as DappRadar & NFTGo. The B2C NFT analytics platform
                garnered over 52,000 non-cumulative MAUs since launch & was
                ranked #6 on ProductHunt on the day of its launch.
              </p>
              <p>
                Spearheaded the engineering team at Dali, a creative
                intelligence-powered platform for NFT launch and sales. Worked
                with statistical scoring algorithms & blockchain indexers,
                enabling data-driven insights. Experimented with various models
                for AI-enabled analytics. Implemented agile test-driven
                development. Incubated at IIT Madras Research Park, Guardian
                Link Web3 Accelerator, and successfully raised pre-seed funding
                of $150k to support the development of the NFT analytics
                platform.
              </p>
              <p>
                Co-founded one of the country&apos;s largest engineering clubs -
                Pattarai during college. With a community of more than 850
                members, I conducted more than 10 technical workshops, 40+
                events, 5 hackathons & mentored 25+ projects across different
                engineering verticals including product fabrication and software
                development. Collaborated with colleges across India to foster
                collaborative engineering.
              </p>
              <p>
                Helped launch Licet&apos;s Fablab - by formulating policies,
                frameworks, and operational procedures, and conducting
                orientations & training sessions for over 1000 students.
                Designed the fabrication lab with prototyping and co-working
                spaces across 3600 sq ft. & led the development of the booking
                app to streamline reservation processes and enhance user
                experience.
              </p>
              <p>
                Freelanced software projects since 2019. Also ran a professional
                services startup while in college, &apos;we-símera&apos; to
                serve various clients across verticals of development and
                digital marketing.
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
