import { useEffect, useState } from "react"
import { useNavigate } from "react-router-dom"

export default function Home() {
  const [invoices, setInvoices] = useState([])
  const [filter, setFilter] = useState("")
  const nav = useNavigate()

  useEffect(() => {
    fetch("http://localhost:5000/invoices")
      .then(res => res.json())
      .then(setInvoices)
  }, [])

  const deleteInvoice = async id => {
    await fetch(`http://localhost:5000/invoices/${id}`, { method: "DELETE" })
    setInvoices(invoices.filter(i => i.id !== id))
  }

  const filtered = filter
    ? invoices.filter(i => i.status === filter)
    : invoices

  return (
    <div>
      <h2>Invoices</h2>
      <select onChange={e => setFilter(e.target.value)}>
        <option value="">All</option>
        <option>Paid</option>
        <option>Unpaid</option>
        <option>Pending</option>
      </select>

      <button onClick={() => nav("/invoice")}>Add Invoice</button>

      {filtered.map(i => (
        <div key={i.id} className="card">
          <p>{i.invoiceNumber} - {i.clientName}</p>
          <p>{i.amount} | {i.status}</p>
          <button onClick={() => deleteInvoice(i.id)}>Delete</button>
        </div>
      ))}
    </div>
  )
}
