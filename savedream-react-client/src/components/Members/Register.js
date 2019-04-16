import React, { Component } from 'react'

import PropTypes from "prop-types";
import {connect} from "react-redux";
import classnames from "classnames";

import {createNewUser} from "../../actions/securityActions";

class Register extends Component {

  constructor(props) {
    super(props);

    this.state = {
      "password": "",
      "confirmPassword": "",
      "userType": "",
      "username": "",
      "errors": {}
    };

    this.onChange = this.onChange.bind(this);
    this.onSubmit = this.onSubmit.bind(this);
  }

  componentDidMount() {
    // if (this.props.security.validToken) {
    //     this.props.history.push("/dashboard");
    // }
  }

  componentWillReceiveProps(nextProps) {
    if (nextProps.errors) {
        this.setState({errors: nextProps.errors});
    }
  }

  onChange(e) {
      this.setState({ [e.target.name]: e.target.value });
  }

  onSubmit(e) {
      e.preventDefault();

      const newUser = {
        "password": this.state.password,
        "confirmPassword": this.state.confirmPassword,
        "userType": this.state.userType,
        "username": this.state.username
      };
      
      console.log(newUser);
      this.props.createNewUser(newUser, this.props.history);
      
  } 

  render() {

    const {errors} = this.state;
    console.log(errors);

    return (
      <section className="hospital-list-section">
        <div className="container">
          <div className="row">
            <div className="col col-lg-12">
              <div className="app-header">
                <h2>User Registration</h2>
                <hr />
              </div>

                <div className="row">
                  <div className="col-md-8 m-auto">

                      <form onSubmit={this.onSubmit}>
                          <div className="form-group">
                              <input
                                  type="text"
                                  className={classnames("form-control form-control-lg",{
                                    "is-invalid": errors.username
                                  })}
                                  placeholder="Username"
                                  name="username"
                                  value={this.state.username}
                                  onChange={this.onChange}
                              />
                              {errors.username && (
                                <div className="invalid-feedback">{ errors.username }</div>
                              )}
                          </div>

                          <div className="form-group">
                              <input
                                  type="password"
                                  className={classnames("form-control form-control-lg",{
                                    "is-invalid": errors.password
                                  })}
                                  placeholder="Password"
                                  name="password"
                                  value={this.state.password}
                                  onChange={this.onChange}
                              />
                              {errors.password && (
                                <div className="invalid-feedback">{ errors.password }</div>
                              )}
                          </div>

                          <div className="form-group">
                              <input
                                  type="password"
                                  className={classnames("form-control form-control-lg",{
                                    "is-invalid": errors.confirmPassword
                                  })}
                                  placeholder="Confirm Password"
                                  name="confirmPassword"
                                  value={this.state.confirmPassword}
                                  onChange={this.onChange}
                              />
                              {errors.confirmPassword && (
                                <div className="invalid-feedback">{ errors.confirmPassword }</div>
                              )}
                          </div>

                          <div className="form-group">
                              <select 
                                className={classnames("form-control form-control-lg",{
                                  "is-invalid": errors.userType
                                })}
                                name="userType" 
                                value={this.state.userType} 
                                onChange={this.onChange}>
                                <option value={""}>Select Type</option>
                                <option value={"Donor"}>Donor</option>
                                <option value={"Dreamer"}>Dreamer</option>
                              </select>
                              {errors.userType && (
                                <div className="invalid-feedback">{ errors.userType }</div>
                              )}
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

Register.propTypes = {
  createNewUser: PropTypes.func.isRequired,
  errors: PropTypes.object.isRequired,
  security: PropTypes.object.isRequired
};

const mapStateToProps = state => ({
  security: state.security,
  errors: state.errors
});

export default connect(
  mapStateToProps, 
  {createNewUser}
)(Register);