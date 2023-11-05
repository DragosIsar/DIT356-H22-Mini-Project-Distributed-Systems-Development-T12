import React, { Component } from 'react';
import styled from 'styled-components';
import axios from 'axios';
import { breakpoints } from '../../MediaQueries'

import Navbar from '../../components/Navbar';
import Form from '../../components/Test/Form';
import Maps from '../../components/Map/Maps'
import DatePicker from '../../components/DatePicker/DatePicker'

const API = axios.create({
  baseURL: `https://raw.githubusercontent.com/feldob/dit355_2020/master/dentists.json`
});

const MainCointainer = styled.div`
height: 100vh;
overflow:hidden;
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

class Home extends Component{

  constructor() {
    super();
    API.get().then(res => {
      console.log(res.data);
    });
  }

  render() {
    return(
      <MainCointainer>
        <Navbar />
        <Box>
          <h1>POST test</h1>
          <Form />
        </Box>
        <Maps />
      </MainCointainer>
      
    );
  }
}

export default Home;