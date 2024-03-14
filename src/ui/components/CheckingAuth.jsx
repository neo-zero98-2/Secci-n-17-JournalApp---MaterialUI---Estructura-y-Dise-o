import { CircularProgress, Grid } from '@mui/material'
import React from 'react'

export const CheckingAuth = () => {
  return (
    <Grid container
            spacing={0}
            direction='column'
            alignContent='center'
            justifyContent='center'
            sx={{ minHeight: '100vh' }} >
            <Grid item
                xs={3}
                sx={{ 
                    with: { sm: 450 }
                }}>
                    <CircularProgress color='warning'/>
            </Grid>
        </Grid>
  )
}
