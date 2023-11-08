'use client';


function AvailabilityComponent(){

    const open_modal = () => {

        const loadComponent : HTMLElement | null = document.querySelector('.location_section');
        
        if(loadComponent){
            loadComponent.classList.add('active');
            document.body.style.overflow = 'hidden'
        }

    }

    return (
        <>
            <section className="availability_button">
                <button title="Availability" onClick={open_modal}>Availability</button>
            </section>
        </>
    )

}

export default AvailabilityComponent