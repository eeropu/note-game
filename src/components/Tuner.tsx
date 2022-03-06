import React, { useState } from "react";
import usePitchy from "../hooks/usePitchy";
import { Container, Row, Button, Col } from 'react-bootstrap';
import { Range } from 'react-range'
import TunerGraphics from './TunerGraphics'

import './../styles/tuner.scss'
import { useDispatch, useSelector } from "react-redux";
import { setClarityThreshold } from "../redux/settingsSlice";
import { RootState } from "../redux/store";

const Tuner: React.FC = () => {

    const clarityThreshold = useSelector((state: RootState) => state.settings.clarityThreshold)
    const dispatch = useDispatch()

    const { start, stop, pitch, clarity, note, deviation, running } = usePitchy(clarityThreshold)

    return (
        <Container className={'tuner'}>
            <Row>
                <h2>Tuner</h2>
            </Row>
            <Row>
                <Col>
                    <Row className="tuner-row-center">
                        <h4>Adjust microphone sensitivity</h4>
                    </Row>
                    <Row className="tuner-row-left">
                        Record clarity: { clarity }
                    </Row>
                    <Row className="tuner-row-left">
                        Threshold: { clarityThreshold }
                    </Row>
                    <Row className="tuner-row-center tuner-clarity-range">
                        <Range
                            step={1}
                            min={0}
                            max={100}
                            values={ [clarityThreshold] }
                            onChange={(values) => dispatch(setClarityThreshold(values[0]))}
                            renderTrack={({ props, children }) => (
                                <div
                                    {...props}
                                    style={{
                                        ...props.style,
                                        height: '6px',
                                        width: '300px',
                                        backgroundColor: '#ccc'
                                    }}
                                >
                                    {children}
                                </div>
                            )}
                            renderThumb={({ props }) => (
                                <div
                                    {...props}
                                    style={{
                                        ...props.style,
                                        height: '21px',
                                        width: '21px',
                                        backgroundColor: '#999'
                                    }}
                                />
                            )}
                        />
                    </Row>
                    <Row className="tuner-row-left tuner-button-row">
                        <Button disabled={ running } className='tuner-button-row-start' onClick={start}>Start</Button>
                        <Button disabled={ !running } className='tuner-button-row-stop' onClick={stop}>Stop</Button>
                    </Row>
                </Col>
                <Col>
                    <TunerGraphics pitch={ pitch } note={ note } deviation={ deviation } running={ running }/>
                </Col>
            </Row>
        </Container>
    )
}

export default Tuner