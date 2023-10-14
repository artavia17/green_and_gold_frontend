'use client';
import Link from 'next/link';
import { MouseEventHandler } from 'react';


type Props = {
    clickEvent? : MouseEventHandler
};
  

const NavComponent = ({ clickEvent } : Props ) => {

    return ( 
        <>
            <nav>
                <ul>
                    <li>
                        <Link onClick={clickEvent} href="/about-us">About Us</Link>
                    </li>
                    <li>
                        <Link onClick={clickEvent} href="/services">Services</Link>
                    </li>
                    <li>
                        <Link onClick={clickEvent} href="#contacto">Contacto</Link>
                    </li>
                </ul>
            </nav>
        </>
    )

}

export default NavComponent;