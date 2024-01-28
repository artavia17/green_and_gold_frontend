"use client";

import Image from "next/image";
import { motion } from "framer-motion";


type IconsType = {
  icon: {
    name: string
    filename: string,
    url: string,
  },
  title: string,
}

type ContentData = {
  url: string;
  items: {
    fourth: {
      title: string,
      content: string,
      icons: IconsType[]
    }
  }
};

type ContentProps = {

  content: ContentData

}

export default function ValoresComponent( { content } : ContentProps ) {

  return (
    <>
      <section className="valores">
        <motion.div
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
          <h2 title={ content.items.fourth.title }>{ content.items.fourth.title }</h2>
          <section
            dangerouslySetInnerHTML={{
              __html: content?.items.fourth.content
            }}
          ></section>

          <section className="icons">
            <ul>
              {content?.items.fourth.icons.map(
                (item, key) => {

                  return (
                    <li key={key}>

                      <Image
                        src={item.icon.url}
                        title={
                          item.icon.name
                            ? item.icon.name
                            : item.icon.filename
                        }
                        alt={
                          item.icon.name
                            ? item.icon.name
                            : item.icon.filename
                        }
                        width={100}
                        height={100}
                      />
                      <h3 title={item.title}>{item.title}</h3>
                    </li>
                  );
                }
              )}
            </ul>
          </section>
        </motion.div>
      </section>
    </>
  );
}
