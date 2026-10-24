import nextMDX from '@next/mdx'
import remarkGfm from 'remark-gfm'
import rehypePrism from '@mapbox/rehype-prism'

/** @type {import('next').NextConfig} */
const nextConfig = {
  pageExtensions: ['js', 'jsx', 'ts', 'tsx', 'mdx'],
  reactStrictMode: true,
  // Old content now lives under /old; keep previously shared links working.
  async redirects() {
    return [
      { source: '/articles/:path*', destination: '/old/articles/:path*', permanent: false },
      { source: '/scripts/:path*', destination: '/old/scripts/:path*', permanent: false },
      { source: '/articles', destination: '/old/articles', permanent: false },
      { source: '/scripts', destination: '/old/scripts', permanent: false },
    ]
  },
  experimental: {
    scrollRestoration: true,
  },
  images: {
    domains: [
      'github.com',
      'placekitten.com',
      'media4.giphy.com',
      'dev-to-uploads.s3.amazonaws.com',
      'media3.giphy.com',
      'media2.giphy.com',
      'media1.giphy.com',
    ],
    formats: ['image/avif', 'image/webp'],
  },
}

const withMDX = nextMDX({
  extension: /\.mdx?$/,
  options: {
    remarkPlugins: [remarkGfm],
    rehypePlugins: [rehypePrism],
  },
})

export default withMDX(nextConfig)
