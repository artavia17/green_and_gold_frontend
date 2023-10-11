'use client';

// Aqui vamos a utilizar la libreria de swiper
import { Swiper, SwiperSlide } from 'swiper/react';
import { Pagination, EffectCoverflow, Autoplay } from 'swiper/modules';
import 'swiper/css';
import 'swiper/scss/navigation';

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


    return (
        <>
            
            <section className='sliderHome' style={{
                height: `${window.innerHeight - 75}px`
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
                    onSlideChange={() => console.log('slide change')}
                    onSwiper={(swiper) => console.log(swiper)}
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
                                    <section className='content'>
                                        <h2>{item.title}</h2>
                                        <a href={item.linkButton} target={item.newTarget ? '_blank' : ''}>{item.textButton}</a>
                                    </section>
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