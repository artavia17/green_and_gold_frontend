"use client";

import { useEffect } from "react";


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
  titulo: string,
  image: string,
  content: string
}

type ContentType = {
  content: {
    url: string;
    items: ArrayServices[]
  };
};

export default function PropertyComponent({ content }: ContentType) {

  useEffect(()=>{
    document.body.style.overflow = 'initial';
  }, [])


  return (
    <>
      <section className="servicios">
        <section
          // initial={{
          //   y: 200,
          //   opacity: 0,
          // }}
          // whileInView={{
          //   y: 0,
          //   opacity: 1,
          // }}
          // transition={{
          //   type: "spring",
          // }}
        >
          <h4>Let us take care of everything</h4>
          <h1>Our Services</h1>
        </section>

        {
                    content.items.map( (item, key : number ) => {

                        return (
                            <section 
                                className={`property ` +  ((key + 1) % 2 == 0  ? 'reverse' : '')}
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
                                key={key}
                            >
                                
                                <section className="image" dangerouslySetInnerHTML={{__html: item.image}}></section>
                                <section className="second-item">
                                    <h2>{item.titulo}</h2>
                                    <div className="content" dangerouslySetInnerHTML={{__html: item.content}}></div>
                                </section>

                            </section>
                        )
                    })
                }
      </section>
    </>
  );
}
