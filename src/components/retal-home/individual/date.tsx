'use client';

import { useState, useEffect, useCallback, useMemo } from "react";
import Image from "next/image";
import ImageLocation from '@/assets/img/icons/mappin.svg';
import ImageCalendar from '@/assets/img/icons/calendar.svg';
import DatePicker from 'react-datepicker';
import 'react-datepicker/dist/react-datepicker.css';
import GoogleEvent from "@/hook/date";


type Unabailable = {
    date: string,
}

type CalendarItems = {
    items: {
        url: string;
        items: {
            titulo: string,
            update: string,
            unabailable: Unabailable[] | null
        };
    }   
};

type DateDisponibleProps = {
    date: string,
    availability: boolean
}

function DateComponent({ items } : CalendarItems){


    const date = new Date();
    const newDate = date.setDate(date.getDate() + 1);
    const [startDate, setStartDate] = useState(new Date(newDate));
    const [endDate, setEndDate] = useState(new Date(newDate));
    const [startDateString, setStartDateString] = useState('');
    const [endDateString, setEndDateString] = useState('');
    const [dateUnavailable, setDateUnavailable] = useState<Date[]>([new Date()])
    const [viewMessage, setViewMessage] = useState<boolean>(false);
    const [viewMessageItem, setViewMessageItem] = useState<boolean>(false);
    const [removeMessage, setRemoveMessage] = useState<boolean>(false);
    const [removeMessageItem, setRemoveMessageItem] = useState<boolean>(false);
    const [alertCalendar, setAlertCalendar] = useState<boolean>(false);
    const [validarDisponibilidad, setValidarDisponibilidad] = useState<boolean>(false);
    const [consultText, setConsultText] = useState<string>('Send message')
    const [consultTextView, setConsultTextView] = useState<string>('Send message')
    const [lastUpdate, setLastUpdate] = useState<string>('')
    const [diasNoDisponibles, setDiasNoDisponibles] = useState<DateDisponibleProps[]>([])
    const day = useMemo(() => ['Sunday', 'Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday', 'Saturday'], []);


    const onChange = (dates : any) => {

        const [start, end] = dates;
        setStartDate(start);
        setEndDate(end);

        if(end){

            const arrayDate : DateDisponibleProps[] = [];
            const validateEndDate = new Date(end);
            const currentDate = new Date(start);

            while(currentDate <= validateEndDate){

                const currentDateString = `${currentDate.getDate()}/${currentDate.getMonth() + 1}/${currentDate.getFullYear()}`;
                let disponibilidadDate = true;

                items.items.unabailable?.forEach(e => {
                    const date = new Date(e.date);
                    date.setDate(date.getDate() + 1);
                    const dateString = `${date.getDate()}/${date.getMonth() + 1}/${date.getFullYear()}`
                
                    if (dateString === currentDateString) {

                        disponibilidadDate = false;
                        return;
                    }

                });

                arrayDate.push({
                    date: currentDateString,
                    availability: disponibilidadDate
                });

                currentDate.setDate(currentDate.getDate() + 1);

            }

            setDiasNoDisponibles(arrayDate);
            setValidarDisponibilidad(true);

        }

    };



    const resentUpdate = useCallback((resentString : string, more? : boolean) => {

        const newDate : Date = new Date(resentString);
        const dayNumber : number = newDate.getDate();
        const dayString : string = day[newDate.getDay()];
        const monthNumber : Number = newDate.getMonth() + 1;
        const yearNumber : Number = newDate.getFullYear();
        const dayThreeLetters = dayString.substring(0, 3);
        return `${dayThreeLetters} ${ Number(dayNumber) <= 9 ? '0' + dayNumber : dayNumber }/${ Number(monthNumber) <= 9 ? '0' + monthNumber : monthNumber }/${yearNumber}`;

    }, [day]);

    const getDate = async () => {

        let dates : { status: number, update: any, msg: string, dates: Date [] } = {
            status: 400,
            update: null,
            msg: '',
            dates: []
        };

        if(items.items.titulo == 'Villa Magayón'){

            dates = await GoogleEvent('9ff4ac92d0bc7b0c9e26fcb0b4e71a5e89b9063471a27ecb040fc77e3afb02de@group.calendar.google.com');

        }else if(items.items.titulo == 'Villa Esperanza'){

            dates = await GoogleEvent('1155da5e7ec3b6aec7afa15d05ed7d4e0954f4c0dfe87f4a155147aaf6ad8187@group.calendar.google.com');

        }else if(items.items.titulo == 'Casa Tres Monos'){

            dates = await GoogleEvent('0d2597710c70ee22829d6b94560ab7abe917745b52bb3f108a21be14b04e7b21@group.calendar.google.com');

        }

        setLastUpdate(dates.update);

        return dates

    }

    useEffect(()=>{

        setStartDateString(resentUpdate(startDate.toString()));
        endDate ? setEndDateString(resentUpdate(endDate.toString())) : setEndDateString(resentUpdate(startDate.toString()));

        const dateUnabailable = async () => {

            const unabailableAll = await getDate();
            const unabailable = unabailableAll.dates;
            const arrayUnavailable = [];
            arrayUnavailable.push(new Date());

            if(unabailable.length){

                unabailable.forEach( (e) =>  {

                    const newDateUnavailable = new Date(e);
                    const setNewDate = newDateUnavailable.setDate(newDateUnavailable.getDate() + 1);
                    arrayUnavailable.push(setNewDate);
                    
                });

            }

            setDateUnavailable(arrayUnavailable);


        }

        // if(items.items.unabailable){

        //     items.items.unabailable.forEach( (e) =>  {

        //         const newDateUnavailable = new Date(e.date);
        //         const setNewDate = newDateUnavailable.setDate(newDateUnavailable.getDate() + 1);
        //         arrayUnavailable.push(setNewDate);
                
        //     });

        // }

        dateUnabailable().catch( err => {
            console.error(`Error: ${err}`);
        });


        // setDateUnavailable(arrayUnavailable);

    }, [startDate, endDate, items.items.unabailable, resentUpdate, items.items.titulo]);


    const open_modal = () => {

        exitConsult();

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

    const openMessages = () => {

        if(viewMessage){
            exitConsult();
        }else{

            setViewMessage(true);
            setConsultText('Close message');

            setTimeout(() => {
                const scrollItem = document.querySelector('.location_section .caledar_select_day');

                if(scrollItem){
                    scrollItem.scrollTo(0, scrollItem.scrollHeight);
                }  
            }, 100)
        }

    }

    const viewSendMessage = () => {

        if(viewMessageItem){
            exitConsultView();
        }else{
            setViewMessageItem(true);
            setConsultTextView('Close message')
        }

    }


    const exitConsult = () => {
        setRemoveMessage(true);
        setConsultText('Send message')

        setTimeout(() => {
            setRemoveMessage(false);
            setViewMessage(false);
        }, 200)
    }

    const exitConsultView = () => {
        setRemoveMessageItem(true);
        setConsultTextView('Send message')

        setTimeout(() => {
            setRemoveMessageItem(false);
            setViewMessageItem(false);
        }, 200)
    }

    const sendWhatsapp = () => {

        const phone : string = '+50683715061';
        const message : string = `Hello, what is the availability of the house "${items.items.titulo}" from "${startDateString}" to "${endDateString}"? Thank you. \n\n${window.location}`;
        let enlace : string = '';
        enlace = `https://wa.me/${phone}?text=${encodeURI(message)}`;

        window.open(enlace)

    }


    const sendEmail = () => {
        const email = "info@gngcr.com";
        const subject = `Check availability of the ${items.items.titulo} house`;
        const body = `Hello, \n\nWhat is the availability of the house "${items.items.titulo}" from "${startDateString}" to "${endDateString}"? \n\nThank you. \n\nHouse link: ${window.location} \n\n`;
                    
        window.location.href = `mailto:${encodeURIComponent(email)}?subject=${encodeURIComponent(subject)}&body=${encodeURI(body)}`;
    }

    const selectCalendar = () => {
        if(!alertCalendar){
            setAlertCalendar(true);

            setTimeout(() => {
                setAlertCalendar(false);
            }, 500);

        }
    }

    const regresar = () => {
        setValidarDisponibilidad(false);
        exitConsultView();
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
                                <h5>{items.items.titulo}</h5>
                            </div>
                        </section>
                        <section className="date item">
                            <span>Pick-up Date</span>
                            <div onClick={selectCalendar}>
                                <section className="icon">
                                    <Image src={ImageCalendar.src} alt="Icon of calendar" width={100} height={100}/>
                                </section>
                                <h5>{startDateString}</h5>
                            </div>
                        </section>
                        <section className="date item">
                            <span>Drop-off Date</span>
                            <div onClick={selectCalendar}>
                                <section className="icon">
                                    <Image src={ImageCalendar.src} alt="Icon of calendar" width={100} height={100}/>
                                </section>
                                <h5>{endDateString}</h5>
                            </div>
                        </section>
                    </section>
                    <section className="calendar">
                        <section className="content">
                            <p>Availability last updated on { lastUpdate.length && resentUpdate(lastUpdate, true)}. For the most recent updates, please send us a message.</p>
                            <section className="bottoms">
                                <button onClick={openMessages} title={consultText} >{consultText}</button>
                                <button className="close" onClick={open_modal} title="Close">Close</button>
                            </section>
                            {
                                viewMessage ? (
                                    <section className={`contact_message ${removeMessage ? 'remove' : ''}`}>
                                        <p>Consult by:</p> <button onClick={sendWhatsapp} title="Send message by whatsapp">Whatsapp</button> <button onClick={sendEmail} title="Send email">Email</button>
                                    </section>
                                ) : ''
                            }
                        </section>
                        <section className={`calendario ${alertCalendar ? 'active' : ''}`}>
                            <div className={`item_calendar ${validarDisponibilidad ? 'remove' : ''}`}>
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
                            </div>
                            <div className={`disponibilidad ${!validarDisponibilidad ? 'remove' : ''}`}>

                                {
                                    diasNoDisponibles.length ? (
                                        <section>
                                            <div className="title">
                                                <button onClick={regresar} title="close">
                                                    <svg xmlns="http://www.w3.org/2000/svg" width="25" height="25" fill="currentColor" className="bi bi-arrow-left-short" viewBox="0 0 16 16">
                                                        <path fillRule="evenodd" d="M12 8a.5.5 0 0 1-.5.5H5.707l2.147 2.146a.5.5 0 0 1-.708.708l-3-3a.5.5 0 0 1 0-.708l3-3a.5.5 0 1 1 .708.708L5.707 7.5H11.5a.5.5 0 0 1 .5.5z"/>
                                                    </svg>
                                                </button> 
                                                <h3> 
                                                    Available days
                                                </h3>
                                            </div>
                                            <p>Availability last updated on { lastUpdate.length && resentUpdate(lastUpdate, true)}. For the most recent updates, please send us a message or email</p>
                                            <div className="consultar">
                                                <button className="consult" onClick={viewSendMessage}>{consultTextView}</button>
                                                {
                                                    viewMessageItem ? (
                                                        <section className={`contact_message ${removeMessageItem ? 'remove' : ''}`}>
                                                            <p>Consult by:</p> <button onClick={sendWhatsapp} title="Send message by whatsapp">Whatsapp</button> <button onClick={sendEmail} title="Send email">Email</button>
                                                        </section>
                                                    ) : ''
                                                }
                                            </div>
                                            <table>
                                                <thead>
                                                    <tr>
                                                        <th>Day</th>
                                                        <th>Availability</th>
                                                    </tr>
                                                </thead>
                                                <tbody>
                                                    {
                                                        diasNoDisponibles.map( (e, key) => {
                                                            return (
                                                                <tr key={key} className={!e.availability ? 'unavailable' : ''}>
                                                                    <td>{e.date}</td>
                                                                    <td>{e.availability ? 'Available' : 'Unavailable'}</td>
                                                                </tr>
                                                            )
                                                        })
                                                    }
                                                </tbody>
                                            </table>
                                        </section>
                                    ) : (
                                        <h1>Every day available</h1>
                                    )
                                }
                            </div>
                        </section>
                    </section>
                </section>
            </section>
        </>
    )

}

export default DateComponent;