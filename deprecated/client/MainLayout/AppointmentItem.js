import React, { Component } from 'react'

export class AppointmentItem extends Component {
  render() {
    return (
      <div style={ backgroundStyle }>{this.props.appointment.title}, {this.props.appointment.time} 
      <button type="button" class="btn btn-light" style={{ marginLeft: 'auto', marginRight: '1.5%'}}> Accept </button>
      <button type="button" class="btn btn-light"> Deny </button>
      </div>
    )
  }
}

const backgroundStyle = {
    borderBottom: '.1px #000000 dotted',
    padding: '10px',
    display: "flex"
    // backgroundColor: 'rgba( 240,240,240, 0.3)'
}

export default AppointmentItem