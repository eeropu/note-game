import React, { useEffect, useState } from 'react'
import { Container } from 'react-bootstrap'
import usePitchy from '../hooks/usePitchy'
import GameGraphics from './GameGraphics'
import GameMenu from './GameMenu'

import './../styles/game.scss'
import useNotes from '../hooks/useNotes'
import { useSelector } from 'react-redux'
import { RootState } from '../redux/store'

const Game = () => {

    const getNextNote = () => notes[Math.floor(Math.random() * notes.length)]

    const majorOrMinor = useSelector((state: RootState) => state.key.majorOrMinor)
    const key = useSelector((state: RootState) => state.key.key)
    const position = useSelector((state: RootState) => state.key.position)

    useEffect(() => {
        setNoteQueue(noteQueue.slice(3).concat([getNextNote(), getNextNote(), getNextNote()]))
        if (running) {
            stop()
        }
    // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [majorOrMinor, key, position])

    const { notes } = useNotes({majorOrMinor, key, position})
    const { start, resetNote, note, running, stop } = usePitchy(90)
    const [ noteQueue, setNoteQueue ] = useState([getNextNote(), getNextNote(), getNextNote()])

    useEffect(() => {
        if (noteQueue[0] === note) {
            resetNote()
            setNoteQueue(noteQueue.slice(1).concat(getNextNote()))
        }
    // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [ note ])

    return (
        <Container className='game'>
            <GameMenu start={ start } running={ running }/>
            <GameGraphics noteQueue={noteQueue} />
        </Container>
    )
}

export default Game