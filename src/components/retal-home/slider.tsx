
import { useState, useEffect } from 'react';
import { Swiper, SwiperSlide } from 'swiper/react';
import Icon from '@/assets/img/icons/arrow_galery.svg';
import Image from 'next/image';

// Import Swiper styles
import 'swiper/css';
import 'swiper/css/pagination';
import 'swiper/css/navigation';

// import required modules
import { Pagination, Navigation } from 'swiper/modules';

type ImageItems = {
    img: string,
    alt: string,
    name: string
}

type ImageProps = {
    images: ImageItems[] | undefined,
    name: string
}

function SliderComponent({ name, images } : ImageProps){

    const [initialSwiper, setInitialSwiper] = useState<number>(0);
    const [viewSlider, setViewSlider] = useState<boolean>(false);

    useEffect(() => {
        images?.forEach((item, key) => {
            if(item.name == name){
                setInitialSwiper(key);
                setViewSlider(true);
            }
        })
    }, [images, name]);

    return (
        <>
           {
            viewSlider ? (
                <section className="view_individual_photo">

                    <section className='item'>
                        <section className="remove_item">
                            <button className="remove" title="Close" onClick={() => {}}>
                                <Image src={Icon.src} alt="Volver" width={100} height={100} />
                            </button>
                        </section>

                        <section className="content" onClick={ e => e.stopPropagation()}>
                        <Swiper
                            pagination={{
                            type: 'fraction',
                            }}
                            navigation={true}
                            modules={[Pagination, Navigation]}
                            className="mySwiper"
                            initialSlide={initialSwiper}
                        >
                            {
                                images ? images.map((item, key) => {
                                    return (
                                        <SwiperSlide key={key}>
                                            <Image src={item.img} title={item.alt ? item.alt : item.name} alt={item.alt ? item.alt : item.name} width={1000} height={1000} />
                                        </SwiperSlide>
                                    )
                                }) : ''
                            }
                        </Swiper>
                    </section>
                    </section>
                </section>
            ) : ''
           }
        </>
    )

}

export default SliderComponent;