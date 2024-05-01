import React from 'react'
import { Container, Row, Col, Button, Navbar } from "react-bootstrap";
// import Navbar from 'react-bootstrap/Navbar';
import logo from '../assets/logo01.webp';
import image from '../assets/img01.jpeg';

const Header = () => {
  return (
    <>
    <Navbar className="bg-body-tertiary" style={{ backgroundColor: "rgba(0, 0, 0, 0.2)", color:"black" }}>
        <Container>
          <Navbar.Brand style={{display: 'flex', flexDirection: 'row', gap:"20px"}}
          >
            <img
              alt="logo"
              src={logo}
              width="50"
              height="50"
              className="d-inline-block align-top"
            />{' '}
            <h1 style={{margin:"auto"}}>Expense Tracker</h1>
          </Navbar.Brand>
        </Container>
      </Navbar>
    </>
  )
}

export default Header