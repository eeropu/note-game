import React from "react"
import { Button, Form, Modal, Row, Table } from "react-bootstrap"
import { useDispatch, useSelector } from "react-redux"
import useImages from "../hooks/useImages"
import { RootState } from "../redux/store"
import { setDisplayType } from './../redux/settingsSlice'
import TooltipHelper from "./TooltipHelper"
import Tuner from "./Tuner"

interface IGameSettingsProps {
    isOpen: boolean,
    close: () => void
}

const GameSettings: React.FC<IGameSettingsProps> = ({ isOpen, close }) => {

    const displayType = useSelector((state: RootState) => state.settings.displayType)
    const dispatch = useDispatch()

    const images = useImages()
    const textNoteImage = images.textNoteImages["text_note_C4"]
    const musicalNotationImage = images.otherImages.musical_notation_example

    return (
        <Modal show={isOpen} onHide={close} size={"lg"}>
            <Modal.Header closeButton>
                <Modal.Title>Settings</Modal.Title>
            </Modal.Header>
            <Modal.Body>
                <Row className={"settings-modal-section-header"}>
                    <h6>Display type <TooltipHelper content="Notes can be shown as text or musical notation"/></h6>
                </Row>
                <Row>
                    <Table className="settings-table" size="sm" borderless>
                        <tbody>
                            <tr>
                                <td className="w-20">
                                    <img src={textNoteImage} 
                                        width={"60px"} 
                                        alt={"text note example"}
                                        onClick={() => dispatch(setDisplayType('text'))}
                                    />
                                </td>
                                <td className="w-20">
                                    <img src={musicalNotationImage} 
                                        width={"80px"} 
                                        alt={"musical notation example"}
                                        onClick={() => dispatch(setDisplayType('musical'))}
                                    />
                                </td>
                                <td className="w-50">
                                    <p className="m-b-0 p-l-10 p-r-10" style={{fontSize: "14px"}} onClick={() => dispatch(setDisplayType('test'))}>
                                        Play 20 randomly selected note as fast as you can to test your skills. 
                                        If you are signed in the result is saved and you can view your 
                                        development on my progress page.
                                    </p>
                                </td>
                            </tr>
                            <tr>
                                <td>
                                    <Form.Check
                                        label="Text"
                                        name="displayType"
                                        type="radio"
                                        id={`displayType-1`}
                                        checked={displayType === "text"}
                                        onChange={() => dispatch(setDisplayType('text'))}
                                    />
                                </td>
                                <td>
                                    <Form.Check
                                        label="Musical notation"
                                        name="displayType"
                                        type="radio"
                                        id={`displayType-2`}
                                        checked={displayType === "musical"}
                                        onChange={() => dispatch(setDisplayType('musical'))}
                                    />
                                </td>
                                <td>
                                    <Form.Check
                                        label="Test my skills"
                                        name="displayType"
                                        type="radio"
                                        id={`displayType-3`}
                                        checked={displayType === "test"}
                                        onChange={() => dispatch(setDisplayType('test'))}
                                    />
                                </td>
                            </tr>
                        </tbody>
                    </Table>
                </Row>
                <Row className="settings-modal-section-header">
                    <h6>Check tuning and adjust clarity threshold <TooltipHelper content="Use the slider to adjust clarity threshold. Higher threshold will filter unwanted noices better, but may also couse problems detecting the note you played"/></h6>
                </Row>
                <Row>
                    <Tuner/>
                </Row>
            </Modal.Body>
            <Modal.Footer>
                <Button onClick={close} variant={"primary"}>
                    Close
                </Button>
            </Modal.Footer>
        </Modal>
    )
}

export default GameSettings