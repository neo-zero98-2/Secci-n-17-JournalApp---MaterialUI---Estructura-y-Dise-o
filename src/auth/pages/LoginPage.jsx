import React, { useMemo } from 'react'
import { Grid, Typography, TextField, Button, Link, Alert } from '@mui/material'
import { Google } from '@mui/icons-material'
import { Link as RouterLink } from 'react-router-dom'
import { AuthLayout } from '../layout/AuthLayout'
import { useForm } from '../../hooks'
import { checkingAuthentication, startGoogleSignIn, startLoginWithEmailPassword } from '../../store/auth'
import { useDispatch, useSelector } from 'react-redux'
 
export const LoginPage = () => {

  const dispatch = useDispatch();
  const { status, errorMessage } = useSelector(state => state.auth);
  const isAuthenticating = useMemo(() => status === 'checking', [status])

  const { email, password, onInputChange } = useForm({
    email: '',
    password: ''
  });

  const onSubmit = (event) => {
    event.preventDefault();
    // dispatch(checkingAuthentication(email, password))
    dispatch(startLoginWithEmailPassword({ email, password }));
  }

  const onGoogleSignIn = () => {
    dispatch(startGoogleSignIn());
  }

  return (
    <>
      <AuthLayout title='Login'>
        <form onSubmit={onSubmit}>
          <Grid container>
            <Grid item xs={12} sx={{ mt: 2 }}>
              <TextField
                label="Correo"
                type='email' 
                placeholder='correo@algo.com'
                fullWidth
                name='email'
                value={email}
                onChange={onInputChange}
              />
            </Grid>

            <Grid item xs={12} sx={{ mt: 2 }}>
              <TextField
                label="Contraseña"
                type='password'
                placeholder='Contraseña'
                fullWidth
                name='password'
                value={password}
                onChange={onInputChange}
              />
            </Grid>

            <Grid container spacing={2} sx={{ mb: 2, mt: 1 }}>
              <Grid 
                item 
                xs={12}
                display={ !!errorMessage ? '' : 'none' }
                >
                <Alert severity="error">{ errorMessage }</Alert>
              </Grid>
              <Grid item xs={12} sm={6}>
                <Button 
                  disabled={isAuthenticating} 
                  type='submit' 
                  variant='contained'
                  fullWidth>
                  Login
                </Button>
              </Grid>
              <Grid item xs={12} sm={6}>
                <Button 
                  disabled={isAuthenticating} 
                  onClick={onGoogleSignIn} 
                  variant='contained'
                  fullWidth>
                  <Google />
                  <Typography sx={{ ml: 1 }}> Google </Typography>
                </Button>
              </Grid>

              <Grid container direction='row' justifyContent='end' mt={1}>
                <Link 
                  component={RouterLink} 
                  color='inherit' 
                  to='/auth/register'>
                  Crear una cuenta
                </Link>
              </Grid>

            </Grid>
          </Grid>
        </form>
      </AuthLayout>
    </>
  )
}
