'use client';


import HandImage from '@/assets/img/test/valores/hand.raised.fill.svg';
import PersonImage from '@/assets/img/test/valores/person.fill.svg';
import ShieldImage from '@/assets/img/test/valores/shield.lefthalf.filled.svg';
import LeafImage from '@/assets/img/test/valores/leaf.circle.svg';
import BrainImage from '@/assets/img/test/valores/brain.svg';
import PersonsImage from '@/assets/img/test/valores/personas.svg';
import EstrellasImage from '@/assets/img/test/valores/sparkles.svg';
import Image from 'next/image';
import { motion } from 'framer-motion';


export default function ValoresComponent(){


    const typeValores =  [
        {
            img: `${HandImage.src}`,
            title: 'Honesty'
        },
        {
            img: `${PersonImage.src}`,
            title: 'Human Service'
        },
        {
            img: `${ShieldImage.src}`,
            title: 'Transparency'
        },
        {
            img: `${LeafImage.src}`,
            title: 'Socia Responsibility'
        },
        {
            img: `${BrainImage.src}`,
            title: 'Proactivity'
        },
        {
            img: `${PersonsImage.src}`,
            title: 'Commitment'
        },
        {
            img: `${EstrellasImage.src}`,
            title: 'Quality'
        },
    ]

    return(
        <>

            <section className="valores">
                <motion.div 
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
                    <h2>Our Values</h2>
                    <p> <strong> Green and Gold </strong> is built on values that emphasize our genuine commitment to our customers. Our team is trained to services that meet, and where possible, exceed expectations. It`s in our values that our true essence shines through.
                    </p>
                    <section className="icons">

                        <ul>
                            {
                                typeValores.map( (item, key) => {
                                    return (
                                        <>
                                            <li key={key}>
                                                <Image src={item.img} title={`Image of ${item.title}`} alt={`Image of ${item.title}`} width={100} height={100} />                                           
                                                <h3 title={item.title}>{item.title}</h3>
                                            </li>                    
                                        </>
                                    )
                                })
                            }
                        </ul>

                    </section>
                </motion.div >

            </section>

        </>
    )

}