import React, { Component } from 'react'

import {Link} from "react-router-dom"

class PeopleRow extends Component {
  render() {

    const {user} = this.props;

    return (
      <tr>
        <td>{ user.username }</td>
        <td>{ user.member.membershipNo }</td>
        <td>{ user.userType }</td>
        <td>{ user.userRole }</td>
        <td>{ user.member.status }</td>
        <td>{ user.created_at }</td>
        <td><Link to={`/profile/${user.id}`}>View</Link> / Delete</td>
      </tr>
    )
  }
}

export default PeopleRow;
