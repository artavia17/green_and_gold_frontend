import Image from "next/image";
import MorePhotosIcons from "@/assets/img/icons/view_more_photos.svg";
import CasaIcons from "@/assets/img/icons/casa.svg";
import BookmarkIcons from "@/assets/img/icons/bookmark.svg";
import SQIcons from "@/assets/img/icons/sq.svg";
import Link from "next/link";
import {
  useState,
  forwardRef,
  useImperativeHandle,
  Ref,
  useEffect
} from "react";
import { fethItem } from "@/hook/api";
import FotosComponent from "./fotos";

type Filter = {
  bedrooms: number | null,
  bathrooms: number | null
}

type ImagesItems = {
  filename: string,
  name: string,
  url: string
}




export interface RefType {
  updateFilter: () => void;
}

type HousesItems = {
  allImages: ImagesItems[] | undefined,
  characteristics: {
      bathrooms: number,
      baths: number,
      bedrooms: number,
      beds: number,
      sq_ft: number
  },
  main_image: string,
  slug: string,
  titulo: string
}

type HousesProbs = {
  content: HousesItems[],
}

function HousesComponent({content} : HousesProbs, ref : Ref<RefType>) {

  const [viewFotos, setViewFotos] = useState(false);

  const [information, setInformation] = useState<HousesItems[]>(content);

  const [lengthFilter, setLengthFilter] = useState<number>(information.length)

  const [allFotos, setAllFotos] = useState<ImagesItems[]>();

  const [load, setLoad] = useState<boolean>(false);

  const [update, setUpdate] = useState<boolean>(false);


  const [newFilter, setNewFilter] = useState<Filter>({
    bathrooms: null,
    bedrooms: null
  })

  useEffect( () => {

    document.body.style.overflow = 'initial';

    if(content){
      setLoad(true)
      setUpdate(false)
    }

  }, [content])

  const openFotos = (allImages: ImagesItems[] | undefined) => {

    const main: HTMLElement | null = document.querySelector("body");

    setAllFotos(allImages);

    if (main) {
      if (viewFotos) {
        setViewFotos(false);
        main.style.overflow = "auto";
      } else {
        setViewFotos(true);
        main.style.overflow = "hidden";
      }
    }
  };

  const updateFilter = () => {

    const queryParams = new URLSearchParams(window.location.search);
    const price = queryParams.get("price");
    const bedrooms = queryParams.get("bedrooms");
    const bathrooms = queryParams.get("bathrooms");
    const floors = queryParams.get("floors");
    let filter : Filter = {
      bedrooms: null,
      bathrooms: null
    };
    let filterInformation = information;

    if (!price && !bedrooms && !bathrooms && !floors) {

      setNewFilter({
        bathrooms: null,
        bedrooms: null
      });

    } else {

      if (bedrooms) {
        filter.bedrooms = bedrooms ? Number(bedrooms) : null;
      }

      if (bathrooms) {
        filter.bathrooms = bathrooms ? Number(bathrooms) : null;
      }

      filterInformation = information.filter( e => {
        if((!newFilter.bedrooms && !newFilter.bathrooms) || 
        (newFilter.bathrooms == e.characteristics.bathrooms && !newFilter.bedrooms) ||
        (newFilter.bedrooms == e.characteristics.bedrooms && !newFilter.bathrooms) ||
        (newFilter.bathrooms == e.characteristics.bathrooms && newFilter.bedrooms == e.characteristics.bedrooms)){
          return e;
        }
      })

      setNewFilter(filter);
      
    }

    setLengthFilter(filterInformation.length)

  };

  useImperativeHandle(ref, () => ({ updateFilter }));


  return (
    <div>
      <section className="houses_component">
        {lengthFilter > 0  && load ? (
          information.map((item, key) => {
            const attributes = item.characteristics;
            const title = item.titulo;
            const words = title.split(" ");
            const newWord =
              words.slice(0, 1).join(" ") + "<br/>" + words.slice(1).join(" ");
            const principalImage = item.main_image;
            const allImages = item.allImages ? item.allImages : undefined

            return (
              (!newFilter.bedrooms && !newFilter.bathrooms) || 
              (newFilter.bathrooms == attributes.bathrooms && !newFilter.bedrooms) ||
              (newFilter.bedrooms == attributes.bedrooms && !newFilter.bathrooms) ||
              (newFilter.bathrooms == attributes.bathrooms && newFilter.bedrooms == attributes.bedrooms) ? (
                <section className="house" key={key} title={item.titulo}>
                  <section className="img">
                    <div className="presentation" dangerouslySetInnerHTML={{__html: principalImage}} ></div>
                    <button
                      title="Galery"
                      onClick={() => openFotos(allImages)}
                    >
                      <Image
                        src={MorePhotosIcons.src}
                        alt="Ver mas fotos"
                        width={100}
                        height={100}
                        priority
                      />
                    </button>
                  </section>
                  <section className="description">
                    <h2
                      title={item.titulo}
                      dangerouslySetInnerHTML={{ __html: newWord }}
                    ></h2>
                    <section className="caracteristicas">
                      {attributes.beds ? (
                        <section
                          className="item"
                          title={`${attributes.beds} beds`}
                        >
                          <Image
                            src={CasaIcons.src}
                            alt="Icono de casa"
                            width={100}
                            height={100}
                            priority
                          />
                          <span>{attributes.beds} beds</span>
                        </section>
                      ) : (
                        ""
                      )}

                      {attributes.baths ? (
                        <section
                          className="item"
                          title={`${attributes.baths} baths`}
                        >
                          <Image
                            src={BookmarkIcons.src}
                            alt="Icono de marcas de libro"
                            width={100}
                            height={100}
                            priority
                          />
                          <span>{attributes.baths} baths</span>
                        </section>
                      ) : (
                        ""
                      )}

                      {attributes.sq_ft ? (
                        <section
                          className="item"
                          title={`${attributes.sq_ft} sq ft`}
                        >
                          <Image
                            src={SQIcons.src}
                            alt="Icono de SQ"
                            width={100}
                            height={100}
                            priority
                          />
                          <span>{attributes.sq_ft} sq ft</span>
                        </section>
                      ) : (
                        ""
                      )}
                    </section>
                    <section className="view_more">
                      <Link href={`/rental-home/${item.slug}`}>
                        View more
                      </Link>
                    </section>
                  </section>
                </section>
              ) : (
                ''
              )
            );

          })
        ) : load && !information.length ? (
          <h5 className="not_house">Currently, no homes available.</h5>
        ) : lengthFilter == 0 && !update && information.length ? (
          <h5 className="not_house">No houses matching the applied filters found.</h5>
        ) : !update ? (
          <h5 className="not_house">Loading...</h5>
        ) : (
          <h5 className="not_house">Problem showing houses.</h5>
        )}
      </section>
      {viewFotos ? (
        <FotosComponent imagenes={allFotos} close={() => openFotos(allFotos)} />
      ) : (
        ""
      )}
    </div>
  );
}

export default forwardRef(HousesComponent);
