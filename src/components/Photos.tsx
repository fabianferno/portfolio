import Marquee from 'react-fast-marquee'
import Image from 'next/image'
import clsx from 'clsx'

export function Photos() {
  const imageRotations = [
    'rotate-2',
    '-rotate-2',
    'rotate-2',
    'rotate-2',
    '-rotate-2',
    'rotate-2',
    '-rotate-2',
    'rotate-2',
    '-rotate-2',
    'rotate-2',
    '-rotate-2',
  ]

  const baseImageClassName =
    'brightness-40 relative aspect-[9/8] w-44 flex-none overflow-hidden rounded-xl bg-zinc-100 opacity-80 drop-shadow-lg grayscale filter hover:opacity-100 dark:bg-zinc-800 dark:opacity-100 sm:w-32 sm:rounded-2xl'

  const photos = [
    { src: '/photos/eth-india-2022.jpg', alt: 'photos' },
    { src: '/photos/ethglobal-paris.jpg', alt: 'photos' },
    { src: '/photos/vitalik.jpg', alt: 'photos' },
    { src: '/photos/riot.JPG', alt: 'photos' },
    { src: '/photos/web3-chennai.jpg', alt: 'photos' },
    { src: '/photos/neocast-hk.jpg', alt: 'photos' },
    { src: '/photos/eth-sg.JPG', alt: 'photos' },
    { src: '/photos/vitalik.jpg', alt: 'photos' },
    { src: '/photos/gm-vietnam.jpg', alt: 'photos' },
    { src: '/photos/riot.JPG', alt: 'photos' },
    { src: '/photos/web3-chennai-2.jpg', alt: 'photos' },
    { src: '/photos/pattarai-2.jpg', alt: 'photos' },
  ]

  return (
    <div className="mt-16 sm:mt-20">
      <Marquee
        speed={50}
        autoFill={true}
        className="-my-4 flex justify-center gap-5 overflow-hidden py-4 sm:gap-8"
      >
        {photos.map((photo, index) => (
          <div
            key={photo.src}
            className={clsx(baseImageClassName, imageRotations[index], 'mx-4')}
          >
            <Image
              src={photo.src}
              alt={photo.alt}
              width={600}
              height={600}
              sizes="(min-width: 640px) 18rem, 11rem"
              className="absolute inset-0 h-full w-full object-cover"
              loading="eager"
              priority={index < 2}
            />
          </div>
        ))}
      </Marquee>
    </div>
  )
}
