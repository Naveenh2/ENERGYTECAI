const express = require("express")
const cors = require("cors")
const db = require("./db")

const app = express()
app.use(cors({
  origin: "*",
  methods: ["GET", "POST", "PUT", "DELETE"],
  credentials: true
}));
app.use(express.json())

// Signup
app.post("/signup", (req, res) => {
  const { name, email, password } = req.body
  db.run(
    "INSERT INTO users (name, email, password) VALUES (?, ?, ?)",
    [name, email, password],
    function (err) {
      if (err) return res.status(400).json({ error: "User exists" })
      res.json({ message: "User registered" })
    }
  )
})

// Login
app.post("/login", (req, res) => {
  const { email, password } = req.body
  db.get(
    "SELECT * FROM users WHERE email=? AND password=?",
    [email, password],
    (err, user) => {
      if (!user) return res.status(401).json({ error: "Invalid credentials" })
      res.json({ message: "Login success", user })
    }
  )
})

// Create Invoice
app.post("/invoices", (req, res) => {
  const { invoiceNumber, clientName, date, amount, status } = req.body
  db.run(
    `INSERT INTO invoices (invoiceNumber, clientName, date, amount, status)
     VALUES (?, ?, ?, ?, ?)`,
    [invoiceNumber, clientName, date, amount, status],
    function () {
      res.json({ id: this.lastID })
    }
  )
})

// Get Invoices
app.get("/invoices", (req, res) => {
  db.all("SELECT * FROM invoices", (err, rows) => {
    res.json(rows)
  })
})

// Update Invoice
app.put("/invoices/:id", (req, res) => {
  const { invoiceNumber, clientName, date, amount, status } = req.body
  db.run(
    `UPDATE invoices SET invoiceNumber=?, clientName=?, date=?, amount=?, status=?
     WHERE id=?`,
    [invoiceNumber, clientName, date, amount, status, req.params.id],
    () => res.json({ message: "Updated" })
  )
})

// Delete Invoice
app.delete("/invoices/:id", (req, res) => {
  db.run("DELETE FROM invoices WHERE id=?", req.params.id, () =>
    res.json({ message: "Deleted" })
  )
})

app.listen(5000, () => console.log("Backend running on port 5000"))
