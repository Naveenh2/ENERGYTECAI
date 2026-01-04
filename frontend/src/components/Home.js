import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";

const API_URL = import.meta.env.VITE_API_URL || "http://localhost:5000";

export default function Home() {
  const [invoices, setInvoices] = useState([]);
  const [filter, setFilter] = useState("");
  const nav = useNavigate();
  
  useEffect(() => {
    if (!localStorage.getItem("isLoggedIn")) {
      nav("/login");
    }
  }, [nav]);

  useEffect(() => {
    fetch(`${API_URL}/invoices`)
      .then((res) => res.json())
      .then(setInvoices)
      .catch(() => alert("Failed to load invoices"));
  }, []);

  const deleteInvoice = async (id) => {
    await fetch(`${API_URL}/invoices/${id}`, { method: "DELETE" });
    setInvoices(invoices.filter((i) => i.id !== id));
  };

  const logout = () => {
    localStorage.removeItem("isLoggedIn");
    nav("/login");
  };

  const filtered = filter
    ? invoices.filter((i) => i.status === filter)
    : invoices;

  return (
    <div>
      <h2>Invoices</h2>

      <button onClick={logout}>Logout</button>

      <select onChange={(e) => setFilter(e.target.value)}>
        <option value="">All</option>
        <option>Paid</option>
        <option>Unpaid</option>
        <option>Pending</option>
      </select>

      <button onClick={() => nav("/invoice")}>Add Invoice</button>

      {filtered.map((i) => (
        <div key={i.id} className="card">
          <p>{i.invoiceNumber} - {i.clientName}</p>
          <p>{i.amount} | {i.status}</p>
          <button onClick={() => deleteInvoice(i.id)}>Delete</button>
        </div>
      ))}
    </div>
  );
}
