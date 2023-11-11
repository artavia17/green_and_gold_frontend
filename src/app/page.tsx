// Metas
import type { Metadata } from "next";


// Componentes
import Cuidados from "@/components/home/cuaidados";
import SliderHome from "@/components/home/slider";
import ManagementComponent from "@/components/home/management";

// Fetch
import { fethItem } from '@/hook/api';


export const metadata: Metadata = {
  title: {
    template: 'Property management and luxury homes ,Península de Papagayo, Guanacaste. Green and Gold, Costa Rica.',
    default: 'Property management and luxury homes ,Península de Papagayo, Guanacaste. Green and Gold, Costa Rica.',
    absolute: 'Property management and luxury homes ,Península de Papagayo, Guanacaste. Green and Gold, Costa Rica.'
  },
  description: 'Green and Gold is a property management company in the Papagayo Peninsula, Guanacaste, Costa Rica. We offer a wide range of services, from home maintenance to bill payment and paperwork. Contact us today and enjoy your property worry-free!',
  metadataBase: new URL('https://www.gngcr.com'),
  alternates: {
    canonical: '/',
    languages: {
      'en-US': '/',
    },
  },
  openGraph: {
    title: 'Property management and luxury homes ,Península de Papagayo, Guanacaste. Green and Gold, Costa Rica.',
    description: 'Green and Gold is a property management company in the Papagayo Peninsula, Guanacaste, Costa Rica. We offer a wide range of services, from home maintenance to bill payment and paperwork. Contact us today and enjoy your property worry-free!',
    url: 'https://www.gngcr.com',
    siteName: 'Green and Gold',
    locale: 'en_US',
    type: 'website',
  },
  generator: 'Green and Gold',
  applicationName: 'Green and Gold',
  referrer: 'origin-when-cross-origin',
  keywords: ['House rentals', 'Houses for rent in Costa Rica', 'Properties for rent in Guanacaste', 'Apartment rentals', 'Vacation rentals', 'Luxury home rentals', 'Affordable home rentals'],
  category: 'House rentals'
};

// Type of slider

type ImageData = {
  attributes: {
      Title: string,
      Action: string,
      updatedAt: string,
      Button: string,
      Tab: boolean,
      Background: {
        data: {
          attributes: {
            name: string,
            alternativeText: string,
            url: string,
          }
        }
      }
  }
}


type SliderType = {
  url: string;
  items: {
    data: ImageData[];
  };
};

// Get slider

async function sliderData(){
  const items : SliderType = await fethItem(`home-sliders`);
  return items;
}



// Type Home

type HomeType = {
  url: string;
  items: {
    data: {
      attributes: {
        Caring_For_Your_Home_Title: string;
        Caring_For_Your_Home_Content: string;
        Caring_For_Your_Home_Slider: {
          data: any[];
        };
        Full_Management_Plus_Title: string;
        Full_Management_Plus_Content: string;
        Full_Management_Plus_Image: {
          data: {
            attributes: {
              name: string;
              alternativeText: string | null;
              url: string;
            };
          };
        };
        Full_Management_Plus_Button_Title: string;
        Full_Management_Plus_Button_Action: string;
      };
    };
  };
};

async function homeData(){
  const items : HomeType = await fethItem(`home`);
  return items;
}

async function Home() {

  const jsonLd = {
    '@context': 'https://schema.org',
    '@type': 'WebSite',
    url: 'https://www.gngcr.com',
    name: 'Property management and luxury homes ,Península de Papagayo, Guanacaste. Green and Gold, Costa Rica.',
    image: '/favicon.ico',
    description: 'Green and Gold is a property management company in the Papagayo Peninsula, Guanacaste, Costa Rica. We offer a wide range of services, from home maintenance to bill payment and paperwork. Contact us today and enjoy your property worry-free!',
  }

  return (
    <>
      <section className="app">
        <script
          type="application/ld+json" 
          dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
        />


        <SliderHome content={ await sliderData() }/>
        <Cuidados content={await homeData()}/>
        <ManagementComponent content={await homeData()}/>
      </section>
    </>
  )
}


export default  Home;