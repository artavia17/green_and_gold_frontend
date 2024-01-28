'use client'

import { Swiper, SwiperSlide } from "swiper/react";
import { EffectCards } from "swiper/modules";
import { motion } from "framer-motion";

// Import Swiper styles
import "swiper/css";
import "swiper/css/effect-cards";

import Image from "next/image";

type GaleryImage = {
  filename: string,
  url: string,
  name: string,
  sizes: {
    full: {
      url: string,
    },
    medium: {
      url: string,
    },
    thumbnail: {
      url: string
    }
  }
}

type SliderType = {
  url: string;
  items: {
    first_section: {
      title: string,
      content: string,
      galery: GaleryImage[]
    }
  };
};

type HomeProps = {
  content: SliderType
}

function Cuidados({ content } : HomeProps) {

  return (
    <>
      <section className="cuidados_home" data-scroll-section>
        <section className="max">
          <section className="content">
            <h1 title={content.items.first_section.title}>{content.items.first_section.title}</h1>
            <section
              dangerouslySetInnerHTML={{
                __html: content.items.first_section.content
              }}
            ></section>
          </section>
          <section className="contentSlider">
            <div
              className="slider"
              // initial={{
              //   y: 200,
              //   opacity: 0,
              // }}
              // whileInView={{
              //   y: 0,
              //   opacity: 1,
              // }}
              // transition={{
              //   type: "spring",
              // }}
            >
              <Swiper
                effect={"cards"}
                grabCursor={true}
                modules={[EffectCards]}
                className="mySwiper"
              >
                {content &&
                content.items.first_section.galery.length > 0
                  ? content.items.first_section.galery.map(
                      (item, key) => {

                        return (
                          <SwiperSlide className="slider" key={key}>
                            <div>
                              <Image
                                fill={true}
                                src={`${item.url}`}
                                title={
                                  item.name
                                    ? item.name
                                    : item.filename
                                }
                                alt={
                                  item.name
                                    ? item.name
                                    : item.filename
                                }
                                sizes="(max-width: 500px) 600px, 700px"
                                priority
                              />
                            </div>
                          </SwiperSlide>
                        );
                      }
                    )
                  : ""}
              </Swiper>
            </div>
          </section>
        </section>
      </section>
    </>
  );
}

export default Cuidados;
