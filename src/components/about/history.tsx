'use client';

import HeardIcon from '@/assets/img/icons/heart.circle.svg';
import Image from 'next/image';
import VisionMisionComponent from './vision';
import { motion } from "framer-motion";

export default function HistoryComponent (){

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
                    <Image src={HeardIcon.src} width={100} height={100} title='Icono de corazon' alt="Icono de corazon" />    
                    <h2>History</h2>
                    <div className='content'>
                        <p><strong> For a decade, Green and Gold has been a trusted name in property management for homeowners seeking to relish their homes hassle-free. Our administrative expertise has shaped a suite of services tailored for utmost convenience. Our team, each member rigorously trained for up to a year, stands ready to handle any emergency swiftly and competently.</strong></p>
                        <p>Moreover, our expansive network of providers ensures we`re equipped for any unique requirements, projects, or services you might need.</p>
                    </div>
                </motion.div >
                <VisionMisionComponent/>
            </section>
        </>
    );

}