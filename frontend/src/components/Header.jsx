import React from 'react'
import { Link, NavLink } from 'react-router-dom'
import '../index.css'
import imageUrl from '../images/avatar.jpg'

export default function Header(){
    return(
        <header>
            <Link className="site-name" to="/">HUMSAFAR</Link>
         <nav className='navBar'>  
            
            <NavLink to="/about" className={({isActive}) => isActive ? 'link-active' : null}>About</NavLink>
            <NavLink to="/cars" className={({isActive}) => isActive ? 'link-active' : null}>Cars</NavLink>
            <NavLink to="/reviews" className={({isActive}) => isActive ? 'link-active' : null}>Reviews</NavLink>
            <Link to="/about#contact">Contact Us</Link>
            <Link to="/login" className="login-link">
                <img src={imageUrl} alt="avatar icon" className="login-icon"  />
            </Link>

         </nav>
        </header>
    )
}
