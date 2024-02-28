import React from 'react';
import { Link } from 'react-router-dom';
import Container from 'react-bootstrap/Container';
import Nav from 'react-bootstrap/Nav';
import BootstrapNavbar from 'react-bootstrap/Navbar'; 

export default function Navbar() {
  return (
    <BootstrapNavbar bg="dark" variant="dark" className='fixed-top'>
      <Container>
        <BootstrapNavbar.Brand as={Link} to="/">Stellar View</BootstrapNavbar.Brand>
        <Nav className="me-auto">
          <Nav.Link as={Link} to="/">Home</Nav.Link>
          <Nav.Link as={Link} to="/login">Login</Nav.Link>
          <Nav.Link as={Link} to="/register">Register</Nav.Link>
        </Nav>
      </Container>
    </BootstrapNavbar>
  );
}
