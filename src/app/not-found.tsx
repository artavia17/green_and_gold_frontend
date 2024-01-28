// Metas
import type { Metadata } from "next";

export const metadata: Metadata = {
    title: {
      template: 'Not Found | Green and Gold',
      default: 'Not Found | Green and Gold',
      absolute: 'Not Found | Green and Gold'
    },
  };

function NotFound(){

    return (
        <>
            <section className="page_not_found">
                <h1>Page not found</h1>
                <span>Error 404</span>
            </section>
        </>
    )

}

export default NotFound;