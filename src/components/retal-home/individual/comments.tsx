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

type Comments = {
    comment_author: string,
    comment_content: string,  
}
  
type Unabailable = {
    date: string,
}

type CommentsProps = {
    items: {
        url: string;
        items: {
                titulo: string,
                update: string,
                comments: Comments[],
                unabailable: Unabailable[] | null
            };
        };
}   

function CommentsComponent({ items } : CommentsProps ) {

    console.log(items);

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
                        items.items.comments && items.items.comments.length ? 
                            items.items.comments.map((item, key) => {

                                const starts = 5;
                                let svgHTML = ''

                                for(let i = 0; i < Number(starts); i++){

                                    let fiveStart = true;


                                    svgHTML +=  `<svg
                                                    width="19"
                                                    height="18"
                                                    viewBox="0 0 19 18"
                                                    fill="none"
                                                    xmlns="http://www.w3.org/2000/svg"
                                                    class="
                                                        ${(fiveStart && i == 2 ? 'big' : '')}  ${(fiveStart && (i == 1 || i == 3 ) ? 'medium' : '')}"
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
                                            <h3>{item.comment_author}</h3>
                                            <section className="starts" dangerouslySetInnerHTML={{__html: svgHTML}}></section>
                                        </section>
                                        <section className="content">
                                            <p dangerouslySetInnerHTML={{__html: item.comment_content}}></p>
                                        </section>
                                    </SwiperSlide>
                                )
                            })
                        : ''
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
