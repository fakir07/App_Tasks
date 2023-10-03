import React from 'react'
import { Link, useLocation } from 'react-router-dom'

export default function Header() {
    const location = useLocation();
    return (
        <div className='container'>
            <nav className="navbar navbar-expand-lg navbar-light bg-light">
                <div className="container-fluid">
                    <Link className="navbar-brand" to="/">Laravel react js app</Link>

                    <div className="collapse navbar-collapse" id="navbarNavAltMarkup">
                        <div className="navbar-nav">
                            <Link className={`nav-link ${location.pathname === '/' ? ' active ' : ""} `} to="/" ><i className="fas fa-home"></i> Home</Link>
                            <Link className={`nav-link ${location.pathname === '/craete' ? ' active' : ""} `} to="/craete"> <i className="fas fa-edit"></i> Craete Tasks</Link>
                        </div>
                    </div>
                </div>
            </nav>
        </div>
    )
}
