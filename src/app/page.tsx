'use client';


// Componentes
import Cuidados from "@/components/home/cuaidados";
import SliderHome from "@/components/home/slider";
import ManagementComponent from "@/components/home/management";

export default function Home() {


  return (
    <>
      <section className="app">
        <SliderHome/>
        <Cuidados/>
        <ManagementComponent/>
      </section>
    </>
  )
}
