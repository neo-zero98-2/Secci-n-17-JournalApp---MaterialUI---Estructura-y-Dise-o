import { TurnedInNot } from '@mui/icons-material'
import { Box, Grid, ListItem, ListItemButton, ListItemIcon, ListItemText } from '@mui/material'
import React from 'react'
import { currentNote } from '../../store/journal/thunks'
import { useDispatch } from 'react-redux'

export const SideBarItem = ({ note }) => {

    const dispatch = useDispatch();
    const onClickNote = () => dispatch(currentNote(note));

    return (
        <ListItem disablePadding>
            <ListItemButton onClick={onClickNote}>
                <ListItemIcon>
                    <TurnedInNot />
                </ListItemIcon>
                <Grid container>
                    <Box  width={150}>
                        <ListItemText sx={{
                            '&.MuiTypography-root, &.MuiListItemText-primary, &.MuiListItemText-root': {
                                whiteSpace: 'nowrap',
                                overflow: 'hidden',
                                textOverflow: 'ellipsis'
                            }
                        }}
                        primary={note.title} />
                    </Box>
                    <ListItemText secondary={note.body} />
                </Grid>
            </ListItemButton>
        </ListItem>
    )
}
