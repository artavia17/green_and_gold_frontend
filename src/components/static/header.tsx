'use client';

import Link from 'next/link';
import Logo from '@/assets/img/Green-and-gold.png';
import Image from 'next/image';

import { useState } from 'react';

function Header(){

    const [activeMenu, setActiveMenu] = useState(false);
    const [activeView, setActiveView] = useState(false);
    const [activeRemove, setActiveRemove] = useState(false);

    const handleMenuClick = () => {

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

    return (
        <>
            <header>
                <Link href="/" title="Volver a inicio">
                    <Image
                        src={Logo}
                        alt='Logo de Green and Gold'
                    />
                </Link>
                <button className={`menu_item ${activeMenu ? 'active' : ''} ${activeRemove ? 'remove_menu_item' : ''}`} onClick={handleMenuClick}>
                    <hr />
                    <hr />
                    <hr />
                </button>
                <div className={`content_menu ${activeMenu ? 'active' : ''} ${activeView ? 'view' : ''} ${activeRemove ? 'remove' : ''}`}>
                    <div className="capa_close" onClick={handleMenuClick}></div>
                    <ul>
                        <li>
                            <Link onClick={handleMenuClick} href="/about-us">About Us</Link>
                        </li>
                        <li>
                            <Link onClick={handleMenuClick} href="/services">Services</Link>
                        </li>
                    </ul>
                </div>
            </header>
        </>
    )

}

export default Header;