import Image from "next/image";
import MorePhotosIcons from '@/assets/img/icons/view_more_photos.svg';
import CasaIcons from '@/assets/img/icons/casa.svg';
import BookmarkIcons from '@/assets/img/icons/bookmark.svg';
import SQIcons from '@/assets/img/icons/sq.svg';
import Link from "next/link";

// Images test
import TestImageOne from '@/assets/img/test/casas/one_houses.jpg';
import TestImageTwo from '@/assets/img/test/casas/two_houses.jpg';
import TestImageThree from '@/assets/img/test/casas/three_houses.jpg';


function HousesComponent(){


    const housesItems = [
        {   
            slug: 'first-house',
            img: TestImageOne.src,
            alt: 'Description de la imagen',
            title: 'Casa Tres Monos',
            beds: '5',
            bath: '5',
            sq: 8201
        },
        {   
            slug: 'two-house',
            img: TestImageTwo.src,
            alt: 'Description de la imagen',
            title: 'Villa Esperanza',
            beds: '5',
            bath: '5',
            sq: 8201
        },
        {   
            slug: 'three-house',
            img: TestImageThree.src,
            alt: 'Description de la imagen',
            title: 'Villa Magayón',
            beds: '5',
            bath: '5',
            sq: 8201
        }
    ]

    return (
        <>
            <section className="houses_component">
                {
                    housesItems.map( (item, key) => {

                        const title = item.title;
                        const words = title.split(" ");
                        const newWord = words.slice(0, 1).join(" ") + "<br/>" + words.slice(1).join(" ");

                        return (
                            <section className="house" key={key}>
                                <section className="img">
                                    <Image className="presentation" src={item.img} alt={item.alt} width={1000} height={1000} />
                                    <button>
                                        <Image src={MorePhotosIcons.src} alt="Ver mas fotos" width={100} height={100}/>
                                    </button>
                                </section>
                                <section className="description">
                                    <h2 dangerouslySetInnerHTML={{ __html: newWord }} ></h2>
                                    <section className="caracteristicas">
                                        <section className="item">
                                            <Image src={CasaIcons.src} alt="Icono de casa" width={100} height={100} />
                                            <span>{item.beds} beds</span>
                                        </section>
                                        <section className="item">
                                            <Image src={BookmarkIcons.src} alt="Icono de marcas de libro" width={100} height={100} />
                                            <span>{item.bath} baths</span>
                                        </section>
                                        <section className="item">
                                            <Image src={SQIcons.src} alt="Icono de SQ" width={100} height={100} />
                                            <span>{item.sq} sq ft</span>
                                        </section>
                                    </section>
                                    <section className="view_more">
                                        <Link href={item.slug}>View more</Link>
                                    </section>
                                </section>
                            </section>
                        )
                    })
                }
            </section>
        </>
    )

}

export default HousesComponent;