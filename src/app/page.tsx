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
  metadataBase: new URL('https://green-and-gold-frontend.vercel.app'),
  alternates: {
    canonical: '/',
    languages: {
      'en-US': '/',
    },
  },
  openGraph: {
    title: 'Property management and luxury homes ,Península de Papagayo, Guanacaste. Green and Gold, Costa Rica.',
    description: 'Green and Gold is a property management company in the Papagayo Peninsula, Guanacaste, Costa Rica. We offer a wide range of services, from home maintenance to bill payment and paperwork. Contact us today and enjoy your property worry-free!',
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
  keywords: ['House rentals', 'Houses for rent in Costa Rica', 'Properties for rent in Guanacaste', 'Apartment rentals', 'Vacation rentals', 'Luxury home rentals', 'Affordable home rentals'],
  category: 'House rentals'
};

// Type of slider

type ImageData = {
  titulo: string,
  button: {
      external: boolean,
      link: string,
      title: string
  },
  background: string
}


type SliderType = {
  url: string;
  items: ImageData[];
};

// Get slider

async function sliderData(){
  const items : SliderType = await fethItem(`sliders`);
  return items;
}

// Type Home

type GaleryImage = {
  filename: string,
  url: string,
  name: string,
  sizes: {
    full: {
      url: string,
    },
    medium: {
      url: string,
    },
    thumbnail: {
      url: string
    }
  }
}

type HomeType = {
  url: string;
  items: {
    first_section: {
      title: string,
      content: string,
      galery: GaleryImage[]
    },
    second_section: {
      title: string,
      content: string,
      image: string,
      button: {
        external: boolean,
        link: string,
        title: string
      }
    }
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
    url: 'https://green-and-gold-frontend.vercel.app',
    name: 'Property management and luxury homes ,Península de Papagayo, Guanacaste. Green and Gold, Costa Rica.',
    image: '/favicon.ico',
    description: 'Green and Gold is a property management company in the Papagayo Peninsula, Guanacaste, Costa Rica. We offer a wide range of services, from home maintenance to bill payment and paperwork. Contact us today and enjoy your property worry-free!',
  }

  const sliderItem = await sliderData();
  const homeItems = await homeData();

  return (
    <>
      <section className="app">
        <script
          type="application/ld+json" 
          dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
        />


        <SliderHome content={ sliderItem }/>
        <Cuidados content={ homeItems }/>
        <ManagementComponent content={ homeItems }/>
      </section>
    </>
  )
}


export default  Home;