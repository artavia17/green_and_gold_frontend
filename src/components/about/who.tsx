"use client";
import { useEffect, useState } from "react";
import { motion } from "framer-motion";
import SreeenHeight from "@/hook/screens/height";

type ContentType = {
  url: string,
  items: {
    first_section: {
      title: string,
      content: string,
      background: string
    }
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
        <div
          className="item"
          style={{
            backgroundImage: `url(${content?.items.first_section.background})`,
          }}
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
          <section className="title">
            <h2 title="About Us">About Us</h2>
            <h1 title={content?.items.first_section.title}>{content?.items.first_section.title}</h1>
          </section>
          <section
            className="content"
            dangerouslySetInnerHTML={{
              __html: content?.items.first_section.content
                ? content?.items.first_section.content
                : "",
            }}
          ></section>
        </div>
      </section>
    </>
  );
};

export default WhoComponent;
