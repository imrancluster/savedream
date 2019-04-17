import React, { Component } from 'react'

class ViewProfile extends Component {
  render() {    

    const { profile } = this.props;

    return (
      <div className="view-profile">
        
        <h2>Profle Info</h2>
        <hr />

        <p>Name: { profile.fullName }</p>
        <p>Mobile: { profile.primaryMobile }</p>
        <p>Address: { profile.address }</p>
        <p>City: { profile.city }</p>
        <p>Country: { profile.country }</p>
        <p>Short Bio: { profile.shortBio }</p>
      </div>
    )
  }
}

export default ViewProfile;
