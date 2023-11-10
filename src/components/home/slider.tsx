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
    attributes: {
        Title: string,
        Action: string,
        updatedAt: string,
        Button: string,
        Tab: boolean,
        Background: {
          data: {
            attributes: {
              name: string,
              alternativeText: string,
              url: string,
            }
          }
        }
    }
}
  
type SliderType = {
    url: string;
    items: {
        data: ImageData[];
    };
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
            
            <section className='sliderHome top_screen' data-scroll-section style={{
                height: `${height}px` 
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
                        height: `${height + 50}px` 
                    }}
                >
                    {
                        content && content.items.data.length > 0 ? (
                            content.items.data.map( (item, key) =>{
                                return (
                                    <SwiperSlide 
                                        className='item' 
                                        key={key}
                                        style={{
                                            backgroundImage: `url(${content.url + item.attributes.Background.data.attributes.url})`,
                                            height: `${height + 50}px`     
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