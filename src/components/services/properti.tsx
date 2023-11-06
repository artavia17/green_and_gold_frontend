'use client'

import Image from "next/image";
import { motion } from "framer-motion";


type propsType = {
    reverse: boolean,
    content: {
        title: string,
        subContent: string,
        content: string,
        image: {
            url: string,
            alt: string
        },
    }
}

export default function PropertyComponent( { reverse, content } : propsType ){


    return (
        <>
            <motion.section 
                className={`property ` +  (reverse ? 'reverse' : '')}
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
                
                <section className="image">
                    <Image src={content.image.url} alt={content.image.alt} title={content.image.alt} width={100} height={100}/>
                </section>
                <section className="second-item">
                    <h2>{content.title}</h2>
                    <div className="subcontent" dangerouslySetInnerHTML={{__html: content.subContent}}></div>
                    <div className="content" dangerouslySetInnerHTML={{__html: content.content}}></div>
                </section>

            </motion.section>
        </>
    )

}