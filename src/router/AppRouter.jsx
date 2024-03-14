import { Route, Routes } from 'react-router-dom'
import { AuthRoutes } from '../auth/routes/AuthRoutes'
import { JournalRoutes } from '../journal/routes/JournalRoutes'
import { CheckingAuth } from '../ui'
import { usecheckAuth } from '../hooks'

export const AppRouter = () => {

  const { status } = usecheckAuth();

  if(status === 'checking') {
    return <CheckingAuth/>;
  }

  return (
    <Routes>
      {
        (status === 'authenticated') ? 
        <Route path='/*' element={ <JournalRoutes/> }/> :  /* cualquier ruta que coincida con / renderizara el <JorunaRoutes/> */ 
        <Route path='/auth/*' element={ <AuthRoutes/> }/> /* cualquier ruta que coincida con /auth va a utilizar el router <AuthRoutes/> */ 
      }
      <Route path='/*' element={ <AuthRoutes/> }/>
    </Routes>
  )
}
