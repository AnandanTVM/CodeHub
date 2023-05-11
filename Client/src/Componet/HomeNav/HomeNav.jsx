import React from 'react'

import { Link } from 'react-router-dom'

import './HomeNav.css'
function HomeNav(props) {
    return (
        <div className=''>
            <div>
                {/* <nav classNameName="navbar navbar-expand-lg navbar-dark  bg-primary"> */}

                <nav className=" nav navbar navbar-expand-lg navbar-dark  bg-primary">
                    <div className="container-fluid">
                        <Link className="navbar-brand" to="/adminHome">
                            CodeHub
                        </Link>
                        <button
                            className="navbar-toggler"
                            type="button"
                            data-bs-toggle="collapse"
                            data-bs-target="#navbarNavDropdown"
                            aria-controls="navbarNavDropdown"
                            aria-expanded="false"
                            aria-label="Toggle navigation"
                        >
                            <span className="navbar-toggler-icon"></span>
                        </button>
                        <div className="container-fluid collapse navbar-collapse" id="navbarNavDropdown">
                            <ul className="navbar-nav" >

                            </ul>
                           

                            <ul class="d-flex navbar-nav" role="search">
                                <li className="nav-item me-4">
                                    {props.home ? (
                                        <Link
                                            className="nav-link active"
                                            aria-current="page"
                                            to="/"
                                        >
                                            Home
                                        </Link>
                                    ) : (
                                        <Link
                                            className="nav-link "
                                            aria-current="page"
                                            to="/"
                                        >
                                            Home
                                        </Link>
                                    )}
                                </li>

                                <button class="button-62 me-4" >Admin Login </button>
                                
                            </ul>
                        </div>
                    </div>
                </nav>
            </div>

        </div>
    )
}

export default HomeNav