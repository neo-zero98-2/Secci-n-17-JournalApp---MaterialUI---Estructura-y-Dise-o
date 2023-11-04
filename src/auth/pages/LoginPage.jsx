import React from 'react'
import { Grid, Typography, TextField, Button, Link } from '@mui/material'
import { Google } from '@mui/icons-material'
import { Link as RouterLink } from 'react-router-dom'
import { AuthLayout } from '../layout/AuthLayout'
export const LoginPage = () => {
  return (
    <>
      <AuthLayout title='Login'>
        <form>
          <Grid container>
            <Grid item xs={12} sx={{ mt: 2 }}>
              <TextField
                label="Correo"
                type='email' 
                placeholder='correo@algo.com'
                fullWidth
              />
            </Grid>

            <Grid item xs={12} sx={{ mt: 2 }}>
              <TextField
                label="Contraseña"
                type='password'
                placeholder='Contraseña'
                fullWidth
              />
            </Grid>

            <Grid container spacing={2} sx={{ mb: 2, mt: 1 }}>
              <Grid item xs={12} sm={6}>
                <Button variant='contained'
                  fullWidth>
                  Login
                </Button>
              </Grid>
              <Grid item xs={12} sm={6}>
                <Button variant='contained'
                  fullWidth>
                  <Google />
                  <Typography sx={{ ml: 1 }}> Google </Typography>
                </Button>
              </Grid>

              <Grid container direction='row' justifyContent='end' mt={1}>
                <Link component={RouterLink} color='inherit' to='/auth/register'>
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
