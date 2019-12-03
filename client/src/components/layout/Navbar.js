import React from "react"
import {Link}from "react-router-dom"
const Navbar=()=>{
    return (
        <div className="navbar bg-dark">
            <h1>
                <Link to="/">
                    <i className="fas fa-code"/> DevConnector
                </Link>
            </h1>
            <ul>
                <li>
                    <a href="profiles.html">Developers</a>
                </li>
                <li>
                    <Link to="/register">Register</Link>
                </li>
                <li>
                    <Link to="/login">login</Link>
                </li>
            </ul>

        </div>
    )
}
export default Navbar