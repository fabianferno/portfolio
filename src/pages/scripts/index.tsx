import Head from 'next/head'
import { GetStaticProps } from 'next'

import { Card } from '@/components/Card'
import { SimpleLayout } from '@/components/SimpleLayout'
import { getAllScripts } from '@/lib/getAllArticles'
import { formatDate } from '@/lib/formatDate'

interface Article {
  slug: string
  title: string
  date: string
  description: string
}

interface ArticleProps {
  article: Article
}

function Article({ article }: ArticleProps) {
  return (
    <article className="md:grid md:grid-cols-4 md:items-baseline">
      <Card className="md:col-span-3">
        <Card.Title href={`/scripts/${article.slug}`}>
          {article.title}
        </Card.Title>
        <Card.Eyebrow
          as="time"
          dateTime={article.date}
          className="md:hidden"
          decorate
        >
          {formatDate(article.date)}
        </Card.Eyebrow>
        <Card.Description>{article.description}</Card.Description>
        <Card.Cta>Read article</Card.Cta>
      </Card>
      <Card.Eyebrow
        as="time"
        dateTime={article.date}
        className="mt-1 hidden md:block"
      >
        {formatDate(article.date)}
      </Card.Eyebrow>
    </article>
  )
}

interface ArticlesIndexProps {
  articles: Article[]
}

export default function ArticlesIndex({ articles }: ArticlesIndexProps) {
  return (
    <>
      <Head>
        <title>Articles - Fabian Ferno</title>
        <meta
          name="description"
          content="This is a collection of my long-form thoughts on life and the way I have seen it along the way."
        />
      </Head>
      <SimpleLayout
        title="Well, you reached Skywalker's Scripts. Be discrete. He doesn't like visitors."
        intro="This is a collection of my long-form thoughts on life and the way I have seen it along the way."
      >
        <div className="md:border-l md:border-zinc-100 md:pl-6 md:dark:border-zinc-700/40">
          <div className="flex max-w-3xl flex-col space-y-16">
            {articles.map((article) => (
              <Article key={article.slug} article={article} />
            ))}
          </div>
        </div>
      </SimpleLayout>
    </>
  )
}

export const getStaticProps: GetStaticProps = async () => {
  return {
    props: {
      articles: (await getAllScripts()).map(({ component, ...meta }) => meta),
    },
  }
}
