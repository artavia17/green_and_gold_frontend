"use client ";

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
        Comments: CommentsData[] 
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

async function SlugPage({ params: { slug } }: PageProps) {

  const items = data(slug);

  if ((await items).items.error) {
    return notFound();
  } else if ((await items).items.data) {
    return (
      <section className="rental_individual">
        <h1>
          {(await items).items.data.attributes.Title}
        </h1>
        {(await items) && (await items).items ? (
          <FotosComponent items={await items} params={slug} />
        ) : (
          ""
        )}
        <section className="row descriptrion">
          <CaracteristicasComponent items={await items}/>
          <AvailabilityComponent/>
        </section>
        <section className="row content">
          <section className="house_description" dangerouslySetInnerHTML={{__html: (await items).items.data.attributes.Content}}></section>
          <section className="button">
            <AvailabilityComponent/>
          </section>
        </section>
        <section className="row comments">
            <CommentsComponent items={await items}/>
        </section>
      </section>
    );
  }

  return notFound();
}

export default SlugPage;
