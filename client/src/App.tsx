import React, { ReactElement } from 'react';
import { BrowserRouter as Router, Route,Routes, Link } from "react-router-dom";
import { Wrapper, Status } from "@googlemaps/react-wrapper";

import Home from './Home/Home'
import DatePicker from './DatePicker/DatePicker'
import Map from './Map/Map'
import BookAppointment from './Appointments/BookAppointment'
import BookAppointmentForm from './Appointments/BookAppointmentForm';

const render = (status: Status): ReactElement => {
  if (status === Status.LOADING) return <h3>{status} ..</h3>;
  if (status === Status.FAILURE) return <h3>{status} ...</h3>;
  return <></>;
};

function App() {
  return (
    <div className="App">
      <Router>
      <Wrapper apiKey={'AIzaSyATMY5GYUwukHd29ka5l0DM2R8goauAp0g'} render={render}>
{/*        <BookAppointment />*/} <Home />
      </Wrapper>
      <Routes>
        <Route path='/appointments' element={<BookAppointment />}/>
      </Routes>
      </Router>
      
    </div>
  );
}

export default App;
