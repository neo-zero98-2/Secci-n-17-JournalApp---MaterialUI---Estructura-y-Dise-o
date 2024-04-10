import { DeleteOutline, SaveOutlined, UploadOutlined } from '@mui/icons-material'
import { Button, Grid, TextField, Typography, IconButton } from '@mui/material'
import { ImageGallery } from '../components'
import { useDispatch, useSelector } from 'react-redux'
import { useForm } from '../../hooks'
import { useEffect, useMemo, useRef } from 'react'
import { currentNote, startDeletingNote, startSaveNote, startUploadFiles } from '../../store'
import Swal from 'sweetalert2'

export const NoteView = () => {

  const dispatch = useDispatch();
  const { active:note, messageSaved, isSaving } = useSelector(state => state.journal);
  const { body, title, date, onInputChange, formState } = useForm(note);
  const fileInputRef = useRef();

  const dateString = useMemo(() => {
    const newDate = new Date(date);
    return newDate.toUTCString();
  }, [date]);

  const onSaveNote = () => {
    dispatch(startSaveNote());
  }

  const onFileInputchange = ({target}) => {
    dispatch(startUploadFiles(target.files));
  }

  const onDelete = () => {
    dispatch(startDeletingNote())
  }

  useEffect(() => {
    dispatch(currentNote(formState));
  }, [formState]);

  useEffect(() => {
    if(messageSaved.length > 0) {
      Swal.fire({
        title: "Nota actualizada",
        text: messageSaved,
        icon: "success"
      });
    }
  }, [messageSaved])

  return (
    <Grid
      container direction='row'
      alignItems='center'
      justifyContent='space-between'
      sx={{ mb: 1 }}
      className='animate__animated animate__fadeIn animate__faster'>
      <Grid item>
        <Typography fontSize={39} fontWeight='light'>
          {dateString}
        </Typography>
      </Grid>
      <Grid item>
        <input
          type='file'
          multiple
          onChange={onFileInputchange}
          style={{ display: 'none' }}
          ref={fileInputRef}
        />

        <IconButton
          color='primary'
          disabled={isSaving}
          onClick={ () => fileInputRef.current.click() }
        >
          <UploadOutlined/>
        </IconButton>
        <Button 
          onClick={onSaveNote} 
          sx={{ padding: 2 }}
          disabled={isSaving}
          >
          <SaveOutlined sx={{ fontSize: 30, mr: 1 }} />
          Guardar
        </Button>
      </Grid>

      <Grid container>
        <TextField
          type='text'
          variant='filled'
          fullWidth
          placeholder='Ingrese un título'
          label='Título'
          sx={{ border: 'none', mb: 1 }}
          name='title'
          value={title || ''}
          onChange={onInputChange}
        />

        <TextField
          type='text'
          variant='filled'
          fullWidth
          multiline
          placeholder='Ingrese un cuerpo'
          label='Cuerpo'
          minRows={5}
          name='body'
          value={body || ''}
          onChange={onInputChange}
        />
      </Grid>

      <Grid container justifyContent='end'>
        <Button
          onClick={onDelete}
          sx={{ mt: 2 }}
          color='error'
        >
          <DeleteOutline/>
          Borrar
        </Button>

      </Grid>

      <ImageGallery images={note.imagesUrls} />



    </Grid>
  )
}
