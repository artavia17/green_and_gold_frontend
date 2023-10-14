'use client';
import { useEffect, useState } from "react";
import BackgroundImage from '@/assets/img/test/background_about.png';
import { motion } from "framer-motion";

const WhoComponent = () => {

    const [heightWindow, setHeightWindow] = useState(0);
    const backgroundStyle = {
        backgroundImage: `url(${BackgroundImage.src})`,
    }

    useEffect(() => {

        const header = document.querySelector('header');

        if(header){
            if (typeof window !== 'undefined') {
                setHeightWindow(window.innerHeight - header.offsetHeight);
            }
        }

    }, []);

    return (
        <>
            <section className="who" style={{
                minHeight: `${heightWindow}px` 
            }}>
                <motion.div 
                    className="item" style={backgroundStyle}
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
                        <section className="title">
                            <h2>About Us</h2>
                            <h1>Who we are</h1>
                        </section>
                        <section className="content">
                            <p>Green and Gold boasts the Península de Papagayo`s most seasoned property management team, each member proficient in home care and intricate management systems. Our hands-on approach eases the burden for homeowners, overseeing every facet of property maintenance, from payments and paperwork to housekeeping and landscaping. In turn, our clients can truly savor the beauty of Guanacaste without the everyday hassles.</p>
                            <p>Guided by a deep respect for nature, our business practices prioritize environmental stewardship. We`re committed to minimizing our impact, striving for operations that coexist harmoniously with our rich ecosystems and champion sustainable growth.</p>
                        </section>
                </motion.div>
            </section>
        </>
    )

}

export default WhoComponent;