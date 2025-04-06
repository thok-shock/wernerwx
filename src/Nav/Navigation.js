import { Container, Form, Nav, NavDropdown, Navbar, ToggleButton } from "react-bootstrap";
import React from 'react';


export default function Navigation(props) {

    return <Navbar data-bs-theme={props.mode} bg={props.mode}>
        <Container>
        <Navbar.Toggle aria-controls="basic-navbar-nav" />
        <Navbar.Collapse id="basic-navbar-nav">
          <Nav className="me-auto">
            <Nav.Link href="#home">Home</Nav.Link>
            <Nav.Link href="#about">About</Nav.Link>
            <Nav.Link href="#projects">My Projects</Nav.Link>
            <NavDropdown title="Other Sites" id="basic-nav-dropdown">
              <NavDropdown.Item href="https://drugreviewhq.com">Drug Review HQ</NavDropdown.Item>
              <NavDropdown.Item href="https://drugs.rswerner.com">
                Werner Drugs
              </NavDropdown.Item>
              <NavDropdown.Item href="https://vitalspringlabs.com">VitalSpring Labs</NavDropdown.Item>
              <NavDropdown.Divider />
              <NavDropdown.Item onClick={() => props.setMode(props.mode === 'light' ? 'dark' : 'light')}>
                Separated link
              </NavDropdown.Item>
            </NavDropdown>
          </Nav>
        </Navbar.Collapse>
        <Form.Check type='switch' label='Dark Mode' checked={props.mode === 'dark'} onClick={() => props.setMode(props.mode === 'light' ? 'dark' : 'light')}></Form.Check>
        </Container>
      </Navbar>
}