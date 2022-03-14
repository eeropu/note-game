import React from 'react'
import { Col, Container, Row, Table } from 'react-bootstrap'
import { BsFillMicMuteFill, BsInfoCircle } from 'react-icons/bs'
import { Link } from 'react-router-dom'
import useImages from '../hooks/useImages'
import TooltipHelper from './TooltipHelper'

const FrontPage: React.FC = () => {

    const images = useImages().otherImages

    return (
        <Container>
            <Row>
                <h1>Welcome to Note game</h1>
            </Row>
            <Row>
                <p> {/* Basic info about the site */}
                    When it comes to note knowledge, it's quite common that guitarists don't
                    know their instrument as well as other mucisians know their's. Here you can
                    practice your knowledge of the guitar's fretboard.
                </p>
            </Row>
            <Row>
                <h2>About the game</h2>
            </Row>
            <Row style={{marginBottom: '30px'}}>
                <Col md={7}>
                    <h4>Basics</h4>
                    <p> {/* How to play */}
                        The player first selects the key and position of the fretboard that will be used.
                        The game randomly draws notes from the given range and the player plays them in the
                        given order. When note is played correctly it will be removed from the shown list of
                        notes and new note is added to the end. There are two modes that can be used when
                        playing: text notes and musical notation. Examples of these are on the right.
                    </p>
                    <h4>Allowing permissions</h4>
                    <p> { /* instructions how to allow microphone usage on different browsers*/ }
                        This website needs the permission to use microphone for the game to work.
                        Microphone input is only used to process the pitch and detect the note that
                        is being played. Further information about the tool used to process the audio
                        input can be found <a href='https://ianjohnson.dev/pitchy/'>here</a>. Instructions
                        on how to allow microphone usage on verified browsers are on the following table.
                    </p>
                </Col>
                <Col md={5}> {/* pictures about the game */}
                    <img src={images.musical_notation_included} alt='game modes example' width={'100%'}/>
                </Col>
            </Row>
            <Row>
                <Table striped bordered hover className='m-l-20 m-r-20 m-b-30'>
                    <thead>
                        <tr>
                            <th>Browser</th>
                            <th>First time starting</th>
                            <th>If permission has been denied</th>
                        </tr>
                    </thead>
                    <tbody>
                        <tr>
                            <td className='w-8'>
                                <TooltipHelper 
                                    content='Google Chrome' 
                                    image={{
                                        src: 'https://cdn.pixabay.com/photo/2016/04/13/14/27/google-chrome-1326908_1280.png',
                                        alt: 'chrome logo'
                                    }}
                                />
                            </td>
                            <td className='w-27' rowSpan={2}>Click allow when asked for permission to use microphone</td>
                            <td className='w-25'>
                                <ul>
                                    <li>Click the <BsInfoCircle/> icon left of the URL</li>
                                    <li>Toggle microphone permission to allowed</li>
                                </ul>
                            </td>
                        </tr>
                        <tr>
                            <td className='w-8'>
                                <TooltipHelper 
                                    content='Mozilla firefox' 
                                    image={{
                                        src: 'https://upload.wikimedia.org/wikipedia/commons/thumb/a/a0/Firefox_logo%2C_2019.svg/1200px-Firefox_logo%2C_2019.svg.png',
                                        alt: 'firefox logo'
                                    }}
                                />
                            </td>
                            <td className='w-25'>
                                <ul>
                                    <li>Click the <BsFillMicMuteFill/> icon left of the URL</li>
                                    <li>Remove block from the opened dialog</li>
                                    <li>Refresh the page and allow permission when requested</li>
                                </ul>
                            </td>
                        </tr>
                    </tbody>
                </Table>
            </Row>
            <Row>
                <h4>Tuning and microphone sensitivity</h4>
            </Row>
            <Row>
                <p>
                    The game assumes that standard tuning is used. If the guitar is tuned differently,
                    the position selection does not reflect the correct notes to be played. Player 
                    should check the tuning of the guitar to ensure that the game works properly. Separate
                    tuner is more reliable, but the <Link to={'/tuner'}>included tuner</Link> can also be 
                    used. The clarity threshold can also be adjusted from the included tuner. The higher the 
                    threshold, the stricter the pitch detection is. This means that if the threshold is high, 
                    the note needs to be played louder for it to be detected. The benefit is that it filters 
                    out unwanted sounds such as computers fan noice etc. Generally, if you have a good 
                    (preferably external) microphone and relatively silent computer, you can set the 
                    threshold lower. The default value is 90/100.
                </p>
            </Row>
        </Container>
    )
}

export default FrontPage