import { useState, useEffect, useRef } from "react";
import Image from "next/image";


// Imagenes de prueba
import Image1 from '@/assets/img/test/fotos/1.png';
import Image2 from '@/assets/img/test/fotos/2.png';
import Image3 from '@/assets/img/test/fotos/3.png';
import Image4 from '@/assets/img/test/fotos/4.png';
import Image5 from '@/assets/img/test/fotos/5.png';
import Image6 from '@/assets/img/test/fotos/6.png';

type PropsData = {
    slug: string,
    close: () =>  void
}

function FotosComponent( { slug, close } : PropsData ){

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

        if(photoElements.current && photoElements.current.length){
            calcularEspacioVacios(fatherElement.current, photoElements.current);
        }

    });

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
                            <svg xmlns="http://www.w3.org/2000/svg" width="30" height="30" fill="currentColor" className="bi bi-arrow-left" viewBox="0 0 16 16">
                                <path fillRule="evenodd" d="M15 8a.5.5 0 0 0-.5-.5H2.707l3.147-3.146a.5.5 0 1 0-.708-.708l-4 4a.5.5 0 0 0 0 .708l4 4a.5.5 0 0 0 .708-.708L2.707 8.5H14.5A.5.5 0 0 0 15 8z"/>
                            </svg>
                        </button>
                    </section>

                    <section className="galery" ref={fatherElement}>
                        {
                            data.map( (item, key) => {

                                return (
                                    <section className="photo" key={key} ref={addPhoto}>
                                        <Image src={item.img} alt={item.alt} width={500} height={500}/>
                                        {/* <section className="title">
                                            <h4>{item.alt}</h4>
                                        </section> */}   
                                    </section>
                                )
                            })
                        }
                    </section>
                </section>
            </section>
        </>
    )

}

function calcularEspacioVacios(father : HTMLElement | null, childs : HTMLElement[]){

    if(father){

        const widthElementFather = father.offsetWidth;
    

        childs.forEach( (e, key) => {

            const tagImg : HTMLImageElement | null = e.querySelector('img');

            if(tagImg){

                tagImg.onload = () => {

                    const widthElememt = tagImg.naturalWidth;

                    if(window.innerWidth > 1400){
                        if(widthElememt > 1400){
                            e.classList.add('big');
                        }
                    }

                }

            }
            
        })
        
    }
}


export default FotosComponent;