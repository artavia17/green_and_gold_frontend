'use client';
import Image from "next/image";
import {useState} from "react";
import FotosComponent from '@/components/retal-home/fotos';

type Images = {
    attributes: {
      name: string;
      alternativeText: string;
      url: string;
    };
  };
  
  type SlugItems = {
    items: {
        url: string;
        items: {
            data: {
                attributes: {
                Title: string;
                Images: {
                    data: Images[];
                };
                Principal_Image: {
                    data: {
                    attributes: {
                        name: string;
                        alternativeText: string;
                        url: string;
                    };
                    };
                };
                };
            };
        };
    },
    params: string
  };

function Fotos( {items, params} : SlugItems){

    const [viewFotos, setViewFotos] = useState(false);

    const openFotos = () => {

        const main: HTMLElement | null = document.querySelector("body");

        if (main) {
            if (viewFotos) {
                setViewFotos(false);
                main.style.overflow = "auto";
            } else {
                setViewFotos(true);
                main.style.overflow = "hidden";
            }
        }

    }

    return (
        <>
            <section className="more">
                <section className="content_images">
                    <section className="image">
                        <Image
                        src={
                            items.url +
                            items.items.data.attributes.Principal_Image.data.attributes.url
                        }

                        alt={
                            items.items.data.attributes.Principal_Image.data
                            .attributes.alternativeText
                            ? items.items.data.attributes.Principal_Image.data
                                .attributes.alternativeText
                            : items.items.data.attributes.Principal_Image.data
                                .attributes.name
                        }

                        title={
                            items.items.data.attributes.Principal_Image.data
                            .attributes.alternativeText
                            ? items.items.data.attributes.Principal_Image.data
                                .attributes.alternativeText
                            : items.items.data.attributes.Principal_Image.data
                                .attributes.name
                        }

                        width={600}

                        height={600}

                        />
                    </section>

                    {
                        items.items.data.attributes.Images.data.map( (e, key: number) => { 
                            if(key <= 1){
                                return (
                                    <section className="image" key={key}>
                                        <Image
                                            src={
                                                items.url +
                                                e.attributes.url
                                            }
                
                                            alt={
                                                e.attributes.alternativeText
                                                ? e.attributes.alternativeText
                                                : e.attributes.name
                                            }
                
                                            title={
                                                e.attributes.alternativeText
                                                ? e.attributes.alternativeText
                                                : e.attributes.name
                                            }
                
                                            width={600}
                
                                            height={600}
                
                                        />
                                    </section>
                                )
                            }
                        })
                    }

                </section>
                <button title="Show all photos" onClick={openFotos}>Show all photos</button>
            </section>
            {viewFotos ? (
                <FotosComponent slug={params} close={() => openFotos()} />
            ) : (
                ""
            )}
        </>
    )

}

export default Fotos;