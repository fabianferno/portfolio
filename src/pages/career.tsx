import Head from 'next/head'
import Image from 'next/image'
import { Card } from '@/components/Card'
import { Section } from '@/components/Section'
import { SimpleLayout } from '@/components/SimpleLayout'
import { BriefcaseIcon, ArrowDownTrayIcon } from '@heroicons/react/24/outline'

import logoJKS from '@/images/logos/jks.jpg'
import logoDali from '@/images/logos/dali.jpeg'
import logoKarma from '@/images/logos/karma.jpg'
import logoUngate from '@/images/logos/ungate.jpeg'
import logoBlitzcrafthq from '@/images/logos/blitzcrafthq.jpg'
import logoStateless from '@/images/logos/stateless.png' // Keeping as it might be useful or related to "College Moonlighting" context if reused, but will verify usage.
import logoCloka from '@/images/logos/cloka.jpg'
import logoWhimbet from '@/images/logos/whimbet.webp'
import logoSimera from '@/images/logos/simera.jpeg'
import logoBlitzwork from '@/images/logos/blitzwork.jpeg'
import logoHacks from '@/images/logos/hacks.png'


function Tools({ tools }: { tools: string[] }) {
    return (
        <ul role="list" className="flex flex-wrap gap-2 mt-4">
            {tools.map((tool) => (
                <li key={tool} className="rounded-full bg-zinc-100 px-3 py-1 text-xs font-medium text-zinc-800 dark:bg-zinc-800 dark:text-zinc-100">
                    {tool}
                </li>
            ))}
        </ul>
    )
}

function Role({ role }: { role: any }) {
    return (
        <div className="flex gap-4">
            <div className="relative mt-1 flex h-12 w-12 flex-none items-center justify-center rounded-lg bg-zinc-100 shadow-md ring-1 ring-zinc-900/5 dark:border dark:border-zinc-700/50 dark:bg-zinc-800 dark:ring-0">
                {role.logo ? (
                    <Image src={role.logo} alt="" className="h-8 w-8 rounded-full" unoptimized />
                ) : (
                    <span className="text-xs text-zinc-500">
                        <BriefcaseIcon className="h-6 w-6" />
                    </span>
                )}
            </div>
            <div className="flex flex-col">
                <h2 className="text-lg font-semibold dark:text-zinc-100 text-zinc-800">
                    {role.title} at{' '}
                    {role.website ? (
                        <a
                            href={role.website}
                            target="_blank"
                            rel="noopener noreferrer"
                            className="dark:text-teal-400 text-teal-600 transition"
                        >
                            {role.company}
                        </a>
                    ) : (
                        role.company
                    )}
                </h2>
                <span className="text-zinc-500">
                    {role.start} – {role.end}
                </span>
                <div className="mt-4 space-y-4 text-zinc-400">
                    {role.description.map((paragraph: string, index: number) => (
                        <p key={index}>{paragraph}</p>
                    ))}
                </div>
                {role.highlights && role.highlights.length > 0 && (
                    <ul className="list-disc pl-5 space-y-2 mt-4 text-zinc-400">
                        {role.highlights.map((highlight: string, index: number) => (
                            <li key={index}>{highlight}</li>
                        ))}
                    </ul>
                )}
            </div>
        </div>
    )
}

export default function Career() {
    const experiences = [
        {
            company: 'Stateless',
            title: 'Founder',
            start: 'Nov 2025',
            end: 'Present',
            website: 'https://stateless.cx',
            description: [
                'I started Stateless as a space for serious builders who want to go beyond weekend hacks — a mix of residencies, pop-up city energy, experiments, and a lot of shipping in public.',
                'Taking inspirations and mentorship from various network states like Edge City, Oz City, and NS.',
                'While prepping for our first IRL community residency, we invite everyone to participate in our side events and activities: white paper reading clubs, deep work sessions, research + focus groups, hack parties, and hackathon resurrection arcs.'
            ],
            highlights: [
                'Community Origins: Cultivated this community through connections with passionate builders met at hackathons over the years.'
            ],
            logo: logoStateless
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
                'Cloka is evolving into a tech-enabled fitness collective — where every run, lift, spar, or game strengthens both body and community.'
            ],
            highlights: [
                'We’ve worked with global brands like Red Bull, Phoenix Marketcity (hosting India’s first “Mallathon”), Supply6, Starbucks, Aceblend, Blinkit, Mirchi FM, and many more notable brands along with local cafés and gyms, to create immersive, lifestyle-driven experiences that blend fitness with social connection.'
            ],
            logo: logoCloka
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
                'Led all technical development, from smart contract design to infrastructure, security reviews, devops, and product iteration.'
            ],
            highlights: [
                'Launched the product on Base and integrated with the Virtuals AI Agent ecosystem, enabling autonomous trading and gameplay features for thousands of users.',
                'Drove the product from hackathon prototype to a live ecosystem token with $2M+ peak market capitalization, validating market demand and early PMF.',
                'Engineered tokenomics that maintained a 34% liquidity-to-market-cap ratio, ensuring pool health and sustainable market operations.',
                'Built marketing pipelines and built tools similar to Kaito to create a community led product growth on X, working with notable Twitch Streamers like AndySlaps.'
            ],
            logo: logoWhimbet
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
                'Ungate is bridging AI autonomy and on-chain verifiability, redefining how agents prove trust at scale.'
            ],
            highlights: [
                'Trusted Infrastructure: Advanced KMS techniques for TEEs to secure agent execution and state proofs.',
                'Built Yappamon, a “Yap-to-Earn” protocol that autonomously rewards authentic social engagement via NEAR Chain Signatures and Shade Agents.'
            ],
            logo: logoUngate
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
                'Karma’s tools are now foundational infrastructure for transparent, data-driven governance across Web3.'
            ],
            highlights: [
                'Karma Impact Evaluation Framework: Enables data-driven grant assessments based on outcomes and measurable indicators.',
                'Funding Map: A grant program directory helping grantees discover and apply for funding opportunities.',
                'Sum Up: A Chrome extension that summarizes DAO forum discussions and highlights active delegates.',
                'Karma AI: LLM-powered toolkit that helps grant programs query, assess, and audit applications intelligently.',
                'Delegate Dashboards: Used by DAOs to identify potential delegates through governance contributions.',
                'Contributed to Gitcoin and Octant grant platforms, enabling impact tracking and milestone-based evaluation.'
            ],
            logo: logoKarma
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
                'BlitzCraft ranked #6 Product of the Day on ProductHunt, joined Foundership’s Polygon 0xCamp Accelerator, raised a pre-seed round and served as a community partner for Web3Chennai, contributing to India’s growing Web3 ecosystem.'
            ],
            logo: logoBlitzcrafthq
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
                'Built and shipped over 100+ projects ranging from DeFi protocols to AI agents and consumer social apps.'
            ],
            logo: logoHacks
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
                'Offered a wide range of services including software development, application development, web automation & digital marketing to a diverse client base.'
            ],
            logo: null
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
                'Incubated at IIT Madras, GuardianLink Web3 Accelerator, a prestigious program for blockchain startups, & successfully raised $150,000 in pre-seed capital to support the development & growth of the NFT aggregator platform.'
            ],
            logo: logoDali
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
                'Led the development of a booking system, admin panels, and an ERP for Stretch Inc. UK, streamlining operations. Provided technical support and documentation for Gazeal UK, ensuring seamless collaboration and successful project completion.'
            ],
            logo: logoBlitzwork
        },
        {
            company: 'JKS Info Tech Pvt Ltd',
            title: 'Software Engineer',
            start: '2020',
            end: '2021',
            location: 'Chennai',
            website: 'https://www.jksinfotech.in/',
            description: [
                'Joined a legacy IT firm and helped modernize the backbone of over 400 businesses under the Chettiar Chamber of Commerce. Spearheaded teams and built custom ERPs, CMS systems, and payment solutions that brought finance, construction, & retail sectors into the digital era. Worked hands-on across architecture, backend, and deployment — specializing in ASP.NET MVC, SQL Server, and Azure Cloud — to create systems that scaled and stuck.'
            ],
            logo: logoJKS
        },
        {
            company: 'Símera',
            title: 'Founder',
            start: '2017',
            end: '2020',
            location: 'India',
            description: [
                'Built and scaled a digital marketing agency helping brands grow through design strategy and storytelling. Built high-converting growth funnels, launched full-scale social campaigns, landing sites, and optimized performance for clients in tech, wellness and fitness, construction, fashion, and entertainment industries.'
            ],
            logo: logoSimera
        }
    ]

    return (
        <>
            <Head>
                <title>Career - Fabian Ferno</title>
                <meta
                    name="description"
                    content="My professional journey."
                />
            </Head>
            <SimpleLayout
                title="Career"
                intro="I'm currently building an AI call centre stack at Tenori Labs and co-founded Cloka, India's largest run club. Previously, I was a Lead Engineer at Karma, contributing to public goods protocols like Gitcoin and Octant. I've co-founded and exited multiple startups including Whim.bet and BlitzCraft. I'm also known for my EthGlobal records—securing 6 finalist titles and topping 85+ hackathons over the last 3 years."
            >
                <div className="mb-8 flex justify-between items-center">
                    <p className='text-zinc-800 dark:text-zinc-500'>If you&apos;re looking to hire me or want to know more about my work, you can download my ATS friendly resume <a className='font-bold text-teal-500' href="/FabianFernoResumeJan2026.pdf">here</a>.</p>

                </div>
                <div className="space-y-20">
                    {experiences.map((role, index) => (
                        <Role key={index} role={role} />
                    ))}
                </div>
            </SimpleLayout>
        </>
    )
}
