import { gsap } from "gsap";
import { Swiper, SwiperSlide } from 'swiper/react';
import { EffectCards } from "swiper/modules";
import { motion } from "framer-motion"

// Import Swiper styles
import 'swiper/css';
import 'swiper/css/effect-cards';

import Image from 'next/image';


// Images del test
import ImagesOne from '@/assets/img/test/cuidados_1.png';
import ImagesTwo from '@/assets/img/test/cuidados_2.png';

function Cuidados(){

    const contentApi = {
        title: 'Caring for Your Home as Our Own',
        content: `<p><strong>Green and Gold</strong> is your trusted partner for property administration in the heart of the Península de Papagayo, Guanacaste. With over a decade in the business, we’ve perfected a comprehensive 24/7 service model that's tailored just for you.</p>
        <div>
            <strong>What We Offer:</strong> 
            <ul>
                <li><strong>Expert Administration:</strong> Guided by a legacy of combined administration, management, and maintenance expertise.</li>
                <li><strong>Round-the-Clock Attention:</strong> Our dedicated team is on hand, ensuring your property remains in pristine condition.</li>
                <li><strong>Tailored Services:</strong> Customized solutions for every unique property and homeowner need.</li>
            </ul>
        </div>
        <p>Relish in the beauty and tranquility of your home, secure in the knowledge that a reliable team is tending to every detail. Experience the Green and Gold distinctive touch: where quality, dedication, and a personalized approach define every service. 
        <strong>Place your trust—and your property—in hands that truly care.</strong></p>`
    }

    const sliderApi = [
        {
            img: ImagesOne.src
        },
        {
            img: ImagesTwo.src
        }
    ]
      

    return ( 
        <>

            <section className="cuidados_home" data-scroll-section>
                <section className="max">
                    <section className="content">
                        <h1 data-scroll data-scroll-id	 data-scroll-delay="3000">{ contentApi.title }</h1>
                        <section dangerouslySetInnerHTML={{__html: contentApi.content}}></section>
                    </section>
                    <section className="contentSlider">
                        <motion.div 
                            className="slider"
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
                            <Swiper
                                effect={'cards'}
                                grabCursor={true}
                                modules={[EffectCards]}
                                className="mySwiper"
                            >
                                 {
                                    sliderApi.map( (item, key) =>{
                                        return (
                                            <SwiperSlide 
                                                className='slider' 
                                                key={key}
                                            >
                                                <div>
                                                    <Image fill={true} src={item.img} alt="" />
                                                </div>
                                            </SwiperSlide> 
                                        )
                                    })
                                }
                            </Swiper>
                        </motion.div>
                    </section>
                </section>
            </section>

        </>
    )

}

export default Cuidados;