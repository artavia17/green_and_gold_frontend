import Rental from "./Rental";

const TICKETS = [
  { id: 0, status: "open" },
  { id: 1, status: "open" },
  { id: 2, status: "resolved" },
  { id: 3, status: "canceled" },
  { id: 4, status: "resolved" }
]


// Dynamic routes; create a page for each ticket ID
export async function generateStaticParams() {
  return TICKETS.map((ticket) => ({
    id: `${ticket.id}`,
  }));
}

export default function Page({ params }) {
  return <Rental id={params.id}/>;
}