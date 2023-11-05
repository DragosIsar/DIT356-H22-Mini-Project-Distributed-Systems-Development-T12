import React from "react";
import { Container, Row, Tabs, Tab } from "react-bootstrap";
import PatientContactForm from "./PatientContactForm";

const PatientDashboard = (props) => {
  return (
    <>
      <Container className="py-2 px-2">
        <Row className="justify-content-center">
          <Tabs
            justify
            variant="tabs"
            defaultActiveKey="PatientMsgs"
            className="mb-3 p-0"
          >
            <Tab eventKey="PatientMsgs" title="Messages">
              <div>Messages</div>
            </Tab>
            <Tab eventKey="Contact" title="Contact">
              <div><PatientContactForm /></div>
            </Tab>
          </Tabs>
        </Row>
      </Container>
    </>
  );
};

export default PatientDashboard;
