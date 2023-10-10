import Link from 'next/link';
import Logo from '@/assets/img/Green-and-gold.png';
import Image from 'next/image';

function Header(){

    return (
        <>
            <header>
                <Link href="/" title="Volver a inicio">
                    <Image
                        src={Logo}
                        alt='Logo de Green and Gold'
                    />
                </Link>
                <ul>
                    <li>
                        <Link href="/about-us">About Us</Link>
                    </li>
                    <li>
                        <Link href="/services">Services</Link>
                    </li>
                </ul>
            </header>
        </>
    )

}

export default Header;