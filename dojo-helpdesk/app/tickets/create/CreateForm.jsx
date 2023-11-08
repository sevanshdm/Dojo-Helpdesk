"use client"
// This is a client component, because it is interactive and needs to be hydrated in the browser.

import { useRouter } from "next/navigation" // after submitting the form. This hook will be used to redirect user to tickets page.
import { useState } from "react"

export default function CreateForm() {
    const router = useRouter()

    const [title, setTitle] = useState('')
    const [body, setBody] = useState('')
    const [priority, setPriority] = useState('low')
    const [isLoading, setIsLoading] = useState(false)

    const handleSubmit = async (e) => {
        e.preventDefault()
        setIsLoading(true)

        const ticket = {
            title,
            body,
            priority,
            user_email: 'shrek@netninja.net'
        }

        const res = await fetch('http://localhost:4000/tickets', {
            method: "POST",
            headers: {"Content-Type": "application/json"},
            body: JSON.stringify(ticket)
        })

        if (res.status === 201) {
            router.refresh() //This tells the React router to request the route in the background and refetch any data you need.
            router.push('/tickets')
        }
    }

  return (
    <form onSubmit={handleSubmit} className="w-1/2">
        <label>
            <span>Title:</span>
            <input
                required 
                type="text"
                onChange={(e) => setTitle(e.target.value)}
                value={title}
            />
        </label>
        <label>
            <span>Body:</span>
            <textarea
                required
                onChange={(e) => setBody(e.target.value)}
                value={body}
            />
        </label>
        <label>
            <span>Priority:</span>
            <select 
                onChange={(e) => setPriority(e.target.value)}
                value={priority}
            >
                <option value="low">Low Priority</option>
                <option value="medium">Medium Priority</option>
                <option value="high">High Priority</option>
            </select>
        </label>
        <button 
            className="btn-primary" 
            disabled={isLoading}
        >
            {isLoading && <span>Adding...</span>}
            {!isLoading && <span>Add Ticket</span>}
        </button>
    </form>
  )
}
