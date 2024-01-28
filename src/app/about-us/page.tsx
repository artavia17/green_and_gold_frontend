// Metas
import type { Metadata } from "next";

import HistoryComponent from "@/components/about/history"
import ValoresComponent from "@/components/about/valores"
import WhoComponent from "@/components/about/who"
import { fethItem } from "@/hook/api";


export const metadata: Metadata = {
    title: {
      template: 'Green and Gold: Experienced Property Management with a Commitment to Sustainability',
      default: 'Green and Gold: Experienced Property Management with a Commitment to Sustainability',
      absolute: 'Green and Gold: Experienced Property Management with a Commitment to Sustainability'
    },
    description: 'Discover worry-free living with Green and Gold Property Management in Papagayo, Costa Rica. Our experienced team is dedicated to providing comprehensive and sustainable property management services, handling everything from payments to housekeeping. Immerse yourself in the beauty of Guanacaste while we take care of the details. Committed to environmental respect, we minimize our impact, champion sustainable growth, and ensure your home coexists harmoniously with the rich ecosystems of the Península de Papagayo.',
    metadataBase: new URL('https://green-and-gold-frontend.vercel.app'),
    alternates: {
      canonical: '/',
      languages: {
        'en-US': '/',
      },
    },
    openGraph: {
      title: 'Green and Gold: Experienced Property Management with a Commitment to Sustainability',
      description: 'Discover worry-free living with Green and Gold Property Management in Papagayo, Costa Rica. Our experienced team is dedicated to providing comprehensive and sustainable property management services, handling everything from payments to housekeeping. Immerse yourself in the beauty of Guanacaste while we take care of the details. Committed to environmental respect, we minimize our impact, champion sustainable growth, and ensure your home coexists harmoniously with the rich ecosystems of the Península de Papagayo.',
      url: 'https://green-and-gold-frontend.vercel.app',
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
    keywords: ['House rentals', 'About' ,'Houses for rent in Costa Rica', 'Properties for rent in Guanacaste', 'Apartment rentals', 'Vacation rentals', 'Luxury home rentals', 'Affordable home rentals'],
    category: 'House rentals'
};

  
type IconsType = {

    icon: {
        name: string
        filename: string,
        url: string,
    },
    title: string,
}

type ContentType = {
    url: string,
    items: {
        first_section: {
            title: string,
            content: string,
            background: string
        },
        second_section: {
            title: string,
            content: string
        },
        third_section: {
            first_title: string,
            first_content: string,
            second_title: string,
            second_content: string,
        },
        fourth: {
            title: string,
            content: string,
            icons: IconsType[]
        }
    };
};


async function ContentData(){
    const items : ContentType = await fethItem(`about`);
    return items;
}
  

export default  async function About(){

    const jsonLd = {
        '@context': 'https://schema.org',
        '@type': 'WebSite',
        url: 'https://green-and-gold-frontend.vercel.app',
        name: 'Green and Gold: Experienced Property Management with a Commitment to Sustainability',
        image: '/favicon.ico',
        description: 'Discover worry-free living with Green and Gold Property Management in Papagayo, Costa Rica. Our experienced team is dedicated to providing comprehensive and sustainable property management services, handling everything from payments to housekeeping. Immerse yourself in the beauty of Guanacaste while we take care of the details. Committed to environmental respect, we minimize our impact, champion sustainable growth, and ensure your home coexists harmoniously with the rich ecosystems of the Península de Papagayo.',
    }

    const content = await ContentData();

    return (
        <>
            <section className="about-us">

                <script
                    type="application/ld+json" 
                    dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
                />

                <WhoComponent content={content} />
                <HistoryComponent content={content} />
                <ValoresComponent content={content} />
            </section>  
        </>
    )

}