const api : string = 'https://gngcr.com/api/wp-json/wp/v2/';
const img : string = 'https://gngcr.com/api/';

const fethItem : Function = async (item: string, filters?: string | null ) => {

    try{

        const apiURL = `${api}${item}`

        const response = await fetch(apiURL, { next: { revalidate: 3600 } });

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