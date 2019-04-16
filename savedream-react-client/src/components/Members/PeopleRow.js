import React, { Component } from 'react'

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
        <td>Edit/Update/Delete</td>
      </tr>
    )
  }
}

export default PeopleRow;
