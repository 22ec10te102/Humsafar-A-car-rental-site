import React from "react"
import { Link } from "react-router-dom"

import "../index.css"

export default function ThankYou() {
  return (
   <>
    
    <div className="thankyou-container">
      <div className="thankyou-card">
        <h1>Your Booking is Confirmed!🎉</h1>
        <p className="subtitle">
          Thank you for choosing <strong>Humsafar!</strong> Your ride is ready.
        </p>

        <p className="info-text">
          Please note: Online payment isn’t available yet. You can pay when your ride is{" "}
          <strong>{`picked up or delivered`}</strong>.
        </p>

        <p className="info-text">
          If you have any questions, feel free to{" "}
          <Link to="/about#contact" className="contact-link">
            contact us
          </Link>
          
        </p>

        <Link to="/cars" className="btn-back">
          Back to Browse Cars
        </Link>
      </div>
    </div>
  </>
  )
}
