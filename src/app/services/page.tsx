/**
 * Desde este archivo enviamos mostramos el contenido de la seccion de servicios
 */

'use client';

import PropertyComponent from "@/components/services/properti";
import { motion } from "framer-motion";
import { fethItem } from "@/hook/api";
import { useState, useEffect } from "react";

type ContentType = {
    url: string,
    items: {
        data: {
            attributes: {
                All_Services: any[]
            }
        }
    }
}

type ArrayServices = {
    title: string,
    image: {
        url: string,
        alt: string
    },
    subContent: string,
    content: string
}

function Services(){

    const [content, setContent] = useState<ContentType>();

    useEffect( ()=>{
        const fetchContent = async () => {
            setContent(await fethItem('service'));
        }

        fetchContent();

    }, []);

    return (
        <>

            <section className="servicios">
                <motion.section
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
                    <h4>Let us take care of everything</h4>
                    <h1>Our Services</h1>
                </motion.section>

                {
                    content?.items.data.attributes.All_Services.map( (item, key) => {

                        const management : ArrayServices = {
                            title: item.Title,
                            image: {
                                url: `${content.url}${item.Image.data.attributes.url}`,
                                alt: item.Image.data.attributes.alternativeText ? item.Image.data.attributes.alternativeText : item.Image.data.attributes.name,
                            },
                            subContent: '',
                            content: item.Content
                        }

                        return (
                            <PropertyComponent key={key} reverse={ (key + 1) % 2 == 0 ? true : false} content={management}/>
                        )
                    })
                }
            </section>
        
        </>
    )   

}

export default Services;