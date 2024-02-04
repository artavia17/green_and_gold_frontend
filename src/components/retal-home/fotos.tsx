import { useState, useEffect, useRef } from "react";
import Icon from '@/assets/img/icons/arrow_galery.svg';
import Image from "next/image";
import { fethItem } from "@/hook/api";
import SliderComponent from "./slider";

type ImagesItems = {
    filename: string,
    name: string,
    url: string
  }

type PropsData = {
    imagenes: ImagesItems[] | undefined,
    close: () => void
}


type ImageNewProps = {
    img: string,
    alt: string,
    name: string
}

function FotosComponent({ imagenes, close }: PropsData) {

    const [images, setImages] = useState<ImageNewProps[]>();
    const [imagesName, setImagesName] = useState<string>('');

    const photoElements = useRef<HTMLElement[]>([]);
    const fatherElement = useRef<HTMLElement>(null);
    const [remove, setRemove] = useState(false);
    const [viewSlider, setViewSlider] = useState(false);
    const [closeSliderAnimation, setCloseSliderAnimation] = useState(false);

    useEffect(() => {



        // if (!images?.length) {

        //     const fetchContent = async () => {
        //         const allImages: ImageItems[] = fethItems.items.data.attributes.Images.data;
        //         let imageItems = [
        //             {
        //                 img: fethItems.url + fethItems.items.data.attributes.Principal_Image.data.attributes.url,
        //                 name: fethItems.items.data.attributes.Principal_Image.data.attributes.name,
        //                 alt: fethItems.items.data.attributes.Principal_Image.data.attributes.alternativeText
        //             }
        //         ]

        //         setImages([{
        //             img: fethItems.url + fethItems.items.data.attributes.Principal_Image.data.attributes.url,
        //             name: fethItems.items.data.attributes.Principal_Image.data.attributes.name,
        //             alt: fethItems.items.data.attributes.Principal_Image.data.attributes.alternativeText
        //         }]);

        //         allImages.forEach(e => {


        //             imageItems = [...imageItems, {
        //                 img: fethItems.url + e.attributes.url,
        //                 name: e.attributes.name,
        //                 alt: e.attributes.alternativeText
        //             }]
        //         })


        //         setImages(imageItems);


        //     };

        //     fetchContent();

        // }

    }, [imagenes, images]);



    const addPhoto = (el: HTMLElement) => {
        if (el && !photoElements.current.includes(el)) {
            photoElements.current.push(el);
        }
    }

    const openModal = (imgName : string | null) => {

        if(viewSlider){
            setCloseSliderAnimation(true);
            setTimeout(() => {
                setCloseSliderAnimation(false);
                setViewSlider(false)
            }, 200)
        }else{
            imgName ? setImagesName(imgName) : null;
            setViewSlider(true)
        }
    }

    return (
        <>

            <section onClick={() => {
                            setRemove(true);

                            setTimeout(() => {
                                close();
                            }, 200)

                        }} className={'fotosComponent' + ' ' + (remove ? 'remove' : '')} key={imagenes?.length}>

                <section className="items">

                    <section className="remove_item">
                        <button className="remove" title="Close" onClick={() => {
                            setRemove(true);

                            setTimeout(() => {
                                close();
                            }, 200)

                        }}>
                            <Image src={Icon.src} alt="Volver" width={100} height={100} />
                        </button>
                    </section>

                    <section className="galery" ref={fatherElement}>
                        {
                            imagenes?.length ? (
                                imagenes.map((item, key) => {

                                    return (
                                        <section onClick={(e) => e.stopPropagation()} className={'photo' + ' ' + (key == 0 ? 'big' : '') + ' ' + (key % 5 == 0 ? 'big' : '')} key={key} ref={addPhoto}>
                                            <Image src={item.url} alt={item.name ? item.name : item.filename} title={item.name ? item.name : item.filename} width={1000} height={1000} priority  />
                                        </section>
                                    )
                                })
                            ) : ''
                        }
                    </section>
                </section>
            </section>
            {/* {
                viewSlider ? (<section className={`slider_item ${closeSliderAnimation ? 'remove' : ''}`} onClick={() => openModal(null)}>
                                <SliderComponent name={imagesName} images={imagenes} />
                            </section>) : ''
            } */}
        </>
    )

}



export default FotosComponent;