'use client';
import { motion } from "framer-motion";
import { useEffect, useState } from "react";
import { fethItem } from "@/hook/api";
import Content from "twilio/lib/rest/Content";

type itemsType = {
    url: string,
    items: {
        third_section: {
            first_title: string,
            first_content: string,
            second_title: string,
            second_content: string,
        }
    };
  };


  type itemsProps = {
    items: itemsType
  }


export default function VisionMisionComponent( { items } : itemsProps ){


    return (
        <>
            <div 
                className="visionMision"
                // initial={{
                //     y: 200,
                //     opacity: 0
                // }}
                // whileInView={{
                //     y: 0,
                //     opacity: 1,
                // }}
                // transition={{
                //     type: 'spring'
                // }}
            >
                <section className="item">
                    <h2 title={ items.items.third_section.first_title }>{ items.items.third_section.first_title }</h2>
                    <section dangerouslySetInnerHTML={{__html: items?.items.third_section.first_content}}></section>
                </section>
                <section className="item">
                    <h2 title={ items.items.third_section.second_title }>{ items.items.third_section.second_title }</h2>
                    <section dangerouslySetInnerHTML={{__html: items?.items.third_section.second_content}}></section>
                </section>
            </div>
        </>
    )

}