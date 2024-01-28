'use client';
import { useEffect, useState } from 'react';

// Aqui vamos a utilizar la libreria de swiper
import { Swiper, SwiperSlide } from 'swiper/react';
import { Pagination, EffectCoverflow, Autoplay } from 'swiper/modules';
import 'swiper/css';
import 'swiper/scss/navigation';


// Import height screen;
import HeightScreen from '@/hook/screens/height';

type ImageData = {
    titulo: string,
    button: {
        external: boolean,
        link: string,
        title: string
    },
    background: string
}
  
type SliderType = {
    url: string;
    items: ImageData[];
};

type DataProps = {
    content: SliderType
}


function SliderHome({ content } : DataProps){

    const [height, setHeight] = useState<number>(0);


    useEffect(  () => {

        setHeight(HeightScreen());

    }, []);


    return (
        
        <>  
            
            <section className='sliderHome top_screen' data-scroll-section>
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
                        height: height > 0 ? `${height + 50}px` : ''
                    }}
                >
                    {
                        content && content.items.length > 0 ? (
                            content.items.map( (item, key) =>{
                                return (
                                    <SwiperSlide 
                                        className='item' 
                                        key={key}
                                        style={{
                                            height: `${height + 50}px`     
                                        }}
                                    >
                                        <div className='content'>
                                            <div dangerouslySetInnerHTML={{__html: item.background}}></div>
                                            <h2 title={item.titulo} data-scroll data-scroll-speed="1">{item.titulo}</h2>
                                            <a title={item.button.link ? item.titulo : 'Check our rental homes'} href={item.button.link} target={item.button.external ? '_blank' : ''} data-scroll data-scroll-speed="1"> 
                                                {
                                                    item.button.title ? item.button.title : 'Check our rental homes'
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