import React from 'react'
import { Button, Col, Form, Row } from 'react-bootstrap'
import { keys } from './../data/keys'
import { RootState } from '../redux/store'
import { useSelector, useDispatch } from 'react-redux'
import { setMajorOrMinor, setKey } from '../redux/keySlice'

const GameMenu = () => {

    const majorOrMinor = useSelector((state: RootState) => state.key.majorOrMinor)
    const key = useSelector((state: RootState) => state.key.key)
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
                            dispatch(setKey(''))
                        }}>
                            <option value='major'>Major</option>
                            <option value='minor'>Minor</option>
                    </Form.Select>
                </Form.Group>
                <Form.Group as={Col} controlId='gameMenuKey'>
                    <Form.Label>Key</Form.Label>
                    <Form.Select value={key} onChange={(e) => dispatch(setKey(e.target.value))}>
                        <option disabled={true} hidden={true} value=''>- Select -</option>
                        { keys[majorOrMinor].map(key => <option key={ key } value={ key.split(' ')[0] }>{ key }</option>) }
                    </Form.Select>
                </Form.Group>
                <Form.Group as={Col} controlId='startButton'>
                    <Button onClick={() => console.log('started')}>
                        Start
                    </Button>
                </Form.Group>
            </Row>
        </Form>
    )
}

export default GameMenu