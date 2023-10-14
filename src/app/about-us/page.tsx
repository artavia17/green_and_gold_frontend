import HistoryComponent from "@/components/about/history"
import ValoresComponent from "@/components/about/valores"
import WhoComponent from "@/components/about/who"


export default function About(){

    return (
        <>
            <section className="about-us">
                <WhoComponent/>
                <HistoryComponent/>
                <ValoresComponent/>
            </section>  
        </>
    )

}