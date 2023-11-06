import Image from "next/image";
import EstrellasImage from "@/assets/img/icons/estrellas.svg";
import AeroPuertoImage from "@/assets/img/icons/airplane.svg";
import ForkImage from "@/assets/img/icons/fork.svg";
import StartImage from "@/assets/img/icons/start.svg";
import SunImage from "@/assets/img/icons/sun.svg";
import SufrsImage from "@/assets/img/icons/sufs.svg";
import { useState, useEffect } from "react";
import { fethItem } from "@/hook/api";

type FiltersItems = {
  url: string;
  items: {
    data: {
      attributes: {
        Title: string;
        Experience: any[];
      };
    };
  };
};

type ExperiencyItem = {
  Content: string;
  Icon: {
    data: {
      attributes: {
        alternativeText: string;
        name: string;
        url: string;
      };
    };
  };
};

function ExperienciaComponent() {
  const items = [
    {
      content:
        "<p>Just a <strong> 35 minute </strong> ride from the airport</p>",
      img: AeroPuertoImage.src,
    },
    {
      content:
        "<p>Enjoy ecological adventures with tempting <strong>culinary delights</strong></p>",
      img: ForkImage.src,
    },
    {
      content:
        "<p><strong>Exceptional comfort,</strong> beauty and unique amenities</p>",
      img: StartImage.src,
    },
    {
      content: "<p><strong>Beaches</strong> and <strong>mountains</strong></p>",
      img: SunImage.src,
    },
    {
      content: "<p>World <strong>class surf</strong> is awaiting for you</p>",
      img: SufrsImage.src,
    },
  ];

  const [content, setContent] = useState<FiltersItems>();

  useEffect(() => {
    const contentItems = async () => {
      setContent(await fethItem("rental-home-experience"));
    };

    contentItems();
  }, []);

  return (
    <>
      <section className="experiencia_component">
        <section className="starts">
          <Image
            src={EstrellasImage.src}
            alt="Estrellas icono"
            width={100}
            height={100}
          />
        </section>
        <h3 title={content?.items.data.attributes.Title}>
          {content?.items.data.attributes.Title}
        </h3>
        <section className="items">
          {content?.items.data.attributes.Experience.map(
            (item: ExperiencyItem, key) => {
              return (
                <section className="item" key={key}>
                  <Image
                    src={`${content.url}${item.Icon.data.attributes.url}`}
                    alt={
                      item.Icon.data.attributes.alternativeText
                        ? item.Icon.data.attributes.alternativeText
                        : item.Icon.data.attributes.name
                    }
                    title={
                        item.Icon.data.attributes.alternativeText
                          ? item.Icon.data.attributes.alternativeText
                          : item.Icon.data.attributes.name
                      }
                    width={100}
                    height={100}
                  />
                  <section
                    className="content"
                    dangerouslySetInnerHTML={{ __html: item.Content }}
                  ></section>
                </section>
              );
            }
          )}
        </section>
      </section>
    </>
  );
}

export default ExperienciaComponent;
