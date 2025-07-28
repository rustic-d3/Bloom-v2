import {Navigate} from 'react-router-dom'
import {jwtDecode} from 'jwt-decode'
import api from '../api'
import {ACCESS_TOKEN, ACCESS_TOKEN} from '../constants'
import {useState} from 'react'


function ProtectedRoute({children}) {
    const [isAuthorized, setIsAuthorized] = useState(null)

    const refreshToken = async() => {
        const refreshToken = localStorage.getItem(REFRESH_TOKEN)
        try{
            const response = await api.post('/api/token/refresh/', {refresh: refreshToken})
            if (response.status === 200) {
                localStorage.setItem(ACCESS_TOKEN, response.data.access)
            }


        }catch (error) {
            console.log(error)
            setIsAuthorized
        }

    }

    const auth = async() => {
        const token = localStorage.getItem(ACCESS_TOKEN)
        if (!token) {
            setIsAuthorized(false)
            return
        }

        const decoded = jwtDecode(token)
        const tokenExpiration = decoded.exp
        const currentTime = Date.now() / 1000

        if (tokenExpiration < currentTime) {
            await refreshToken()
        }
        else {
            setIsAuthorized(true)
        }




    }

    if (isAuthorized === null) {
        return <div>Loading...</div>
    }
    return isAuthorized ? children : <Navigate to="/login"/> 

}

export default ProtectedRoute