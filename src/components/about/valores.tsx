"use client";

import Image from "next/image";
import { motion } from "framer-motion";

type ContentData = {
  url: string;
  items: {
    data: {
      attributes: {
        Description: string;
        History: string;
        Title: string;
        Our_Mission: string;
        Our_Values: string;
        Our_Values_Items: any[];
        Our_Vision: string;
        Background: {
          data: {
            attributes: {
              url: string;
              alternativeText: string;
              name: string;
            };
          };
        };
      };
    };
  };
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
          <h2>Our Values</h2>
          <section
            dangerouslySetInnerHTML={{
              __html: content?.items.data.attributes.Our_Values
                ? content?.items.data.attributes.Our_Values
                : "",
            }}
          ></section>

          <section className="icons">
            <ul>
              {content?.items.data.attributes.Our_Values_Items.map(
                (item, key) => {

                  return (
                    <li key={key}>
                      <Image
                        src={`${content.url}${item.Icon.data[0].attributes.url}`}
                        title={
                          item.Icon.data[0].attributes.alternativeText
                            ? item.Icon.data[0].attributes.alternativeText
                            : item.Icon.data[0].attributes.name
                        }
                        alt={
                          item.Icon.data[0].attributes.alternativeText
                            ? item.Icon.data[0].attributes.alternativeText
                            : item.Icon.data[0].attributes.name
                        }
                        width={100}
                        height={100}
                      />
                      <h3 title={item.Title}>{item.Title}</h3>
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
