import React, { useState, useEffect } from "react"
import axios from "axios"
import '../index.css'

export default function ReviewsPage() {
  const [reviews, setReviews] = useState([])
  const [name, setName] = useState("")
  const [comment, setComment] = useState("")
  const [rating, setRating] = useState(0)
  const [hover, setHover] = useState(0)
  const [message, setMessage] = useState("")

  useEffect(() => {
    fetchReviews()
  }, []);

  const fetchReviews = async () => {
    try {
      const res = await axios.get("http://localhost:5000/reviews")
      setReviews(res.data)
    } catch (err) {
      console.error(err)
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault()
    if (!name || !comment || rating === 0) {
      setMessage("❌ Please fill all fields and select a rating");
      return
    }
    try {
      const res = await axios.post("http://localhost:5000/reviews", {
        name, rating, comment,
      })
      setReviews([res.data, ...reviews])
      setName(""); setComment(""); setRating(0); setHover(0)
      setMessage("✅ Review submitted successfully!")
    } catch (err) {
      console.error(err)
      setMessage("❌ Failed to submit review")
    }
  }

  return (
    <div className="reviews-page">
      <h2>Customer Reviews</h2>
      {message && <p className="message">{message}</p>}

      <form className="reviews-form" onSubmit={handleSubmit}>
        <input
          type="text"
          placeholder="Your Name"
          value={name}
          onChange={(e) => setName(e.target.value)}
          required
        />

        <div className="stars">
          {[1,2,3,4,5].map((star) => (
            <span
              key={star}
              className={star <= (hover || rating) ? "star filled" : "star"}
              onClick={() => setRating(star)}
              onMouseEnter={() => setHover(star)}
              onMouseLeave={() => setHover(0)}
            >★</span>
          ))}
        </div>

        <textarea
          placeholder="Your Review"
          value={comment}
          onChange={(e) => setComment(e.target.value)}
          required
        ></textarea>

        <button type="submit" className="btn">Submit Review</button>
      </form>

      <div className="reviews-list">
        {reviews.length === 0 && <p>No reviews yet.</p>}
        {reviews.map((rev) => (
          <div className="review" key={rev.id}>
            <p className="review-name">{rev.name} <span className="review-stars">{'★'.repeat(rev.rating)}</span></p>
            <p className="review-comment">{rev.comment}</p>
            <p className="review-date">{new Date(rev.created_at).toLocaleString()}</p>
          </div>
        ))}
      </div>
    </div>
  )
}
