"use client";

import Image from "next/image";
import { motion } from "framer-motion";

type ArrayImage = {
    data: {
        attributes: {
            alternativeText: string,
            name: string,
            url: string
        }
    }
}

type ArrayServices = {
    Title: string,
    Image: ArrayImage,
    // subContent: string,
    Content: string
}

type ContentType = {
  content: {
    url: string;
    items: {
      data: {
        attributes: {
          All_Services: ArrayServices[];
        };
      };
    };
  };
};

export default function PropertyComponent({ content }: ContentType) {


  return (
    <>
      <section className="servicios">
        <motion.section
          initial={{
            y: 200,
            opacity: 0,
          }}
          whileInView={{
            y: 0,
            opacity: 1,
          }}
          transition={{
            type: "spring",
          }}
        >
          <h4>Let us take care of everything</h4>
          <h1>Our Services</h1>
        </motion.section>

        {
                    content.items.data.attributes.All_Services.map( (item : ArrayServices, key : number ) => {

                        console.log(item.Image.data.attributes.url)

                        return (
                            <motion.section 
                                className={`property ` +  ((key + 1) % 2 == 0  ? 'reverse' : '')}
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
                                key={key}
                            >
                                
                                <section className="image">
                                    <Image src={ content.url + item.Image.data.attributes.url} alt={item.Image.data.attributes.alternativeText ? item.Image.data.attributes.alternativeText : item.Image.data.attributes.name } title={item.Image.data.attributes.alternativeText ? item.Image.data.attributes.alternativeText : item.Image.data.attributes.name } width={500} height={500} priority/>
                                </section>
                                <section className="second-item">
                                    <h2>{item.Title}</h2>
                                    {/* <div className="subcontent" dangerouslySetInnerHTML={{__html: item.subContent}}></div> */}
                                    <div className="content" dangerouslySetInnerHTML={{__html: item.Content}}></div>
                                </section>

                            </motion.section>
                        )
                    })
                }
      </section>
    </>
  );
}
