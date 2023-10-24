/**
 * 
 * En este archivo se inicia el rental home y contiene todos los items del mismo
 */

'use client';

import FiltersComponent from "@/components/retal-home/filters";
import Image from "next/image";
import FilterImage from '@/assets/img/icons/filters.svg';

function RetalHome(){

    const openFilters = () => {
        alert("Hola mundo")
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
                        <section className="filter_items">
                            <FiltersComponent/>
                        </section>
                    </section>
                </section>
            </section>
        </>
    )

}

export default RetalHome;