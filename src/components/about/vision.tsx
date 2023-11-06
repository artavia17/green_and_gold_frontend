'use client';
import { motion } from "framer-motion";
import { useEffect, useState } from "react";
import { fethItem } from "@/hook/api";

type ContentType = {
    url: string,
    items: {
      data: {
        attributes: {
          Our_Mission: string;
          Our_Vision: string;
        };
      };
    };
  };


export default function VisionMisionComponent(){

    const [content, setContent] = useState<ContentType>();

    useEffect(() => {
        const contentSection = async () => {
          setContent(await fethItem("about"));
        };
    
        contentSection();
      }, []);

    return (
        <>
            <motion.div 
                className="visionMision"
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
                <section className="item">
                    <h2 title="Our Vision">Our Vision</h2>
                    <section dangerouslySetInnerHTML={{__html: content?.items.data.attributes.Our_Vision ? content?.items.data.attributes.Our_Vision : ''}}></section>
                </section>
                <section className="item">
                    <h2 title="Our Mission">Our Mission</h2>
                    <section dangerouslySetInnerHTML={{__html: content?.items.data.attributes.Our_Mission ? content?.items.data.attributes.Our_Mission : ''}}></section>
                </section>
            </motion.div>
        </>
    )

}