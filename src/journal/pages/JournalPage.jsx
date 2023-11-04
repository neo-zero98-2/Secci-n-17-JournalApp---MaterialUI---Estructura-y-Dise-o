import React from 'react'
import { JournalLayout } from '../layout/JournalLayout'
import { NothingSelectedView } from '../views'
import { IconButton } from '@mui/material'
import { AddOutlined } from '@mui/icons-material'

export const JournalPage = () => {
  return (
    <JournalLayout>
      <NothingSelectedView />
      {/* <NoteView/> */}
      <IconButton
        size='large'
        sx={{
          color: 'white',
          backgroundColor: 'error.main',
          position: 'absolute',
          right: 50,
          bottom: 50,
          '&:hover': {
            backgroundColor: 'error.main',
            opacity: 0.9,
          }
        }}>
          <AddOutlined sx={{ fontSize: 30 }}/>
      </IconButton>
    </JournalLayout>
  )
}
