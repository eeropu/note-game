import axios from 'axios'
const baseURL = "http://localhost:3001/api"

interface IResult {
    key: string,
    time: number,
    date: Date
}

export const addResult = (payload: IResult, token: string) => (
    axios.post(`${baseURL}/result`, payload,
        {
            headers: {
                authorization: `Bearer ${token}`
            }
        }).then(response => response.data)
        .catch(error => { throw new Error(error.response.data.error)})
)

export const getResult = (key: string, token: string) => (
    axios.get(`${baseURL}/result/${key}`,
        {
            headers: {
                authorization: `Bearer ${token}`
            }
        }).then(response => response.data)
        .catch(error => { throw new Error(error.response.data.error)})
)