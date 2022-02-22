import React, { useState } from 'react'
import { Button, Col, Form, Row } from 'react-bootstrap'
import { keys } from './../data/keys'
import { RootState } from '../redux/store'
import { useSelector, useDispatch } from 'react-redux'
import { setMajorOrMinor, setKey, setPosition } from '../redux/keySlice'
import GameSettings from './GameSettings'

interface IGameMenuProps {
    start: () => void,
    running: boolean
}

const GameMenu: React.FC<IGameMenuProps> = ({ start, running }) => {

    const [ isSettingsModalOpen, setSettingsModalOpen ] = useState(false)

    const majorOrMinor = useSelector((state: RootState) => state.key.majorOrMinor)
    const key = useSelector((state: RootState) => state.key.key)
    const position = useSelector((state: RootState) => state.key.position)
    const dispatch = useDispatch()

    return (
        <Form>
            <Row>
                <Form.Group as={Col} controlId='gameMenuMajorOrMinor'>
                    <Form.Label>Major / Minor</Form.Label>
                    <Form.Select
                        value={majorOrMinor} 
                        onChange={(e) => { 
                            dispatch(setMajorOrMinor(e.target.value as 'major' | 'minor'))
                            dispatch(setKey(e.target.value === 'major' ? 'C' : 'A'))
                        }}>
                            <option value='major'>Major</option>
                            <option value='minor'>Minor</option>
                    </Form.Select>
                </Form.Group>
                <Form.Group as={Col} controlId='gameMenuKey'>
                    <Form.Label>Key</Form.Label>
                    <Form.Select value={key} onChange={(e) => dispatch(setKey(e.target.value))}>
                        { Object.keys(keys[majorOrMinor]).map(key => (
                            <option key={ key } value={ key }>
                                { /* @ts-ignore */ }
                                { key } { keys[majorOrMinor][key].semitones ? `(${ keys[majorOrMinor][key].semitones })` : null } 
                            </option>
                        ))}
                    </Form.Select>
                </Form.Group>
                <Form.Group as={Col} controlId='gameMenuPosition'>
                    <Form.Label>Position</Form.Label>
                    <Form.Select value={position} onChange={(e) => dispatch(setPosition(Number(e.target.value)))}>
                        { [...Array(12).keys()].map(i => (
                            <option key={i} value={i + 1}>
                                {i + 1}
                                { i === 0 && "st" }
                                { i === 1 && "nd" }
                                { i === 2 && "rd" }
                                { i > 2 && "th" }
                            </option>
                        ))}
                    </Form.Select>
                </Form.Group>
                <Form.Group as={Col} controlId='startButton'>
                    <Button onClick={ start } disabled={ running }>
                        Start
                    </Button>
                </Form.Group>
                <Form.Group as={Col} controlId='settingsButton'>
                    <Button onClick={() => setSettingsModalOpen(true)} variant={'secondary'}>
                        Settings
                    </Button>
                </Form.Group>
            </Row>
            <GameSettings isOpen={ isSettingsModalOpen } close={() => setSettingsModalOpen(false)}/>
        </Form>
    )
}

export default GameMenu