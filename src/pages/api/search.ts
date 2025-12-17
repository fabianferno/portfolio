import { NextApiRequest, NextApiResponse } from 'next'
import { getAllArticles, getAllScripts } from '@/lib/getAllArticles'

interface SearchResult {
    category: 'Article' | 'Script' | 'Page'
    title: string
    description: string
    href: string
}

export default async function handler(
    req: NextApiRequest,
    res: NextApiResponse<SearchResult[]>
) {
    if (req.method !== 'GET') {
        res.status(405).end()
        return
    }

    const articles = await getAllArticles()
    const scripts = await getAllScripts()

    const searchResults: SearchResult[] = [
        // Static Pages
        {
            category: 'Page',
            title: 'Home',
            description: 'The homepage of my portfolio.',
            href: '/',
        },
        {
            category: 'Page',
            title: 'About',
            description: 'Learn more about me and my background.',
            href: '/about',
        },
        {
            category: 'Page',
            title: 'Articles',
            description: 'My thoughts on software development, design, and more.',
            href: '/articles',
        },
        {
            category: 'Page',
            title: 'Projects',
            description: 'Showcase of my projects and work.',
            href: '/projects',
        },
        {
            category: 'Page',
            title: 'Guestbook',
            description: 'Sign my guestbook and leave a message.',
            href: '/guestbook',
        },
        {
            category: 'Page',
            title: 'Career',
            description: 'My professional journey and experience.',
            href: '/career',
        },
        {
            category: 'Page',
            title: 'Uses',
            description: 'Software and hardware I use daily.',
            href: '/uses',
        },

        // Articles
        ...articles.map((article) => ({
            category: 'Article' as const,
            title: article.title,
            description: article.description,
            href: `/articles/${article.slug}`,
        })),

        // Scripts
        ...scripts.map((script) => ({
            category: 'Script' as const,
            title: script.title,
            description: script.description,
            href: `/scripts/${script.slug}`,
        })),
    ]

    res.status(200).json(searchResults)
}
