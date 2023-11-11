import Image from "next/image";
import EstrellasImage from "@/assets/img/icons/estrellas.svg";


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

type ExperienceProps = {
  url: string;
  items: {
    data: {
      attributes: {
        Title: string;
        Experience: ExperiencyItem[];
      };
    };
  };
};

type ContentProsp = {
  content: ExperienceProps
}

function ExperienciaComponent({content} : ContentProsp) {

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
