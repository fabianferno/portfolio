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
          content="I'm an engineer/entrepreneur with years of experience
          building enterprise software solutions, distributed systems,
          cross-platform apps & decentralized applications."
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
                I am an engineer and entrepreneur with extensive experience in
                developing enterprise software solutions, distributed systems,
                cross-platform applications, and decentralized applications.
              </p>
              <p>
                I co-founded Pattarai, a leading technical talent pool in India,
                with the goal of building an engineering community in colleges
                across the country. Through Pattarai, we have organized over 40
                events and mentored more than 35 projects in various domains
                such as IoT, fabrication, and software development.
              </p>
              <p>
                In addition, I have founded and led We-Simera, a professional
                services start-up, and served as the Principal Software Engineer
                at Dali, where I built distributed systems, integrated web3
                technologies, and developed big data solutions.
              </p>
              <p>
                Currently, I am focused on driving the widespread adoption of
                NFTs and cryptocurrency as valuable asset classes at
                BlitzCraftHQ.
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
