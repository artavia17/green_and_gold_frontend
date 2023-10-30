'use client';
import React, { useId, useEffect, useState } from 'react';
import Select, { SingleValue } from 'react-select';

type FiltersComponentProps = {
    closeFilters: ( arg : boolean ) => void;
  }

function FiltersComponent( { closeFilters } : FiltersComponentProps ){

    const [price, setPrice] = useState(
        [
            { value: '$300', label: '$300' },
            { value: '$2400', label: '$2400' },
            { value: '$1700', label: '$1700' }
        ]
    );

    const [bedrooms, setBedrooms ]= useState([
        { value: '4', label: 'Four' },
        { value: '1', label: 'One' },
        { value: '10', label: 'Ten' }
    ]);

    const [bathrooms, setBathrooms] = useState([
        { value: '4', label: 'Four' },
        { value: '1', label: 'One' },
        { value: '10', label: 'Ten' }
    ]);

    const [floors, setFloors] = useState([
        { value: '4', label: 'One' },
        { value: '1', label: 'Two' },
        { value: '10', label: 'Three' }
    ])

    const [priceDefault, setPriceDefault] = useState({ value: '', label: '' });
    const [bedroomsDefault, setBedroomsDefault] = useState({ value: '', label: '' });
    const [bathroomsDefault, setBathroomsDefault] = useState({ value: '', label: '' });
    const [floorsDefault, setFloorsDefault] = useState({ value: '', label: '' });

    const [actualesFilters, setActualesFilters] = useState<string | null>(null);

    useEffect(() => {

        setActualesFilters(localStorage.getItem('filters'));

        if(actualesFilters){

            const allFilters = JSON.parse(actualesFilters);


            Object.keys(allFilters).forEach((item) => {


                setValueFilter(item, allFilters[item]);

                if(item == 'price'){

                    price.forEach( (e, key) => {
                        
                        if(e.value == allFilters[item]){
                            setPriceDefault(price[key]);
                        }

                    });
                    
                }else if(item == 'bedrooms'){

                    bedrooms.forEach( (e, key) => {
                        
                        if(e.value == allFilters[item]){
                            setBedroomsDefault(bedrooms[key]);
                        }

                    });

                }else if(item == 'bathrooms'){
                    bathrooms.forEach( (e, key) => {
                        
                        if(e.value == allFilters[item]){
                            setBathroomsDefault(bathrooms[key]);
                        }

                    });
                }else if(item == 'floors'){
                    floors.forEach( (e, key) => {
                        
                        if(e.value == allFilters[item]){
                            setFloorsDefault(floors[key]);
                        }

                    });
                }

            });
            
        }
    }, [actualesFilters, price, bedrooms, bathrooms, floors])

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

    }


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
                        placeholder="Price"
                        value={priceDefault?.value ? priceDefault : null}
                        isClearable
                        instanceId={useId()}
                        options={price}
                        onChange={ (e: SingleValue<{ value: string; label: string;}>) => loadSelect(e, 'price') }
                    />
                </section>

                <section className='filter'>
                    <Select
                        placeholder="Bedrooms"
                        value={bedroomsDefault?.value ? bedroomsDefault : null}
                        options={bedrooms}
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
                        options={bathrooms}
                        isClearable
                        inputId='bathrooms_id'
                        id='bathrooms_id'
                        instanceId={useId()}
                        onChange={ (e: SingleValue<{ value: string; label: string;}>) => loadSelect(e, 'bathrooms') }
                    />
                </section>
                <section className='filter'>
                    <Select
                        placeholder="Floors"
                        value={floorsDefault?.value ? floorsDefault : null}
                        options={floors}
                        isClearable
                        inputId='floors_id'
                        id='floors_id'
                        instanceId={useId()}
                        onChange={ (e: SingleValue<{ value: string; label: string;}>) => loadSelect(e, 'floors') }
                    />
                </section>
               
            </section>
        </>
    )

}

export default FiltersComponent;