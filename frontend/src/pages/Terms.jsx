import React from 'react'
import '../index.css'
import { useEffect } from 'react'


export default function Terms() {
  useEffect(() => {
    window.scrollTo({ top: 0, behavior: 'smooth' })
  }, [])
  
  return (
    <div id="terms" className="policy-container">
      <h1>Terms & Conditions</h1>
      <p className="intro">
         Welcome to Humsafar!<br/>
         By booking a vehicle through Humsafar, you agree to the following terms:
      </p>

      <section>
        <h2>1. Booking & Cancellation</h2>
        <ul>
          <li>All bookings must be confirmed with valid ID and driving license.</li>
          <li>Cancellations before 24 hours of rental start time will have full refund.</li>
          <li>Cancellations within 24 hours may attract 50% charge.</li>
          <li>No-shows will be charged full rental amount.</li>
        </ul>
      </section>

      <section>
        <h2>2. Vehicle Usage</h2>
        <ul>
          <li>Vehicles must be driven by a valid licensed driver.</li>
          <li>Vehicle must be used only for the purpose mentioned at booking (city or outstation).</li>
          <li>Traffic violations/fines are the responsibility of the user.</li>
        </ul>
      </section>

      <section>
        <h2>3. Damage & Liability</h2>
        <ul>
          <li>Users are responsible for any damage during the rental period.</li>
          <li>Insurance coverage applies as per vehicle insurance; excess will be charged.</li>
          <li>Accidents must be reported immediately to Humsafar.</li>
        </ul>
      </section>

      <section>
        <h2>4. Payment & Security Deposit</h2>
        <ul>
          <li>Rent amount must be paid at booking.</li>
          <li><strong>Security deposit of ₹10,000 is required</strong> and refundable if vehicle is returned in good condition.</li>
          <li>Additional charges (fuel, extra km, doorstep delivery) may apply.</li>
        </ul>
      </section>

      <section>
        <h2>5. Termination</h2>
        <ul>
          <li>Humsafar reserves the right to cancel booking if terms are violated.</li>
          <li>Not responsible for delays due to traffic, weather, or road restrictions.</li>
        </ul>
      </section>
    </div>
  )
}
