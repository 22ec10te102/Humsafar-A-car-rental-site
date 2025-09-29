import React from 'react'
import {Link} from 'react-router-dom'
import '../index.css'

export default function Home(){
    return(
    <>
        <div className='homePage'>
            <h1>Your jorney's true companion - Humsafar</h1>
            <p>Add adventure to your life by joining the Humsafar movement.<br />
               Rent the perfect car to make your perfect road trip.</p>
            <Link to="/cars">Find your car</Link>
        </div>
    </>
    )
}
