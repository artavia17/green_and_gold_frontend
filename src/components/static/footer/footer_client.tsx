"use client";

import { usePathname } from "next/navigation";
import Map from "@/assets/img/icons/map.svg";
import Phone from "@/assets/img/icons/phone.circle.svg";
import Whatsapp from "@/assets/img/icons/whatsapp.svg";
import Email from "@/assets/img/icons/envelope.svg";
import LogoFooter from "@/assets/img/icons/logo_footer.png";
import Instagram from "@/assets/img/icons/instagram.svg";
import Image from "next/image";
import NavComponent from "../nav";

type Number = {
  code: string,
  country: string,
  number: string,
  whatsapp: boolean
}


type FooterType = {
  items: {
    instagram: {
      user: string,
      url: string
    },
    address: string,
    email: string,
    number: Number[]
  };
};


type FooterProps = {
    footer: FooterType
}

function FooterClient({ footer } : FooterProps) {

  const router: string = usePathname();
  let color: string = "#EBEBEB";
  let date = new Date();
  let year = date.getFullYear();

  if (router == "/about-us/" || router == "/services/") {
    color = "#212121";
  }

  const styleFooter = {
    background: color,
  };


  return (
    <>
      <footer id="contacto" style={styleFooter}>
        <section className="content">
          <div className="first-column">
              {
                footer.items.instagram ? (
                  <section className="map">
                    <Image
                      src={Instagram.src}
                      alt="Logo del map"
                      width={100}
                      height={100}
                      title="Address"
                    />
                    <a
                      href={footer.items.instagram.url}
                      target="_black"
                      className="address"
                      title={footer.items.instagram.user}
                    >
                      {footer.items.instagram.user}
                    </a>
                  </section>
                ) : ''
              }

              {
                footer.items.address ? (
                  <section className="map">
                    <Image
                      src={Map.src}
                      alt="Logo del map"
                      width={100}
                      height={100}
                      title="Address"
                    />
                    <span
                      className="address"
                      title={footer?.items.address}
                    >
                      {footer?.items.address}
                    </span>
                  </section>
                ) : ''
              }

              {
                footer.items.number.length ? (
                  <section className="contact">
                    <section>
                      <Image
                        src={Whatsapp.src}
                        alt="Logo del contacto"
                        width={100}
                        height={100}
                      />
                      <div>
                        {
                            footer?.items.number.map( (item, key)  => {

                                return  item.whatsapp ?  (
                                    <a 
                                      href={item.whatsapp ?  `https://api.whatsapp.com/send?phone=${item.code.replace('+', '')}${item.number}` : `tel:${item.code}${item.number}`}
                                      title={ item.whatsapp ? `Whatsapp ${item.country == 'CR' ? 'Costa Rica' : 'USA'}: ${item.code} ${item.number}` : `Phone ${item.country == 'CR' ? 'Costa Rica' : 'USA'}: ${item.code} ${item.number}`} key={key}
                                      target={item.whatsapp ? '_blank' : ''}
                                    >
                                        {item.country}: {item.code} {item.number}
                                    </a>
                                ) : ''
                            })
                        }
                      </div>
                    </section>
                    <section>
                      <Image
                        src={Phone.src}
                        alt="Logo del contacto"
                        width={100}
                        height={100}
                      />
                      <div>
                        {
                            footer?.items.number.map( (item, key)  => {

                                return  !item.whatsapp ?  (
                                    <a 
                                      href={item.whatsapp ?  `https://api.whatsapp.com/send?phone=${item.code.replace('+', '')}${item.number}` : `tel:${item.code}${item.number}`}
                                      title={ item.whatsapp ? `Whatsapp ${item.country == 'CR' ? 'Costa Rica' : 'USA'}: ${item.code} ${item.number}` : `Phone ${item.country == 'CR' ? 'Costa Rica' : 'USA'}: ${item.code} ${item.number}`} key={key}
                                      target={item.whatsapp ? '_blank' : ''}
                                    >
                                        {item.country}: {item.code} {item.number}
                                    </a>
                                ) : ''
                            })
                        }
                      </div>
                    </section>
                  </section>                  
                ) : ''
              }


              {
                footer.items.address ? (
                  <section className="email">
                    <Image
                      src={Email.src}
                      alt="Logo del email"
                      width={100}
                      height={100}
                    />
                    <a href={`mailto:${footer?.items.email}`} title={footer?.items.email}>
                      {footer?.items.email}
                    </a>
                  </section>
                ) : ''
              }
          </div>
          <div className="second_column">
            <NavComponent />
            <section className="items_logo">
              <Image
                src={LogoFooter.src}
                alt="Logo Green and Gold"
                width={100}
                height={100}
                title="Logo green and gold"
              />
              <p title={`${year} © Green and gold`}>{year} © Green and Gold</p>
            </section>
          </div>
        </section>
      </footer>
    </>
  );
}

export default FooterClient;
