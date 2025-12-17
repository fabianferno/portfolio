import Image from 'next/image'
import Head from 'next/head'
import Link from 'next/link'
import clsx from 'clsx'
import { SVGProps, ComponentType, ReactNode } from 'react'
import { GetStaticProps } from 'next'


import { Button } from '@/components/Button'
import { Card } from '@/components/Card'
import { Container } from '@/components/Container'
import {
  InstagramIcon,
  GitHubIcon,
  LinkedInIcon,
  XIcon,
  FarcasterIcon,
  TelegramIcon,
  YouTubeIcon,
} from '@/components/SocialIcons'
import { Photos } from '@/components/Photos'
import logoJKS from '@/images/logos/jks.jpg'
import logoDali from '@/images/logos/dali.jpeg'
import logoStateless from '@/images/logos/stateless.png'
import logoKarma from '@/images/logos/karma.jpg'
import logoUngate from '@/images/logos/ungate.jpeg'
import logoBlitzcrafthq from '@/images/logos/blitzcrafthq.jpg'
import { generateRssFeed } from '@/lib/generateRssFeed'
import { getAllArticles } from '@/lib/getAllArticles'
import { formatDate } from '@/lib/formatDate'
import Marquee from 'react-fast-marquee'

function MailIcon(props: SVGProps<SVGSVGElement>) {
  return (
    <svg
      viewBox="0 0 24 24"
      fill="none"
      strokeWidth="1.5"
      strokeLinecap="round"
      strokeLinejoin="round"
      aria-hidden="true"
      {...props}
    >
      <path
        d="M2.75 7.75a3 3 0 0 1 3-3h12.5a3 3 0 0 1 3 3v8.5a3 3 0 0 1-3 3H5.75a3 3 0 0 1-3-3v-8.5Z"
        className="fill-zinc-100 stroke-zinc-400 dark:fill-zinc-100/10 dark:stroke-zinc-500"
      />
      <path
        d="m4 6 6.024 5.479a2.915 2.915 0 0 0 3.952 0L20 6"
        className="stroke-zinc-400 dark:stroke-zinc-500"
      />
    </svg>
  )
}

function BriefcaseIcon(props: SVGProps<SVGSVGElement>) {
  return (
    <svg
      viewBox="0 0 24 24"
      fill="none"
      strokeWidth="1.5"
      strokeLinecap="round"
      strokeLinejoin="round"
      aria-hidden="true"
      {...props}
    >
      <path
        d="M2.75 9.75a3 3 0 0 1 3-3h12.5a3 3 0 0 1 3 3v8.5a3 3 0 0 1-3 3H5.75a3 3 0 0 1-3-3v-8.5Z"
        className="fill-zinc-100 stroke-zinc-400 dark:fill-zinc-100/10 dark:stroke-zinc-500"
      />
      <path
        d="M3 14.25h6.249c.484 0 .952-.002 1.316.319l.777.682a.996.996 0 0 0 1.316 0l.777-.682c.364-.32.832-.319 1.316-.319H21M8.75 6.5V4.75a2 2 0 0 1 2-2h2.5a2 2 0 0 1 2 2V6.5"
        className="stroke-zinc-400 dark:stroke-zinc-500"
      />
    </svg>
  )
}

function ArrowDownIcon(props: SVGProps<SVGSVGElement>) {
  return (
    <svg viewBox="0 0 16 16" fill="none" aria-hidden="true" {...props}>
      <path
        d="M4.75 8.75 8 12.25m0 0 3.25-3.5M8 12.25v-8.5"
        strokeWidth="1.5"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
    </svg>
  )
}

interface ArticleMeta {
  slug: string
  title: string
  description: string
  date: string
}

interface ArticleProps {
  article: ArticleMeta
}

function Article({ article }: ArticleProps) {
  return (
    <Card as="article" className="bg-zinc-950 rounded-2xl p-6">
      <Card.Title href={`/articles/${article.slug}`}>
        {article.title}
      </Card.Title>
      <Card.Eyebrow as="time" dateTime={article.date} decorate>
        {formatDate(article.date)}
      </Card.Eyebrow>
      <Card.Description>{article.description}</Card.Description>
      <Card.Cta>Read article</Card.Cta>
    </Card>
  )
}

interface SocialLinkProps {
  icon: ComponentType<{ className?: string }>
  href: string
  'aria-label': string
  target?: string
}

function SocialLink({ icon: Icon, ...props }: SocialLinkProps) {
  return (
    <Link className="group -m-1 p-1" {...props}>
      <Icon className="h-6 w-6 fill-zinc-500 transition group-hover:fill-zinc-600 dark:fill-zinc-400 dark:group-hover:fill-zinc-300" />
    </Link>
  )
}

function Newsletter() {
  return (
    <form
      method="post"
      target="popupwindow"
      onSubmit={() => window.open('https://buttondown.email/fabianferno', 'popupwindow')}
      action="https://buttondown.email/api/emails/embed-subscribe/fabianferno"
      className="rounded-2xl border border-zinc-100 p-6 dark:border-zinc-700/40"
    >
      <h2 className="flex text-sm font-semibold text-zinc-900 dark:text-zinc-100">
        <MailIcon className="h-6 w-6 flex-none" />
        <span className="ml-3">Stay up to date</span>
      </h2>
      <p className="mt-2 text-sm text-zinc-600 dark:text-zinc-400">
        Get notified when I publish something new, and unsubscribe at any time.
      </p>
      <div className="mt-6 flex">
        <input
          name="email"
          id="bd-email"
          type="email"
          placeholder="Email address"
          aria-label="Email address"
          required
          className="min-w-0 flex-auto appearance-none rounded-md border border-zinc-900/10 bg-white px-3 py-[calc(theme(spacing.2)-1px)] shadow-md shadow-zinc-800/5 placeholder:text-zinc-400 focus:border-teal-500 focus:outline-none focus:ring-4 focus:ring-teal-500/10 dark:border-zinc-700 dark:bg-zinc-700/[0.15] dark:text-zinc-200 dark:placeholder:text-zinc-500 dark:focus:border-teal-400 dark:focus:ring-teal-400/10 sm:text-sm"
        />
        <Button type="submit" className="ml-4 flex-none">
          Join
        </Button>
      </div>{' '}
      <p className="mt-2 text-left text-xs text-zinc-600 dark:text-zinc-400">
        <a
          href="https://buttondown.email/refer/fabianferno"
          target="_blank"
          rel="noopener noreferrer"
        >
          Powered by Buttondown.
        </a>
      </p>
    </form>
  )
}

interface ResumeItem {
  company: string
  title: string
  logo: any
  start: string | { label: string; dateTime: number }
  end: string | { label: string; dateTime: number }
}
function MusicIMade() {
  return <div>
    <h1 className="text-2xl mb-8 tracking-tight text-zinc-900 dark:text-zinc-100">
      music i made
    </h1>
    <>
      <iframe
        className='filter invert rounded-2xl'
        width="100%"
        height="166"
        scrolling="no"
        frameBorder="0"
        allow="autoplay"
        src="https://w.soundcloud.com/player/?url=https%3A//api.soundcloud.com/tracks/soundcloud%253Atracks%253A2228791307&color=%23000000&auto_play=false&hide_related=false&show_comments=true&show_user=true&show_reposts=false&show_teaser=true"
      ></iframe>
      <div
        style={{
          fontSize: '10px',
          color: '#cccccc',
          lineBreak: 'anywhere',
          wordBreak: 'normal',
          overflow: 'hidden',
          whiteSpace: 'nowrap',
          textOverflow: 'ellipsis',
          fontFamily: 'Interstate,Lucida Grande,Lucida Sans Unicode,Lucida Sans,Garuda,Verdana,Tahoma,sans-serif',
          fontWeight: 100,
        }}
      >
        <a
          href="https://soundcloud.com/fabian-ferno"
          title="Fabian Ferno"
          target="_blank"
          rel="noopener noreferrer"
          style={{ color: '#cccccc', textDecoration: 'none' }}
        >
          Fabian Ferno
        </a>{' '}
        ·{' '}
        <a
          href="https://soundcloud.com/fabian-ferno/chronicles-of-fabelism"
          title="Neo, Trinity v the World"
          target="_blank"
          rel="noopener noreferrer"
          style={{ color: '#cccccc', textDecoration: 'none' }}
        >
          Neo, Trinity v the World
        </a>
      </div>
    </>
  </div>
}

function MakingPlaylists() {
  return <div>
    <h1 className="text-2xl mb-8 tracking-tight text-zinc-900 dark:text-zinc-100">
      music i&apos;ve curated
    </h1>

    <iframe
      data-testid="embed-iframe"
      className='filter contrast-150 rounded-2xl w-[100%] sm:h-[352px] h-[200px]'
      src="https://open.spotify.com/embed/playlist/2oHiDnFXDc2cgIajgUhAK2?utm_source=generator&theme=0"
      frameBorder="0"
      allowFullScreen
      allow="autoplay; clipboard-write; encrypted-media; fullscreen; picture-in-picture"
      loading="lazy"
    ></iframe>

    <div className='text-md mt-2 text-zinc-600 dark:text-zinc-300'>
      also check out
      <a className='text-teal-600 dark:text-teal-500 font-bold' href="https://open.spotify.com/playlist/42H9VguLdX1afctGklv6nf?si=745625aacb0c4d26"> skywalker symphony</a>, <a className='text-teal-600 dark:text-teal-500 font-bold' href="https://open.spotify.com/playlist/42H9VguLdX1afctGklv6nf?si=745625aacb0c4d26">phantom tones</a>, <a className='text-teal-600 dark:text-teal-500 font-bold' href="https://open.spotify.com/playlist/4vJjTe2YrQvBEKUmF8AQD3?si=d662cb03b0554195">hannibal productivity</a> and <a className='text-teal-600 dark:text-teal-500 font-bold' href="https://open.spotify.com/user/pqfnzbkmew1e4y9o5r0uy83p6?si=bcedd5bb81cb4dad">more</a>
    </div>
  </div>
}

function MusicImListeningTo() {
  return (
    <div>
      <h1 className="text-2xl mb-8 tracking-tight text-zinc-900 dark:text-zinc-100">
        music i&apos;m listening to
      </h1>
      <p className='text-center'>
        <Link
          href="https://github.com/kittinan/spotify-github-profile"
          target="_blank"
          rel="noopener noreferrer"
        >
          <Image
            src="https://spotify-github-profile.kittinanx.com/api/view?uid=pqfnzbkmew1e4y9o5r0uy83p6&cover_image=true&theme=spotify-embed&show_offline=false&background_color=000000&interchange=false&profanity=false&bar_color=53b14f&bar_color_cover=false&mode=dark"
            alt="Spotify profile showing currently listening song"
            width={600} // Approximate width, adjust as needed
            height={120} // Approximate height, adjust as needed
            unoptimized // Use unoptimized for external, dynamically generated images
            className="rounded-2xl filter contrast-150" // Add rounded corners for consistency
          />
        </Link>
      </p>
    </div>
  )
}


function Resume() {
  let resume: ResumeItem[] = [
    {
      company: 'Stateless',
      title: 'Founder',
      logo: logoStateless,
      start: '2025',
      end: 'Present'
    },
    {
      company: 'Ungate AI, Dubai',
      title: 'Interim CTO',
      logo: logoUngate,
      start: {
        label: 'May 2025',
        dateTime: 2025,
      },
      end: {
        label: 'Jul 2025',
        dateTime: 2025,
      },
    },
    {
      company: 'Karma Crypto Inc, US',
      title: 'Lead Engineer',
      logo: logoKarma,
      start: '2023',
      end: '2025'
    },
    {
      company: 'Dali, India',
      title: 'Principal Engineer',
      logo: logoDali,
      start: '2022',
      end: '2022',
    },
    {
      company: 'JKS Info Tech, India',
      title: 'Software Engineer',
      logo: logoJKS,
      start: '2021',
      end: '2021',
    },
    {
      company: 'BlitzCraft',
      title: 'Co-founder & CTO',
      logo: logoBlitzcrafthq,
      start: '2019',
      end: '2024',
    },
  ]

  return (
    <div className="rounded-2xl bg-zinc-950 border border-zinc-100 p-6 dark:border-zinc-700/40">
      <h2 className="flex text-sm font-semibold text-zinc-900 dark:text-zinc-100">
        <BriefcaseIcon className="h-6 w-6 flex-none" />
        <span className="ml-3">Work</span>
      </h2>
      <ol className="mt-6 space-y-4">
        {resume.map((role, roleIndex) => (
          <li key={roleIndex} className="flex gap-4">
            <div className="relative mt-1 flex h-10 w-10 flex-none items-center justify-center rounded-full shadow-md shadow-zinc-800/5 ring-1 ring-zinc-900/5 dark:border dark:border-zinc-700/50 dark:bg-zinc-800 dark:ring-0">
              <Image
                src={role.logo}
                alt=""
                className="h-7 w-7 rounded-full"
                unoptimized
              />
            </div>
            <dl className="flex flex-auto flex-wrap gap-x-2">
              <dt className="sr-only">Company</dt>
              <dd className="w-full flex-none text-sm font-medium text-zinc-900 dark:text-zinc-100">
                {role.company}
              </dd>
              <dt className="sr-only">Role</dt>
              <dd className="text-xs text-zinc-500 dark:text-zinc-400">
                {role.title}
              </dd>
              <dt className="sr-only">Date</dt>
              <dd
                className="ml-auto text-xs text-zinc-400 dark:text-zinc-500"
                aria-label={`${typeof role.start === 'string' ? role.start : role.start.label} until ${typeof role.end === 'string' ? role.end : role.end.label
                  }`}
              >
                <time dateTime={typeof role.start === 'string' ? role.start : role.start.dateTime.toString()}>
                  {typeof role.start === 'string' ? role.start : role.start.label}
                </time>{' '}
                <span aria-hidden="true">—</span>{' '}
                <time dateTime={typeof role.end === 'string' ? role.end : role.end.dateTime.toString()}>
                  {typeof role.end === 'string' ? role.end : role.end.label}
                </time>
              </dd>
            </dl>
          </li>
        ))}
      </ol>
      <Button
        href="/Resume.pdf"
        variant="secondary"
        className="group  mt-6 w-full"
      >
        Download CV
        <ArrowDownIcon className="h-4 w-4 stroke-zinc-400 transition group-active:stroke-zinc-600 dark:group-hover:stroke-zinc-50 dark:group-active:stroke-zinc-50" />
      </Button>
    </div>
  )
}

interface HomeProps {
  articles: ArticleMeta[]
}

export default function Home({ articles }: HomeProps) {
  return (
    <>
      <Head>
        <title>Fabian Ferno - engineer, founder & amateur musician.</title>
        <meta
          name="description"
          content="I build products that connect people—web, on-chain, and IRL; founder, prev public good software, grants, web3, consumer AI, communities, 6x ethglobal finalist, read more"
        />
      </Head>
      <Container className="md:mt-9 mt-9">
        <div className="max-w-2xl">
          <h1 className="text-4xl font-bold tracking-tight text-zinc-800 dark:text-zinc-100 sm:text-5xl">
            engineer, founder & <br /> amateur musician.
          </h1>
          <p className="mt-6 text-base text-zinc-600 dark:text-zinc-400">
            traveller, engineer, entrepreneur. driven by a fervent passion for
            technology, i spend most of my time building things that connect people — on the web, on-chain, and in the real world.
            <br />
            <br />
            p.s. and at times when i&apos;m not doing the above, you&apos;re most
            likely to find me in hackathons, conferences, pop-up cities and meetups hacking / talking
            with people. don&apos;t be shy to come say hi!
          </p>
          <div className="mt-6 flex-wrap flex sm:gap-6 gap-5 items-center">
            <SocialLink
              href="https://x.com/fabianferno"
              aria-label="Follow on X"
              target="_blank"
              icon={XIcon}
            />
            <SocialLink
              href="https://farcaster.xyz/fabianferno"
              aria-label="Follow on Farcaster"
              target="_blank"
              icon={FarcasterIcon}
            />
            <SocialLink
              href="https://instagram.com/super.skywalker"
              aria-label="Follow on Instagram"
              target="_blank"
              icon={InstagramIcon}
            />
            <SocialLink
              href="https://github.com/fabianferno"
              aria-label="Follow on GitHub"
              target="_blank"
              icon={GitHubIcon}
            />
            <SocialLink
              href="https://linkedin.com/in/fabianferno"
              aria-label="Follow on LinkedIn"
              icon={LinkedInIcon}
              target="_blank"
            />
            <SocialLink
              href="https://youtube.com/@fabianferno"
              aria-label="Follow on YouTube"
              icon={YouTubeIcon}
              target="_blank"
            />
            <div className="flex bg-zinc-800 px-2 py-1 rounded-md items-center text-sm font-medium text-zinc-600 dark:text-zinc-400">
              <a
                href="https://t.me/fabianferno"
                target="_blank"
                rel="noopener noreferrer"
                className="group flex items-center hover:text-teal-500 transition"
              >
                <TelegramIcon className="h-4 w-4 mr-2 fill-zinc-500 transition group-hover:fill-teal-500 dark:fill-zinc-400" />
                DM
              </a>
            </div>
          </div>
        </div>
      </Container>
      <Photos />
      <Container className="mt-24 md:mt-28">
        <div className="mx-auto grid max-w-xl grid-cols-1 gap-y-20 lg:max-w-none lg:grid-cols-2">
          <div className="flex flex-col gap-8">
            <h1 className="text-2xl tracking-tight text-zinc-900 dark:text-zinc-100">
              stuff i wrote
            </h1>
            {articles.map((article) => (
              <Article key={article.slug} article={article} />
            ))}
          </div>
          <div className="lg:pl-16 space-y-8 xl:pl-24">
            <MusicImListeningTo />
            <hr className="opacity-20 pb-10" />

            <MusicIMade />
            <hr className="opacity-20 pb-10" />
            <MakingPlaylists />

            {/* <Newsletter /> */}
            {/* <Resume /> */}
          </div>
        </div>
      </Container>
    </>
  )
}

export const getStaticProps: GetStaticProps<HomeProps> = async () => {
  if (process.env.NODE_ENV === 'production') {
    await generateRssFeed()
  }

  return {
    props: {
      articles: (await getAllArticles())
        .slice(0, 4)
        .map(({ component, ...meta }) => meta),
    },
  }
}
