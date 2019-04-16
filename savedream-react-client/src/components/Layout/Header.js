import React, { Component } from 'react'
import {Link, NavLink} from "react-router-dom"

class Header extends Component {
  render() {
    return (
        <nav className="navbar navbar-expand-sm navbar-dark bg-info mb-4">
            <div className="container">
                <Link className="navbar-brand" to="/">
                    Save Dream
                </Link>

                <div className="collapse navbar-collapse" id="navbarNavAltMarkup">
                    <div className="navbar-nav">
                    {
                        <NavLink className="nav-item nav-link" to="/people">People</NavLink>
                    }
                    </div>
                </div>

                <div className="navbar-light" id="navbarRight">
                    <div className="navbar-nav">
                        <NavLink className="nav-item nav-link" to="/login">Login</NavLink>
                        <NavLink id="sign-up" className="nav-item nav-link" to="/register">Sign Up</NavLink>
                    </div>
                </div>
                


                <button className="navbar-toggler" type="button" data-toggle="collapse" data-target="#mobile-nav">
                    <span className="navbar-toggler-icon" />
                </button>
                
            </div>
        </nav>
    )
  }
}


export default Header;
