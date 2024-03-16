import { update } from "lodash";

const key : string = 'AIzaSyBu82zH1sdTJs3nYI1Gre9OzqM3fNcDl90'

interface date {
    date: string
}

const GoogleEvent = async (home_id : string) => {

    const params = new URLSearchParams();
    params.append('key', key)

    try {

        const getData = await fetch(`https://www.googleapis.com/calendar/v3/calendars/${home_id}/events?key=${key}`, {
            method: 'GET'
        });

        const status : number = getData.status

        if(status != 200){

            return {
                status: status,
                update: null,
                msg: '',
                dates: [],
            };

        }

        const data = await getData.json().then((data) => { return data })
        const update = data.updated;
        const start_and_end_dates = data.items;
        const arrayDates : Date[] = [];

        start_and_end_dates.forEach((e: { start : date, end: date })=>{
            
            const items = (start : string, end : string) => {

                for(let d = new Date(start); d < new Date(end); d.setDate(d.getDate() + 1)){
                    arrayDates.push(new Date(d));
                }

            };

            items(e.start.date, e.end.date);

        });


        return {
            status: status,
            update: update,
            msg: '',
            dates: arrayDates,
        }
        

    }catch(err){

        return {
            status: 400,
            update: null,
            msg: 'Ocurrio un error',
            dates: [],
        };

    }

}


export default GoogleEvent;
