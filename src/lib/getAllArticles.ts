import glob from 'fast-glob'
import * as path from 'path'
import { ComponentType } from 'react'

interface ArticleMeta {
  title: string
  description: string
  date: string
}

interface Article extends ArticleMeta {
  slug: string
  component: ComponentType<{ isRssFeed?: boolean }>
}

async function importArticle(articleFilename: string): Promise<Article> {
  let { meta, default: component } = await import(
    `../pages/articles/${articleFilename}`
  )
  return {
    slug: articleFilename.replace(/(\/index)?\.mdx$/, ''),
    ...meta,
    component,
  }
}

export async function getAllArticles(): Promise<Article[]> {
  let articleFilenames = await glob(['*.mdx', '*/index.mdx'], {
    cwd: path.join(process.cwd(), 'src/pages/articles'),
  })

  let articles = await Promise.all(articleFilenames.map(importArticle))

  return articles.sort(
    (a, z) => new Date(z.date).getTime() - new Date(a.date).getTime()
  )
}

async function importScripts(articleFilename: string): Promise<Article> {
  let { meta, default: component } = await import(
    `../pages/scripts/${articleFilename}`
  )
  return {
    slug: articleFilename.replace(/(\/index)?\.mdx$/, ''),
    ...meta,
    component,
  }
}

export async function getAllScripts(): Promise<Article[]> {
  let articleFilenames = await glob(['*.mdx', '*/index.mdx'], {
    cwd: path.join(process.cwd(), 'src/pages/scripts'),
  })

  let articles = await Promise.all(articleFilenames.map(importScripts))

  return articles.sort(
    (a, z) => new Date(z.date).getTime() - new Date(a.date).getTime()
  )
}
