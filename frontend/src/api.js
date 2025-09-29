
const BASE_URL = "http://localhost:5000"

// Fetch all cars
export async function getCars() {
  try {
    const res = await fetch(`${BASE_URL}/cars`)
    if (!res.ok) throw new Error("Failed to fetch cars")
    return await res.json()
  } catch (error) {
    console.error("Error fetching cars:", error)
    throw error
  }
}

// Fetch single car by ID
export async function getCar(id) {
  try {
    const res = await fetch(`${BASE_URL}/cars/${id}`)
    if (!res.ok) throw new Error("Car not found")
    return await res.json()
  } catch (error) {
    console.error("Error fetching car:", error)
    throw error
  }
}

// Login function
export async function loginUser(creds) {
  try {
    const res = await fetch(`${BASE_URL}/login`, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(creds),
    });
    const data = await res.json();
    if (!res.ok) throw new Error(data.message || "Login failed")
    return data
  } catch (error) {
    console.error("Error logging in:", error)
    throw error
  }
}
