import { useState, useEffect, useRef } from "react";
import Image from "next/image";


// Imagenes de prueba
import Image1 from '@/assets/img/test/fotos/1.png';
import Image2 from '@/assets/img/test/fotos/2.png';
import Image3 from '@/assets/img/test/fotos/3.png';
import Image4 from '@/assets/img/test/fotos/4.png';
import Image5 from '@/assets/img/test/fotos/5.png';
import Image6 from '@/assets/img/test/fotos/6.png';
import { fethItem } from "@/hook/api";

type PropsData = {
    slug: string,
    close: () =>  void
}

type FiltersItems = {
    url: string;
    items: {
      data: {
        attributes: {
            Principal_Image: {
                data: {
                    attributes: {
                        alternativeText : string,
                        name: string,
                        url: string
                    }
                }
            },
            Images: {
                data: any[]
            }
        }
      };
    };
};

type ImageItems =  {
    attributes: {
        alternativeText: string,
        name: string,
        url: string
    }
}

function FotosComponent( { slug, close } : PropsData ){

    const [images, setImages] = useState<any[]>();

    const data = [
        {
            img: Image1.src,
            alt: "Imagen 1"
        },
        {
            img: Image2.src,
            alt: "Imagen 2"
        },
        {
            img: Image3.src,
            alt: "Imagen 3"
        },
        {
            img: Image4.src,
            alt: "Imagen 4"
        },
        {
            img: Image5.src,
            alt: "Imagen 5"
        },
        {
            img: Image6.src,
            alt: "Imagen 6"
        }
    ];

    const photoElements = useRef<HTMLElement[]>([]);
    const fatherElement = useRef<HTMLElement>(null);
    const [remove, setRemove] = useState(false);


    useEffect( () => {


        if(!images?.length){

            const fetchContent = async () => {
                const fethItems : FiltersItems = await fethItem(`rental-homes/${slug}`);
                const allImages : ImageItems[] = fethItems.items.data.attributes.Images.data;
                let imageItems = [
                    {
                        img:  fethItems.url + fethItems.items.data.attributes.Principal_Image.data.attributes.url,
                        name: fethItems.items.data.attributes.Principal_Image.data.attributes.name,
                        alt: fethItems.items.data.attributes.Principal_Image.data.attributes.alternativeText
                    }
                ]

                setImages([{
                    img:  fethItems.url + fethItems.items.data.attributes.Principal_Image.data.attributes.url,
                    name: fethItems.items.data.attributes.Principal_Image.data.attributes.name,
                    alt: fethItems.items.data.attributes.Principal_Image.data.attributes.alternativeText
                }]);

                allImages.forEach( e => {


                    imageItems = [...imageItems, {
                        img: fethItems.url + e.attributes.url,
                        name: e.attributes.name,
                        alt: e.attributes.alternativeText
                    }]
                })


                setImages(imageItems);
    
    
            };
          
            fetchContent();
        }

    },  [slug, images]);


    const addPhoto = (el : HTMLElement) => {
        if(el && !photoElements.current.includes(el)){
            photoElements.current.push(el);
        }   
    }

    return(
        <>  
            <section className={'fotosComponent' + ' ' + (remove ? 'remove' : '')} key={slug}>

                <section className="items">

                    <section className="remove_item">
                        <h5>Galery</h5>
                        <button className="remove" title="Volver" onClick={() => {
                            setRemove(true);

                            setTimeout(() => {
                                close();
                            }, 200)

                            }}>
                            <svg xmlns="http://www.w3.org/2000/svg" width="30" height="30" fill="currentColor" className="bi bi-x-lg" viewBox="0 0 16 16">
                                <path d="M2.146 2.854a.5.5 0 1 1 .708-.708L8 7.293l5.146-5.147a.5.5 0 0 1 .708.708L8.707 8l5.147 5.146a.5.5 0 0 1-.708.708L8 8.707l-5.146 5.147a.5.5 0 0 1-.708-.708L7.293 8 2.146 2.854Z"/>
                            </svg>
                        </button>
                    </section>

                    <section className="galery" ref={fatherElement}>
                        {
                            images ? (
                                images.map( (item, key) => {

                                    return (
                                        <section className={'photo' + ' ' + (key == 0 ? 'big' : '') + ' ' + (key % 5     == 0 ? 'big' : '')} key={key} ref={addPhoto}>
                                            <Image src={item.img} alt={item.alt ? item.alt : item.name} title={item.alt ? item.alt : item.name} width={500} height={500}/>
                                           
                                        </section>
                                    )
                                })
                            ) : ''
                        }
                    </section>
                </section>
            </section>
        </>
    )

}



export default FotosComponent;