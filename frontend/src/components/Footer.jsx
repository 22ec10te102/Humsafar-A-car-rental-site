import React from 'react'
import '../index.css'
import { Link } from 'react-router-dom'

export default function Footer() {
  return (
    <footer className="footer">
      <div className="footer-links">
        <Link to="/about">About Us</Link>
        <Link to="/terms&condition">Terms & Conditions</Link>
        <Link to="/privacypolicy">Privacy Policy</Link>
        <Link to="/about#contact">Contact us</Link>
      </div>
      <p className="footer-copy">© 2025 HUMSAFAR</p>
    </footer>
  )
}
