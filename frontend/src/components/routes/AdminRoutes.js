import React from 'react'
import { Navigate } from 'react-router-dom'

const PublicRoutes = ({ children }) => {
    if ((localStorage.getItem('AdminToken'))) {
        return <Navigate to='/Addproducts' />

    } else {
        return children;
    }
}

export default PublicRoutes
