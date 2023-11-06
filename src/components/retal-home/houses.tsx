import Image from "next/image";
import MorePhotosIcons from "@/assets/img/icons/view_more_photos.svg";
import CasaIcons from "@/assets/img/icons/casa.svg";
import BookmarkIcons from "@/assets/img/icons/bookmark.svg";
import SQIcons from "@/assets/img/icons/sq.svg";
import Link from "next/link";
import { useEffect, useState, forwardRef, useImperativeHandle, Ref} from "react";
import { fethItem } from "@/hook/api";
import FotosComponent from "./fotos";

type FiltersItems = {
  url: string;
  items: {
    data: any[];
  };
};

type arrayItems = {
  attributes: {
    Title: string;
    Baths: string;
    Beds: string;
    SQ_FT: string;
    Slug: string;
    Images: {
      data: any[];
    };
    Principal_Image: {
      data: {
        attributes: {
          alternativeText: string;
          name: string;
          url: string;
        };
      };
    };
  };
};


export interface RefType {
    updateFilter: () => void
}

export interface PropsType {}


function HousesComponent(props: PropsType, ref: Ref<RefType>) {


  const [viewFotos, setViewFotos] = useState(false);
  const [content, setContent] = useState<FiltersItems>();
  const [slug, setSlug] = useState<string>("");
  const [load, setLoad] = useState<boolean>(false);
  const [update, setUpdate] = useState<boolean>(false);
  const [filter, serFilter] = useState<string>('');

  useEffect(() => {
    fetchContent(null);   
  }, []);


  const fetchContent = async (filters : string | null) => {

    filter ? setUpdate(true) : '';

    setContent(await fethItem(`rental-homes`, filters));

    filter ? setUpdate(false) : setLoad(true);


  };


  const openFotos = (slug: string) => {
    const main: HTMLElement | null = document.querySelector("body");
    setSlug(slug);

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
    const price = queryParams.get('price');
    const bedrooms = queryParams.get('bedrooms');
    const bathrooms = queryParams.get('bathrooms');
    const floors = queryParams.get('floors');
    let filter = '&';
    

    if(price){
        filter += `filters[Price]=${price}&`
    }

    if(bedrooms){
        filter += `filters[Bedrooms]=${bedrooms}&`
    }

    if(bathrooms){
        filter += `filters[Bathrooms]=${bathrooms}&`
    }

    if(bathrooms){
        filter += `filters[Bathrooms]=${bathrooms}&`
    }

    if(floors){
        filter += `filters[Floors]=${floors}&`
    }

    fetchContent(filter);

  }

  useImperativeHandle( ref, () => ( { updateFilter } ));
  

  return (

    <div>
      <section className="houses_component">
        {content?.items.data.length && load && !update? (
          content.items.data.map((item: arrayItems, key) => {

            const attributes = item.attributes;
            const title = attributes.Title;
            const words = title.split(" ");
            const newWord = words.slice(0, 1).join(" ") + "<br/>" + words.slice(1).join(" ");
            const principalImage = attributes.Principal_Image;
            const alternativeText = principalImage?.data?.attributes?.alternativeText || principalImage?.data?.attributes?.name || "";
            const imageUrl = principalImage?.data?.attributes?.url || "";

            return (
              <section className="house" key={key} title={attributes.Title}>
                <section className="img">
                  <Image
                    className="presentation"
                    src={`${content.url}${imageUrl}`}
                    alt={alternativeText}
                    title={alternativeText}
                    width={1000}
                    height={1000}
                  />
                  <button
                    title="Galery"
                    onClick={() => openFotos(attributes.Slug)}
                  >
                    <Image
                      src={MorePhotosIcons.src}
                      alt="Ver mas fotos"
                      width={100}
                      height={100}
                    />
                  </button>
                </section>
                <section className="description">
                  <h2
                    title={attributes.Title}
                    dangerouslySetInnerHTML={{ __html: newWord }}
                  ></h2>
                  <section className="caracteristicas">
                    {attributes.Beds ? (
                      <section
                        className="item"
                        title={`${attributes.Beds} beds`}
                      >
                        <Image
                          src={CasaIcons.src}
                          alt="Icono de casa"
                          width={100}
                          height={100}
                        />
                        <span>{attributes.Beds} beds</span>
                      </section>
                    ) : (
                      ""
                    )}

                    {attributes.Baths ? (
                      <section
                        className="item"
                        title={`${attributes.Baths} baths`}
                      >
                        <Image
                          src={BookmarkIcons.src}
                          alt="Icono de marcas de libro"
                          width={100}
                          height={100}
                        />
                        <span>{attributes.Baths} baths</span>
                      </section>
                    ) : (
                      ""
                    )}

                    {attributes.SQ_FT ? (
                      <section
                        className="item"
                        title={`${attributes.SQ_FT} sq ft`}
                      >
                        <Image
                          src={SQIcons.src}
                          alt="Icono de SQ"
                          width={100}
                          height={100}
                        />
                        <span>{attributes.SQ_FT} sq ft</span>
                      </section>
                    ) : (
                      ""
                    )}
                  </section>
                  <section className="view_more">
                    <Link href={`/rental-home/${attributes.Slug}`}>
                      View more
                    </Link>
                  </section>
                </section>
              </section>
            );
          })
        ) : load ? (
          <h5 className="not_house">Currently, no homes available.</h5>
        ) : (
          !update ? <h5 className="not_house">Loading...</h5> : <h5 className="not_house">Searching...</h5>
        )}
      </section>
      {viewFotos ? (
        <FotosComponent slug={slug} close={() => openFotos("")} />
      ) : (
        ""
      )}
    </div>
  );
}

export default forwardRef(HousesComponent);
