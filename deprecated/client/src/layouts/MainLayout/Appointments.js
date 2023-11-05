import React, { Component } from "react";
import 'bootstrap/dist/css/bootstrap.min.css'
import AppointmentItem from "./AppointmentItem";

class Appointments extends Component {
    
render () {
 return this.props.appointments.map((appointments)  => (
<AppointmentItem key={appointments.id} appointment={appointments}/>
 ));
 }
}
export default Appointments
