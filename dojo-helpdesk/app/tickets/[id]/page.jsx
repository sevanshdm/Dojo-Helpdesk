 // fetch logic 

import { notFound } from "next/navigation"


export const dynamicParams = true

 // the way to tell NextJS in advance that all the ids, so when the app is built it knows all the pages and routes it needs to make.
// and that way it can be statically rendered and served, as shown below.
// This function gets alist of all ids and tickets at build time, so that NextJS can make a page and corresponding route for each one of them.
export async function generateStaticParams() {
    const res = await fetch('http://localhost:4000/tickets')

    const tickets = await res.json()

    return tickets.map((ticket) => ({
        id: ticket.id
    }))
}

async function getTicket(id) { 
    // imitate delay
    await new Promise(resolve => setTimeout(resolve, 3000))

    const res = await fetch('http://localhost:4000/tickets/' + id, { //got this data by npm installing json-server 
        next: {// this is set to the amount of time that NextJS should wait since last page visit before revalidating the cached data again.
            revalidate: 60 // if you set this to 0, the page is dynamically rendered and the generateStaticParams() is useless
        }
    }) 

    if (!res.ok) {
        notFound() // sends a 404 status in React
    }

    return res.json() // this is returned promise
}

 // this property automatically gets the route segment name ([id]) and sets as this params object
export default async function TicketDetails({ params }) {
    const ticket = await getTicket(params.id)

  return (
    // template to output the ticket
    <main>
        <nav>
            <h2>Ticket Details</h2>
        </nav>
        <div className="card">
            <h3>{ticket.title}</h3>
            <small>Created by {ticket.user_email}</small>
            <p>{ticket.body}</p>
            <div className={`pill ${ticket.priority}`}>
                {ticket.priority} priority
            </div>
        </div>
    </main>
    )
}
