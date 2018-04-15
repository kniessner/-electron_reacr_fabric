import React, { PropTypes } from 'react';
//import StylesIgnored from "../styles/scss/index.scss";
import Navbar from './navbar';
import Footer from "./footer";
import Main from './main';
import App from "./app";


const Body = props => (
  <App>
    <Navbar />
    <Main></Main>
    <Footer />
  </App>
);



export default Body;
