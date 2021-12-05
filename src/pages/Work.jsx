import Layout from "../layouts/Layout";
import Marquee from "react-fast-marquee";
import { motion } from "framer-motion";
import { useEffect, useState } from "react";
import { WorksLoader } from "../components/Loaders";

import kathirkreations from "../assets/img/project-screenshots/kathirkreations.gif";
import fablab1 from "../assets/img/project-screenshots/fablab1.jpg";
import fablab2 from "../assets/img/project-screenshots/fablab2.jpg";
import fablab3 from "../assets/img/project-screenshots/fablab3.jpg";
import fablab4 from "../assets/img/project-screenshots/fablab4.jpg";
import wallpaper from "../assets/img/project-screenshots/wallpaperthree.gif";
import dumptabs from "../assets/img/project-screenshots/dumptabs.gif";
import accio from "../assets/img/project-screenshots/accio.gif";
import bestmoneygold from "../assets/img/project-screenshots/bestmoneygold.gif";
import quadrantcross from "../assets/img/project-screenshots/quadrantcross.gif";
import pattaraiOrientation from "../assets/img/project-screenshots/pattarai-orientation.jpg";

const IMAGES = [
  kathirkreations,
  fablab1,
  fablab2,
  fablab3,
  fablab4,
  wallpaper,
  dumptabs,
  accio,
  bestmoneygold,
  quadrantcross,
  pattaraiOrientation,
];

export default function Work() {
  const [imgsLoaded, setImgsLoaded] = useState(false);

  useEffect(() => {
    const loadImage = (image) => {
      return new Promise((resolve, reject) => {
        const loadImg = new Image();
        loadImg.src = image;
        // wait 2 seconds to simulate loading time
        loadImg.onload = () =>
          setTimeout(() => {
            resolve(image);
          }, 2000);

        loadImg.onerror = (err) => reject(err);
      });
    };

    Promise.all(IMAGES.map((image) => loadImage(image)))
      .then(() => setImgsLoaded(true))
      .catch((err) => console.log("Failed to load images", err));
  }, []);

  function WorkCard(props) {
    return (
      <motion.div whileHover={{ y: -20, x: -20 }} className="p-4 m-5">
        <img
          srcSet=""
          className="mx-3 p-shadow"
          alt=""
          style={{ height: "15rem" }}
          src={props.src} // use normal <img> attributes as props
        />
      </motion.div>
    );
  }

  return (
    <Layout>
      <div
        style={{ marginTop: "200px" }}
        className="d-flex flex-column justify-content-center align-items-center"
      >
        <h1
          style={{
            fontSize: "7vh",
          }}
          className="text-white font-weight-bold text-right container   mt-5 pt-3  pb-1"
        >
          My<span className="text-primary"> Works</span>.
        </h1>
        {imgsLoaded ? (
          <div
            style={{
              width: "280vw",
            }}
            className="mb-5 pb-5 p-tilt"
          >
            <Marquee
              style={{
                width: "100%",
              }}
              direction="right"
              speed={50}
              pauseOnHover
              gradient
              gradientWidth={0}
              gradientColor={[31, 31, 31]}
            >
              {[
                kathirkreations,
                wallpaper,
                dumptabs,
                accio,
                bestmoneygold,
                quadrantcross,
                kathirkreations,
                wallpaper,
                dumptabs,
                accio,
                bestmoneygold,
                quadrantcross,
                kathirkreations,
                wallpaper,
                dumptabs,
                accio,
                bestmoneygold,
                quadrantcross,
                kathirkreations,
                wallpaper,
                dumptabs,
                accio,
                bestmoneygold,
                quadrantcross,
              ].map((src, index) => (
                <WorkCard src={src} key={index} />
              ))}
            </Marquee>
            <Marquee
              style={{
                width: "100%",
              }}
              direction="left"
              speed={50}
              pauseOnHover
              gradient
              gradientWidth={0}
              gradientColor={[31, 31, 31]}
            >
              {[
                fablab3,
                fablab1,
                fablab4,
                fablab2,
                pattaraiOrientation,
                fablab3,
                fablab1,
                fablab4,
                fablab2,
                pattaraiOrientation,
                fablab3,
                fablab1,
                fablab4,
                fablab2,
                pattaraiOrientation,
                fablab3,
                fablab1,
                fablab4,
                fablab2,
                pattaraiOrientation,
              ].map((src, index) => (
                <WorkCard src={src} key={index} />
              ))}
            </Marquee>
          </div>
        ) : (
          <h1 className="">
            <WorksLoader />
            <WorksLoader />
          </h1>
        )}
      </div>
    </Layout>
  );
}