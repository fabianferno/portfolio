import { ComponentType, SVGProps } from 'react'
import { StaticImageData } from 'next/image'
import {
  HomeIcon,
  Squares2X2Icon,
  UserIcon,
  EnvelopeIcon,
  HandRaisedIcon,
  DocumentTextIcon,
  PencilSquareIcon,
  MicrophoneIcon,
  ArchiveBoxIcon,
  UserCircleIcon,
  PhotoIcon,
  MusicalNoteIcon,
  GlobeAltIcon,
  GlobeEuropeAfricaIcon,
} from '@heroicons/react/24/outline'

import {
  GitHubIcon,
  InstagramIcon,
  LinkedInIcon,
  TelegramIcon,
  XIcon,
  YouTubeIcon,
} from '@/components/SocialIcons'

import { airportCountry, visitedPlaces } from '@/data/airports'
import { TravelPanel } from './TravelPanel'
import scriptTexts from '@/data/scripts.json'

import logoJKS from '@/images/logos/jks.jpg'
import logoDali from '@/images/logos/dali.jpeg'
import logoKarma from '@/images/logos/karma.jpg'
import logoUngate from '@/images/logos/ungate.jpeg'
import logoBlitzcrafthq from '@/images/logos/blitzcrafthq.jpg'
import logoStateless from '@/images/logos/stateless.png'
import logoCloka from '@/images/logos/cloka.jpg'
import logoWhimbet from '@/images/logos/whimbet.webp'
import logoSimera from '@/images/logos/simera.jpeg'
import logoBlitzwork from '@/images/logos/blitzwork.jpeg'
import logoHacks from '@/images/logos/hacks.png'

export interface DockLink {
  label: string
  href: string
}

export interface DockListRow {
  title: string
  sub?: string
  meta?: string
  href: string
  // Opens a reader window instead of navigating to `href`.
  read?: DockArticle
}

export interface DockArticle {
  cover: string
  paragraphs: string[]
}

export interface DockEmbed {
  title: string
  src: string
  height: number
  // Inverts light-only widgets (SoundCloud has no dark theme param).
  dark?: boolean
}

export interface DockItem {
  id: string
  mono: string
  color: string
  logo?: StaticImageData
  // Shown instead of the mono letters; `iconFill` for solid brand glyphs,
  // otherwise it's an outline (stroke) icon.
  icon?: ComponentType<SVGProps<SVGSVGElement>>
  iconFill?: boolean
  title: string
  subtitle: string
  // Label above the subtitle in the window; omitted when it isn't a role.
  subtitleLabel?: string
  meta?: string
  period?: string
  location?: string
  body: string[]
  highlights?: string[]
  // Menu click opens this in a new tab instead of showing a window.
  openUrl?: string
  links?: DockLink[]
  list?: { label: string; rows: DockListRow[] }
  images?: string[]
  // Single-photo viewer window (opened by clicking a thumbnail).
  fullImage?: string
  article?: DockArticle
  embeds?: DockEmbed[]
  // Custom React content rendered in the window body.
  Panel?: ComponentType
}

export interface DockSection {
  id: string
  label: string
  icon: ComponentType<SVGProps<SVGSVGElement>>
  items: DockItem[]
}

interface Experience {
  company: string
  title: string
  start: string
  end: string
  location?: string
  website?: string
  description: string[]
  highlights?: string[]
  logo?: StaticImageData | null
}

const experiences: Experience[] = [
  {
    company: 'Stateless',
    title: 'Founder',
    start: 'Nov 2025',
    end: 'Present',
    website: 'https://stateless.cx',
    description: [
      'I started Stateless as a space for serious builders who want to go beyond weekend hacks — a mix of residencies, pop-up city energy, experiments, and a lot of shipping in public.',
      'Taking inspirations and mentorship from various network states like Edge City, Oz City, and NS.',
      'While prepping for our first IRL community residency, we invite everyone to participate in our side events and activities: white paper reading clubs, deep work sessions, research + focus groups, hack parties, and hackathon resurrection arcs.',
    ],
    highlights: [
      'Community Origins: Cultivated this community through connections with passionate builders met at hackathons over the years.',
    ],
    logo: logoStateless,
  },
  {
    company: 'Cloka',
    title: 'Co-Founder',
    start: 'Jul 2023',
    end: 'Present',
    website: 'https://cloka.in',
    description: [
      'Cloka (cloka.in) is Chennai’s first and one of India’s largest fitness app / community, bringing together runners, lifters, fighters, and athletes across disciplines like running, strength training, MMA, and pickleball — united by a shared culture of movement, consistency, and community.',
      'I lead product, partnerships, operations, and community tech, building tools that power our events, tracking, and member engagement while connecting 8000+ active members and an online community of over 16000 athletes.',
      'Cloka is evolving into a tech-enabled fitness collective — where every run, lift, spar, or game strengthens both body and community.',
    ],
    highlights: [
      'We’ve worked with global brands like Red Bull, Phoenix Marketcity (hosting India’s first “Mallathon”), Supply6, Starbucks, Aceblend, Blinkit, Mirchi FM, and many more notable brands along with local cafés and gyms, to create immersive, lifestyle-driven experiences that blend fitness with social connection.',
    ],
    logo: logoCloka,
  },
  {
    company: 'Whim.Bet',
    title: 'Cofounder & CTO',
    start: 'May 2025',
    end: 'Oct 2025',
    location: 'Internet',
    website: 'https://whim.bet',
    description: [
      'Built and scaled an on-chain betting platform that processed over $9M in transaction volume, demonstrating secure contract architecture and high user throughput.',
      'Led all technical development, from smart contract design to infrastructure, security reviews, devops, and product iteration.',
    ],
    highlights: [
      'Launched the product on Base and integrated with the Virtuals AI Agent ecosystem, enabling autonomous trading and gameplay features for thousands of users.',
      'Drove the product from hackathon prototype to a live ecosystem token with $2M+ peak market capitalization, validating market demand and early PMF.',
      'Engineered tokenomics that maintained a 34% liquidity-to-market-cap ratio, ensuring pool health and sustainable market operations.',
      'Built marketing pipelines and built tools similar to Kaito to create a community led product growth on X, working with notable Twitch Streamers like AndySlaps.',
    ],
    logo: logoWhimbet,
  },
  {
    company: 'Ungate',
    title: 'Interim CTO',
    start: 'May 2025',
    end: 'Jul 2025',
    location: 'Dubai, United Arab Emirates',
    website: 'https://ungate.ai',
    description: [
      'Ungate is building the trust infrastructure for the trillion-dollar agent economy — securing how AI agents handle user funds, data, and decisions through verifiable security instead of blind trust.',
      'Led development of Wukong, the first AI AVS (Actively Validated Service) on EigenLayer Mainnet, spotlighted by the Eigen Foundation. Wukong enables verifiable AI by running agents inside Trusted Execution Environments (TEEs) that continuously generate proofs for their actions and state — stored on EigenDA and Filecoin for public auditability. Onboarded 40+ EigenLayer operators securing $5B+ in Total Value Restaked (TVR).',
      'Ungate is bridging AI autonomy and on-chain verifiability, redefining how agents prove trust at scale.',
    ],
    highlights: [
      'Trusted Infrastructure: Advanced KMS techniques for TEEs to secure agent execution and state proofs.',
      'Built Yappamon, a “Yap-to-Earn” protocol that autonomously rewards authentic social engagement via NEAR Chain Signatures and Shade Agents.',
    ],
    logo: logoUngate,
  },
  {
    company: 'Karma',
    title: 'Lead Engineer',
    start: 'Nov 2023',
    end: 'Apr 2025',
    location: 'California, United States',
    website: 'https://karmahq.xyz',
    description: [
      'Led development of the Grantee Accountability Protocol (GAP) — now adopted as a standard for evaluating grants across Gitcoin, Octant, Optimism, Celo, Scroll and various other public good projects.',
      'Built reputation and governance tools that power the on-chain coordination layer for major ecosystems including Arbitrum, Aave, Nouns, ENS DAO, and Compound Finance and a few other notable DAOs.',
      'Karma’s tools are now foundational infrastructure for transparent, data-driven governance across Web3.',
    ],
    highlights: [
      'Karma Impact Evaluation Framework: Enables data-driven grant assessments based on outcomes and measurable indicators.',
      'Funding Map: A grant program directory helping grantees discover and apply for funding opportunities.',
      'Sum Up: A Chrome extension that summarizes DAO forum discussions and highlights active delegates.',
      'Karma AI: LLM-powered toolkit that helps grant programs query, assess, and audit applications intelligently.',
      'Delegate Dashboards: Used by DAOs to identify potential delegates through governance contributions.',
      'Contributed to Gitcoin and Octant grant platforms, enabling impact tracking and milestone-based evaluation.',
    ],
    logo: logoKarma,
  },
  {
    company: 'BlitzCraft',
    title: 'Co-Founder & CTO',
    start: 'Jun 2022',
    end: 'Apr 2024',
    location: 'Chennai, Tamil Nadu, India',
    website: 'https://blitzcrafthq.com',
    description: [
      'Co-founded a blockchain R&D company focused on NFT analytics and infrastructure. Led a 14-member engineering team across product, DevOps, and blockchain to ship 4 analytics products used by Adidas, Nike, and Jump.Trade (GuardianLink).',
      'Built deep analytics dashboards tracking 150+ on-chain metrics — outperforming industry leaders like DappRadar and NFTGo. Architected large-scale data pipelines processing 20B+ blockchain data points, optimizing infrastructure costs by 95% through on-prem clusters, caching layers, and distributed systems using ZeroMQ, Cassandra, ZeroMQ and big data solutions.',
      'BlitzCraft ranked #6 Product of the Day on ProductHunt, joined Foundership’s Polygon 0xCamp Accelerator, raised a pre-seed round and served as a community partner for Web3Chennai, contributing to India’s growing Web3 ecosystem.',
    ],
    logo: logoBlitzcrafthq,
  },
  {
    company: 'Hackathons',
    title: 'Comp',
    start: '2016',
    end: 'Present',
    website: 'https://ethglobal.com',
    description: [
      'Competed in over 85+ hackathons globally, specializing in rapid product development, blockchain infrastructure, and creative problem solving. Known for consistently shipping functional MVPs within 24-48 hour timeframes.',
    ],
    highlights: [
      'EthGlobal Records: Secured 6 finalist titles and holds the record for most IRL finalist titles. (as of 2025)',
      'Winner of the Trifecta Cup - Ethglobal’s first competition exclusive for Ethglobal Finalists.',
      'Consistently topped leaderboards across various ecosystems including Ethereum, Polygon, and Solana.',
      'Built and shipped over 100+ projects ranging from DeFi protocols to AI agents and consumer social apps.',
    ],
    logo: logoHacks,
  },
  {
    company: 'College Moonlighting',
    title: 'Freelance & Open Source',
    start: '2019',
    end: '2023',
    website: 'https://pattarai.in',
    description: [],
    highlights: [
      'Co-founded an active open-source engineering community, during college, which had grown to over 850 members across India, fostering collaboration and innovation in software projects (pattarai.in)',
      'Designed and set up a state-of-the-art Fabrication laboratory (FabLab) across 3600 sq ft at LICET, Chennai, equipped with advanced technology including 3D printers, laser cutters and CNC machines. Conducted 40+ workshops in the FabLab, mentoring more than 1K+ students in various technological disciplines and practical applications.',
      'Offered a wide range of services including software development, application development, web automation & digital marketing to a diverse client base.',
    ],
    logo: null,
  },
  {
    company: 'Dali',
    title: 'Principal Engineer',
    start: 'Dec 2021',
    end: 'Sep 2022',
    location: 'Chennai, Tamil Nadu, India',
    website: 'https://www.instagram.com/dali.hq/',
    description: [
      'Led a cross-functional engineering team of 10, overseeing product design, operations, engineering, & software architecture & systems design. Developed data mining algorithms, built scraping and indexing flows for on-chain & off-chain community data - Reddit, Twitter, Discord and Google Trends.',
      'Developed an NFT & blockchain aggregator platform with statistical scoring algorithms & blockchain indexers, enabling data-driven insights using Postgres + ORM, AWS S3, Python Django (DRF), NextJS & Apache e-charts. Experimented with LSTM, & ARIMA models for ML-enabled analytics. Implemented A/B testing flows & usability tests with tools like Selenium, HotJar, & MS Clarity. Built a GraphQL API.',
      'Incubated at IIT Madras, GuardianLink Web3 Accelerator, a prestigious program for blockchain startups, & successfully raised $150,000 in pre-seed capital to support the development & growth of the NFT aggregator platform.',
    ],
    logo: logoDali,
  },
  {
    company: 'Blitzwork',
    title: 'Engineering Intern',
    start: '2020',
    end: '2021',
    location: 'Germany',
    website: 'https://blitz-work.com/',
    description: [],
    highlights: [
      'Led the development of a booking system, admin panels, and an ERP for Stretch Inc. UK, streamlining operations. Provided technical support and documentation for Gazeal UK, ensuring seamless collaboration and successful project completion.',
    ],
    logo: logoBlitzwork,
  },
  {
    company: 'JKS Info Tech Pvt Ltd',
    title: 'Software Engineer',
    start: '2020',
    end: '2021',
    location: 'Chennai',
    website: 'https://www.jksinfotech.in/',
    description: [
      'Joined a legacy IT firm and helped modernize the backbone of over 400 businesses under the Chettiar Chamber of Commerce. Spearheaded teams and built custom ERPs, CMS systems, and payment solutions that brought finance, construction, & retail sectors into the digital era. Worked hands-on across architecture, backend, and deployment — specializing in ASP.NET MVC, SQL Server, and Azure Cloud — to create systems that scaled and stuck.',
    ],
    logo: logoJKS,
  },
  {
    company: 'Símera',
    title: 'Founder',
    start: '2017',
    end: '2020',
    location: 'India',
    description: [
      'Built and scaled a digital marketing agency helping brands grow through design strategy and storytelling. Built high-converting growth funnels, launched full-scale social campaigns, landing sites, and optimized performance for clients in tech, wellness and fitness, construction, fashion, and entertainment industries.',
    ],
    logo: logoSimera,
  },
]

const ROLE_COLORS = [
  '#2a2a2a',
  '#0b4a5c',
  '#2a1e5c',
  '#5c1a1a',
  '#3a2a05',
  '#0e3d22',
]

const monoOf = (name: string) =>
  name
    .split(/[\s.]+/)
    .filter(Boolean)
    .slice(0, 2)
    .map((w) => w[0].toUpperCase())
    .join('')

const slug = (s: string) => s.toLowerCase().replace(/[^a-z0-9]+/g, '-')

const countryCount = new Set([
  ...Object.values(airportCountry),
  ...Object.keys(visitedPlaces),
]).size

const roleItems: DockItem[] = experiences.map((e, i) => ({
  id: slug(e.company),
  mono: monoOf(e.company),
  color: ROLE_COLORS[i % ROLE_COLORS.length],
  logo: e.logo ?? undefined,
  title: e.company,
  subtitle: e.title,
  subtitleLabel: 'Role',
  meta: e.end === 'Present' ? 'Now' : e.end.slice(-4),
  period: `${e.start} – ${e.end}`,
  location: e.location,
  body: e.description,
  highlights: e.highlights,
  links: e.website
    ? [
        {
          label: e.website
            .replace(/^https?:\/\/(www\.)?/, '')
            .replace(/\/$/, ''),
          href: e.website,
        },
      ]
    : undefined,
}))

const articles: DockListRow[] = [
  {
    title:
      'how we built pacepilot: a voice-first AI running coach powered by Google',
    meta: 'Mar 2026',
    slug: 'pacepilot-voice-first-ai-running-coach',
  },
  {
    title: 'stateless spaces ep.01: builders and storytellers',
    meta: 'Dec 2025',
    slug: 'stateless-spaces-ep-one',
  },
  {
    title: 'personal finance 101',
    meta: 'Dec 2025',
    slug: 'personal-finance-101',
  },
  {
    title: 'how i maintain my second brain: chaos to cortex',
    meta: 'Dec 2025',
    slug: 'how-i-maintain-my-second-brain-chaos-to-cortex',
  },
  {
    title: 'how we built cloka: merch to movement',
    meta: 'Dec 2025',
    slug: 'building-cloka-merch-to-movement',
  },
  {
    title: 'neocast: the future of web3 notifications',
    meta: 'Dec 2024',
    slug: 'neocast-future-of-web3-notifications',
  },
  {
    title: 'fellowfund: decentralized fellowship funding',
    meta: 'Nov 2024',
    slug: 'fellowfund-decentralized-fellowship-funding',
  },
  {
    title: 'warp ads: ads for agents.',
    meta: 'Aug 2022',
    slug: 'warpads-agentic',
  },
  {
    title: "nfts will be the future of the advertising industry. here's how.",
    meta: 'Aug 2022',
    slug: 'nfts-will-be-the-future-of-the-advertising-industry',
  },
  {
    title: 'friends controlled my home. it got weird.',
    meta: 'Jul 2021',
    slug: 'discord-friends-control-home',
  },
].map(({ slug, ...row }) => ({ ...row, href: `/old/articles/${slug}` }))

const scripts: DockListRow[] = [
  { title: 'The Crimson Cry', meta: 'Jun 2020', slug: 'the-crimson-cry' },
  { title: 'The Sound of Silence', meta: 'Feb 2020', slug: 'sound-of-silence' },
  { title: 'The Butterfly Effect', meta: 'Dec 2019', slug: 'the-butterfly-effect' },
  { title: 'Under and Deep', meta: 'Nov 2019', slug: 'under-and-deep' },
  { title: 'Deception', meta: 'Jun 2019', slug: 'deception' },
  { title: 'Efflorescence', meta: 'May 2019', slug: 'efflorescence' },
  { title: 'Fire within flame', meta: 'Apr 2019', slug: 'fire-within-flame' },
  { title: 'Oceans of Oasis', meta: 'Mar 2019', slug: 'oceans-of-oasis' },
  { title: 'Datum Zwei', meta: 'Mar 2019', slug: 'datum-zwei' },
  { title: 'Numero Uno', meta: 'Mar 2019', slug: 'numero-uno' },
].map(({ slug, ...row }) => ({
  ...row,
  href: `/old/scripts/${slug}`,
  read: {
    cover: `/script-covers/${slug}.jpg`,
    paragraphs: scriptTexts[slug as keyof typeof scriptTexts].paragraphs,
  },
}))

const photos = [
  'vitalik.jpg',
  'ethglobal-newdelhi.jpg',
  'band.jpg',
  'cannes.JPG',
  'edge-city.JPG',
  'eth-sg.JPG',
  'gm-vietnam.jpg',
  'home.jpg',
  'neocast-hk.jpg',
  'paris-pbw.JPG',
  'pattarai-2.jpg',
  'pattarai.jpg',
  'riot.JPG',
  'subzero.jpg',
  'web3-chennai-2.jpg',
  'web3-chennai.jpg',
].map((f) => `/photos/${f}`)

const photography = [
  'IMG_3218',
  'IMG_3219',
  'IMG_3221',
  'IMG_3220',
  'IMG_3236',
  'IMG_3238',
  'IMG_3224',
  'IMG_3226',
  'IMG_3227',
  'IMG_3225',
  'IMG_3222',
].map((f) => `/gallery/${f}.JPG`)

export const DOCK_SECTIONS: DockSection[] = [
  {
    id: 'home',
    label: 'Home',
    icon: HomeIcon,
    items: [
      {
        id: 'hello',
        mono: 'FF',
        color: '#2a2a2a',
        icon: HandRaisedIcon,
        title: 'Fabian Ferno',
        subtitle: 'Engineer, founder, traveller & amateur musician',
        meta: 'Chennai',
        location: 'Chennai, India',
        body: [
          "Hello there, I'm Fabian Ferno. Driven by a fervent passion for technology, I spend most of my time building things that connect people, on the web, on-chain, and in the real world.",
          "And when I'm not doing the above, you're most likely to find me at hackathons, conferences, pop-up cities and meetups, hacking and talking with people. Don't be shy to come say hi!",
        ],
        highlights: [
          'Founder of Stateless, co-founder of Cloka, building an AI call centre stack at TenoriLabs',
          '6x EthGlobal finalist across 85+ hackathons',
          'Previously Lead Engineer at Karma (Gitcoin, Octant, Optimism, Celo)',
        ],
        links: [
          { label: 'Resume (PDF)', href: '/FabianFernoResumeJan2026.pdf' },
        ],
      },
      {
        id: 'resume',
        mono: 'CV',
        color: '#0b4a5c',
        icon: DocumentTextIcon,
        title: 'Resume',
        subtitle: 'For people looking to hire me',
        meta: 'PDF',
        body: [
          'If you are looking to hire me or want to know more about my work, my resume has the short version.',
        ],
        openUrl: '/FabianFernoResumeJan2026.pdf',
        links: [
          { label: 'Open resume', href: '/FabianFernoResumeJan2026.pdf' },
        ],
      },
      {
        id: 'writing',
        mono: 'WR',
        color: '#2a1e5c',
        icon: PencilSquareIcon,
        title: 'Writing',
        subtitle: 'Articles on what I build and learn',
        meta: `${articles.length} posts`,
        body: [
          'Notes on products I have shipped, systems I use, and things I have learned along the way.',
        ],
        list: { label: 'Articles', rows: articles },
        links: [
          {
            label: 'Newsletter',
            href: 'https://buttondown.email/refer/fabianferno',
          },
        ],
      },
      {
        id: 'talks',
        mono: 'TK',
        color: '#5c1a1a',
        icon: MicrophoneIcon,
        title: 'Talks',
        subtitle: "X Spaces where I've talked",
        meta: '3 spaces',
        body: [
          'Conversations on AI agents, censorship resistance, and building communities.',
        ],
        list: {
          label: 'Spaces',
          rows: [
            {
              title: 'Building Trust in the AI Agent Economy with ERC-8004',
              meta: '56 min',
              href: 'https://x.com/i/spaces/1AJEmOmqZByJL?s=20',
            },
            {
              title:
                "Censorship-proof submissions 'It works during blackouts!'",
              meta: '42 min',
              href: 'https://x.com/i/spaces/1OdKrOXpXaQGX?s=20',
            },
            {
              title: 'Stateless Spaces Ep.01: Builders and Storytellers',
              meta: '50 min',
              href: 'https://x.com/i/spaces/1BRJjgvRdQZxw?s=20',
            },
          ],
        },
      },
      {
        id: 'old-site',
        mono: 'OS',
        color: '#3a2a05',
        icon: ArchiveBoxIcon,
        title: 'Old site',
        subtitle: 'Projects · Flights · Scripts · Photos',
        meta: 'Archive',
        body: [
          'The previous version of this site, with GitHub projects, a flight map, film scripts, articles and photos.',
        ],
        links: [
          { label: 'Old home', href: '/old' },
          { label: 'Projects', href: '/old/projects' },
          { label: 'Flights', href: '/old/flights' },
          { label: 'Scripts', href: '/old/scripts' },
        ],
      },
    ],
  },
  {
    id: 'work',
    label: 'Work',
    icon: Squares2X2Icon,
    items: roleItems,
  },
  {
    id: 'about',
    label: 'About',
    icon: UserIcon,
    items: [
      {
        id: 'bio',
        mono: 'FF',
        color: '#2a2a2a',
        icon: UserCircleIcon,
        title: 'Bio',
        subtitle: 'I build things that connect people, on the web, on-chain, and in the real world',
        meta: 'Chennai',
        body: [
          'I used to work in the governance, grants and public good space as lead engineer at Karma, contributing to protocols like Gitcoin and Octant. My most notable work was leading the Grantee Accountability Protocol (GAP), now used by ecosystems like Gitcoin, Celo and Polygon as their grants tooling.',
          'I exited a b2b NFT analytics startup as a cofounder (BlitzCraft, previously nftconomy.com), and currently build an AI call centre stack for customer experience at TenoriLabs for businesses in APAC.',
          "I also cofounded one of India's largest fitness and wellness community apps, Cloka, and launched one of my hackathon projects, Whim.bet, an agentic prediction market platform for Twitch livestreams, with the Virtuals Protocol Genesis Cohort, with over 9m in total volume last year.",
          "But I'm mostly known for my EthGlobal records: most hacks and finalist titles (x6), topping 85+ hackathons over the last 3 years.",
        ],
        links: [
          { label: 'Full career', href: '/old/career' },
          { label: 'Resume', href: '/FabianFernoResumeJan2026.pdf' },
        ],
        images: photos,
      },
      {
        id: 'photography',
        mono: 'PG',
        color: '#1f2a44',
        icon: PhotoIcon,
        title: 'Photography',
        subtitle: 'People, places and things from my travels',
        meta: `${photography.length} photos`,
        body: [
          'I like taking pictures of pretty people, places, and things. Here are some of my favorite photos from my travels.',
        ],
        images: photography,
      },
      {
        id: 'music',
        mono: 'MU',
        color: '#5c1a3a',
        icon: MusicalNoteIcon,
        title: 'Music',
        subtitle: "Music I've made and curated",
        meta: 'Listen',
        body: [
          'I can play the violin and guitar, and I try to produce music. Here is something I made, and a playlist I curated.',
        ],
        embeds: [
          {
            title: 'Music I made',
            src: 'https://w.soundcloud.com/player/?url=https%3A//api.soundcloud.com/tracks/soundcloud%253Atracks%253A2228791307&color=%23000000&auto_play=false&hide_related=false&show_comments=true&show_user=true&show_reposts=false&show_teaser=true',
            height: 166,
            dark: true,
          },
          {
            title: "Music I've curated",
            src: 'https://open.spotify.com/embed/playlist/2oHiDnFXDc2cgIajgUhAK2?utm_source=generator&theme=0',
            height: 152,
          },
        ],
        links: [
          {
            label: 'Skywalker Symphony',
            href: 'https://open.spotify.com/playlist/42H9VguLdX1afctGklv6nf?si=745625aacb0c4d26',
          },
          {
            label: 'Phantom Tones',
            href: 'https://open.spotify.com/playlist/42H9VguLdX1afctGklv6nf?si=745625aacb0c4d26',
          },
          {
            label: 'Hannibal Productivity',
            href: 'https://open.spotify.com/playlist/4vJjTe2YrQvBEKUmF8AQD3?si=d662cb03b0554195',
          },
          {
            label: 'More on Spotify',
            href: 'https://open.spotify.com/user/pqfnzbkmew1e4y9o5r0uy83p6?si=bcedd5bb81cb4dad',
          },
        ],
      },
      {
        id: 'travel',
        mono: 'TR',
        color: '#0b3a5c',
        icon: GlobeEuropeAfricaIcon,
        title: 'Travel',
        subtitle: `${countryCount} countries I’ve been to`,
        meta: 'Map',
        body: [
          'Every country I’ve been to, lit up on the map. Hover a dot to see the country.',
        ],
        Panel: TravelPanel,
      },
      {
        id: 'outside',
        mono: 'RN',
        color: '#0b4a5c',
        icon: GlobeAltIcon,
        title: 'Outside work',
        subtitle: 'Running · Travel · Music',
        body: [
          'Outside of work, I love running, travel, and trying to produce music. I can play the violin and guitar now.',
        ],
        links: [
          {
            label: 'Strava',
            href: 'https://www.strava.com/athletes/168385610',
          },
        ],
      },
      {
        id: 'scripts',
        mono: 'SC',
        color: '#4a2a14',
        icon: DocumentTextIcon,
        title: 'Scripts',
        subtitle: "Skywalker's long-form thoughts on life",
        meta: `${scripts.length} scripts`,
        body: [
          'A collection of my long-form thoughts on life and the way I have seen it along the way.',
        ],
        list: { label: 'Scripts', rows: scripts },
      },
    ],
  },
  {
    id: 'contact',
    label: 'Contact',
    icon: EnvelopeIcon,
    items: [
      {
        id: 'email',
        mono: '@',
        color: '#3b6fd8',
        icon: EnvelopeIcon,
        title: 'Email',
        subtitle: 'fabianferno@gmail.com',
        meta: 'Best',
        body: ['Email is the best way to reach me.'],
        links: [{ label: 'Send email', href: 'mailto:fabianferno@gmail.com' }],
      },
      {
        id: 'x',
        mono: 'X',
        color: '#0f0f10',
        icon: XIcon,
        iconFill: true,
        title: 'X',
        subtitle: '@fabianferno',
        body: ['Posts, builds and hackathon updates.'],
        openUrl: 'https://x.com/fabianferno',
        links: [{ label: 'Open X', href: 'https://x.com/fabianferno' }],
      },
      {
        id: 'github',
        mono: 'GH',
        color: '#24292f',
        icon: GitHubIcon,
        iconFill: true,
        title: 'GitHub',
        subtitle: 'fabianferno',
        body: ['Code for most of what I have built.'],
        openUrl: 'https://www.github.com/fabianferno',
        links: [
          { label: 'Open GitHub', href: 'https://www.github.com/fabianferno' },
        ],
      },
      {
        id: 'linkedin',
        mono: 'IN',
        color: '#0a66c2',
        icon: LinkedInIcon,
        iconFill: true,
        title: 'LinkedIn',
        subtitle: 'in/fabianferno',
        body: ['Professional background and work history.'],
        openUrl: 'https://www.linkedin.com/in/fabianferno/',
        links: [
          {
            label: 'Open LinkedIn',
            href: 'https://www.linkedin.com/in/fabianferno/',
          },
        ],
      },
      {
        id: 'telegram',
        mono: 'TG',
        color: '#229ed9',
        icon: TelegramIcon,
        iconFill: true,
        title: 'Telegram',
        subtitle: '@fabianferno',
        body: ['Quick messages.'],
        openUrl: 'https://t.me/fabianferno',
        links: [{ label: 'Open Telegram', href: 'https://t.me/fabianferno' }],
      },
      {
        id: 'instagram',
        mono: 'IG',
        color:
          'linear-gradient(135deg,#feda75 0%,#fa7e1e 28%,#d62976 58%,#962fbf 80%,#4f5bd5 100%)',
        icon: InstagramIcon,
        iconFill: true,
        title: 'Instagram',
        subtitle: '@super.skywalker',
        body: ['Photos and travel.'],
        openUrl: 'https://www.instagram.com/super.skywalker/',
        links: [
          {
            label: 'Open Instagram',
            href: 'https://www.instagram.com/super.skywalker/',
          },
        ],
      },
      {
        id: 'youtube',
        mono: 'YT',
        color: '#e62117',
        icon: YouTubeIcon,
        iconFill: true,
        title: 'YouTube',
        subtitle: '@fabianferno',
        body: ['Videos and demos.'],
        openUrl: 'https://youtube.com/@fabianferno',
        links: [
          { label: 'Open YouTube', href: 'https://youtube.com/@fabianferno' },
        ],
      },
    ],
  },
]
