import express from "express"
import cors from "cors"
import session from "express-session"
import bcrypt from "bcryptjs"
import path from "path"
import { fileURLToPath } from "url"
import multer from "multer"
import db from "./createtable.js"

const __filename = fileURLToPath(import.meta.url)
const __dirname = path.dirname(__filename);

const app = express()

// ✅ Middlewares
app.use(cors({
  origin: "http://localhost:3000",  
  credentials: true
}))
app.use(express.json())

app.use(session({
  secret: "humsafar-secret",
  resave: false,
  saveUninitialized: false,
  cookie: { secure: false } 
}))

// ✅ Static serve
app.use("/images", express.static(path.join(__dirname, "images")))
app.use("/uploads", express.static(path.join(__dirname, "uploads")))

// ✅ Multer setup
const storage = multer.diskStorage({
  destination: (req, file, cb) => cb(null, "uploads/"),
  filename: (req, file, cb) => cb(null, Date.now() + "-" + file.originalname)
})
const upload = multer({ storage })

// ✅ Default route
app.get("/", (req, res) => {
  res.send("🚗 Car API + Auth + Rentals running ✅")
})


/* ----------------- AUTH ROUTES ------------------ */

// Signup
app.post("/signup", (req, res) => {
  const { name, email, password } = req.body
  const hashedPassword = bcrypt.hashSync(password, 10)

  const query = `INSERT INTO users (name, email, password) VALUES (?, ?, ?)`
  db.run(query, [name, email, hashedPassword], function (err) {
    if (err) {
      return res.status(400).json({ message: "User already exists or DB error" })
    }

    req.session.user = { id: this.lastID, name, email }
    res.json({ message: "Signup successful", user: req.session.user })
  })
})

// Login
app.post("/login", (req, res) => {
  const { email, password } = req.body

  const query = `SELECT * FROM users WHERE email = ?`
  db.get(query, [email], (err, user) => {
    if (err || !user) {
      return res.status(400).json({ message: "Invalid email or password" })
    }

    const isPasswordValid = bcrypt.compareSync(password, user.password)
    if (!isPasswordValid) {
      return res.status(400).json({ message: "Invalid email or password" })
    }

    req.session.user = { id: user.id, name: user.name, email: user.email }
    res.json({ message: "Login successful", user: req.session.user })
  })
})

// Logout
app.post("/logout", (req, res) => {
  req.session.destroy(() => {
    res.json({ message: "Logged out successfully" })
  })
})


/* ----------------- CAR ROUTES ------------------ */

// Get all cars
app.get("/cars", (req, res) => {
  db.all("SELECT * FROM cars", [], (err, rows) => {
    if (err) return res.status(500).json({ error: err.message })
    res.json(rows)
  })
})

// Get single car
app.get("/cars/:id", (req, res) => {
  db.get("SELECT * FROM cars WHERE id = ?", [req.params.id], (err, row) => {
    if (err) return res.status(500).json({ error: err.message })
    res.json(row)
  })
})


/* ----------------- RENTALS ROUTES ------------------ */

// Add new rental
app.post(
  "/rent",
  upload.fields([{ name: "idProof" }, { name: "licenseProof" }]),
  (req, res) => {
    const { name, phone, dateFrom, dateTo, pickupTime, vehicleOption, address } = req.body

    const idProof = req.files["idProof"] ? req.files["idProof"][0].filename : null
    const licenseProof = req.files["licenseProof"] ? req.files["licenseProof"][0].filename : null

    const extraCharge = vehicleOption === "delivery" ? 300 : 0

    const query = `
      INSERT INTO rentals (name, phone, dateFrom, dateTo, pickupTime, vehicleOption, address, extraCharge, idProof, licenseProof)
      VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?, ?)
    `

    db.run(
      query,
      [name, phone, dateFrom, dateTo, pickupTime || null, vehicleOption, address || null, extraCharge, idProof, licenseProof],
      function (err) {
        if (err) {
          console.error("DB ERROR:", err)
          return res.status(500).json({ error: "DB error", details: err })
        }
        res.json({ message: "Booking successful!", id: this.lastID })
      }
    )
  }
)


/* ----------------- REVIEWS ROUTES ------------------ */

// Get all reviews
app.get("/reviews", (req, res) => {
  db.all("SELECT * FROM reviews ORDER BY created_at DESC", [], (err, rows) => {
    if (err) return res.status(500).json({ error: err.message })
    res.json(rows)
  })
})

// Post a new review
app.post("/reviews", (req, res) => {
  const { name, rating, comment } = req.body;
  if (!name || !rating || !comment) {
    return res.status(400).json({ error: "All fields are required." })
  }

  const sql = "INSERT INTO reviews (name, rating, comment) VALUES (?, ?, ?)"
  db.run(sql, [name, rating, comment], function(err) {
    if (err) return res.status(500).json({ error: err.message })
    
    db.get("SELECT * FROM reviews WHERE id = ?", [this.lastID], (err, row) => {
      if (err) return res.status(500).json({ error: err.message });
      res.json(row)
    })
  })
})


/* ----------------- CONTACT US ------------------ */
app.post("/contact", (req, res) => {
  const { name, email, message } = req.body;

  if (!name || !email || !message) {
    return res.status(400).json({ error: "All fields are required." })
  }

  const sql = "INSERT INTO contacts (name, email, message) VALUES (?, ?, ?)"
  db.run(sql, [name, email, message], function(err) {
    if (err) return res.status(500).json({ error: err.message })

    db.get("SELECT * FROM contacts WHERE id = ?", [this.lastID], (err, row) => {
      if (err) return res.status(500).json({ error: err.message })
      res.json({ message: "Contact submitted successfully!", data: row })
    })
  })
})


/* ----------------- SERVER ------------------ */
const PORT = 5000
app.listen(PORT, () => console.log(`✅ Server running at http://localhost:${PORT}`))
