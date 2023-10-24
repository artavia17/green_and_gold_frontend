'use client';
import Select from 'react-select'

function FiltersComponent(){

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

    return (
        <>
            <section className="filters">
                <section className='filter'>
                    <Select
                        placeholder="Price"
                        options={price}
                    />
                </section>
                <section className='filter'>
                    <Select
                        placeholder="Bedrooms"
                        options={bedrooms}
                    />
                </section>
                <section className='filter'>
                    <Select
                        placeholder="Bathrooms"
                        options={bathrooms}
                    />
                </section>
                <section className='filter'>
                    <Select
                        placeholder="Floors"
                        options={floors}
                    />
                </section>
            </section>
        </>
    )

}

export default FiltersComponent;