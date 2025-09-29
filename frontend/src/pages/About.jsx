
import React, { useState, useEffect } from 'react'
import { useLocation } from 'react-router-dom'
import aboutimg from "../images/aboutImg.jpg"
import '../index.css'

export default function AboutContact() {
  const [form, setForm] = useState({ name: '', email: '', message: '' })
  const [messageSent, setMessageSent] = useState('')

  const location = useLocation();

  useEffect(() => {
    window.scrollTo({ top: 0, behavior: 'smooth' })
    if (location.hash === "#contact") {
      const contactSection = document.getElementById("contact")
      if (contactSection) {
        contactSection.scrollIntoView({ behavior: "smooth", block: "start" })
      }
    }
  }, [location])

  const handleChange = (e) => {
    setForm({ ...form, [e.target.name]: e.target.value })
  };

  const handleSubmit = (e) => {
    e.preventDefault()
    setMessageSent("✅ Your suggestion has been submitted!")
    setForm({ name: '', email: '', message: '' })
  };

  return (
    <div id="about" className="about-contact-page">
      {/* About Section */}
      <div className='about-content'>
        <img className="about-img" src={aboutimg} alt='About' />
        <div className='about-text'>
          <h1>About us</h1>
          <h3>Welcome to Humsafar – your trusted companion for hassle-free self-drive car rentals in your city. 🚗✨<br /></h3>
          <p>
            At Humsafar, we believe travel should be convenient, affordable, and flexible. Whether it’s a quick trip within the city, a long drive with friends, or an outstation journey with family, we’ve got the perfect car for you.
            Our mission is to make self-drive rentals affordable and accessible to everyone, so you can travel at your own pace without worrying about drivers, high costs, or hidden conditions.
          </p>
        </div>
      </div>

      <div className="icons-content">
        <h2 className="features-heading">What makes us unique</h2>
        <div className="icons-row">
          <div className="icon-item"><i className="fa-solid fa-users"></i><p>User friendly service</p></div>
          <div className="icon-item"><i className="fa-solid fa-shield-halved"></i><p>Privacy First Approach</p></div>
          <div className="icon-item"><i className="fa-solid fa-car"></i><p>Best car service</p></div>
        </div>
      </div>

      <div className="explore-section">
        <h2>Your destination is waiting.<br />Your van is ready.</h2>
        <a className='about-link' href="/cars">Explore our cars</a>
      </div>

      {/* Contact Section */}
      <div id="contact" className="contact-section">
        <h1>Contact us</h1>
        <div className="contact-content">
          <div className="contact-info">
            <h2>Our contact info</h2>
            <p><i className="fa-solid fa-phone"></i> +91 9876543210</p>
            <p><i className="fa-solid fa-envelope"></i> humsafar@gmail.com</p>
            <p><i className="fa-solid fa-location-dot"></i> Bank Colony, Gwalior (M.P.)</p>
          </div>

          <div className="contact-form">
            <h2>Send Us a Suggestion</h2>
            {messageSent && <p className="success-msg">{messageSent}</p>}
            <form onSubmit={handleSubmit}>
              <input type="text" name="name" placeholder="Your Name" value={form.name} onChange={handleChange} required />
              <input type="email" name="email" placeholder="Your Email" value={form.email} onChange={handleChange} required />
              <textarea name="message" placeholder="Your Message" value={form.message} onChange={handleChange} required />
              <button type="submit">Submit</button>
            </form>
          </div>
        </div>
      </div>
    </div>
  )
}
