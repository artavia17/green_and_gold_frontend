'use client';
import Link from 'next/link';
import { usePathname } from 'next/navigation';
import { MouseEventHandler } from 'react';


type Props = {
    clickEvent? : MouseEventHandler
};
  

const NavComponent = ({ clickEvent } : Props ) => {

    const path = usePathname();

    return ( 
        <>
            <nav>
                <ul>
                    <li>
                        <Link onClick={clickEvent} href="/" prefetch={true} className={ path == '/' ? 'active' : '' }>Home</Link>
                    </li>
                    <li>
                        <Link onClick={clickEvent} href="/about-us" prefetch={true} className={ path == '/about-us' ? 'active' : '' }>About Us</Link>
                    </li>
                    <li>
                        <Link onClick={clickEvent} href="/services" prefetch={true} className={ path == '/services' ? 'active' : '' }>Services</Link>
                    </li>
                    <li>
                        <Link onClick={clickEvent} href="/rental-home" prefetch={true} className={ path == '/rental-home' ? 'active' : '' }>Rental Homes</Link>
                    </li>
                    <li>
                        <Link onClick={clickEvent} href="#contacto">Contact Us</Link>
                    </li>
                </ul>
            </nav>
        </>
    )

}

export default NavComponent;