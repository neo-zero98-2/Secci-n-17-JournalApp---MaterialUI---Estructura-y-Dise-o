import React from 'react'
import { Navigate, Route, Routes } from 'react-router-dom'
import { LoginPage, RegisterPage } from '../pages'

export const AuthRoutes = () => {

  return (
    <Routes>
        <Route  path='login' element={ <LoginPage/> }/>
        <Route path='register' element={ <RegisterPage/> } />

        <Route path='/*' element={ <Navigate to='/auth/login'/> } /> { /* cualquier ruta que no coincida con login o register se redirigira a /auth/login */ }
    </Routes>
  )
}
