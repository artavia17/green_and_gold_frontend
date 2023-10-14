import { motion } from "framer-motion";

export default function VisionMisionComponent(){

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
                    <h2>Our Vision</h2>
                    <p>To be the leader company in the management of luxury property in Península Papagayo by providing safety, comfort and support to our customers and their families.</p>
                </section>
                <section className="item">
                    <h2>Our Mission</h2>
                    <p>To manage our customer’s properties with transparency, commitment and quality and provide a customized service to fulfill the highest expectations of each one of our customers.</p>
                </section>
            </motion.div>
        </>
    )

}