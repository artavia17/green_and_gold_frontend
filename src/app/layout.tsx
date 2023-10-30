import "../scss/global.scss";
import type { Metadata } from "next";
import { Inter } from "next/font/google";

// Importamos el header y el footer
import Header from "@/components/static/header";
import Footer from "@/components/static/footer";

const inter = Inter({ subsets: ["latin"] });

export const metadata: Metadata = {
  title: "Green and Gold",
  description: "Green and gold description",
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en">
      <body className={inter.className}>
        <Header />
        <main>{children}</main>
        <Footer />
      </body>
    </html>
  );
}
