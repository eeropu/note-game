import axios from "axios"
const baseURL = "/api"

interface ICredentials {
    username: string,
    password: string
}

export const login = (payload: ICredentials) => (
    axios.post(`${baseURL}/login`, payload)
        .then(response => response.data)
        .catch(error => { throw new Error(error.response.data.error) })
)

export const createNewUser = (payload: ICredentials) => (
    axios.post(`${baseURL}/user`, payload)
        .then(response => response.data)
        .catch(error => { throw new Error(error.response.data.error)})
)