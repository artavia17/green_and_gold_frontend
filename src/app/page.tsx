'use client';
import { useEffect } from "react";



// Componentes
import Cuidados from "@/components/home/cuaidados";
import SliderHome from "@/components/home/slider";

export default function Home() {

  useEffect(() => {
    import("locomotive-scroll").then(locomotiveModule => {
      const container : HTMLElement | null = document.querySelector('[data-scroll-container]');
      if(container){
        new locomotiveModule.default({
          el: container,
          smooth: true,
          getSpeed: true,
        })
      }
    })
  }, [])

  return (
    <>
      <section className="app" data-scroll-container>
        <SliderHome/>
        <Cuidados/>
      </section>
    </>
  )
}
