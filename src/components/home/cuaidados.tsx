import { Swiper, SwiperSlide } from "swiper/react";
import { EffectCards } from "swiper/modules";
import { motion } from "framer-motion";
import { useState, useEffect } from "react";
import { fethItem } from "@/hook/api";

// Import Swiper styles
import "swiper/css";
import "swiper/css/effect-cards";

import Image from "next/image";


type SliderType = {
  url: string;
  items: {
    data: {
      attributes: {
        Caring_For_Your_Home_Title: string;
        Caring_For_Your_Home_Content: string;
        Caring_For_Your_Home_Slider: {
          data: any[];
        };
      };
    };
  };
};

function Cuidados() {

  const [content, setContent] = useState<SliderType | null>(null);

  useEffect(() => {
    const dataFetch = async () => {
      setContent(await fethItem("home"));
    };

    dataFetch();
  }, []);

  return (
    <>
      <section className="cuidados_home" data-scroll-section>
        <section className="max">
          <section className="content">
            <h1 title={content?.items.data.attributes.Caring_For_Your_Home_Title}>{content?.items.data.attributes.Caring_For_Your_Home_Title}</h1>
            <section
              dangerouslySetInnerHTML={{
                __html: content?.items.data.attributes
                  .Caring_For_Your_Home_Content
                  ? content?.items.data.attributes.Caring_For_Your_Home_Content
                  : "",
              }}
            ></section>
          </section>
          <section className="contentSlider">
            <motion.div
              className="slider"
              initial={{
                y: 200,
                opacity: 0,
              }}
              whileInView={{
                y: 0,
                opacity: 1,
              }}
              transition={{
                type: "spring",
              }}
            >
              <Swiper
                effect={"cards"}
                grabCursor={true}
                modules={[EffectCards]}
                className="mySwiper"
              >
                {content &&
                content?.items.data.attributes.Caring_For_Your_Home_Slider.data
                  .length > 0
                  ? content?.items.data.attributes.Caring_For_Your_Home_Slider.data.map(
                      (item, key) => {

                        return (
                          <SwiperSlide className="slider" key={key}>
                            <div>
                              <Image
                                fill={true}
                                src={`${content.url}${item.attributes.url}`}
                                title={
                                  item.attributes.alternativeText
                                    ? item.attributes.alternativeText
                                    : item.attributes.name
                                }
                                alt={
                                  item.attributes.alternativeText
                                    ? item.attributes.alternativeText
                                    : item.attributes.name
                                }
                              />
                            </div>
                          </SwiperSlide>
                        );
                      }
                    )
                  : ""}
              </Swiper>
            </motion.div>
          </section>
        </section>
      </section>
    </>
  );
}

export default Cuidados;
