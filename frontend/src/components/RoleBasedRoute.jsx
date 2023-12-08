import { Navigate } from 'react-router-dom'

function RoleBasedRoute({ children }) {

    const getRol = localStorage.getItem('rol')

    if(getRol !== 'admin' && getRol !== 'editor'){
        return <Navigate to={'/'} replace={true} />
    }
    return children
}

export default RoleBasedRoute