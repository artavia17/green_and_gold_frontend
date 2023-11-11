'use client';

import VisionMisionComponent from './vision';
import { motion } from "framer-motion";

type ContentType = {
    url: string,
    items: {
      data: {
        attributes: {
          History: string;
          Our_Mission: string;
          Our_Vision: string;
        };
      };
    };
};

type ContentProps = {
  content: ContentType
}

export default function HistoryComponent ({content} : ContentProps){


    return (
        <>
            <section className='content_history_vision'>
                <motion.div  
                    className="history"
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
                    <h2 title="History">History</h2>
                    <div className='content' dangerouslySetInnerHTML={{__html: (content?.items.data.attributes.History ? content?.items.data.attributes.History : '')}}></div>
                </motion.div >
                <VisionMisionComponent items={content} />
            </section>
        </>
    );

}