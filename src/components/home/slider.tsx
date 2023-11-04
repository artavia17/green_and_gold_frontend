'use client';

import { useEffect, useState } from 'react';

// Aqui vamos a utilizar la libreria de swiper
import { Swiper, SwiperSlide } from 'swiper/react';
import { Pagination, EffectCoverflow, Autoplay } from 'swiper/modules';
import 'swiper/css';
import 'swiper/scss/navigation';

// Fetch
import { fethItem } from '@/hook/api';


// Type data

type SliderType = {
    url: string,
    items: {
        data : any[]
    }
}

function SliderHome(){

    const [heightWindow, setHeightWindow] = useState(0);
    const [slider, setSlider] = useState<SliderType | null>(null);


    useEffect(  () => {

        if (typeof window !== 'undefined') {
            const header = document.querySelector('header');
            if(header){
                setHeightWindow(window.innerHeight - header?.offsetHeight);
            }
        }

        const dataFetch = async () => {

            setSlider(await fethItem('home-sliders'));
        }

        dataFetch();

    }, []);


    return (
        <>
            
            <section className='sliderHome' data-scroll-section style={{
                height: `${heightWindow}px` 
            }}>
                <Swiper
                    modules={[Pagination, EffectCoverflow, Autoplay]}
                    grabCursor={true}
                    spaceBetween={50}
                    slidesPerView={1}
                    parallax={true}
                    pagination={{
                        clickable: true,
                    }}
                    centeredSlides={true}
                    effect="coverflow"
                    autoplay={{
                        delay: 3000,
                    }}
                    style={{
                        height: `${heightWindow + 50}px` 
                    }}
                >
                    {
                        slider && slider.items.data.length > 0 ? (
                            slider.items.data.map( (item, key) =>{
                                return (
                                    <SwiperSlide 
                                        className='item' 
                                        key={key}
                                        style={{
                                            backgroundImage: `url(${slider.url + item.attributes.Background.data.attributes.url})`,
                                            height: `${heightWindow + 50}px`     
                                        }}
                                        title={item.attributes.Background.data.attributes.alternativeText ? item.attributes.Background.data.attributes.alternativeText : item.attributes.Background.data.attributes.name}
                                    >
                                        <div className='content'>
                                            <h2 title={item.attributes.Title} data-scroll data-scroll-speed="1">{item.attributes.Title}</h2>
                                            <a title={item.attributes.Button ? item.attributes.Button : 'Check our rental homes'} href={item.attributes.Action} target={item.attributes.Tab ? '_blank' : ''} data-scroll data-scroll-speed="1"> 
                                                {
                                                    item.attributes.Button ? item.attributes.Button : 'Check our rental homes'
                                                }
                                            </a>
                                        </div>
                                    </SwiperSlide>
                                )
                            })
                        ) : ''
                    }
                </Swiper>
            </section>  

        </>
    )

}

export default SliderHome;