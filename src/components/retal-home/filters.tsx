'use client';
import React, { useId } from 'react';
import Select, { SingleValue } from 'react-select'

type FiltersComponentProps = {
    closeFilters: ( arg : boolean ) => void;
  }

function FiltersComponent( { closeFilters } : FiltersComponentProps ){

    const price = [
        { value: '$300', label: '$300' },
        { value: '$2400', label: '$2400' },
        { value: '$1700', label: '$1700' }
    ];

    const bedrooms = [
        { value: '4', label: 'Four' },
        { value: '1', label: 'One' },
        { value: '10', label: 'Ten' }
    ];

    const bathrooms = [
        { value: '4', label: 'Four' },
        { value: '1', label: 'One' },
        { value: '10', label: 'Ten' }
    ];

    const floors = [
        { value: '4', label: 'One' },
        { value: '1', label: 'Two' },
        { value: '10', label: 'Three' }
    ];



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

    }

    return (
        <>
            <section className="filters" onClick={ ( event : React.MouseEvent ) => event.stopPropagation() }>
                <section className='filter'>
                    <Select
                        placeholder="Price"
                        isClearable
                        instanceId={useId()}
                        options={price}
                        onChange={ (e: SingleValue<{ value: string; label: string;}>) => loadSelect(e, 'price') }
                    />
                </section>

                <section className='filter'>
                    <Select
                        placeholder="Bedrooms"
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