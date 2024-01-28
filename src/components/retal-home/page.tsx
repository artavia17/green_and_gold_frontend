'use client';

import FiltersComponent from "@/components/retal-home/filters";
import Image from "next/image";
import FilterImage from '@/assets/img/icons/filters.svg';
import { useState, useRef } from "react";
import HousesComponent, { RefType } from "@/components/retal-home/houses";
import ExperienciaComponent from "@/components/retal-home/experiencia";

type ImagesItems = {
    filename: string,
    name: string,
    url: string
}
  
type HousesItems = {
    allImages: ImagesItems[],
    characteristics: {
        bathrooms: number,
        baths: number,
        bedrooms: number,
        beds: number,
        sq_ft: number
    },
    main_image: string,
    slug: string,
    titulo: string
}

type HousesProbs = {
    url: string,
    items: HousesItems[],
}


type ExperienceItems = {
    icon: string,
    text: string,
    titulo: string
}
    
type ExperienceProps = {
    url: string;
    items: ExperienceItems[]
};


type RentalPrps = {
    content: HousesProbs,
    experiences: ExperienceProps
}

function RentalHomeComponent( { content, experiences } : RentalPrps ){

    const [viewFilter, setViewFilter] = useState(false);
    const [removeFilter, setRemoveFilter] = useState(false);
    const HouseRef = useRef<RefType>(null);

    const openFilters = ( ) => {

        if(viewFilter){
            setViewFilter(false);
            setRemoveFilter(true);

            setTimeout(() => {
                setRemoveFilter(false);
            }, 400)

        }else{
            setViewFilter(true);
            setRemoveFilter(false);
        }

    }

    const closeFilter = (e : boolean) => {
        if(e){
            openFilters();
        }
    }

    const updateFilter = () => {

        if(HouseRef.current){
            HouseRef.current.updateFilter();
        }

    }

    return(
        <>
            <section className="rental-home">
                <section className="content_filters">
                    <section className="titles">
                        <h1>Rental Homes</h1>
                        <h2>Book your Cossta Rican vacation</h2>
                    </section>
                    <section className="filter_component">
                        <section className="open_filters">
                            <button onClick={openFilters}>
                                <Image priority src={FilterImage} alt="Filtro de imagenes" width={100} height={100} />
                            </button>
                        </section>
                        <section className={ `filter_items` + ' ' + (viewFilter ? 'view' : '' ) + ' ' + ( removeFilter ? 'remove' : '' ) } onClick={openFilters}>
                            <button className="close">
                                <hr />
                                <hr />
                            </button>
                            <FiltersComponent filters={content} closeFilters={closeFilter} updateFilter={updateFilter}/>
                        </section>
                    </section>
                </section>
                <HousesComponent ref={HouseRef} content={content.items}/>
                <ExperienciaComponent content={experiences}/>
            </section>
        </>
    )
}

export default RentalHomeComponent;