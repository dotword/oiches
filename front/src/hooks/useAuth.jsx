import { useContext } from 'react'
import { AuthContext } from '../context/auth/auth.context.jsx'

const useAuth = () => {
    return useContext(AuthContext)
}

export default useAuth
