import { Suspense } from "react";
import TicketList from "./TicketList";
import Loading from "../loading";

export default function Tickets() {
  return (
    <main>
        <nav>
          <div>
            <h2>Tickets</h2>
            <p><small>Currently open tickets.</small></p>
          </div>
        </nav>

      {/*Ticket list is the only thing that may delay, so Suspense wraps it and will have a loading screen for any delays.*/}
        <Suspense fallback={<Loading/>}> {/*Loading comes from loading.jsx*/}
          <TicketList/>
        </Suspense>
    </main>
  )
}

// /news/latest