import React, { Component } from "react";
import { Container, Row, Tabs, Tab } from 'react-bootstrap';
import 'bootstrap/dist/css/bootstrap.min.css'
import Appointments from "./MainLayout/Appointments";
import Inbox from "./MainLayout/Inbox";
import Cancellations from "./MainLayout/Cancellations";

  class OfficeDashboard extends Component {
    state = {
      appointments: [
      {
        title: 'Paul McCartney',
        time: 'Tuesday 8:30',
        id: 1,
      },
      {
        title: 'Anders Andersson',
        time: 'Thursday 9:30',
        id: 2,
      },
      {
        title: 'Sven Svensson', 
        time: 'Monday 12:00',
        id: 3,
      }
    ],
    inbox: [
      {
        title: 'In need of emergency dentist',
        id: 1
      }, 
      {
        title: 'What do I need to pay?',
        id: 2
      }, {
        title: 'I am currently abroad and will thus miss my appointment, help required',
        id: 3
      }, 
    ],
    cancellations: [
      {
        title: 'I am sick today and can not attend my dental appointment',
        id: 1
      }, 
      {
        title: 'My appointment got dubble booked by a meeting with the boss',
        id: 2
      }, {
        title: 'I just can not make it today',
        id: 3
      }, 
    ]
    }

  render() {
    return (
        <Container className="py-5 px-5">
        <Row className="justify-content-center">
          <Tabs justify variant="tabs" defaultActiveKey="Appointments" className="mb-3 p-0">
            <Tab eventKey="Appointments" title="Appointments">
             <Appointments appointments={this.state.appointments}/>
            </Tab>
            <Tab eventKey="Inbox" title="Inbox">
              <Inbox inbox={this.state.inbox}/>
            </Tab>
          <Tab eventKey="Cancellations" title="Cancellations">
            <Cancellations c={this.state.cancellations}/>
            </Tab>
          </Tabs>
        </Row>
      </Container>
    )
  }
}

export default OfficeDashboard