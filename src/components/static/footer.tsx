


import { fethItem } from "@/hook/api";
import FooterClient from "./footer/footer_client";

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


async function footerData(){
  const items : FooterType = await fethItem(`footer`);
  return items;
}

async function Footer() {


  return (
    <>
      <FooterClient footer={await footerData()}/>
    </>
  );
}

export default Footer;
