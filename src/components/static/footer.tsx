'use client';

import { usePathname } from 'next/navigation';
import Map from '@/assets/img/icons/map.svg';
import Phone from '@/assets/img/icons/phone.circle.svg';
import Email from '@/assets/img/icons/envelope.svg';
import LogoFooter from '@/assets/img/icons/logo_footer.png';
import Image from 'next/image';
import NavComponent from './nav';


function Footer(){

    const router : string = usePathname()
    let color : string = 'white';
    let date = new Date();
    let year = date.getFullYear();

    if(router == '/about-us' || router == '/services'){
        color = '#212121'
    }

    const styleFooter = {
        background: color
    }

    return (
        <>
            <footer id="contacto" style={styleFooter  }> 
                <section className='content'>
                    <div className='first-column'>
                        <section className='map'>
                            <Image src={Map.src} alt='Logo del map' width={100} height={100}/> 
                            <a href="" className='address' title='Golfo de Papagayo Península Provincia de Guanacaste, Costa Rica'>Golfo de Papagayo Península Provincia de Guanacaste, Costa Rica</a>
                        </section>
                        <section className='contact'>
                            <Image src={Phone.src} alt='Logo del contacto' width={100} height={100}/> 
                            <div>
                                <a href="" title='Phone CR: +506 60414848'>CR: +506 60414848</a>
                                <a href="" title='Phone CR: +506 83715061'>CR: +506 83715061</a>
                                <a href="" title='Phone US: +19195995281'>US: +19195995281</a>
                            </div>
                        </section>
                        <section className='email'>
                            <Image src={Email.src} alt="Logo del email" width={100} height={100} />
                            <a href="" title="info@gngcr.com">info@gngcr.com</a>
                        </section>
                    </div>
                    <div className='second_column'>
                        <NavComponent/>
                        <section className='items_logo'>
                            <Image src={LogoFooter.src} alt='Logo Green and Gold' width={100} height={100} title='Logo green and gold'/>
                            <p title={`${year} © Green and gold`}>{ year } © Green and Gold</p>
                        </section>
                    </div>
                </section>
            </footer>
        </>
    )

}

export default Footer;