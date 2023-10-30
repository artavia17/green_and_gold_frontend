/**
 * 
 * En este archivo se inicia el rental home y contiene todos los items del mismo
 */

'use client';

import FiltersComponent from "@/components/retal-home/filters";
import Image from "next/image";
import FilterImage from '@/assets/img/icons/filters.svg';

import { useState } from "react";
import HousesComponent from "@/components/retal-home/houses";

function RetalHome(){

    const [viewFilter, setViewFilter] = useState(false);
    const [removeFilter, setRemoveFilter] = useState(false);

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

        // viewFilter ? setViewFilter(false) : setViewFilter(true);
    }

    const closeFilter = (e : boolean) => {
        if(e){
            openFilters();
        }
    }

    return(
        <>
            <section className="rental-home">
                <section className="content_filters">
                    <section className="titles">
                        <h1>Rental Homes</h1>
                        <h2>Book your Costa Rican vacation</h2>
                    </section>
                    <section className="filter_component">
                        <section className="open_filters">
                            <button onClick={openFilters}>
                                <Image src={FilterImage} alt="Filtro de imagenes" width={100} height={100} />
                            </button>
                        </section>
                        <section className={ `filter_items` + ' ' + (viewFilter ? 'view' : '' ) + ' ' + ( removeFilter ? 'remove' : '' ) } onClick={openFilters}>
                            <button className="close">
                                <hr />
                                <hr />
                            </button>
                            <FiltersComponent closeFilters={closeFilter}/>
                        </section>
                    </section>
                </section>
                <HousesComponent/>
            </section>
        </>
    )

}

export default RetalHome;