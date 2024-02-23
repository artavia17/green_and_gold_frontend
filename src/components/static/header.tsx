'use client';
import Link from 'next/link';
import Logo from '@/assets/img/Green-and-gold.png';
import Image from 'next/image';
import NextTopLoader from 'nextjs-toploader';

import NavComponent from './nav';

import { useState } from 'react';

function Header(){

    const [activeMenu, setActiveMenu] = useState(false);
    const [activeView, setActiveView] = useState(false);
    const [activeRemove, setActiveRemove] = useState(false);

    const handleMenuClick = () => {
        if(window.innerWidth <= 900){
            let time = 0;

            if(!activeMenu){
                setActiveView(true);
                setTimeout(() => {
                    activeMenu ? setActiveMenu(false) : setActiveMenu(true);
                }, 10)
            }else{
                setActiveView(false);
                setActiveRemove(true);

                if(window.innerWidth <= 600){
                    time = 1000;
                }else{
                    time = 500;
                }
                

                setTimeout(() => {
                    activeMenu ? setActiveMenu(false) : setActiveMenu(true);
                    setActiveRemove(false);
                }, time)
            }
        }
    }

    return (
        <>

            <NextTopLoader
                color="#37B34A"
                initialPosition={0.08}
                crawlSpeed={200}
                height={3}
                crawl={true}
                showSpinner={false}
                easing="ease"
                speed={200}
                shadow="0 0 10px #2299DD,0 0 5px #2299DD"
            />

            <header>
                <Link href="/" title="Volver a inicio" className='logo'>
                    <Image
                        src={Logo}
                        alt='Logo de Green and Gold'
                        priority
                    />
                </Link>
                <button className={`menu_item ${activeMenu ? 'active' : ''} ${activeRemove ? 'remove_menu_item' : ''}`} onClick={handleMenuClick} aria-label='Open Menu' title='Open menu'>
                    <hr />
                    <hr />
                    <hr />
                </button>
                <div className={`content_menu ${activeMenu ? 'active' : ''} ${activeView ? 'view' : ''} ${activeRemove ? 'remove' : ''}`}>
                    <div className="capa_close" onClick={handleMenuClick}></div>
                    <NavComponent clickEvent={handleMenuClick} />
                </div>
            </header>
        </>
    )

}

export default Header;