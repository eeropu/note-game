import React, { useState } from "react";
import { Alert, Button, Form, Modal } from "react-bootstrap";
import useService from "../hooks/useService";

interface ILoginProps {
    isOpen: boolean,
    close: () => void
}

const Login: React.FC<ILoginProps> = ({ isOpen, close }) => {

    const { login, createNewUser } = useService()

    const [newUser, setNewUser] = useState(false)
    const [username, setUsername] = useState("")
    const [password, setPassword] = useState("")
    const [repeatPassword, setRepeatPassword] = useState("")
    const [alert, setAlert] = useState("")

    const handleSubmit = () => {
        if (newUser) {
            if (password !== repeatPassword) {
                showAlert("Given passwords do not match!")
            } else {
                createNewUser({ username, password }).then(response => {
                    console.log(response)
                }).catch(error => {
                    showAlert(error.message)
                })
            }
        } else {
            login({ username, password }).then(response => {
                console.log(response)
            }).catch(error => {
                showAlert(error.message)
            })
        }
    }

    const showAlert = (content: string) => {
        setAlert(content)
        setTimeout(() => {
            setAlert("")
        }, 10000)
    }

    return (
        <Modal show={isOpen} onHide={close}>
            <Modal.Header closeButton>
                <Modal.Title>{ newUser ? "Create new user" : "Log in"}</Modal.Title>
            </Modal.Header>
            <Modal.Body>
                <Alert variant="danger" show={alert !== ""} onClose={() => setAlert("")} dismissible>
                    { alert }
                </Alert>
                <Form.Group className="mb-3">
                    <Form.Label>Username</Form.Label>
                    <Form.Control
                        type="text"
                        placeholder="Enter username"
                        value={username}
                        onChange={(e) => setUsername(e.target.value)}
                    />
                </Form.Group>
                <Form.Group className="mb-3">
                    <Form.Label>Password</Form.Label>
                    <Form.Control
                        type="password"
                        placeholder="Enter password"
                        value={password}
                        onChange={(e) => setPassword(e.target.value)}
                    />
                </Form.Group>
                { newUser &&
                    <Form.Group className="mb-3">
                        <Form.Label>Repeat password</Form.Label>
                        <Form.Control
                            type="password"
                            placeholder="Verify password"
                            value={repeatPassword}
                            onChange={(e) => setRepeatPassword(e.target.value)}
                        />
                    </Form.Group>
                }
                { newUser ?
                    <Button variant='link' onClick={() => setNewUser(false)}>Back</Button> :
                    <Button variant='link' onClick={() => setNewUser(true)}>New user</Button> 
                }
            </Modal.Body>
            <Modal.Footer>
                <Button onClick={handleSubmit} variant={"primary"}>
                    Accept
                </Button>
                <Button onClick={close} variant={"secondary"}>
                    Cancel
                </Button>
            </Modal.Footer>
        </Modal>
    )
}

export default Login