import { LogoutOutlined, MenuOutlined } from '@mui/icons-material'
import { AppBar, Grid, IconButton, Toolbar, Typography } from '@mui/material'
import React from 'react'
import { useDispatch } from 'react-redux'
import { startLogout } from '../../store/auth/thunk'

export const NavBar = ({ drawerWidth=240 }) => {

    const dispatch = useDispatch();
    const onLogout = () => {
        dispatch(startLogout());
    }


  return (
    <AppBar 
        position='fixed'
        sx={{ 
            width: { sm: `calc(100% - ${drawerWidth}px)` },
            ml: { sm: `${ drawerWidth }px` }
         }}>
            <Toolbar>
                <IconButton
                    color='inherit'
                    edge='start'
                    sx={{ mr: 2, display: { sm: 'none' } }}> {/* si es tamaño sm el botoiconButton  no se muestra, de l o contrario se va a mostrar */}
                    <MenuOutlined/>
                </IconButton>

                <Grid container direction='row' justifyContent='space-between' alignItems='center'>
                    <Typography variant='h6' noWrap component='div'>JournalApp</Typography>
                    <IconButton 
                        onClick={onLogout}
                        color='error'>
                        <LogoutOutlined/>
                    </IconButton>

                </Grid>
            </Toolbar>

    </AppBar>
  )
}
