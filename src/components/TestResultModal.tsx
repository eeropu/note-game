import React, { useEffect, useState } from 'react'
import { Button, Modal, Spinner } from 'react-bootstrap'
import { useSelector } from 'react-redux'
import useService from '../hooks/useService'
import { RootState } from '../redux/store'

interface ITestResultModalProps {
    startTime: number,
    finishTime: number,
    isOpen: boolean,
    close: () => void
}

const TestResultModal: React.FC<ITestResultModalProps> = ({ startTime, finishTime, isOpen, close }) => {

    const key = useSelector((state: RootState) => state.key.key)
    const majorOrMinor = useSelector((state: RootState) => state.key.majorOrMinor)
    const token = useSelector((state: RootState) => state.credentials.token)
    const [ previousBest, setPreviousBest ] = useState<any>(undefined)

    const { addResult, getResult } = useService()

    useEffect(() => {
        getResult(`${key}-${majorOrMinor}`, token).then(response => {
            setPreviousBest(response)
        }).catch(error => {
            setPreviousBest(null)
            if (error !== "Not found") {
                console.log(error)
            }
        })
    // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [key, majorOrMinor])

    const save = () => {
        addResult({
            key: `${key}-${majorOrMinor}`,
            time: (finishTime - startTime),
            date: new Date()
        }, token).then(response => {
            console.log(response)
        }).catch(error => {
            alert(error)
        })
    }

    const formatPreviousBest = () => {
        if (previousBest) {
            if (previousBest.time < (finishTime - startTime)) {
                return `Your record is ${formatTime(previousBest.time)} (${new Date(previousBest.date).toLocaleDateString()})`
            } else {
                return `Your previous record was ${formatTime(previousBest.time)} on (${new Date(previousBest.date).toLocaleDateString()})`
            }
        } else if (previousBest === undefined) {
            return <>Fetching previous record... <Spinner animation='border' size="sm"/></>
        } else {
            return null
        }
    }

    const formatTime = (time: number) => {
        const mins = Math.floor((time / 1000) / 60)
        const minsString = mins ? `${mins} min${mins > 1 ? "s" : ""}` : ""
        console.log((Math.floor(time * 1000) / 1000) % 60)
        const secondsString = `${Math.floor(((time / 1000) % 60) * 1000) / 1000} seconds`
        return  `${minsString} ${secondsString}`
    }

    return (
        <Modal show={isOpen} onHide={close} >
            <Modal.Header closeButton>
                <Modal.Title>Results</Modal.Title>
            </Modal.Header>
            <Modal.Body>
                <p>
                    Good job! You finished in { formatTime(finishTime - startTime) }.
                </p>
                <p>
                    { formatPreviousBest() }
                </p>
            </Modal.Body>
            <Modal.Footer>
                { (token && (previousBest === null || previousBest?.time > (finishTime - startTime))) && <Button onClick={save}>Save</Button> }
                <Button onClick={close}>Close</Button>
            </Modal.Footer>
        </Modal>
    )
}

export default TestResultModal