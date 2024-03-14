import { Alert, Button, Grid, Link, TextField, Typography } from "@mui/material"
import { AuthLayout } from "../layout/AuthLayout"
import { Link as RouterLink } from 'react-router-dom'
import { useForm } from "../../hooks/useForm"
import { useMemo, useState } from "react"
import { useDispatch, useSelector } from "react-redux"
import { startCreatingUserWithEmailAndPassword } from "../../store/auth/thunk"

const formData = {
  displayName: '',
  email: '',
  password: ''
}

// validador de errores
const formValidations = {
  email: [(value) => value.includes('@'), 'El correo debe tener un @' ],
  password: [(value) => value.length >= 6, 'El password debe tener más de 6 letras'],
  displayName: [ (value) => value.length >= 1, 'El nombre es obligatorio' ]
}

export const RegisterPage = () => {
  const { 
    displayName, 
    email, 
    password, 
    onInputChange, 
    formState,
    isFormValid,
    displayNameValid,
    emailValid,
    passwordValid,
  } = useForm(formData, formValidations);

  const [isFormSubmited, setIsFormSubmited] = useState(false);
  const dispatch = useDispatch();

  const { status, errorMessage } = useSelector( state => state.auth);
  const isCheckingAuthentication = useMemo( () => status === 'checking', [status] );

  
  const onSubmit = (e) => {
    e.preventDefault();
    setIsFormSubmited(true);

    if(!isFormValid) return;
    dispatch(startCreatingUserWithEmailAndPassword(formState))
    console.log(formState);
  }

  return (
    <AuthLayout title='Registro'>
      <form onSubmit={onSubmit}>
        <Grid container>
          <Grid item xs={12} sx={{ mt: 2 }}>
            <TextField
              label="Nombre Label"
              type='text'
              placeholder='Jonh Doe'
              name="displayName"
              value={displayName}
              onChange={onInputChange}
              fullWidth
              error={!!displayNameValid && isFormSubmited}
              helperText={isFormSubmited && displayNameValid}
            />
          </Grid>

          <Grid item xs={12} sx={{ mt: 2 }}>
            <TextField
              label="Correo"
              type='email'
              placeholder='email@example.com'
              name="email"
              value={email}
              onChange={onInputChange}
              fullWidth
              error={!!emailValid && isFormSubmited}
              helperText={isFormSubmited && emailValid}
            />
          </Grid>

          <Grid item xs={12} sx={{ mt: 2 }}>
            <TextField
              label="Contraseña"
              type='password'
              placeholder='Contraseña'
              name="password"
              value={password}
              onChange={onInputChange}
              fullWidth
              error={!!passwordValid && isFormSubmited}
              helperText={isFormSubmited && passwordValid}
            />
          </Grid>

          {/* <Grid item xs={12} sx={{ mt: 2 }}>
            <TextField
              label="Contraseña"
              type='password'
              placeholder='Contraseña'
              name="password"
              value={password}
              onChange={onInputChange}
              fullWidth
            />
          </Grid> */}

          <Grid container spacing={2} sx={{ mb: 2, mt: 1 }} justifyContent='center'>
            <Grid 
              item 
              xs={12}
              display={ !!errorMessage ? '' :  'none'}
              >
              <Alert severity="error">{ errorMessage }</Alert>
            </Grid>
            <Grid item xs={12} sm={6}>
              <Button 
                disabled={isCheckingAuthentication}
                type="submit" 
                variant='contained'
                fullWidth>
                Crear una cuenta
              </Button>
            </Grid>
          </Grid>

          <Grid container direction='row' justifyContent='end'>
            <Typography sx={{ mr: 1 }}>¿ya tienes cuenta?</Typography>
            <Link component={RouterLink} color='inherit' to='/auth/login'>
              ingresar
            </Link>
          </Grid>
        </Grid>
      </form>
    </AuthLayout>
  )
}
