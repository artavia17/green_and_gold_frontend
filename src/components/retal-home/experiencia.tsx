import Image from "next/image";
import EstrellasImage from "@/assets/img/icons/estrellas.svg";


type ExperienceItems = {
  icon: string,
  text: string,
  titulo: string
}
  
type ExperienceProps = {
    url: string;
    items: ExperienceItems[]
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
        <h3 title="Experience the 'Pura Vida' essence that sets Costa Rica apart!">{"Experience the 'Pura Vida' essence that sets Costa Rica apart!"}</h3>
        <section className="items">
          {content.items.map(
            (item, key) => {
              return (
                <section className="item" key={key}>
                  <div dangerouslySetInnerHTML={{__html: item.icon}}></div>
                  <section
                    className="content"
                    dangerouslySetInnerHTML={{ __html: item.text }}
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
