import "../scss/global.scss";

// Importamos el header y el footer
import Header from "@/components/static/header";
import Footer from "@/components/static/footer";


export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en">
      <body>
        <Header />
        <main>{children}</main>
        <Footer />
      </body>
    </html>
  );
}
