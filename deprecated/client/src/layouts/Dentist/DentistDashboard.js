import { useState } from "react";
import { Container, Row, Tabs, Tab } from 'react-bootstrap';
import styled from "styled-components";

import Contact from './Contact'


const DentistDashbord = (props) => {
    const [state1, setState1] = useState('test value');

    return (
        <>
        <h1>Dashboard</h1>
        <Container className="py-2 px-2">
        <Row className="justify-content-center">
          <Tabs justify variant="tabs" defaultActiveKey="Appointments" className="mb-3 p-0">
            <Tab eventKey="Appointments" title="Appointments">
              Appointments
            </Tab>
            <Tab eventKey="Inbox" title="Inbox"
          >Inbox</Tab>
          <Tab eventKey="Contact" title="Contact"><Contact /></Tab>
          </Tabs>
        </Row>
      </Container>
      </>
    )
}

export default DentistDashbord