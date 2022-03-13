import React, { useState } from 'react';
import Tuner from './components/Tuner';
import { Container, Nav, Navbar, NavDropdown } from 'react-bootstrap'
import { Route, Routes, Navigate } from 'react-router-dom';
import Game from './components/Game';
import FrontPage from './components/FrontPage';

import './styles/app.scss'
import Login from './components/Login';
import { useSelector, useDispatch } from 'react-redux';
import { RootState } from './redux/store';
import { BsFillPersonFill } from 'react-icons/bs';
import { setCredentials } from './redux/credentialSlice';
import MyProgress from './components/MyProgress';

const App = () => {

  const username = useSelector((state: RootState) => state.credentials.username)
  const [isLoginModalOpen, setIsLoginModalOpen] = useState(false)

  const dispatch = useDispatch()

  const logOut = () => {
    window.localStorage.removeItem("note-game-token")
    window.localStorage.removeItem("note-game-username")
    dispatch(setCredentials({ token: "", username: "" }))
  }

  return (
    <Container className={'app p-b-100'}>
      <Navbar>
        <Container>
          <Navbar.Brand href="/">Note Game</Navbar.Brand>
          <Navbar.Collapse id="basic-navbar-nav">
            <Nav className="me-auto">
              <Nav.Link href="/">Home</Nav.Link>
              <Nav.Link href="/game">Game</Nav.Link>
              <Nav.Link href="/tuner">Tuner</Nav.Link>
            </Nav>
            <Nav>
              {!username ?
                <Nav.Link href="#" onClick={() => setIsLoginModalOpen(true)}>Log in</Nav.Link> :
                <NavDropdown title={<div id="userNavItem"><BsFillPersonFill/> {username}</div>} id="basic-nav-dropdown">
                  <NavDropdown.Item href="/my-progress">My progress</NavDropdown.Item>
                  <NavDropdown.Divider />
                  <NavDropdown.Item href="#" onClick={() => logOut()}>Log out</NavDropdown.Item>
                </NavDropdown>
              }
            </Nav>
          </Navbar.Collapse>
        </Container>
      </Navbar>
      <Routes>
        <Route path='/game' element={<Game />} />
        <Route path='/tuner' element={<Tuner />} />
        <Route path="/my-progress" element={<MyProgress />} />
        <Route path='/' element={<FrontPage />} />
        <Route path="*" element={<Navigate to="/" />} />
      </Routes>
      <Login isOpen={isLoginModalOpen} close={() => setIsLoginModalOpen(false)} />
    </Container>
  )
}

export default App;