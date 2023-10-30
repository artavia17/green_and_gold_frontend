import Image from "next/image";
import EstrellasImage from '@/assets/img/icons/estrellas.svg';
import AeroPuertoImage from '@/assets/img/icons/airplane.svg';
import ForkImage from '@/assets/img/icons/fork.svg';
import StartImage from '@/assets/img/icons/start.svg';
import SunImage from '@/assets/img/icons/sun.svg';
import SufrsImage from '@/assets/img/icons/sufs.svg';

function ExperienciaComponent(){


    const items = [
        {
            content: "<p>Just a <strong> 35 minute </strong> ride from the airport</p>",
            img: AeroPuertoImage.src
        },
        {
            content: "<p>Enjoy ecological adventures with tempting <strong>culinary delights</strong></p>",
            img: ForkImage.src
        },
        {
            content: "<p><strong>Exceptional comfort,</strong> beauty and unique amenities</p>",
            img: StartImage.src
        },
        {
            content: "<p><strong>Beaches</strong> and <strong>mountains</strong></p>",
            img: SunImage.src
        },
        {
            content: "<p>World <strong>class surf</strong> is awaiting for you</p>",
            img: SufrsImage.src
        }
    ]

    return(
        <>
            <section className="experiencia_component">
                <section className="starts">
                    <Image src={EstrellasImage.src} alt="Estrellas icono" width={100} height={100} />
                </section>
                <h3>Experience the &apos;Pura Vida&apos; essence that sets Costa Rica apart!</h3>
                <section className="items">
                    {
                        items.map( (item, key) =>{
                            return (
                                <section className="item" key={key}>
                                    <Image src={item.img} alt="Icono" width={100} height={100} />
                                    <section className="content" dangerouslySetInnerHTML={{__html: item.content}} ></section>
                                </section>
                            )
                        })
                    }
                </section>
            </section>
        </>
    )

}

export default ExperienciaComponent;