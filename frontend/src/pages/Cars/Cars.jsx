import React from "react"
import { Link, useSearchParams } from "react-router-dom"
import { getCars } from "../../api"

export default function Cars() {
    const [cars, setCars] = React.useState([])
    const [loading, setLoading] = React.useState(true)
    const [error, setError] = React.useState(null)
    const [searchParams, setSearchParams] = useSearchParams()

    const typeFilter = searchParams.get("type")

    React.useEffect(() => {
        getCars()
            .then(data => {
                console.log("Fetched cars:", data)
                setCars(data)
            })
            .catch(err => {
                console.error("Error fetching cars:", err)
                setError("Failed to load cars")
            })
            .finally(() => setLoading(false))
    }, [])

    const filteredCars = typeFilter
        ? cars.filter(car => car.type?.toLowerCase() === typeFilter.toLowerCase())
        : cars

    const isSingle = filteredCars.length === 1

    const carsElements = filteredCars.map(car => (
        <div key={car.id} className="cars-details">
            <Link to={`/cars/${car.id}`} state={{ search: `?${searchParams.toString()}` }}>
                <img src={`http://localhost:5000${car.imageUrl}`} alt={car.name} />
                <div className="car-info">
                    <div className="car-basicinfo">
                        <h3>{car.name}</h3>
                        <p>Rs.{car.price}<span>/day</span></p>
                    </div>
                    <i className={`car-type ${car.type.toLowerCase()} selected`}>
                        {car.type}
                    </i>
                </div>
            </Link>
        </div>
    ))

    function handleFilter(key, value) {
        setSearchParams(prev => {
            const newParams = new URLSearchParams(prev)
            if (value === null) {
                newParams.delete(key)
            } else {
                newParams.set(key, value)
            }
            return newParams
        })
    }

    return (
        <div className="carsList-container">
            <h2>Find the Perfect Car for Your Journey..</h2>

            <div className="filter-buttons">
                {["hatchback", "muv", "suv", "van", "sedan"].map(type => (
                    <button
                        key={type}
                        className={`car-type ${type} ${typeFilter?.toLowerCase() === type.toLowerCase() ? "selected" : ""}`}
                        onClick={() => handleFilter("type", type)}
                    >
                        {type}
                    </button>
                ))}

                {typeFilter && (
                    <button className="clear-button" onClick={() => handleFilter("type", null)}>
                        Clear
                    </button>
                )}
            </div>

            <div className={`cars-list ${isSingle ? "single-car" : ""}`}>
                {loading && <h2>Loading...</h2>}
                {error && <h2>{error}</h2>}
                {!loading && !error && filteredCars.length === 0 && (
                    <h3>No cars available for this category</h3>
                )}
                {!loading && !error && carsElements}
            </div>
        </div>
    )
}
