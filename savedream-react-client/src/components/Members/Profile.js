import React, { Component } from 'react'

import { connect } from "react-redux";
import PropTypes from "prop-types";
import classnames from "classnames";

import _ from 'lodash';
import Loader from 'react-loader-spinner'

import { getUser, addUpdateProfile }  from "../../actions/securityActions";
import ViewProfile from './ViewProfile';
import AddProfile from './AddProfile';

class Profile extends Component {

    constructor() {
        super();

        this.state = {
            "fullName": "",
            "primaryMobile": "",
            "address": "",
            "city": "",
            "country": "",
            "shortBio": "",

            "membershipNo": "",

            errors: {},
            showAddForm: false,

            loader: true
        };

        this.showForm = this.showForm.bind(this);
        this.showEditForm = this.showEditForm.bind(this);
        this.cancelForm = this.cancelForm.bind(this);

        this.onChange = this.onChange.bind(this);
        this.onSubmit = this.onSubmit.bind(this);
    }

    componentDidMount() {
        const { id } = this.props.match.params;
        this.props.getUser(id);
    }

    componentWillReceiveProps(nextProps) {
        if (nextProps.errors) {
            this.setState({ errors: nextProps.errors });
        }

        // loader
        const { member } = this.props.security;
        if (_.get(member,'member.membershipNo') !== null) {
            this.setState({ loader: false });
        }

    }

    showForm() {
        this.setState({ 
            showAddForm: true
        });
    }

    cancelForm() {
        this.setState({ 
            showAddForm: false,
            errors: {}
        });
    }

    onChange(e) {
        this.setState({ [e.target.name]: e.target.value });
    }
    
    onSubmit(e) {
        e.preventDefault();

        const { member, profile } = this.props.security;

        const addUpdateProfile = {
            "fullName": this.state.fullName,
            "primaryMobile": this.state.primaryMobile,
            "address": this.state.address,
            "city": this.state.city,
            "country": this.state.country,
            "shortBio": this.state.shortBio,
        };

        if (Object.keys(profile).length !== 0) {
            addUpdateProfile.id = profile.id;
        }

        this.props.addUpdateProfile(_.get(member,'member.membershipNo'), addUpdateProfile);
    }

    showEditForm() {

        const { profile } = this.props.security;

        this.setState({ 
            showAddForm: false,

            "fullName": profile.fullName,
            "primaryMobile": profile.primaryMobile,
            "address": profile.address,
            "city": profile.city,
            "country": profile.country,
            "shortBio": profile.shortBio
        });

        this.setState({ showAddForm: true });
    }

  render() {

        const { member, profile } = this.props.security;
        const { errors } = this.state;

        const profileAddbutton = (
            <button className="btn btn-primary" onClick={this.showForm}>Add Profile</button>
        );

        const profileEditButton = (
            <button className="btn btn-info" onClick={this.showEditForm}>Edit Profile</button>
        );

        var display = {
			display: this.state.showAddForm ? "block" : "none"
        };
        
        var mobileReadOnly = profile.primaryMobile ? "readOnly" : "";

        console.log(this.state.loader);

    return (
      <div className="container">
        <div className="app-header">
          <h2>Profile</h2>
          <hr />

          { this.state.loader && <Loader type="Oval" color="#00BFFF" height="50" width="50" /> }
        </div>  

        Member Type: {member.userType}<br />
        Membership No: {_.get(member,'member.membershipNo')}
        
        <p className="text-right">{ Object.keys(profile).length == 0 && profileAddbutton }</p>

        <p className="text-right">{ Object.keys(profile).length !== 0 && this.state.showAddForm === false && profileEditButton }</p>
        { Object.keys(profile).length !== 0 && this.state.showAddForm === false && <ViewProfile profile={profile} /> }

        <div className="add-profile-form" style={display}>
            <form onSubmit={this.onSubmit}>
                <div className="form-group">
                    <input
                        type="text"
                        className={classnames("form-control form-control-lg",{
                        "is-invalid": errors.fullName
                        })}
                        placeholder="Fullname"
                        name="fullName"
                        value={this.state.fullName}
                        onChange={this.onChange}
                    />
                    {errors.fullName && (
                    <div className="invalid-feedback">{ errors.fullName }</div>
                    )}
                </div>

                <div className="form-group">
                    <input
                        type="text"
                        className={classnames("form-control form-control-lg",{
                        "is-invalid": errors.primaryMobile
                        })}
                        placeholder="Mobile"
                        name="primaryMobile"
                        value={this.state.primaryMobile}
                        onChange={this.onChange}
                        readOnly={mobileReadOnly}
                    />
                    {errors.primaryMobile && (
                    <div className="invalid-feedback">{ errors.primaryMobile }</div>
                    )}
                </div>

                <div className="form-group">
                    <input
                        type="text"
                        className={classnames("form-control form-control-lg",{
                        "is-invalid": errors.address
                        })}
                        placeholder="Address"
                        name="address"
                        value={this.state.address}
                        onChange={this.onChange}
                    />
                    {errors.address && (
                    <div className="invalid-feedback">{ errors.address }</div>
                    )}
                </div>

                <div className="form-group">
                    <input
                        type="text"
                        className={classnames("form-control form-control-lg",{
                        "is-invalid": errors.city
                        })}
                        placeholder="City"
                        name="city"
                        value={this.state.city}
                        onChange={this.onChange}
                    />
                    {errors.city && (
                    <div className="invalid-feedback">{ errors.city }</div>
                    )}
                </div>

                <div className="form-group">
                    <input
                        type="text"
                        className={classnames("form-control form-control-lg",{
                        "is-invalid": errors.country
                        })}
                        placeholder="Country"
                        name="country"
                        value={this.state.country}
                        onChange={this.onChange}
                    />
                    {errors.country && (
                    <div className="invalid-feedback">{ errors.country }</div>
                    )}
                </div>

                <div className="form-group">
                    <input
                        type="text"
                        className={classnames("form-control form-control-lg",{
                        "is-invalid": errors.shortBio
                        })}
                        placeholder="Short Bio"
                        name="shortBio"
                        value={this.state.shortBio}
                        onChange={this.onChange}
                    />
                    {errors.shortBio && (
                    <div className="invalid-feedback">{ errors.shortBio }</div>
                    )}
                </div>

                <input
                    type="submit"
                    className="btn btn-primary btn-block mt-4"
                />

                <input 
                    type="button" 
                    className="btn btn-info btn-block mt-4" 
                    value="Cancel"
                    onClick={this.cancelForm.bind(this)} 
                />
            </form>
        </div>

      </div>
    )
  }
}

Profile.propsType = {
    security: PropTypes.object.isRequired,
    getUser: PropTypes.func.isRequired,
    errors: PropTypes.object.isRequired,
    addUpdateProfile: PropTypes.func.isRequired
}

const mapStateToProps = (state) => ({
    security: state.security,
    errors: state.errors
});

export default connect(mapStateToProps, {getUser, addUpdateProfile})(Profile);