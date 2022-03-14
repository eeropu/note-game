import axios from 'axios'
import { keys } from './../data/keys'
const baseURL = "/api"

interface IResult {
    key: string,
    position: number,
    time: number,
    date: Date,
    user?: string
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

export const getAllResults = (token: string) => (
    axios.get(`${baseURL}/results`,
    {
        headers: {
            authorization: `Bearer ${token}`
        }
    }).then(response => parseResults(response.data))
    .catch(error => { throw new Error(error.response.data.error)})
)

export const getResult = (key: string, position: number, token: string) => (
    axios.get(`${baseURL}/result/${key}/${position}`,
        {
            headers: {
                authorization: `Bearer ${token}`
            }
        }).then(response => response.data)
        .catch(error => { throw new Error(error.response.data.error)})
)


const parseResults = (data: any[]) => {
    const result = { major: {}, minor: {} }
    Object.keys(keys.major).forEach((key: string) => {
        const emptyPositions = {
            1: "-", 2: "-", 3: "-", 4: "-", 5: "-", 6: "-", 7: "-", 8: "-", 9: "-", 10: "-", 11: "-", 12: "-"
        }
        // @ts-ignore
        result.major[key] = emptyPositions
    })
    // @ts-ignore
    Object.keys(keys.minor).forEach((key: string) => {
        const emptyPositions = {
            1: "-", 2: "-", 3: "-", 4: "-", 5: "-", 6: "-", 7: "-", 8: "-", 9: "-", 10: "-", 11: "-", 12: "-"
        }
        // @ts-ignore
        result.minor[key] = emptyPositions
    })

    data.forEach(item => {
        const [key, majorOrMinor] = item.key.split('-')
        // @ts-ignore
        result[majorOrMinor][key][item.position] = {
            time: item.time,
            date: item.date
        }
    })

    return result
}