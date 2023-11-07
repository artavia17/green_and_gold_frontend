'use client '

import { fethItem } from "@/hook/api";
import FotosComponent from "@/components/retal-home/individual/fotos";
import { notFound } from "next/navigation";

type PageProps = {
  params: {
    slug: string;
  };
};

type Images = {
  attributes: {
    name: string;
    alternativeText: string;
    url: string;
  };
};

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
      };
    },
    error: {
      status: string
    }
  };
};

async function data(slug: string) {
  const items: SlugItems = await fethItem(`rental-homes/${slug}`);
  return items;
}

async function SlugPage({ params: { slug } }: PageProps) {
  const items = data(slug);


  if((await items).items.error){
    return notFound();
  }else if((await items).items.data){
    return (
      <section className="rental_individual">
          <h1>{ (await items).items && (await items).items.data.attributes.Title}</h1>
          {
            (await items) && (await items).items ? <FotosComponent items={(await items)} params={slug} /> : ''
          }
        </section>
    )
  }

  return notFound();

  // return (
  //   <>

  //   {
  //     (await items) && (await items).items.error ? (
  //       <section className="rental_individual">
  //         <h1>Error</h1>
  //       </section>
  //     ) : (
  //       <section className="rental_individual">
  //         <h1>{ (await items).items && (await items).items.data.attributes.Title}</h1>
  //         {
  //           (await items) && (await items).items ? <FotosComponent items={(await items)} params={slug} /> : ''
  //         }
  //       </section>
  //     )
  //   }
  //   </>
  // );
}

export default SlugPage;
