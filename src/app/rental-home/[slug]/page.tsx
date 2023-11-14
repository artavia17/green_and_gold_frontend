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

type SlugItems = {
  url: string;
  items: {
    data: {
      attributes: {
        Title: string;
        Images: {
          data: Images[];
        };
        Principal_Image: {
          data: {
            attributes: {
              name: string;
              alternativeText: string;
              url: string;
            };
          };
        };
        Beds: string,
        Baths: string,
        SQ_FT: string,
        Content: string,
        Comments: CommentsData[],
        updatedAt: string,
        Unavailable: UnavailableProps[],
        Meta_description: string
      };
    };
    error: {
      status: string;
    };
  };
};

async function data(slug: string) {
  const items: SlugItems = await fethItem(`rental-homes/${slug}`);
  return items;
}

export async function generateMetadata({ params : {slug} } : PageProps ) {

  const items = await data(slug);
  `${items.items.data.attributes.Title} | Green and Gold`
  return {
    title: {
      template: `${items.items.data.attributes.Title} | Green and Gold`,
      default: `${items.items.data.attributes.Title} | Green and Gold`,
      absolute: `${items.items.data.attributes.Title} | Green and Gold`,
    },
    description: items.items.data.attributes.Meta_description,
    metadataBase: new URL('https://green-and-gold-frontend.vercel.app'),
    alternates: {
      canonical: '/',
      languages: {
        'en-US': '/',
      },
    },
    openGraph: {
      title: `${items.items.data.attributes.Title} | Green and Gold`,
      description: items.items.data.attributes.Meta_description,
      url: 'https://green-and-gold-frontend.vercel.app',
      siteName: 'Green and Gold',
      locale: 'en_US',
      type: 'website',
      images: [`${items.url}${items.items.data.attributes.Principal_Image.data.attributes.url}`, '/favicon.ico'],
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
    name: `${items.items.data.attributes.Title} | Green and Gold`,
    image: '/favicon.ico',
    description:  items.items.data.attributes.Meta_description,
}

  if (items.items.error) {
    return notFound();
  } else if (items.items.data) {
    return (
      <section className="rental_individual">
        <h1>
          {items.items.data.attributes.Title}
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
          <section className="house_description" dangerouslySetInnerHTML={{__html: (items).items.data.attributes.Content}}></section>
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
