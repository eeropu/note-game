import { login, createNewUser } from './../services/loginService'
import { addResult, getResult, getAllResults } from '../services/resultService'

const useService = () => {
    return { login, createNewUser, addResult, getResult, getAllResults }
}

export default useService