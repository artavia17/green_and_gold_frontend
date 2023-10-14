'use client';
import { useEffect, useState } from 'react';

// Aqui vamos a utilizar la libreria de swiper
import { Swiper, SwiperSlide } from 'swiper/react';
import { Pagination, EffectCoverflow, Autoplay } from 'swiper/modules';
import 'swiper/css';
import 'swiper/scss/navigation';
import { motion } from "framer-motion";

// Imagenes de prueba
import ImageBackgroundTest from '@/assets/img/test/background_swiper_test.png';
import ImageBackgroundTestTwo from '@/assets/img/test/two.jpg';


function SliderHome(){

    const allSlider = [
        {
            title: 'Looking for your dream vacation',
            textButton: 'Check our rental homes',
            linkButton: 'https://swiperjs.com/react',
            img: ImageBackgroundTest.src,
            newTarget: false,
        },
        {
            title: 'Looking for your dream vacation',
            textButton: 'Check our rental homes',
            linkButton: 'https://swiperjs.com/react',
            img: ImageBackgroundTestTwo.src,
            newTarget: true
        },
        {
            title: 'Looking for your dream vacation',
            textButton: 'Check our rental homes',
            linkButton: 'https://swiperjs.com/react',
            img: ImageBackgroundTest.src,
            newTarget: false
        },
        {
            title: 'Looking for your dream vacation',
            textButton: 'Check our rental homes',
            linkButton: 'https://swiperjs.com/react',
            img: ImageBackgroundTestTwo.src,
            newTarget: true
        },
    ]

    const [heightWindow, setHeightWindow] = useState(0);


    useEffect(() => {
        if (typeof window !== 'undefined') {
            setHeightWindow(window.innerHeight - 75);
        }
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
                >
                    {
                        allSlider.map( (item, key) =>{
                            return (
                                <SwiperSlide 
                                    className='item' 
                                    key={key}
                                    style={{
                                        backgroundImage: `url(${item.img})`,
                                    }}
                                >
                                    <motion.div 
                                        className='content'
                                        initial={{
                                            y: 200,
                                            opacity: 0
                                        }}
                                        whileInView={{
                                            y: 0,
                                            opacity: 1,
                                        }}
                                        transition={{
                                            type: 'spring'
                                        }}
                                    >
                                        <h2 data-scroll data-scroll-speed="1">{item.title}</h2>
                                        <a href={item.linkButton} target={item.newTarget ? '_blank' : ''} data-scroll data-scroll-speed="1">{item.textButton}</a>
                                    </motion.div>
                                </SwiperSlide>
                            )
                        })
                    }
                </Swiper>
            </section>  

        </>
    )

}

export default SliderHome;