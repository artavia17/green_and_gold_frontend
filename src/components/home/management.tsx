import ImagesTwo from '@/assets/img/test/cuidados_2.png';
import Image from 'next/image';
import Link from 'next/link';
import { motion } from "framer-motion"

function ManagementComponent(){

    return (
        <>

            <section className="managment">
                <div className="container">
                    <motion.div 
                        className="item"
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
                        <section className='image'>
                            <Image src={ImagesTwo.src} width={100} height={100} alt='Imagen principal'/>
                        </section>
                        <section className='item_content'>
                            <h2>Full Management Plus</h2>
                            <div className='content'>
                                <p>Your investment deserves the best care - trust it with us.</p>
                                <ul>
                                    <li>Property management and residential services</li>
                                    <li>Rental Program</li>
                                    <li>Concierge Services</li>
                                </ul>
                            </div>
                            <div className='bottom'>
                                <Link href="/">Learn more</Link>
                            </div>
                        </section>
                    </motion.div>
                </div>
            </section>

        </>
    )

}

export default ManagementComponent;