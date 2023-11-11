/**
 * 
 * En este archivo se inicia el rental home y contiene todos los items del mismo
 */

import RentalHomeComponent from "@/components/retal-home/page";
import { fethItem } from "@/hook/api";

// Metas
import type { Metadata } from "next";

export const metadata: Metadata = {
    title: {
      template: 'Rental Homes | Green and Gold, Guanacaste, Costa Rica',
      default: 'Rental Homes | Green and Gold, Guanacaste, Costa Rica',
      absolute: 'Rental Homes | Green and Gold, Guanacaste, Costa Rica'
    },
    description: 'Experience the beauty of Costa Rica from the comfort of your own rental home. Choose from a variety of options, from beach houses to city apartments.',
    metadataBase: new URL('https://www.gngcr.com'),
    alternates: {
      canonical: '/',
      languages: {
        'en-US': '/',
      },
    },
    openGraph: {
      title: 'Rental Homes | Green and Gold, Guanacaste, Costa Rica',
      description: 'Experience the beauty of Costa Rica from the comfort of your own rental home. Choose from a variety of options, from beach houses to city apartments.',
      url: 'https://www.gngcr.com',
      siteName: 'Green and Gold',
      locale: 'en_US',
      type: 'website',
      images: [
        {
            url: '/favicon.ico',
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


type HousesItems = {
    attributes: {
        Title: string;
        Baths: string;
        Beds: string;
        SQ_FT: string;
        Slug: string;
        Images: {
            data: any[];
        };
        Principal_Image: {
            data: {
            attributes: {
                alternativeText: string;
                name: string;
                url: string;
            };
            };
        };
        Bathrooms: string,
        Bedrooms: string,
        Price: string,
        Floors: string,
        Type_of_currency: string
    }
}

type ExperiencyItem = {
    Content: string;
    Icon: {
      data: {
        attributes: {
          alternativeText: string;
          name: string;
          url: string;
        };
      };
    };
  };
  
type ExperienceProps = {
    url: string;
    items: {
      data: {
        attributes: {
          Title: string;
          Experience: ExperiencyItem[];
        };
      };
    };
};

type HousesProbs = {
    url: string,
    items: {
        data: HousesItems[];
    }
}

async function HomeData(){
    const items : HousesProbs = await fethItem(`rental-homes`);
    return items;
}

async function ExperienceData(){
    const items : ExperienceProps = await fethItem(`rental-home-experience`);
    return items;
}

async function RetalHome(){

    const home = await HomeData();
    const experience = await ExperienceData();

    const jsonLd = {
      '@context': 'https://schema.org',
      '@type': 'WebSite',
      url: 'https://www.gngcr.com',
      name: 'Rental Homes | Green and Gold, Guanacaste, Costa Rica',
      image: '/favicon.ico',
      description: 'Experience the beauty of Costa Rica from the comfort of your own rental home. Choose from a variety of options, from beach houses to city apartments.',
    }

    return (
        <>
            <script
                type="application/ld+json" 
                dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
            />
            <RentalHomeComponent experiences={experience} content={home} />
        </>
    )

}

export default RetalHome;