'use client';

import Image from "next/image";
import BedGreen from '@/assets/img/icons/bed_green.svg';
import TagGreen from '@/assets/img/icons/tag_green.svg';
import SQGreen from '@/assets/img/icons/sq_green.svg';


type CaracteristicasItems = {
    items: {
        url: string;
        items: {
            characteristics: {
                bathrooms: number,
                bedrooms: number,
                beds: number,
                baths: number,
                sq_ft: number
              },
        };
    }   
  };

function CaracteristicasComponent({ items } : CaracteristicasItems){

    console.log(items);

    return (
        <>
            <section className="caracteristicas">
                <section className="item" title={`${items.items.characteristics.beds} beds`}>
                    <Image src={BedGreen.src} alt="Icon of Bed" title="Icon of Bed" width={100} height={100}/>
                    <span>{items.items.characteristics.beds} beds</span>
                </section>
                <section className="item" title={`${items.items.characteristics.baths} baths`}>
                    <Image src={TagGreen.src} alt="Icon of Bed" title="Icon of Bed" width={100} height={100}/>
                    <span>{items.items.characteristics.baths} baths</span>
                </section>
                <section className="item" title={`${items.items.characteristics.sq_ft} sq ft`}>
                    <Image src={SQGreen.src} alt="Icon of Bed" title="Icon of Bed" width={100} height={100}/>
                    <span>{items.items.characteristics.sq_ft} sq ft</span>
                </section>
            </section>
        </>
    )

}

export default CaracteristicasComponent;