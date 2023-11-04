import { StarOutline } from "@mui/icons-material"
import { Grid, Typography } from "@mui/material"

export const NothingSelectedView = () => {
  return (
    <Grid container
    spacing={0}
    direction='column'
    alignContent='center'
    justifyContent='center'
    // textAlign='center'
    alignItems='center'
    sx={{ 
        minHeight: 'calc(100vh - 100px)', 
        backgroundColor: 'primary.main',
        borderRadius: 5
     }} >

        <Grid item xs={12}>
            <StarOutline sx={{ fontSize: 100, color:'white' }}/>
        </Grid>

        <Grid item xs={12}>
            <Typography color='white' variant="h5">
                Seleciona o crea una estrella
            </Typography>
        </Grid>

    </Grid>
  )
}
