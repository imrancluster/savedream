import React, { Component } from 'react'
import {Link, NavLink} from "react-router-dom"

import PropTypes from "prop-types";
import { connect } from "react-redux";
import {logout, getUser} from "../../actions/securityActions";

class Header extends Component {

    logout() {
        this.props.logout();
        window.location.href = "/";
    };

  render() {

        const {validToken, user} = this.props.security;

        const userIsAuthenticated = (
            <div>
                <div className="collapse navbar-collapse" id="navbarNavAltMarkup">
                    <div className="navbar-nav">
                        <NavLink className="nav-item nav-link" to="/people">People</NavLink>
                    </div>
                </div>

                <div className="navbar-light" id="navbarRight">
                    <div className="navbar-nav">
                        <Link className="nav-link " to={`/profile/${user.id}`}>
                                <i className="fas fa-user-circle mr-1" /> {user.username}
                            </Link>
                        <Link className="nav-link" to="/logout"
                            onClick={this.logout.bind(this)} >
                            Logout
                        </Link>
                    </div>
                </div>
            </div>
        );

        const userIsNotAuthenticated = (
            <div>
                <div className="collapse navbar-collapse" id="navbarNavAltMarkup">
                    <div className="navbar-nav">
                        <NavLink className="nav-item nav-link" to="/people">People</NavLink>
                    </div>
                </div>

                <div className="navbar-light" id="navbarRight">
                    <div className="navbar-nav">
                        <NavLink className="nav-item nav-link" to="/login">Login</NavLink>
                        <NavLink id="sign-up" className="nav-item nav-link" to="/register">Sign Up</NavLink>
                    </div>
                </div>
            </div>
        );

        let headerLinks;
        if (validToken && user) {
            headerLinks = userIsAuthenticated;
        } else {
            headerLinks = userIsNotAuthenticated;
        }

    return (
        <nav className="navbar navbar-expand-sm navbar-dark bg-info mb-4">
            <div className="container">
                <Link className="navbar-brand" to="/">
                    React Learning
                </Link>
                


                <button className="navbar-toggler" type="button" data-toggle="collapse" data-target="#mobile-nav">
                    <span className="navbar-toggler-icon" />
                </button>

                {headerLinks}
                
            </div>
        </nav>
    )
  }
}


Header.propTypes = {
    logout: PropTypes.func.isRequired,
    security: PropTypes.object.isRequired
};

const mapStateToProps = state => ({
    security: state.security
});

export default connect(mapStateToProps, {logout})(Header);
