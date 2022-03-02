import React, { useState } from 'react';
import Tuner from './components/Tuner';
import { Container, Nav, Navbar, NavDropdown } from 'react-bootstrap'
import { Route, Routes } from 'react-router-dom';
import Game from './components/Game';
import FrontPage from './components/FrontPage';

import './styles/app.scss'
import Login from './components/Login';

const App = () => {

  const [ isLoginModalOpen, setIsLoginModalOpen ] = useState(false)

  return (
    <Container className={'app p-b-100'}>
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
            <Nav>
              <Nav.Link href="#" onClick={() => setIsLoginModalOpen(true)}>Log in</Nav.Link>
            </Nav>
          </Navbar.Collapse>
        </Container>
      </Navbar>
      <Routes>
        <Route path='/game' element={<Game />} />
        <Route path='/tuner' element={<Tuner />} />
        <Route path='/' element={<FrontPage />} />
      </Routes>
      <Login isOpen={isLoginModalOpen} close={() => setIsLoginModalOpen(false)}/>
    </Container>
  )
}

export default App;