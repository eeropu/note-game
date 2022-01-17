import React from 'react'
import { Button, Container } from 'react-bootstrap'
import { noteFrequencies } from '../data/note-frequencies'
import usePitchy from '../hooks/usePitchy'

const Game = () => {

    const notes = ['E2', 'A2', 'D3', 'G3', 'B3', 'E4']
    const { start, note } = usePitchy(90)

    return (
        <Container>
            <p>Play: { notes[0] }</p>
            <p>You played: { note }</p>
            { note === notes[0] ? <p>Awesome!</p> : ''}
            <Button onClick={ start }>Start</Button>
        </Container>
    )
}

export default Game