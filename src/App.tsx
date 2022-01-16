import React from 'react';
import Tuner from './components/Tuner';
import { Container } from 'react-bootstrap'

const App = () => {
  return (
    <Container className={'app'}>
      <Tuner />
    </Container>
  )
}

export default App;