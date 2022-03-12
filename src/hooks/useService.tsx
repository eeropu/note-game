import { login, createNewUser } from './../services/loginService'
import { addResult, getResult } from '../services/resultService'

const useService = () => {
    return { login, createNewUser, addResult, getResult }
}

export default useService