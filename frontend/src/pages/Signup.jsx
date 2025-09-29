import { useState } from "react"
import axios from "axios"
import { useNavigate, useLocation, Link } from "react-router-dom"
import '../index.css'

export default function Signup() {
  const [form, setForm] = useState({ name: "", email: "", password: "", confirmPassword: "" })
  const [error, setError] = useState("")
  const navigate = useNavigate()
  const location = useLocation()

  const handleChange = (e) => {
    setForm({ ...form, [e.target.name]: e.target.value })
  }

  const isFormValid =
    form.name.trim() !== "" &&
    form.email.trim() !== "" &&
    form.password.trim() !== "" &&
    form.confirmPassword.trim() !== "" &&
    form.password === form.confirmPassword;

  const handleSubmit = async (e) => {
    e.preventDefault()
    if (!isFormValid) {
      setError("⚠ Please fill all fields correctly")
      return
    }

    try {
      const from = location.state?.from?.pathname || "/cars"
      const response = await axios.post("http://localhost:5000/signup", form, { withCredentials: true })
      localStorage.setItem("user", JSON.stringify(response.data.user))
      navigate(from, { replace: true })
    } catch (err) {
      setError(err.response?.data?.message || "Signup failed")
    }
  };

  return (
    <div className="auth-container">
      <div className="auth-card">
        <h2>👋 Welcome</h2>
        <p className="subtitle">Create your account to get started</p>

        {error && <p className="error-msg">{error}</p>}

        <form onSubmit={handleSubmit}>
          <label>Name</label>
          <input type="text" name="name" placeholder="Enter your name" value={form.name} onChange={handleChange} required />

          <label>Email</label>
          <input type="email" name="email" placeholder="Enter your email" value={form.email} onChange={handleChange} required />

          <label>Password</label>
          <input type="password" name="password" placeholder="Enter a password" value={form.password} onChange={handleChange} required />

          <label>Confirm Password</label>
          <input type="password" name="confirmPassword" placeholder="Confirm your password" value={form.confirmPassword} onChange={handleChange} required />

          <button type="submit" className="btn" disabled={!isFormValid}>
            Sign Up
          </button>
        </form>

        <p className="switch-msg">
          Already have an account? <Link to="/login">Login</Link>
        </p>
      </div>
    </div>
  )
}
