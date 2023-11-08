'use client';

import { useState, useEffect } from "react";
import Image from "next/image";
import ImageLocation from '@/assets/img/icons/mappin.svg';
import ImageCalendar from '@/assets/img/icons/calendar.svg';
import DatePicker from 'react-datepicker';
import 'react-datepicker/dist/react-datepicker.css';

type UnavailableProps = {
    Date: string
}

type CalendarItems = {
    items: {
        url: string;
        items: {
            data: {
                attributes: {
                    Title: string,
                    updatedAt: string,
                    Unavailable: UnavailableProps[]
                }
            };
        };
    }   
};

function DateComponent({ items } : CalendarItems){


    const date = new Date();
    const newDate = date.setDate(date.getDate() + 1);
    const [startDate, setStartDate] = useState(new Date(newDate));
    const [endDate, setEndDate] = useState(new Date(newDate));
    const [startDateString, setStartDateString] = useState('');
    const [endDateString, setEndDateString] = useState('');
    const [dateUnavailable, setDateUnavailable] = useState<Date[]>([new Date()])
    const day = ['Sunday', 'Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday', 'Saturday'];

    const onChange = (dates : any) => {
        const [start, end] = dates;
        setStartDate(start);
        setEndDate(end);
    };


    const resentUpdate = (resentString : string, more? : boolean) => {

        const newDate : Date = new Date(resentString);
        const dayNumber : number = more ? newDate.getDate() + 1 : newDate.getDate();
        const dayString : string = day[newDate.getDay()];
        const monthNumber : Number = newDate.getMonth() + 1;
        const yearNumber : Number = newDate.getFullYear();
        const dayThreeLetters = dayString.substring(0, 3);

        return `${dayThreeLetters} ${ Number(dayNumber) <= 9 ? '0' + dayNumber : dayNumber }/${ Number(monthNumber) <= 9 ? '0' + monthNumber : monthNumber }/${yearNumber}`;
    }



    useEffect(()=>{

        setStartDateString(resentUpdate(startDate.toString()));
        endDate ? setEndDateString(resentUpdate(endDate.toString())) : setEndDateString(resentUpdate(startDate.toString()));

        const arrayUnavailable = [];
        arrayUnavailable.push(new Date());

        items.items.data.attributes.Unavailable.forEach( (e) =>  {

            const newDateUnavailable = new Date(e.Date);
            const setNewDate = newDateUnavailable.setDate(newDateUnavailable.getDate() + 1);
            arrayUnavailable.push(setNewDate);
            
        })

        setDateUnavailable(arrayUnavailable);

    }, [startDate, endDate]);


    const open_modal = () => {

        const loadComponent : HTMLElement | null = document.querySelector('.location_section');
        
        if(loadComponent?.classList.contains('active')){

            loadComponent.classList.add('remove')

            setTimeout(() => {
                loadComponent.classList.remove('active')        
                loadComponent.classList.remove('remove')
                document.body.style.overflow = 'initial';
            }, 300);


        }else if(loadComponent){
            loadComponent.classList.add('active')
        }

    }


    return (
        <>
            <section className="caledar_select_day" onClick={open_modal}>
                <section className="content"  onClick={(e) => e.stopPropagation()}>
                    <section className="content_background">
                        <section className="location item">
                            <span>Location</span>
                            <div>
                                <section className="icon">
                                    <Image src={ImageLocation.src} alt="Icon of location" width={100} height={100}/>
                                </section>
                                <h5>{items.items.data.attributes.Title}</h5>
                            </div>
                        </section>
                        <section className="date item">
                            <span>Pick-up Date</span>
                            <div>
                                <section className="icon">
                                    <Image src={ImageCalendar.src} alt="Icon of calendar" width={100} height={100}/>
                                </section>
                                <h5>{startDateString}</h5>
                            </div>
                        </section>
                        <section className="date item">
                            <span>Drop-off Date</span>
                            <div>
                                <section className="icon">
                                    <Image src={ImageCalendar.src} alt="Icon of calendar" width={100} height={100}/>
                                </section>
                                <h5>{endDateString}</h5>
                            </div>
                        </section>
                    </section>
                    <section className="calendar">
                        <section className="content">
                            <p>Availability last updated on { resentUpdate(items.items.data.attributes.updatedAt, true) }. For the most recent updates, please send us a message.</p>
                            <section className="bottoms">
                                <button>Send message</button>
                                <button className="close" onClick={open_modal}>Close</button>
                            </section>
                        </section>
                        <section className="calendario">
                            <DatePicker
                                selected={startDate}
                                onChange={onChange}
                                startDate={startDate}
                                minDate={new Date()}
                                endDate={endDate}
                                excludeDates={dateUnavailable}
                                selectsRange
                                inline
                                monthsShown={2}
                                showDisabledMonthNavigation
                            />
                        </section>
                    </section>
                </section>
            </section>
        </>
    )

}

export default DateComponent;