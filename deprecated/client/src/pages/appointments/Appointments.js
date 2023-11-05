import React, { Component } from 'react'
import styled from 'styled-components'
import { breakpoints } from '../../MediaQueries'


//dependencies
import Navbar from '../../components/Navbar'
import DatePicker from '../../components/DatePicker/index'
import DesktopPicker from '../../components/TimePicker/DesktopPicker'
import MobilePicker from '../../components/TimePicker/MobilePicker'

const MainCointainer = styled.div`
height: 100vh;
overflow: scroll;
position: relative;


h2,h3,h4,h5,h6{
  font-family: "DMSans-Regular";, sans-serif ;
  font-weight:400;
}
`

const Box = styled.div`
margin-top: 8rem;
text-align: center;

@media (min-width: ${breakpoints.mobileMin}) {
  padding: 0 2.5rem;
  text-align: left;
  overflow: hidden;
  width: 100%;
}
`

const DateTime = styled.div`
display: grid;
margin-top: 3rem;
`

const Calendar = styled.div`
width: 100%;
position: relative;
h4 {
  padding: 0 2.5rem;
}

@media (min-width: ${breakpoints.mobileMin}) {
  left: 0;
  overflow: hidden;
  width: 42%;
  position: relative;
  z-index: 1;
  overflow-x: hidden;

}
`
const MobileTime = styled.div`
display: inline;
padding: 0 2.2rem;

@media (min-width: ${breakpoints.mobileMin}) {
  display: none;
}
`
const DesktopTime = styled.div`
display: none;
position: relative;

@media (min-width: ${breakpoints.mobileMin}) {
  display: inline;
  right: 0;
  width: 60%;
  position: fixed;
  z-index: 1;
  overflow-x: hidden;
      
}
`

const TimeSlot = styled.div`
  display: grid;
  grid-template-columns: repeat(8, 1fr);
  max-width: 100%;
  margin: 30px auto;
  grid-gap: 2rem;
`

const Slot = styled.div`
background-color: #F7F7F7;
  text-align: center;
  border-radius: 5px;
  -webkit-border-radius: 5px;
  -moz-border-radius: 5px;
  -ms-border-radius: 5px;
  -o-border-radius: 5px;
  margin: 0px 20px 0px 20px;
  `

class AppointmentApp extends Component {
  constructor(props, context) {
    super(props, context);

    this.state = {
      schedule: [],
      confirmationModalOpen: false,
      appointmentDateSelected: false,
      appointmentMeridiem: 0,
      finished: false,

      stepIndex: 0
    };
  }
}

const Appointments = () => {

  return (

    <MainCointainer>
      <Navbar />
      <Box>
        <h1>Book a Visit</h1>
        <h3>Make an appointment with Dr. "name".</h3>
        <h5>You have selected "date" at "time"</h5>

      </Box>
      <DateTime>
        <Calendar>
          <h4>Pick a day</h4>
          <DatePicker />
          
        </Calendar>
        <DesktopTime>
        <h4>Pick a time</h4>
          <DesktopPicker />
        </DesktopTime>
        <MobileTime>
        <h4>Pick a time</h4>
          <MobilePicker />
        </MobileTime>

      </DateTime>
    </MainCointainer>
    
  )
}

export default Appointments