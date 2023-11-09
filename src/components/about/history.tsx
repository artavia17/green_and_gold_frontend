'use client';

import HeardIcon from '@/assets/img/icons/heart.circle.svg';
import Image from 'next/image';
import VisionMisionComponent from './vision';
import { motion } from "framer-motion";
import { useEffect, useState } from "react";
import { fethItem } from '@/hook/api';

type ContentType = {
    url: string,
    items: {
      data: {
        attributes: {
          History: string;
        };
      };
    };
  };

export default function HistoryComponent (){


    const [content, setContent] = useState<ContentType>();

    useEffect(() => {
        const contentSection = async () => {
          setContent(await fethItem("about"));
        };
    
        contentSection();
      }, []);

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
                    {/* <Image src={HeardIcon.src} width={100} height={100} title='Icono de corazon' alt="Icono de corazon" />     */}
                    <h2 title="History">History</h2>
                    <div className='content' dangerouslySetInnerHTML={{__html: (content?.items.data.attributes.History ? content?.items.data.attributes.History : '')}}></div>
                </motion.div >
                <VisionMisionComponent/>
            </section>
        </>
    );

}