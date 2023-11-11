/**
 * Desde este archivo enviamos mostramos el contenido de la seccion de servicios
 */


import PropertyComponent from "@/components/services/properti";
import { fethItem } from "@/hook/api";

// Metas
import type { Metadata } from "next";

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
    Content: string
}

type ContentType = {
    url: string,
    items: {
        data: {
            attributes: {
                All_Services: ArrayServices[],
            }
        }
    }
}

export const metadata: Metadata = {
    title: {
      template: 'Property Management: Comprehensive Services for Your Home, Rental, and Concierge Needs',
      default: 'Property Management: Comprehensive Services for Your Home, Rental, and Concierge Needs',
      absolute: 'Property Management: Comprehensive Services for Your Home, Rental, and Concierge Needs'
    },
    description: 'In Green and Gold We have been in the market for 10 years and we specialize in the management of properties of customers who wish to enjoy their home without any additional worries. We have experience in the administrative field and we have learned the best way to integrate a series of services that allow us to provide you with greater comfort. Green and Gold has the most professional and experienced property management team in the Península de Papagayo area. Each team member has been trained in home maintenance needs and complex management systems. We personally take care of our customer`s properties by helping those who do not have time to take care of the property maintenance, follow up on the payment of services, taxes, the processing of different documents, or performing cleaning, cooking and gardening services, among others. In this way, our customers can stop worrying about all the tedious home maintenance tasks and enjoy all the benefits offered by this beautiful area of Guanacaste.',
    metadataBase: new URL('https://www.gngcr.com'),
    alternates: {
      canonical: '/',
      languages: {
        'en-US': '/',
      },
    },
    openGraph: {
      title: 'Property Management: Comprehensive Services for Your Home, Rental, and Concierge Needs',
      description: 'In Green and Gold We have been in the market for 10 years and we specialize in the management of properties of customers who wish to enjoy their home without any additional worries. We have experience in the administrative field and we have learned the best way to integrate a series of services that allow us to provide you with greater comfort. Green and Gold has the most professional and experienced property management team in the Península de Papagayo area. Each team member has been trained in home maintenance needs and complex management systems. We personally take care of our customer`s properties by helping those who do not have time to take care of the property maintenance, follow up on the payment of services, taxes, the processing of different documents, or performing cleaning, cooking and gardening services, among others. In this way, our customers can stop worrying about all the tedious home maintenance tasks and enjoy all the benefits offered by this beautiful area of Guanacaste.',
      url: 'https://www.gngcr.com',
      siteName: 'Green and Gold',
      locale: 'en_US',
      type: 'website',
      images: [
        {
            url: 'https://green-and-gold-frontend.vercel.app/favicon.ico',
            width: 250,
            height: 250
        }
     ]
    },
    generator: 'Green and Gold',
    applicationName: 'Green and Gold',
    referrer: 'origin-when-cross-origin',
    keywords: ['House rentals', 'Houses for rent in Costa Rica', 'Properties for rent in Guanacaste', 'Apartment rentals', 'Vacation rentals', 'Luxury home rentals', 'Affordable home rentals'],
    category: 'House rentals'
  };


async function ContentData(){
    const items : ContentType = await fethItem(`service`);
    return items;
}

async function Services(){

    const content = await ContentData();


    const jsonLd = {
        '@context': 'https://schema.org',
        '@type': 'WebSite',
        url: 'https://www.gngcr.com',
        name: 'Property Management: Comprehensive Services for Your Home, Rental, and Concierge Needs',
        image: '/favicon.ico',
        description: 'In Green and Gold We have been in the market for 10 years and we specialize in the management of properties of customers who wish to enjoy their home without any additional worries. We have experience in the administrative field and we have learned the best way to integrate a series of services that allow us to provide you with greater comfort. Green and Gold has the most professional and experienced property management team in the Península de Papagayo area. Each team member has been trained in home maintenance needs and complex management systems. We personally take care of our customer`s properties by helping those who do not have time to take care of the property maintenance, follow up on the payment of services, taxes, the processing of different documents, or performing cleaning, cooking and gardening services, among others. In this way, our customers can stop worrying about all the tedious home maintenance tasks and enjoy all the benefits offered by this beautiful area of Guanacaste.',
    }


    return (
        <>
            <script
                type="application/ld+json" 
                dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
            />

            <PropertyComponent  content={content}/>
        </>
    )   

}

export default Services;