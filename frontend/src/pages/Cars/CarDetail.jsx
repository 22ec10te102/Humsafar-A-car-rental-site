import React from "react"
import { useParams, useLocation, Link, useNavigate } from "react-router-dom"
import { getCar } from "../../api"

export default function CarDetail() {
    const { id } = useParams()
    const location = useLocation()
    const navigate= useNavigate()
    const [car, setCar] = React.useState(null)
    const [loading, setLoading] = React.useState(true)
    const [error, setError] = React.useState(null)

    React.useEffect(() => {
        getCar(id)
            .then(data => setCar(data))
            .catch(err => {
                console.error("Failed to fetch car:", err)
                setError("Car not found or could not be loaded.")
            })
            .finally(() => setLoading(false))
    }, [id])

    const search = location.state?.search || ""

    const handleClick = () => {
        navigate(`/cars/${id}/rent`)
    }

    return (
        <>
            <Link to={`..${search}`} relative="path" className="back-button">
                &larr; <span>Back to cars</span>
            </Link>

            <div className="cars-description-container">
                {loading && <h1>Loading...</h1>}
                {error && <h1>{error}</h1>}
                {car && (
                    <div className="car-description">
                        <img src={`http://localhost:5000${car.imageUrl}`} alt={car.name} />
                      <div className="car-des-info">
                        <i className={`car-type ${car.type} selected`}>{car.type}</i>
                        <h1>{car.name}</h1>
                        <p className="car-price"><span>Rs.{car.price}</span>/day</p>
                        <p style={{ whiteSpace: "pre-line" }}>{car.description}</p>
                        <button onClick={handleClick} className="rent-button">Rent this car</button>
                    </div>
                    </div>
                )}
            </div>
        </>
    )
}
