import React, { Component, useState, useEffect } from 'react'
import { useNavigate } from "react-router-dom";
import styled from 'styled-components';

const Content1 = styled.div`
  padding: 0.5rem;
  width: 100%;
  height: 80%;
`;

const Button = styled.button`
  /* Adapt the colors based on primary prop */
  color: "palevioletred";
  font-size: 1em;
  margin: 1em;
  padding: 0.25em 1em;
  border: 2px solid palevioletred;
  border-radius: 3px;
`;

type OverviewProps = {
name: string
dentists: number
address: string
city: string
}


const Home = () => {
  const [data, setClinic] = useState([]);
  const [selectedDate, setDate] = useState();

  useEffect(() => {
    const data = JSON.parse(localStorage.getItem('clinic') || '{}');
    if (data) {
      setClinic(data);
    }
  }, [data])

  useEffect(() => {
    const selectedDate = JSON.parse(localStorage.getItem('date') || '{}');
    if (selectedDate) {
      setDate(selectedDate);
    }
  }, [selectedDate])

  let handleClick = false;

  if (data[1] > 0) {
    //console.log("I am clickable");
    handleClick = false;
  } else {
   //console.log("I am not clickable");
    handleClick = true;
  }

  let navigate = useNavigate(); 
  const routeChange = () =>{ 
    let path = `/appointments`; 
    navigate(path);
  }

  /* If there is no selected clinic or no selected date, the button should be disabled
  ** if (!data || !selectedDate)
  **/


  return(
    <Content1>
        <h3>Clinic Information</h3>
        <h4>Clinic: {data[0]}</h4>
        <h4>Address: {data[2]}, {data[3]}</h4>
        <h4>Dentists: {data[1]}</h4>        
        <h4>Opening hours:</h4>
        <Button 
          disabled={handleClick} 
          onClick={routeChange}
        >
            Search Times
        </Button>
    </Content1>
  );
}

export default Home