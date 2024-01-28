'use client';

import VisionMisionComponent from './vision';
import { motion } from "framer-motion";

type ContentType = {
    url: string,
    items: {
        second_section: {
            title: string,
            content: string
        },
        third_section: {
            first_title: string,
            first_content: string,
            second_title: string,
            second_content: string,
        }
    }
};

type ContentProps = {
  content: ContentType
}

export default function HistoryComponent ({content} : ContentProps){

    return (
        <>
            <section className='content_history_vision'>
                <div  
                    className="history"
                    // initial={{
                    //     y: 200,
                    //     opacity: 0
                    // }}
                    // whileInView={{
                    //     y: 0,
                    //     opacity: 1,
                    // }}
                    // transition={{
                    //     type: 'spring'
                    // }}
                >
                    <h2 title={ content.items.second_section.title }>{ content.items.second_section.title }</h2>
                    <div className='content' dangerouslySetInnerHTML={{__html: (content?.items.second_section.content ? content?.items.second_section.content : '')}}></div>
                </div >
                <VisionMisionComponent items={content} />
            </section>
        </>
    );

}