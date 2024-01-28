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
        bedrooms: number,
        beds: number,
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
    const [bedroomsDefault, setBedroomsDefault] = useState({ value: '', label: '' });
    const [bathroomsDefault, setBathroomsDefault] = useState({ value: '', label: '' });
    const [floorsDefault, setFloorsDefault] = useState({ value: '', label: '' });

    const [actualesFilters, setActualesFilters] = useState<string | null>(null);

    // Filtros finales
    const [filterPrice, setFilterPrice] = useState<any[]>([]);
    const [filterBedrooms, setFilterBedrooms] = useState<any[]>([]);
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
                    
                }else if(item == 'bedrooms'){

                    filterBedrooms.forEach( (e, key) => {
                        
                        if(e.value == allFilters[item]){
                            setBedroomsDefault(filterBedrooms[key]);
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

            // const { items } : FiltersItems = await fethItem('rental-homes');
            const dataArray = filters.items;

            dataArray.forEach( (e) => {

                const attributes = e.characteristics;

            //     const prices : string = attributes.Price; - null
            //     const floors : string = attributes.Floors; - null
            //     const type_currency : string = attributes.Type_of_currency; - null

                const bedrooms : number = attributes.bedrooms;
                const bathrooms : number = attributes.bathrooms;


            //     if(!filterPrice.some(item => item.value === prices)){
            //         const arrayPrices = [...filterPrice, {
            //             value: prices,
            //             label: type_currency == 'Colones' ? `₡${prices}` : `$${prices}`
            //         }]
            //         setFilterPrice(arrayPrices);
            //     }

                if(!filterBedrooms.some(item => item.value === bedrooms)){
                    const arrayBedrooms = [...filterBedrooms, {
                        value: bedrooms,
                        label: capitalizeString(NumberToWords.toWords(Number(bedrooms)))
                    }]
                    setFilterBedrooms(arrayBedrooms);
                }

                if(!filterBathrooms.some(item => item.value === bathrooms)){
                    const arrayBathrooms = [...filterBathrooms, {
                        value: bathrooms,
                        label: capitalizeString(NumberToWords.toWords(Number(bathrooms)))
                    }]
                    setFilterBathrooms(arrayBathrooms);
                }

            //     if(!filterFloors.some(item => item.value === floors)){

            //         const arrayFloors = [...filterFloors, {
            //             value: floors,
            //             label: capitalizeString(NumberToWords.toWords(Number(floors)))
            //         }]
            //         setFilterFloors(arrayFloors);
            //     }

                
            });
        }

        filter();

    }, [actualesFilters, filterPrice, filterBedrooms, filterBathrooms, filterFloors, filters]);

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
        }else if(type == 'bedrooms' && !e?.value){
            setBedroomsDefault({
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
                {/* <section className='filter'>
                    <Select
                        placeholder="Price"
                        value={priceDefault?.value ? priceDefault : null}
                        isClearable
                        instanceId={useId()}
                        options={filterPrice}
                        onChange={ (e: SingleValue<{ value: string; label: string;}>) => loadSelect(e, 'price') }
                    />
                </section> */}

                <section className='filter'>
                    <Select
                        placeholder="Bedrooms"
                        value={bedroomsDefault?.value ? bedroomsDefault : null}
                        options={filterBedrooms}
                        isClearable
                        inputId='bedrooms_id'
                        id='bedrooms_id'
                        instanceId={useId()}
                        onChange={ (e: SingleValue<{ value: string; label: string;}>) => loadSelect(e, 'bedrooms') }
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
                {/* <section className='filter'>
                    <Select
                        placeholder="Floors"
                        value={floorsDefault?.value ? floorsDefault : null}
                        options={filterFloors}
                        isClearable
                        inputId='floors_id'
                        id='floors_id'
                        instanceId={useId()}
                        onChange={ (e: SingleValue<{ value: string; label: string;}>) => loadSelect(e, 'floors') }
                    />
                </section> */}
               
            </section>
        </>
    )

}


function capitalizeString(text: string) : string {
    return text.charAt(0).toUpperCase() + text.slice(1);
}

export default FiltersComponent;