// This component will fetch the ticket data and output it inside the template

import Link from "next/link"

// fetch logic 
async function getTickets() { //got this data by npm installing json-server
    const res = await fetch('http://localhost:4000/tickets', {
        next: {// this is set to the amount of time that NextJS should wait since last page visit before revalidating the cached data again.
            revalidate: 0 // use 0 to opt out of using cache
        }
    }) 

    return res.json() // this is returned promise
}

export default async function TicketList() {
    const tickets = await getTickets()

    return (
       <>
            {tickets.map((ticket) => (
                <div key={ticket.id} className="card my-5">
                    <Link href={`/tickets/${ticket.id}`}> {/*Whatever is inputed in [id]*/}
                        <h3>{ticket.title}</h3>
                        <p>{ticket.body.slice(0, 200)}...</p>
                        <div className={`pill ${ticket.priority}`}>
                            {ticket.priority} priority
                        </div>
                    </Link>
                </div>
            ))}
            {tickets.length === 0 && (
                <p className="text-center">There are no open tickets, yay!</p>
            )}
       </>
    )
}
