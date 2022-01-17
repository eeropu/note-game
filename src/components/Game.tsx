import React, { useEffect, useState } from 'react'
import { Button, Container } from 'react-bootstrap'
// import { noteFrequencies } from '../data/note-frequencies'
import usePitchy from '../hooks/usePitchy'

const Game = () => {

    const getNextNote = () => {
        return notes[Math.floor(Math.random() * notes.length)]
    }

    const notes = ['E2', 'A2', 'D3', 'G3', 'B3', 'E4']
    const { start, resetNote, note } = usePitchy(90)
    const [ noteQueue, setNoteQueue ] = useState([getNextNote(), getNextNote(), getNextNote()])
    const [ correct, setCorrect ] = useState(false)

    useEffect(() => {
        if (noteQueue[0] === note) {
            resetNote()
            setNoteQueue(noteQueue.slice(1).concat([getNextNote()]))
            setCorrect(true)
            setTimeout(() => setCorrect(false), 2000)
        }
    // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [ note ])

    return (
        <Container>
            <p>Play: { noteQueue.map((noteInQueue, i) => <span key={i}>{ noteInQueue }, </span>) }</p>
            <p>You played: { note }</p>
            { correct ? <p>Awesome!</p> : null }
            <Button onClick={ start }>Start</Button>
        </Container>
    )
}

export default Game