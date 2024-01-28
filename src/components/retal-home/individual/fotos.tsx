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

  type ImageAll = {
    name: string,
    filename: string,
    url: string
  }
  
  type SlugItems = {
    items: {
        url: string;
        items: {
            titulo: string,
            description: string,
            content: string,
            characteristics: {
            bathrooms: number,
            bedrooms: number,
            beds: number,
            baths: number,
            sq_ft: number
            },
            main_image: string,
            allImages: ImageAll[]
            data: {
                status: number
            }
        };
    },
    params: string
  };

function Fotos( {items, params} : SlugItems){

    const [viewFotos, setViewFotos] = useState(false);
    const [allFotos, setAllFotos] = useState<ImageAll[]>(items.items.allImages);


    const openFotos = (allImages: ImageAll[] | undefined) => {

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
                    <section className="image" dangerouslySetInnerHTML={{__html: items.items.main_image}}></section>

                    {
                        items.items.allImages && items.items.allImages.length ? 
                            items.items.allImages.map( (e, key: number) => { 
                                if(key <= 1){
                                    return (
                                        <section className="image" key={key}>
                                            <Image
                                                src={e.url}
                    
                                                alt={e.name ? e.name : e.filename}
                    
                                                title={e.name ? e.name : e.filename}
                    
                                                width={600}
                    
                                                height={600}
                    
                                            />
                                        </section>
                                    )
                                }
                            })
                        : ''
                    }

                </section>
                <button title="Show all photos" onClick={() => openFotos(allFotos)}>Show all photos</button>
            </section>
            {viewFotos ? (
                <FotosComponent imagenes={allFotos} close={() => openFotos(allFotos)} />
            ) : (
                ""
            )}
        </>
    )

}

export default Fotos;