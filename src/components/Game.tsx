import React, { useEffect, useState } from 'react'
import { Col, Container, Row } from 'react-bootstrap'
import usePitchy from '../hooks/usePitchy'
import GameGraphics from './GameGraphics'
import GameMenu from './GameMenu'

import './../styles/game.scss'
import useNotes from '../hooks/useNotes'
import { useSelector } from 'react-redux'
import { RootState } from '../redux/store'
import TestResultModal from './TestResultModal'

const Game = () => {

    const getNextNote = () => notes[Math.floor(Math.random() * notes.length)]

    const majorOrMinor = useSelector((state: RootState) => state.key.majorOrMinor)
    const key = useSelector((state: RootState) => state.key.key)
    const position = useSelector((state: RootState) => state.key.position)
    const mode = useSelector((state: RootState) => state.settings.displayType)
    const clarityThreshold = useSelector((state: RootState) => state.settings.clarityThreshold)

    useEffect(() => {
        setNoteQueue(noteQueue.slice(3).concat([getNextNote(), getNextNote(), getNextNote()]))
        if (running) {
            stop()
        }
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [majorOrMinor, key, position])

    const { notes } = useNotes({ majorOrMinor, key, position })
    const { start, resetNote, note, running, stop } = usePitchy(clarityThreshold)
    const [noteQueue, setNoteQueue] = useState([getNextNote(), getNextNote(), getNextNote()])
    const [timer, setTimer] = useState(0)
    const [testNotesLeft, setTestNotesLeft] = useState(20)
    const [ startTime, setStartTime ] = useState(0)
    const [ finishTime, setfinishTime ] = useState(0)
    const [ isTestResultModalOpen, setIsTestResultModalOpen ] = useState(true)

    useEffect(() => {
        if (noteQueue[0] === note) {
            resetNote()
            setNoteQueue(noteQueue.slice(1).concat(getNextNote()))
            if (mode === "test") {
                if (testNotesLeft === 1) {
                    setfinishTime(Date.now())
                }
                setTestNotesLeft(testNotesLeft - 1)
            }
        }
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [note])

    useEffect(() => {
        let interval: null | ReturnType<typeof setInterval> = null

        if (running && testNotesLeft && mode === 'test') {
            interval = setInterval(() => {
                setTimer((time) => time + 1);
            }, 1000);
        } else {
            interval && clearInterval(interval)
        }
        return () => {
            interval && clearInterval(interval)
        }
    }, [running, testNotesLeft, mode])

    const startGame = () => {
        if (running) {
            stop()
        }
        setTimer(0)
        setTestNotesLeft(20)
        if (mode === 'test') {
            setStartTime(Date.now())
        }
        start()
    }

    console.log(startTime)

    return (
        <Container className='game'>
            <Row>
                <GameMenu start={startGame} stop={stop} running={running} />
            </Row>
            {note}
            {mode === "test" &&
                <Row>
                    <Col>
                        <Row>
                            Time:
                        </Row>
                        <Row>
                            {`${Math.floor(timer / 60)}:${timer % 60 < 10 ? '0' + timer % 60 : timer % 60}`}
                        </Row>
                    </Col>
                    <Col>
                        <Row>
                            Notes left:
                        </Row>
                        <Row>
                            {testNotesLeft}
                        </Row>
                    </Col>
                </Row>
            }
            <Row>
                <GameGraphics noteQueue={noteQueue} />
            </Row>
            <TestResultModal 
                startTime={startTime}
                finishTime={finishTime}
                isOpen={isTestResultModalOpen}
                close={() => setIsTestResultModalOpen(false)}
            />
        </Container>
    )
}

export default Game