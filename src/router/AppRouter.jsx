import React from 'react'
import { Route, Routes } from 'react-router-dom'
import { AuthRoutes } from '../auth/routes/AuthRoutes'
import { JournalRoutes } from '../journal/routes/JournalRoutes'

export const AppRouter = () => {
  return (
    <Routes>
        <Route path='/auth/*' element={ <AuthRoutes/> }/> { /* cualquier ruta que coincida con /auth va a utilizar el router <AuthRoutes/> */ }
        <Route path='/*' element={ <JournalRoutes/> }/> { /* cualquier ruta que coincida con / renderizara el <JorunaRoutes/> */ }
    </Routes>
  )
}
