import React, { Component } from 'react'

import PropTypes from "prop-types";
import {connect} from "react-redux";
import classnames from "classnames";

 class Login extends Component {

  constructor() {
    super();

    this.state = {
        "username": "",
        "password": "",
        "errors": {}
    };

    this.onChange = this.onChange.bind(this);
    this.onSubmit = this.onSubmit.bind(this);
  }

  // It will check this condition before load the page
  componentDidMount() {
      // if (this.props.security.validToken) {
      //     this.props.history.push("/dashboard");
      // }
  }

  componentWillReceiveProps(nextProps) {
      // if (nextProps.errors) {
      //     this.setState({errors: nextProps.errors});
      // }

      // if (nextProps.security.validToken) {
      //     this.props.history.push("/dashboard");
      // }
  }

  onChange(e) {
      this.setState({ [e.target.name]: e.target.value });
  }

  onSubmit(e) {
      e.preventDefault();
      const loginRequest = {
          "username":this.state.username,
          "password":this.state.password
      };
      
      console.log(loginRequest);

      // this.props.login(loginRequest);
  }

  render() {
    
    const { errors } = this.state;

    return (
      <section className="login-page">
        <div className="container">
            <div className="row">
              <div className="col col-lg-12">
                <div className="app-header">
                  <h2>User Login</h2>
                  <hr />
                </div>

                <div className="row">
                  <div className="col-md-8 m-auto">

                  <form onSubmit={this.onSubmit}>
                          <div className="form-group">
                              <input
                                  type="text"
                                  className="form-control form-control-lg"
                                  placeholder="Username"
                                  name="username"
                                  value={this.state.username}
                                  onChange={this.onChange}
                              />
                          </div>

                          <div className="form-group">
                              <input
                                  type="password"
                                  className="form-control form-control-lg"
                                  placeholder="Password"
                                  name="password"
                                  value={this.state.password}
                                  onChange={this.onChange}
                              />
                          </div>
                          <input
                            type="submit"
                            className="btn btn-primary btn-block mt-4"
                          />
                      </form>

                  </div>
                </div>  

              </div>
            </div>
        </div>
      </section>
    )
  }
}

export default Login;
