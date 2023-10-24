/**
 * Desde este archivo enviamos mostramos el contenido de la seccion de servicios
 */

'use client';

import PropertyComponent from "@/components/services/properti";
import ImageOne from '@/assets/img/test/servicios_one.png';
import ImageTwo from '@/assets/img/test/servicios_two.png';
import ImageThree from '@/assets/img/test/servicios_three.png';
import { motion } from "framer-motion";

function Services(){


    const management  = {
        title: `Property Management and Residential Services`,
        image: ImageOne.src,
        subContent: `<ul>
                        <li>On-Site Couple Services: Dedicated assistance for the property.</li>
                    </ul>`,
        content: `<h5>Essential Maintenance:</h5>
                    <ul>
                        <li>Cooking services.</li>
                        <li>Gardening.</li>
                        <li>Pest control.</li>
                        <li>Pool maintenance.</li>
                        <li>Gutter cleaning.</li>
                        <li>Window cleaning.</li>
                    </ul>

                    <h5>Extended Maintenance and Utilities:</h5>
                    <ul>
                        <li>Utilities and taxes payment.</li>
                        <li>Hiring and supervision of the above services.</li>
                        <li>A/C maintenance, wastewater pumps, and other.</li>
                        <li>Equipment/utility maintenance.</li>
                        <li>Vendor hiring and supervision for additional services like water pipe leaks, exterior furniture maintenance, appliance parts and repair, network services, stain removal, car maintenance, locksmithing, general repairs, painting, and real estate tax payments.</li>
                    </ul>

                    <h5>Reporting & Records:</h5>
                    <ul>
                        <li>Weekly walkthrough and checklist rundown.</li>
                        <li>Housekeeping routines.</li>
                        <li>Monthly reports on outstanding issues and property status.</li>
                        <li>Maintenance calendar, spare parts control, and consumption monitoring.</li>
                        <li>Visit and event logs.</li>
                    </ul>`,
    }

    const rental  = {
        title: `Rental Program`,
        image: ImageTwo.src,
        subContent: `<p><strong>Maximized Earnings:</strong> Harness the full financial potential of your property.</p>`,
        content: `<h5>Essential Maintenance:</h5>
                    <ul>
                        <li>Cooking services.</li>
                        <li>Gardening.</li>
                        <li>Pest control.</li>
                        <li>Pool maintenance.</li>
                        <li>Gutter cleaning.</li>
                        <li>Window cleaning.</li>
                    </ul>

                    <h5>Tenant Services:</h5>
                    <ul>
                        <li>Hassle-free tenant acquisition.</li>
                        <li>Comprehensive tenant vetting for peace of mind.</li>
                    </ul>

                    <h5>Financial Management:</h5>
                    <ul>
                        <li>Efficient rent collection.</li>
                        <li>Detailed financial reporting for transparency.</li>
                    </ul>
                    
                    <h5>Flexible Options:</h5>
                    <ul>
                        <li>Offering both seasonal and long-term rental agreements.</li>
                    </ul>
                    
                    <h5>Smooth Turnover:</h5>
                    <ul>
                        <li>Streamlined processes ensure quick and efficient property turnover between rentals.</li>
                    </ul>`,
    }

    const concierge = {
        title: `Concierge Services`,
        image: ImageThree.src,
        subContent: ``,
        content: `<h5>Event Coordination:</h5>
                    <ul>
                        <li>Arranging services for special events.</li>
                    </ul>

                    <h5>Dining:</h5>
                    <ul>
                        <li>In-home dining arrangements and restaurant reservations.</li>                        
                    </ul>

                    <h5>Adventure:</h5>
                    <ul>
                        <li>Sport fishing, scuba diving, snorkeling, and more.</li>
                        <li>Housekeeping routines.</li>
                        <li>Monthly reports on outstanding issues and property status.</li>
                        <li>Maintenance calendar, spare parts control, and consumption monitoring.</li>
                        <li>Visit and event logs.</li>
                    </ul>
                    
                    <h5>Tour Service Arrangements:</h5>
                    <p>Personalized travel experiences.</p>
                    <h6>Tour Service Arrangements:</h6>
                    <ul>
                        <li>Grocery shopping.</li>
                        <li>Airport pick-ups.</li>
                        <li>Flight reservations.</li>
                        <li>Car rentals and trusted taxi services.</li>
                    </ul>
                    
                    <h5> Wellness:</h5>
                    <p>Spa packages and medical services.</p>
                    <h6>Miscellaneous:</h6>
                    <ul>
                        <li>Baby sitting.</li>
                        <li>Flower arrangements (not for rent).</li>
                        <li>Flight reservations.</li>
                        <li>Custom amenities.</li>
                    </ul>`,
    }

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
                <PropertyComponent reverse={false} content={management}/>
                <PropertyComponent reverse={true} content={rental}/>
                <PropertyComponent reverse={false} content={concierge}/>
            </section>
        
        </>
    )   

}

export default Services;