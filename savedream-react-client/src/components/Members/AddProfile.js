import React, { Component } from 'react'

class AddProfile extends Component {

    cancelForm() {
        
    }

  render() {
    return (
      <div className="add-profile-form">
        Add Profile Form

        <button className="btn btn-default" onClick={this.cancelForm}>Cancel</button>
      </div>
    )
  }
}

export default AddProfile;
