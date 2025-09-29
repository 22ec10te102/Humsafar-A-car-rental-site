import sqlite3 from "sqlite3"
import path from "path"
import { fileURLToPath } from "url"

const __filename = fileURLToPath(import.meta.url)
const __dirname = path.dirname(__filename)

// Database path
const dbPath = path.join(__dirname, "database.db")

// Database connect
const db = new sqlite3.Database(dbPath, (err) => {
  if (err) {
    console.error("❌ Database connection failed:", err)
  } else {
    console.log("✅ Connected to SQLite database.")
  }
})


db.serialize(() => {
  // Cars table
  db.run(`
    CREATE TABLE IF NOT EXISTS cars (
      id INTEGER PRIMARY KEY,
      name TEXT,
      company TEXT,
      price INTEGER,
      type TEXT,
      description TEXT,
      imageUrl TEXT
    )
  `, (err) => {
    if (err) console.error("❌ Error creating cars table:", err)
    else console.log("✅ Cars table ready")
  })

  // Users table
  db.run(`
    CREATE TABLE IF NOT EXISTS users (
      id INTEGER PRIMARY KEY AUTOINCREMENT,
      name TEXT NOT NULL,
      email TEXT UNIQUE NOT NULL,
      password TEXT NOT NULL
    )
  `, (err) => {
    if (err) console.error("❌ Error creating users table:", err)
    else console.log("✅ Users table ready")
  })

  // Reviews table
  db.run(`
    CREATE TABLE IF NOT EXISTS reviews (
      id INTEGER PRIMARY KEY AUTOINCREMENT,
      name TEXT NOT NULL,
      rating INTEGER NOT NULL,
      comment TEXT NOT NULL,
      created_at DATETIME DEFAULT CURRENT_TIMESTAMP
    )
  `, (err) => {
    if (err) console.error("❌ Error creating reviews table:", err)
    else console.log("✅ Reviews table ready")
  })


   // Rentals table
  //db.run(`DROP TABLE IF EXISTS rentals`, (err) => {
  //if (err) console.error("❌ Error dropping rentals table:", err);
  //else console.log("🗑️ Old rentals table dropped");

  db.run(`
    CREATE TABLE IF NOT EXISTS rentals (
      id INTEGER PRIMARY KEY AUTOINCREMENT,
      name TEXT,
      phone TEXT,
      dateFrom TEXT,
      dateTo TEXT,
      pickupTime TEXT,
      vehicleOption TEXT,  -- "pickup" or "delivery"
      address TEXT,        -- only for delivery
      extraCharge REAL,    -- 300 if delivery
      idProof TEXT,
      licenseProof TEXT,
      createdAt TIMESTAMP DEFAULT CURRENT_TIMESTAMP
    )
  `, (err) => {
    if (err) console.error("❌ Error creating rentals table:", err)
    else console.log("✅ Rentals table ready")
  })
})


  //Contact us message table
  db.run(`
    CREATE TABLE IF NOT EXISTS contacts (
      id INTEGER PRIMARY KEY AUTOINCREMENT,
      name TEXT NOT NULL,
      email TEXT NOT NULL,
      message TEXT NOT NULL,
      created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
  )
  `, (err) => {
     if (err) console.error("❌ Error creating contacts table:", err)
     else console.log("✅ Contacts table ready")
  })

export default db
