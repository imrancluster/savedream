import React, { Component } from 'react'


import { connect } from "react-redux";
import PropTypes from "prop-types";

import { getUsers } from "../../actions/securityActions"
import PeopleRow from './PeopleRow';

class People extends Component {

    constructor() {
        super();
    }

    componentDidMount() {
        this.props.getUsers();
    }

  render() {

    const { users } = this.props.security;

    return (
        <section className="people-page">
            <div className="container">
                <div className="row">
                    <div className="col col-lg-12 text-align-left">
                        <div className="app-header">
                            <h2>People List</h2>
                            <hr />
                        </div>

                        <div className="table-responsive">
        
                            <table className="table">
                                <thead>
                                    <tr>
                                        <th>Username</th>
                                        <th>Membership No</th>
                                        <th>Type</th>
                                        <th>Role</th>
                                        <th>Status</th>
                                        <th>Date</th>
                                        <th>Action</th>
                                    </tr>
                                </thead>

                                <tbody>
                                    {users.map(user => (
                                        <PeopleRow key={user.id} user={user} />
                                    ))}
                                </tbody>
                            </table>
                            
                        </div>

                    </div>
                </div>
            </div>
        </section>
    )
  }
}

People.propTypes = {
    security: PropTypes.object.isRequired,
    getUsers: PropTypes.func.isRequired

};

const mapStateToProps = state => ({
    security: state.security
});

export default connect(mapStateToProps, {getUsers})(People);