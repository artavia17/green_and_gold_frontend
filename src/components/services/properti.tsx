import Image from "next/image";


type propsType = {

    reverse: boolean,
    content: {
        title: string,
        subContent: string,
        content: string,
        image: string
    }

}

export default function PropertyComponent( { reverse, content } : propsType ){


    return (
        <>
            <section className={`property ` +  (reverse ? 'reverse' : '')}>
                
                <section className="image">
                    <Image src={content.image} alt="Imagen principal" title="Imagen title" width={100} height={100}/>
                </section>
                <section className="second-item">
                    <h2>{content.title}</h2>
                    <div className="subcontent" dangerouslySetInnerHTML={{__html: content.subContent}}></div>
                    <div className="content" dangerouslySetInnerHTML={{__html: content.content}}></div>
                </section>

            </section>
        </>
    )

}