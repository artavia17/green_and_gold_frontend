import "../scss/global.scss";

// Importamos el header y el footer
import Header from "@/components/static/header";
import Footer from "@/components/static/footer";

// Loader
import NextTopLoader from 'nextjs-toploader';



export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en">
      <body>
        <NextTopLoader
          color="#37B34A"
          initialPosition={0.08}
          crawlSpeed={200}
          height={3}
          crawl={true}
          showSpinner={false}
          easing="ease"
          speed={200}
          shadow="0 0 10px #2299DD,0 0 5px #2299DD"
        />
        <Header />
        <main>{children}</main>
        <Footer />
      </body>
    </html>
  );
}
