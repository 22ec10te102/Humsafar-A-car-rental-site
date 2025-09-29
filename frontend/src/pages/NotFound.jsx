import React from 'react'
import {Link} from 'react-router-dom'
import '../index.css';

export default function NotFound(){
    return(
    <div className='not-found'>
        <h1>Sorry, page not found.</h1>
        <Link to="/">Return to home</Link>
    </div>
    )
}
