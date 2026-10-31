import { Navigate, Outlet } from 'react-router-dom'
import { useAuth } from '../../context/AuthContext'

export default function PrivateRoute() {
    const { session } = useAuth()

    if (!session) {
        return <Navigate to="/login" replace />
    }

    return <Outlet />
}
