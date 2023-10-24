import React from 'react'
import { Navigate } from 'react-router-dom'

const PublicRoutes = ({ children }) => {
    if ((localStorage.getItem('UserToken'))||(localStorage.getItem('AdminToken'))) {
        return <Navigate to='/Products' />
        
    } else {
        return children;
    }
}

export default PublicRoutes
