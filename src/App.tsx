import React from 'react';
import Tuner from './components/Tuner';
import { Container, Nav, Navbar, NavDropdown } from 'react-bootstrap'
import { Route, Routes } from 'react-router-dom';
import Game from './components/Game';

const App = () => {
  return (
    <Container className={'app'}>
      <Navbar>
        <Container>
          <Navbar.Brand href="/">Note Game</Navbar.Brand>
          <Navbar.Collapse id="basic-navbar-nav">
            <Nav className="me-auto">
              <Nav.Link href="/game">Game</Nav.Link>
              <Nav.Link href="/tuner">Tuner</Nav.Link>
              <NavDropdown title="Dropdown" id="basic-nav-dropdown">
                <NavDropdown.Item href="#action/3.1">Placeholder options</NavDropdown.Item>
                <NavDropdown.Item href="#action/3.2">- 1 -</NavDropdown.Item>
                <NavDropdown.Item href="#action/3.3">- 2 -</NavDropdown.Item>
                <NavDropdown.Divider />
                <NavDropdown.Item href="#action/3.4">- 3 -</NavDropdown.Item>
              </NavDropdown>
            </Nav>
          </Navbar.Collapse>
        </Container>
      </Navbar>
      <Routes>
        <Route path='/game' element={ <Game /> } />
        <Route path='/tuner' element={ <Tuner /> } />
      </Routes>
    </Container>
  )
}

export default App;