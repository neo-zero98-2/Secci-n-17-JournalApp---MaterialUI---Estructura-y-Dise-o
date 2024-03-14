import { Grid, Typography } from '@mui/material'
import React from 'react'

export const AuthLayout = ({ children, title = '' }) => {
    return (
        <Grid container
            className='animate__animated animate__fadeIn animate__faster'
            spacing={0}
            direction='column'
            alignContent='center'
            justifyContent='center'
            sx={{ minHeight: '100vh' }} >
            <Grid item
                className='box-shadow'
                xs={3}
                sx={{ 
                    // with: { xs: '60%', sm: '10%' },
                    backgroundColo: 'white', 
                    padding: 3, 
                    borderRadius: 2 
                }}>
                <Typography variant="h5" sx={{ mb: 1 }}>{ title }</Typography>
                { children }
            </Grid>
        </Grid>
    )
}
