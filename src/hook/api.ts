import { Console } from "console";

const api : string = 'https://green-and-gold-api.alonsocr.com/api/';
const img : string = 'https://green-and-gold-api.alonsocr.com/';

const fethItem : Function = async (item: string, filters?: string | null ) => {

    try{

        const apiURL = filters ? `${api}${item}?populate=deep${filters}` : `${api}${item}?populate=deep`

        const response = await fetch(apiURL);

        console.log()

        const data = await response.json();
        return {
            url: img,
            items: data
        };

    }catch(err){
        console.error('Error al mostrar slider', err)
        throw err;
    }

}

export {
    fethItem
}