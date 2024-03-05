// Meta Data
import { Metadata } from "next";

import { fethItem } from "@/hook/api";
import FotosComponent from "@/components/retal-home/individual/fotos";
import { notFound } from "next/navigation";
import CaracteristicasComponent from '@/components/retal-home/individual/caracteristicas';
import AvailabilityComponent from "@/components/retal-home/individual/availability";
import CommentsComponent from "@/components/retal-home/individual/comments";


type PageProps = {
  params: {
    slug: string;
  };
};

type CommentsData = {
  Name: string,
  Starts: string,
  Comment: string
}

type Images = {
  attributes: {
    name: string;
    alternativeText: string;
    url: string;
  };
};

type UnavailableProps = {
  Date: string
}

type ImageAll = {
  name: string,
  filename: string,
  url: string
}

type Comments = {

  comment_author: string,
  comment_content: string,

}

type Unabailable = {
  date: string,
}

type SlugItems = {
  url: string;
  items: {
    titulo: string,
    description: string,
    content: string,
    update: string,
    characteristics: {
      bathrooms: number,
      bedrooms: number,
      beds: number,
      baths: number,
      sq_ft: number
    },
    main_image: string,
    data: {
      status: number
    },
    allImages: ImageAll[],
    comments: Comments[],
    unabailable: Unabailable[] | null
  };
};

async function data(slug: string) {
  const items: SlugItems = await fethItem(`rental-home/${slug}`);
  return items;
}

// Esto se utilizar para exportar de forma dinamica el sitio web
export function generateStaticParams() {
  return [{ slug: 'villa-magayon' }, { slug: 'villa-esperanza' }, { slug: 'casa-tres-monos' }]
}

export async function generateMetadata({ params : {slug} } : PageProps ) {

  const items = await data(slug);

  return {
    title: {
      template:  !items.items.data ? `${items.items.titulo} | Green and Gold` : `Not Found | Green and Gold`,
      default: !items.items.data ? `${items.items.titulo} | Green and Gold` : `Not Found | Green and Gold`,
      absolute: !items.items.data ? `${items.items.titulo} | Green and Gold` : `Not Found | Green and Gold`,
    },
    description: !items.items.data ? items.items.description : '',
    metadataBase: new URL('https://green-and-gold-frontend.vercel.app'),
    alternates: {
      canonical: 'https://www.gngcr.com',
      languages: {
        'en-US': '/',
      },
    },
    openGraph: {
      title: !items.items.data ? `${items.items.titulo} | Green and Gold` : `Not Found | Green and Gold`,
      description: !items.items.data ? items.items.description : '',
      url: 'https://green-and-gold-frontend.vercel.app',
      siteName: 'Green and Gold',
      locale: 'en_US',
      type: 'website',
      images: [`${!items.items.data ? items.items.main_image : '/favicon.ico'}`, '/favicon.ico'],
    },
    generator: 'Green and Gold',
    applicationName: 'Green and Gold',
    referrer: 'origin-when-cross-origin',
    keywords: ['House rentals', 'About' ,'Houses for rent in Costa Rica', 'Properties for rent in Guanacaste', 'Apartment rentals', 'Vacation rentals', 'Luxury home rentals', 'Affordable home rentals'],
    category: 'Product'
  }
}


async function SlugPage({ params: { slug } }: PageProps) {

  const items = await data(slug);

  const jsonLd = {
    '@context': 'https://schema.org',
    '@type': 'WebSite',
    url: 'https://green-and-gold-frontend.vercel.app',
    name: !items.items.data ? `${items.items.titulo} | Green and Gold` : `Not Found | Green and Gold`,
    image: '/favicon.ico',
    description: !items.items.data ? items.items.description : '',
}

  if (items.items.data?.status) {
    return notFound();
  } else if (items.items.titulo) {
    return (
      <section className="rental_individual">
        <h1>
          {items.items.titulo}
        </h1>
        {items && items.items ? (
          <FotosComponent items={items} params={slug} />
        ) : (
          ""
        )}
        <section className="row descriptrion">
          <CaracteristicasComponent items={items}/>
          <AvailabilityComponent/>
        </section>
        <section className="row content">
          <section className="house_description" dangerouslySetInnerHTML={{__html: (items).items.content}}></section>
          <section className="button">
            <AvailabilityComponent/>
          </section>
        </section>      
        <CommentsComponent items={items}/>
      </section>
    );
  }

  return notFound();
}

export default SlugPage;
