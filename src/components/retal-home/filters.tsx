'use client';
import React, { useId, useEffect, useState } from 'react';
import Select, { SingleValue } from 'react-select';
import NumberToWords from 'number-to-words';

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
        beds: number,
        bedrooms: number,
        sq_ft: number
    },
    main_image: string,
    slug: string,
    titulo: string
}

type FiltersItems = {
    url: string,
    items: HousesItems[],
}


type FiltersComponentProps = {
    closeFilters: ( arg : boolean ) => void;
    updateFilter: () => void;
    filters: FiltersItems
}

function FiltersComponent( { closeFilters, updateFilter, filters } : FiltersComponentProps ){

    const [priceDefault, setPriceDefault] = useState({ value: '', label: '' });
    const [bedsDefault, setbedsDefault] = useState({ value: '', label: '' });
    const [bathroomsDefault, setBathroomsDefault] = useState({ value: '', label: '' });
    const [floorsDefault, setFloorsDefault] = useState({ value: '', label: '' });

    const [actualesFilters, setActualesFilters] = useState<string | null>(null);

    // Filtros finales
    const [filterPrice, setFilterPrice] = useState<any[]>([]);
    const [filterBeds, setFilterBeds] = useState<any[]>([]);
    const [filterBathrooms, setFilterBathrooms] = useState<any[]>([]);
    const [filterFloors, setFilterFloors] = useState<any[]>([]);


    useEffect(() => {


        setActualesFilters(localStorage.getItem('filters'));

        if(actualesFilters){

            const allFilters = JSON.parse(actualesFilters);


            Object.keys(allFilters).forEach((item) => {


                setValueFilter(item, allFilters[item]);


                if(item == 'price'){

                    filterPrice.forEach( (e, key) => {
                        
                        if(e.value == allFilters[item]){
                            setPriceDefault(filterPrice[key]);
                        }

                    });
                    
                }else if(item == 'beds'){

                    filterBeds.forEach( (e, key) => {
                        
                        if(e.value == allFilters[item]){
                            setbedsDefault(filterBeds[key]);
                        }

                    });

                }else if(item == 'bathrooms'){
                    filterBathrooms.forEach( (e, key) => {
                        
                        if(e.value == allFilters[item]){
                            setBathroomsDefault(filterBathrooms[key]);
                        }

                    });
                }else if(item == 'floors'){
                    filterFloors.forEach( (e, key) => {
                        if(e.value == allFilters[item]){
                            setFloorsDefault(filterFloors[key]);
                        }

                    });
                }

            });
            
        }

        const filter = () => {

            const dataArray = filters.items;

            dataArray.forEach( (e) => {

                const attributes = e.characteristics;

                const beds : number = attributes.beds;
                const bathrooms : number = attributes.bathrooms;

                if(!filterBeds.some(item => item.value === beds)){
                    const arrayBeds = [...filterBeds, {
                        value: beds,
                        label: capitalizeString(NumberToWords.toWords(Number(beds)))
                    }]
                    setFilterBeds(arrayBeds);
                }

                if(!filterBathrooms.some(item => item.value === bathrooms)){
                    const arrayBathrooms = [...filterBathrooms, {
                        value: bathrooms,
                        label: capitalizeString(NumberToWords.toWords(Number(bathrooms)))
                    }]
                    setFilterBathrooms(arrayBathrooms);
                }

            });
        }

        filter();

    }, [actualesFilters, filterPrice, filterBeds, filterBathrooms, filterFloors, filters]);

    const loadSelect = (e : SingleValue<{ value: string; label: string;}>, type : string) => {

        closeFilters(true);

        const existeData : string  | null= localStorage.getItem('filters');
        
        if(existeData){

            const jsonData = JSON.parse(existeData);

            jsonData[type] = e?.value;
            localStorage.setItem('filters', JSON.stringify(jsonData));

        }else{
            localStorage.setItem('filters', `{"${type}" : "${e?.value}" }`);
        }

        setActualesFilters(localStorage.getItem('filters'));

        if(type == 'price' && !e?.value){
            setPriceDefault({
                value: '',
                label: ''
            })
        }else if(type == 'beds' && !e?.value){
            setbedsDefault({
                value: '',
                label: ''
            })
        }else if(type == 'bathrooms' && !e?.value){
            setBathroomsDefault({
                value: '',
                label: ''
            })
        }else if(type == 'floors' && !e?.value){
            setFloorsDefault({
                value: '',
                label: ''
            })
        }

        setValueFilter(type, e?.value);
        updateFilter();

}

    useEffect(() => {
        updateFilter();
    }, [loadSelect])
    

    const setValueFilter = (type: string, value: string | undefined) => {
        const actualUrl = window.location.href;
        const url = new URL(actualUrl);
        const urlSearch = url.searchParams;

        if(value){
            urlSearch.set(type, value);
        }else{
            urlSearch.delete(type);
        }

        window.history.replaceState(null, "", url); 

    }


    return (
        <>
            <section className="filters" onClick={ ( event : React.MouseEvent ) => event.stopPropagation() }>
 
                <section className='filter'>
                    <Select
                        placeholder="Beds"
                        value={bedsDefault?.value ? bedsDefault : null}
                        options={filterBeds}
                        isClearable
                        inputId='beds_id'
                        id='beds_id'
                        instanceId={useId()}
                        onChange={ (e: SingleValue<{ value: string; label: string;}>) => loadSelect(e, 'beds') }
                    />
                </section>
                <section className='filter'>
                    <Select
                        placeholder="Bathrooms"
                        value={bathroomsDefault?.value ? bathroomsDefault : null}
                        options={filterBathrooms}
                        isClearable
                        inputId='bathrooms_id'
                        id='bathrooms_id'
                        instanceId={useId()}
                        onChange={ (e: SingleValue<{ value: string; label: string;}>) => loadSelect(e, 'bathrooms') }
                    />
                </section>

               
            </section>
        </>
    )

}


function capitalizeString(text: string) : string {
    return text.charAt(0).toUpperCase() + text.slice(1);
}

export default FiltersComponent;