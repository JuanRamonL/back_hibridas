import { Navigate } from 'react-router-dom'

function Anonymous({ children }) {
    if(localStorage.getItem('token')){
        return <Navigate to={'/'} replace={true} />
    }
    return children
}

export default Anonymous