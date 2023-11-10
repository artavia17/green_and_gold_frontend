"use client";

import Image from "next/image";
import Link from "next/link";
import { motion } from "framer-motion";

type HomeType = {
  url: string;
  items: {
    data: {
      attributes: {
        Full_Management_Plus_Title: string;
        Full_Management_Plus_Content: string;
        Full_Management_Plus_Image: {
          data: {
            attributes: {
              name: string;
              alternativeText: string | null;
              url: string;
            };
          };
        };
        Full_Management_Plus_Button_Title: string;
        Full_Management_Plus_Button_Action: string;
      };
    };
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
          <motion.div
            className="item"
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
            <section className="image">
              {content?.items.data.attributes.Full_Management_Plus_Image.data
                .attributes.url ? (
                <Image
                  src={`${content?.url ? content?.url : ""}${
                    content?.items.data.attributes.Full_Management_Plus_Image
                      .data.attributes.url
                      ? content?.items.data.attributes
                          .Full_Management_Plus_Image.data.attributes.url
                      : ""
                  }`}
                  width={500}
                  height={500}
                  alt={
                    content?.items.data.attributes.Full_Management_Plus_Image
                      .data.attributes.name
                      ? content?.items.data.attributes
                          .Full_Management_Plus_Image.data.attributes
                          .alternativeText
                        ? content?.items.data.attributes
                            .Full_Management_Plus_Image.data.attributes
                            .alternativeText
                        : content?.items.data.attributes
                            .Full_Management_Plus_Image.data.attributes.name
                      : ""
                  }
                  title={
                    content?.items.data.attributes.Full_Management_Plus_Image
                      .data.attributes.name
                      ? content?.items.data.attributes
                          .Full_Management_Plus_Image.data.attributes
                          .alternativeText
                        ? content?.items.data.attributes
                            .Full_Management_Plus_Image.data.attributes
                            .alternativeText
                        : content?.items.data.attributes
                            .Full_Management_Plus_Image.data.attributes.name
                      : ""
                  }
                />
              ) : (
                ""
              )}
            </section>
            <section className="item_content">
              <h2
                title={
                  content?.items.data.attributes.Full_Management_Plus_Title
                }
              >
                {content?.items.data.attributes.Full_Management_Plus_Title}
              </h2>
              <div
                className="content"
                dangerouslySetInnerHTML={{
                  __html: content?.items.data.attributes
                    .Full_Management_Plus_Content
                    ? content?.items.data.attributes
                        .Full_Management_Plus_Content
                    : "",
                }}
              ></div>
              <div className="bottom">
                {content &&
                content.items.data.attributes
                  .Full_Management_Plus_Button_Action ? (
                  <Link
                    href={
                      content.items.data.attributes
                        .Full_Management_Plus_Button_Action
                    }
                    title={
                      content.items.data.attributes
                        .Full_Management_Plus_Button_Title
                    }
                  >
                    {
                      content.items.data.attributes
                        .Full_Management_Plus_Button_Title
                    }
                  </Link>
                ) : (
                  ""
                )}
              </div>
            </section>
          </motion.div>
        </div>
      </section>
    </>
  );
}

export default ManagementComponent;
