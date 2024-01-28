"use client";

import Image from "next/image";
import Link from "next/link";
import { motion } from "framer-motion";

type HomeType = {
  url: string;
  items: {
    second_section: {
      title: string,
      content: string,
      image: string,
      button: {
        external: boolean,
        link: string,
        title: string
      }
    }
  };
};


type PlusProps = {
  content: HomeType
}

function ManagementComponent({ content } : PlusProps) {


  return (
    <>
      <section className="managment">
        <div className="container">
          <div
            className="item"
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
            <section className="image">
              {content.items.second_section.image ? (
                <section dangerouslySetInnerHTML={{__html: content.items.second_section.image}}></section>
              ) : (
                ""
              )}
            </section>
            <section className="item_content">
              <h2
                title={
                  content?.items.second_section.title
                }
              >
                {content?.items.second_section.title}
              </h2>
              <div
                className="content"
                dangerouslySetInnerHTML={{
                  __html: content?.items.second_section.content
                    ? content?.items.second_section.content
                    : "",
                }}
              ></div>
              <div className="bottom">
                {content &&
                  content?.items.second_section.button ? (
                  <Link
                    href={content?.items.second_section.button.link}
                    title={content?.items.second_section.button.title}
                    target={content?.items.second_section.button.external ? '_blank' : ''}
                  >
                    {
                      content?.items.second_section.button.title
                    }
                  </Link>
                ) : (
                  ""
                )}
              </div>
            </section>
          </div>
        </div>
      </section>
    </>
  );
}

export default ManagementComponent;
