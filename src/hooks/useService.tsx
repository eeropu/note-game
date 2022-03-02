import { login, createNewUser } from './../services/loginService'

const useService = () => {
    return { login, createNewUser }
}

export default useService