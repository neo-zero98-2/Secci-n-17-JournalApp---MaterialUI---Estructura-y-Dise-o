import React from 'react'
import { JournalLayout } from '../layout/JournalLayout'
import { NoteView, NothingSelectedView } from '../views'
import { IconButton } from '@mui/material'
import { AddOutlined } from '@mui/icons-material'
import { useDispatch, useSelector } from 'react-redux'
import { startNewNote } from '../../store';

export const JournalPage = () => {

  const dispatch = useDispatch();
  const { isSaving, active:hasActive } = useSelector(state => state.journal);

  const onClickNewNote = () => {
    dispatch(startNewNote());
  }

  return (
    <JournalLayout>
      {
        !!hasActive ? <NoteView/> : <NothingSelectedView />
      }

      <IconButton
        onClick={onClickNewNote}
        size='large'
        disabled={isSaving}
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
