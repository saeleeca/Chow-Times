import { Link } from 'react-router-dom';
import React from 'react';

function Navigation() {
    return (
        <nav className="navLinks">
            
            <li>
            <Link to="/">Home</Link> 
            </li>
            <li>
            <Link to="/add-food">Add Food</Link> 
            </li>
            
            
        </nav>
    )
}


export default Navigation