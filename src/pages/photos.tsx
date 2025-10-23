
import Head from 'next/head'
import { Container } from '@/components/Container'
import Masonry from '@/blocks/Components/Masonry/Masonry'



const items = [
    {
        id: "1",
        img: "/gallery/IMG_3218.JPG",
        url: "/gallery/IMG_3218.JPG",
        height: 400,
    },
    {
        id: "2",
        img: "/gallery/IMG_3219.JPG",
        url: "/gallery/IMG_3219.JPG",
        height: 500,
    },
    {
        id: "4",
        img: "/gallery/IMG_3221.JPG",
        url: "/gallery/IMG_3221.JPG",
        height: 300,
    },
    {
        id: "5",
        img: "/gallery/IMG_3220.JPG",
        url: "/gallery/IMG_3220.JPG",
        height: 500,
    },
    {
        id: "6",
        img: "/gallery/IMG_3236.JPG",
        url: "/gallery/IMG_3236.JPG",
        height: 400,
    },
    {
        id: "7",
        img: "/gallery/IMG_3238.JPG",
        url: "/gallery/IMG_3238.JPG",
        height: 350,
    },
    {
        id: "8",
        img: "/gallery/IMG_3224.JPG",
        url: "/gallery/IMG_3224.JPG",
        height: 450,
    },
    {
        id: "9",
        img: "/gallery/IMG_3226.JPG",
        url: "/gallery/IMG_3226.JPG",
        height: 400,
    },
    {
        id: "9",
        img: "/gallery/IMG_3227.JPG",
        url: "/gallery/IMG_3227.JPG",
        height: 500,
    },
    {
        id: "9",
        img: "/gallery/IMG_3225.JPG",
        url: "/gallery/IMG_3225.JPG",
        height: 500,
    },
    {
        id: "9",
        img: "/gallery/IMG_3222.JPG",
        url: "/gallery/IMG_3222.JPG",
        height: 500,
    },
];

export default function Photos() {
    return (
        <>
            <Head>
                <title>About - Fabian Ferno</title>
                <meta
                    name="description"
                    content="Hello there! I'm Fabian Ferno. I build things for the web. Read more about me here."
                />
            </Head>
            <Container className="mt-16 min-h-screen sm:mt-32">
                <div className='mb-8 text-white'>
                    <h1 className='text-4xl font-bold'>
                        Photography
                    </h1>
                    <p className='text-lg mt-2'>
                        I like taking pictures of people, places, and things. Here are some of my favorite photos from my travels.
                    </p>
                </div>
                <Masonry
                    items={items}
                    ease="power3.out"
                    duration={0.6}
                    stagger={0.05}
                    animateFrom="bottom"
                    scaleOnHover={true}
                    hoverScale={0.95}
                    blurToFocus={true}
                    colorShiftOnHover={false}
                />
            </Container>
        </>
    )
}
