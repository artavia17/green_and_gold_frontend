'use client';

import Image from "next/image";
import BedGreen from '@/assets/img/icons/bed_green.svg';
import TagGreen from '@/assets/img/icons/tag_green.svg';
import SQGreen from '@/assets/img/icons/sq_green.svg';


type CaracteristicasItems = {
    items: {
        url: string;
        items: {
            data: {
                attributes: {
                Beds: string,
                Baths: string,
                SQ_FT: string
                };
            };
        };
    }   
  };

function CaracteristicasComponent({ items } : CaracteristicasItems){

    return (
        <>
            <section className="caracteristicas">
                <section className="item">
                    <Image src={BedGreen.src} alt="Icon of Bed" title="Icon of Bed" width={100} height={100}/>
                    <span>{items.items.data.attributes.Beds} beds</span>
                </section>
                <section className="item">
                    <Image src={TagGreen.src} alt="Icon of Bed" title="Icon of Bed" width={100} height={100}/>
                    <span>{items.items.data.attributes.Baths} baths</span>
                </section>
                <section className="item">
                    <Image src={SQGreen.src} alt="Icon of Bed" title="Icon of Bed" width={100} height={100}/>
                    <span>{items.items.data.attributes.SQ_FT} sq ft</span>
                </section>
            </section>
        </>
    )

}

export default CaracteristicasComponent;