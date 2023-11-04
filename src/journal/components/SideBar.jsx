import { TurnedInNot } from '@mui/icons-material'
import { Box, Divider, Drawer, Grid, List, ListItem, ListItemButton, ListItemIcon, ListItemText, Toolbar, Typography } from '@mui/material'

export const SideBar = ({ drawerWidth=240 }) => {
  return (
    <Box 
        component='nav'
        sx={{ width: { sm: drawerWidth }, flexShrink: { sm: 0 }}}>
            <Drawer
                variant='permanent'
                open
                sx={{
                    display: { xs: 'block' },
                    '& .MuiDrawer-paper': {
                        boxSizing: 'border-box',
                        width: drawerWidth
                    }
                }}>
                    <Toolbar>
                        <Typography variant='h6' noWrap component='div'>
                            Caleb Hernández
                        </Typography>
                    </Toolbar>
                    <Divider/>


                    <List>
                        {
                            ['Enero', 'Febrero', 'Abril'].map( (text, index) => (
                                <ListItem key={index} disablePadding>
                                    <ListItemButton>
                                        <ListItemIcon>
                                            <TurnedInNot/>
                                        </ListItemIcon>
                                        <Grid container>
                                            <ListItemText primary={ text }/>
                                            <ListItemText secondary='Lorem ipsum dolor sit amet consectetur adipisicing elit. Magni, possimus. Quibusdam odit accusamus'/>
                                        </Grid>
                                    </ListItemButton>  
                                </ListItem>
                            ))
                        }
                    </List>

                     

            </Drawer>    
        
    </Box>
  )
}
