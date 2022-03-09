import React from 'react'
import { Button, Modal } from 'react-bootstrap'

interface ITestResultModalProps {
    startTime: number,
    finishTime: number,
    isOpen: boolean,
    close: () => void
}

const TestResultModal: React.FC<ITestResultModalProps> = ({ startTime, finishTime, isOpen, close }) => {
    return (
        <Modal show={isOpen} onHide={close} >
            <Modal.Header closeButton>
                <Modal.Title>Results</Modal.Title>
            </Modal.Header>
            <Modal.Body>
                Good job! You finished in { (finishTime - startTime) / 1000 } seconds.
            </Modal.Body>
            <Modal.Footer>
                <Button onClick={close}>Close</Button>
            </Modal.Footer>
        </Modal>
    )
}

export default TestResultModal