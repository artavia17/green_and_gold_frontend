'use client';
import Link from 'next/link';
import { usePathname } from 'next/navigation';
import { MouseEventHandler } from 'react';


type Props = {
    clickEvent? : MouseEventHandler
};
  

const NavComponent = ({ clickEvent } : Props ) => {

    const path = usePathname();

    console.log(path);

    return ( 
        <>
            <nav>
                <ul>
                    <li>
                        <Link onClick={clickEvent} href="/" className={ path == '/' ? 'active' : '' }>Home</Link>
                    </li>
                    <li>
                        <Link onClick={clickEvent} href="/about-us" className={ path == '/about-us' ? 'active' : '' }>About Us</Link>
                    </li>
                    <li>
                        <Link onClick={clickEvent} href="/services" className={ path == '/services' ? 'active' : '' }>Services</Link>
                    </li>
                    <li>
                        <Link onClick={clickEvent} href="#contacto">Contact</Link>
                    </li>
                </ul>
            </nav>
        </>
    )

}

export default NavComponent;