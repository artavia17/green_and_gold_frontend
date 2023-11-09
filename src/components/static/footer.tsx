"use client";

import { usePathname } from "next/navigation";
import Map from "@/assets/img/icons/map.svg";
import Phone from "@/assets/img/icons/phone.circle.svg";
import Email from "@/assets/img/icons/envelope.svg";
import LogoFooter from "@/assets/img/icons/logo_footer.png";
import Instagram from "@/assets/img/icons/instagram.svg";
import Image from "next/image";
import NavComponent from "./nav";
import { useState, useEffect } from "react";
import { fethItem } from "@/hook/api";

type FooterType = {
  items: {
    data: {
      attributes: {
        Email: string;
        Address: string;
        Phone: any[];
      };
    };
  };
};

function Footer() {
  const router: string = usePathname();
  let color: string = "#EBEBEB";
  let date = new Date();
  let year = date.getFullYear();
  const [footer, setFooter] = useState<FooterType>();

  if (router == "/about-us/" || router == "/services/") {
    color = "#212121";
  }

  const styleFooter = {
    background: color,
  };

  useEffect(() => {
    const footerFetch = async () => {
      setFooter(await fethItem("footer"));
    };

    footerFetch();
  }, []);


  return (
    <>
      <footer id="contacto" style={styleFooter}>
        <section className="content">
          <div className="first-column">
            <section className="map">
              <Image
                src={Instagram.src}
                alt="Logo del map"
                width={100}
                height={100}
                title="Address"
              />
              <a
                href="https://www.instagram.com/gngcostarica/"
                target="_black"
                className="address"
                title="gngcostarica"
              >
                gngcostarica
              </a>
            </section>
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
                title={footer?.items.data.attributes.Address}
              >
                {footer?.items.data.attributes.Address}
              </span>
            </section>
            <section className="contact">
              <Image
                src={Phone.src}
                alt="Logo del contacto"
                width={100}
                height={100}
              />
              <div>
                {
                    footer?.items.data.attributes.Phone.map( (item, key)  => {
                        return (
                            <a href={`tel:${(item.Country == 'CR' ? '+506' : '+191')}${item.Phone}`} title={`Phone ${item.Country}: ` + (item.Country == 'CR' ? '+506' : '+191') + " " + item.Phone} key={key}>
                                {item.Country}: {item.Country == 'CR' ? '+506' : '+191'} {item.Phone}
                            </a>
                        )
                    })
                }
              </div>
            </section>
            <section className="email">
              <Image
                src={Email.src}
                alt="Logo del email"
                width={100}
                height={100}
              />
              <a href={`mailto:${footer?.items.data.attributes.Email}`} title={footer?.items.data.attributes.Email}>
                {footer?.items.data.attributes.Email}
              </a>
            </section>
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

export default Footer;
