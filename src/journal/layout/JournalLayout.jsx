import { Box, Toolbar } from '@mui/material'
import React from 'react'
import { NavBar, SideBar } from '../components';

const DRAWER_WIDTH = 240;
// un layout es en onde se coloca el Grid inicial de algun contenido de componentes
export const JournalLayout = ({ children }) => {
  return (
    <Box sx={{ display: 'flex' }}>
      <NavBar drawerWidth={DRAWER_WIDTH}/>
      <SideBar drawerWidth={DRAWER_WIDTH}/>
      <Box sx={{ flexGrow: 1, p: 3 }}>
        <Toolbar/>
        {children}
      </Box>
    </Box>
  )
}
