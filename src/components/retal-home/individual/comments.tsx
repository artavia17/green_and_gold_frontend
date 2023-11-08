"use client";

import { Swiper, SwiperSlide } from "swiper/react";
import { Autoplay } from 'swiper/modules';
import "swiper/css";
import wordsToNumbers from 'words-to-numbers';
import DateComponent from "@/components/retal-home/individual/date";

type CommentsData = {
    Name: string,
    Starts: string,
    Comment: string
}

type UnavailableProps = {
    Date: string
}

type CommentsProps = {
    items: {
        url: string;
        items: {
            data: {
                attributes: {   
                    Title: string;
                    Principal_Image: {
                    data: {
                        attributes: {
                        name: string;
                        alternativeText: string;
                        url: string;
                        };
                    };
                    };
                    Beds: string,
                    Baths: string,
                    SQ_FT: string,
                    Content: string,
                    Comments: CommentsData[],
                    updatedAt: string,
                    Unavailable: UnavailableProps[]
                };
                };
            };
        };
}   

function CommentsComponent({ items } : CommentsProps ) {


    const open_modal = () => {

        const loadComponent : HTMLElement | null = document.querySelector('.location_section');
        
        if(loadComponent?.classList.contains('active')){
            loadComponent.classList.add('remove')

            setTimeout(() => {
                loadComponent.classList.remove('active')        
                loadComponent.classList.remove('remove')
                document.body.style.overflow = 'initial';
            }, 300);

        }else if(loadComponent){
            loadComponent.classList.add('active')
        }

    }

  return (
    <>
        <section>
            <section className="row comments">
                <Swiper className="comments_section" spaceBetween={30} autoplay={{ delay: 4000, disableOnInteraction: false, }} modules={[Autoplay]}>

                    {
                        items.items.data.attributes.Comments.map((item, key) => {

                            const startsString = item.Starts;
                            const starts = wordsToNumbers(startsString);
                            let svgHTML = ''

                            for(let i = 0; i < Number(starts); i++){

                                let fiveStart = false;
                                let tresStart = false;
                                let cuatroStart = false;

                                if(starts == 5){
                                    fiveStart = true;
                                }

                                if(starts == 3){
                                    tresStart = true;
                                }

                                if(starts == 4){
                                    cuatroStart = true;
                                }

                                svgHTML +=  `<svg
                                                width="19"
                                                height="18"
                                                viewBox="0 0 19 18"
                                                fill="none"
                                                xmlns="http://www.w3.org/2000/svg"
                                                class="
                                                    ${(fiveStart && i == 2 ? 'big' : '')}  ${(fiveStart && (i == 1 || i == 3 ) ? 'medium' : '')}  ${(tresStart && (i == 1 ) ? 'medium' : '')} ${(cuatroStart && (i == 1 || i == 2) ? 'medium' : '')}"
                                                >
                                                <path
                                                d="M9.45465 0.417969L12.4693 5.59373L18.3233 6.86139L14.3324 11.3279L14.9358 17.2871L9.45465 14.8717L3.97355 17.2871L4.57691 11.3279L0.586038 6.86139L6.44004 5.59373L9.45465 0.417969Z"
                                                fill="#178C4F"
                                                />
                                            </svg>`
                            }


                            return (
                                <SwiperSlide className="item" key={key}>
                                    <section className="header">
                                        <h3>{item.Name}</h3>
                                        <section className="starts" dangerouslySetInnerHTML={{__html: svgHTML}}></section>
                                    </section>
                                    <section className="content" dangerouslySetInnerHTML={{__html: item.Comment}}></section>
                                </SwiperSlide>
                            )
                        })
                    }

                </Swiper>
            </section>

            <section className="location_section" onClick={open_modal}>
                <DateComponent items={ items}/>
            </section>
        </section>
    </>
  );
}

export default CommentsComponent;
