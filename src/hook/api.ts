const api : string = 'https://green-and-gold-api.alonsocr.com/api/';
const img : string = 'https://green-and-gold-api.alonsocr.com/';

const fethItem : Function = async (item: string) => {

    try{
        const response = await fetch(`${api}${item}?populate=*`);
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