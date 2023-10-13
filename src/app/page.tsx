'use client';



// Componentes
import Cuidados from "@/components/home/cuaidados";
import SliderHome from "@/components/home/slider";

export default function Home() {


  return (
    <>
      <section className="app">
        <SliderHome/>
        <Cuidados/>
        <Cuidados/>
      </section>
    </>
  )
}
