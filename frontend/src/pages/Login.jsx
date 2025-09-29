
import { useState, useContext } from "react"
import axios from "axios"
import { useNavigate } from "react-router-dom"
import { UserContext } from "../UserContext.jsx"

export default function Login() {
  const [form, setForm] = useState({ email: "", password: "" })
  const [error, setError] = useState("")

  const { user, setUser } = useContext(UserContext)

  const navigate = useNavigate()

  const handleChange = (e) =>
    setForm({ ...form, [e.target.name]: e.target.value })


  const handleSubmit = async (e) => {
    e.preventDefault()
    try {
      const response = await axios.post(
        "http://localhost:5000/login",
        form,
        { withCredentials: true }
      );
      setUser(response.data.user)
      navigate("/cars")
    } catch (err) {
      setError(err.response?.data?.message || "Login failed")
    }
  };

  const handleLogout = async () => {
    try {
      await axios.post(
        "http://localhost:5000/logout",
        {},
        { withCredentials: true }
      );
      setUser(null); 
      navigate("/login");
    } catch (err) {
      console.error("Logout failed:", err)
    }
  };


  if (user) {
    return (
      <div className="auth-container">
        <div className="auth-card">
          <h2>Hello, {user.name}!</h2>
          <p className="subtitle">You are already logged in. 🚗</p>
          <button className="logout-btn" onClick={handleLogout}>
            Logout
          </button>
        </div>
      </div>
    );
  }

  return (
    <div className="auth-container">
      <div className="auth-card">
        <h2>Welcome Back</h2>
        <p className="subtitle">Login to access your Humsafar🚗</p>

        {error && <p className="error-msg">{error}</p>}

        <form onSubmit={handleSubmit}>
          <label>Email</label>
          <input
            type="email"
            name="email"
            placeholder="Enter your email"
            value={form.email}
            onChange={handleChange}
            required
          />

          <label>Password</label>
          <input
            type="password"
            name="password"
            placeholder="Enter your password"
            value={form.password}
            onChange={handleChange}
            required
          />

          <button type="submit" className="btn">
            Login
          </button>
        </form>

        <p className="switch-msg">
          Don’t have an account? <a href="/signup">Sign Up</a>
        </p>
      </div>
    </div>
  )
}
