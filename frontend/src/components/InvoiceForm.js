import { useState } from "react"
import { useNavigate } from "react-router-dom"

export default function InvoiceForm() {
  const [invoice, setInvoice] = useState({})
  const nav = useNavigate()

  const save = async () => {
    await fetch("http://localhost:5000/invoices", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(invoice),
    })
    nav("/home")
  }

  return (
    <div className="card">
      <h2>Add Invoice</h2>
      <input placeholder="Invoice Number" onChange={e => setInvoice({...invoice, invoiceNumber:e.target.value})}/>
      <input placeholder="Client Name" onChange={e => setInvoice({...invoice, clientName:e.target.value})}/>
      <input type="date" onChange={e => setInvoice({...invoice, date:e.target.value})}/>
      <input placeholder="Amount" onChange={e => setInvoice({...invoice, amount:e.target.value})}/>
      <select onChange={e => setInvoice({...invoice, status:e.target.value})}>
        <option>Paid</option>
        <option>Unpaid</option>
        <option>Pending</option>
      </select>
      <button onClick={save}>Save</button>
    </div>
  )
}
