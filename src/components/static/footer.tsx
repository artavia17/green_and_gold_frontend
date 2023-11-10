


import { fethItem } from "@/hook/api";
import FooterClient from "./footer/footer_client";

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
