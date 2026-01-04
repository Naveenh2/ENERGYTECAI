import { useState } from "react"
import { useNavigate } from "react-router-dom"

export default function Signup() {
  const [form, setForm] = useState({})
  const nav = useNavigate()

  const signup = async () => {
    await fetch("http://localhost:5000/signup", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(form),
    })
    nav("/")
  }

  return (
    <div className="card">
      <h2>Signup</h2>
      <input placeholder="Name" onChange={e => setForm({ ...form, name: e.target.value })} />
      <input placeholder="Email" onChange={e => setForm({ ...form, email: e.target.value })} />
      <input placeholder="Password" type="password"
        onChange={e => setForm({ ...form, password: e.target.value })} />
      <button onClick={signup}>Register</button>
    </div>
  )
}
