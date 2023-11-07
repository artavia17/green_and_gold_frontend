import { useState, useEffect, useRef } from "react";
import Icon from '@/assets/img/icons/arrow_galery.svg';
import Image from "next/image";
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
                        <button className="remove" title="Close" onClick={() => {
                            setRemove(true);

                            setTimeout(() => {
                                close();
                            }, 200)

                            }}>
                            <Image src={Icon.src} alt="Volver" width={100} height={100}/>
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