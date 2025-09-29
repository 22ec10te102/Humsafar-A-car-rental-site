
import sqlite3 from "sqlite3"
import path from "path"
import { fileURLToPath } from "url"
import { cars } from "./data.js"

const __filename = fileURLToPath(import.meta.url)
const __dirname = path.dirname(__filename)

const db = new sqlite3.Database(path.join(__dirname, "database.db"))

db.serialize(() => {
  db.run("DELETE FROM cars") 

  const stmt = db.prepare(`
    INSERT INTO cars (id, name, company, price, type, description, imageUrl)
    VALUES (?, ?, ?, ?, ?, ?, ?)
  `)

  cars.forEach(car => {
    stmt.run(car.id, car.name, car.company, car.price, car.type, car.description, car.imageUrl)
  })

  stmt.finalize()
  console.log("✅ Cars data inserted successfully")
})

db.close()
