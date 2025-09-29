import React from 'react'
import '../index.css'
import { useEffect } from 'react'

export default function PrivacyPolicy() {
  useEffect(() => {
    window.scrollTo({ top: 0, behavior: 'smooth' })
  }, [])
  return (
    <div id="policy" className="policy-container">
      <h1>Privacy Policy</h1>

      <section>
        <h2>1. Data Collection</h2>
        <ul>
          <li>We collect name, phone, email (optional), address, ID proof, driving license, and payment details.</li>
        </ul>
      </section>

      <section>
        <h2>2. Use of Data</h2>
        <ul>
          <li>To confirm and manage bookings.</li>
          <li>To communicate important updates regarding your rental.</li>
          <li>For legal and safety purposes.</li>
        </ul>
      </section>

      <section>
        <h2>3. Data Storage & Security</h2>
        <ul>
          <li>All personal information is stored securely and encrypted.</li>
          <li>Only authorized personnel have access to sensitive data.</li>
        </ul>
      </section>

      <section>
        <h2>4. Sharing of Data</h2>
        <ul>
          <li>Data may be shared with authorities in case of accidents, traffic violations, or insurance claims.</li>
          <li>We do not sell or share your personal info with third-party marketing agencies.</li>
        </ul>
      </section>

      <section>
        <h2>5. User Rights</h2>
        <ul>
          <li>Users can request deletion of personal data after booking completion.</li>
          <li>Users can contact Humsafar support for privacy-related concerns.</li>
        </ul>
      </section>
    </div>
  )
}
