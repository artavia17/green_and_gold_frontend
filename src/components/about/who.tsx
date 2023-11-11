"use client";
import { useEffect, useState } from "react";
import { motion } from "framer-motion";
import SreeenHeight from "@/hook/screens/height";

type ContentType = {
  url: string,
  items: {
    data: {
      attributes: {
        Description: string;
        Title: string;
        Background: {
          data: {
            attributes: {
              url: string;
            };
          };
        };
      };
    };
  };
};

type ContentProps = {
  content: ContentType
}

const WhoComponent = ( { content } : ContentProps ) => {
  const [heightWindow, setHeightWindow] = useState(0);

  useEffect(  () => {

    setHeightWindow(SreeenHeight());

  }, []);


  return (
    <>
      <section
        className="who"
        style={{
          minHeight: `${heightWindow}px`,
        }}
      >
        <motion.div
          className="item"
          style={{
            backgroundImage: `url(${content?.url}${content?.items.data.attributes.Background.data.attributes.url})`,
          }}
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
          <section className="title">
            <h2 title="About Us">About Us</h2>
            <h1 title={content?.items.data.attributes.Title}>{content?.items.data.attributes.Title}</h1>
          </section>
          <section
            className="content"
            dangerouslySetInnerHTML={{
              __html: content?.items.data.attributes.Description
                ? content?.items.data.attributes.Description
                : "",
            }}
          ></section>
        </motion.div>
      </section>
    </>
  );
};

export default WhoComponent;
