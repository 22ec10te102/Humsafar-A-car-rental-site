import React, { useState } from "react"
import { Link, useNavigate } from "react-router-dom"
import axios from "axios"
import "../index.css"

export default function RentForm() {
  const navigate = useNavigate()

  const [form, setForm] = useState({
    name: "",
    phone: "",
    dateFrom: "",
    dateTo: "",
    pickupTime: "",
    idProof: null,
    licenseProof: null,
    agreeTerms: false,
    vehicleOption: "pickup",
    address: "",
  });

  const extraCharge = form.vehicleOption === "delivery" ? 300 : 0;

  const handleChange = (e) => {
    const { name, value, type, files } = e.target

    if (name === "idProof" || name === "licenseProof") {
      setForm({ ...form, [name]: files[0] })
    } else if (type === "checkbox") {
      setForm({ ...form, [name]: e.target.checked })
    } else if (name === "vehicleOption") {
      setForm({ ...form, vehicleOption: value })
      if (value === "pickup") setForm((prev) => ({ ...prev, address: "" }))
    } else {
      setForm({ ...form, [name]: value })
    }
  };

  const isFormValid =
    form.name.trim() !== "" &&
    form.phone.trim().length === 10 &&
    form.dateFrom.trim() !== "" &&
    form.dateTo.trim() !== "" &&
    ((form.vehicleOption === "pickup" && form.pickupTime.trim() !== "") ||
      (form.vehicleOption === "delivery" && form.address.trim() !== "")) &&
    form.idProof !== null &&
    form.licenseProof !== null &&
    form.agreeTerms;

  const handleSubmit = async (e) => {
    e.preventDefault()

    try {
      const formData = new FormData()
      for (const key in form) {
        formData.append(key, form[key])
      }

      await axios.post("http://localhost:5000/rent", formData, { withCredentials: true })
      navigate("/thankyou", {
        state: {
          vehicleOption: form.vehicleOption,
          extraCharge: extraCharge,
        },
      });
    } catch (err) {
          console.error("Booking failed:", err.response ? err.response.data : err);
          alert("Booking failed: " + (err.response?.data?.error || "Please try again!"));
    }
    
  };

  return (
    <div className="rent-container">
      <div className="auth-card">
        <h2>Book Your Ride 🚗</h2>
        <p className="subtitle">Fill out the form to confirm your booking</p>

        <form onSubmit={handleSubmit}>
          <label>Full Name</label>
          <input
            type="text"
            name="name"
            value={form.name}
            onChange={handleChange}
            placeholder="Enter your full name"
            required
          />

          <label>Phone Number</label>
          <div className="phone-input">
            <span className="phone-prefix">+91</span>
            <input
              type="tel"
              name="phone"
              value={form.phone}
              onChange={handleChange}
              placeholder="10-digit number"
              pattern="[0-9]{10}"
              maxLength="10"
              required
            />
          </div>

          <label>Rent From</label>
          <input type="date" name="dateFrom" value={form.dateFrom} onChange={handleChange} required />

          <label>Rent To</label>
          <input type="date" name="dateTo" value={form.dateTo} onChange={handleChange} required />

          <label>Choose Option</label>
          <select name="vehicleOption" value={form.vehicleOption} onChange={handleChange}>
            <option value="pickup">Pickup</option>
            <option value="delivery">Delivery (Extra ₹300 up to 10 km)</option>
          </select>

          {form.vehicleOption === "pickup" && (
            <>
              <label>Pickup Time</label>
              <input type="time" name="pickupTime" value={form.pickupTime} onChange={handleChange} required />
            </>
          )}

          {form.vehicleOption === "delivery" && (
            <>
              <label>Delivery Address</label>
              <textarea
                name="address"
                value={form.address}
                onChange={handleChange}
                placeholder="Enter delivery address"
                rows="3"
                required
              />
            </>
          )}

          <label>ID Proof (Aadhaar / PAN)</label>
          <input type="file" name="idProof" accept="image/*" onChange={handleChange} required />

          <label>Driving License</label>
          <input type="file" name="licenseProof" accept="image/*" onChange={handleChange} required />

          <div className="terms-checkbox">
            <input
              type="checkbox"
              name="agreeTerms"
              checked={form.agreeTerms}
              onChange={handleChange}
            />{" "}
            I agree to the <Link to="/terms&condition"> Terms & Conditions </Link> and{" "}
            <Link to="/privacypolicy"> Privacy Policy </Link>
          </div>

          <button type="submit" className="btn" disabled={!isFormValid}>
            Confirm Booking
          </button>
        </form>
      </div>
    </div>
  )
}

