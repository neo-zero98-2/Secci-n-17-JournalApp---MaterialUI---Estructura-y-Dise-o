import { createSlice } from '@reduxjs/toolkit'

const initialState = {
    isSaving: false,
    messageSaved: '',
    notes: [],
    active: null
}

export const journalSlice = createSlice({
  name: 'journal',
  initialState,
  reducers: {
    savingNewNote: (state) => {
      state.isSaving = true;
    },
    addNewEmptyNote: (state, { payload }) => {
      state.notes.push(payload);
      state.isSaving = false;
    },
    setActiveNote: (state, { payload }) => {
      state.active = payload;
    },
    setNotes: (state, { payload = [] }) => {
      state.notes = payload;
    },
    setSaving: (state) => {
      state.isSaving = true;
      state.messageSaved = '';
    },
    updateNote: (state, { payload }) => {
      state.isSaving = false;
      state.notes = state.notes.map( 
        note => payload.id === note.id ? payload : note
      );
      state.messageSaved = `${ payload.title }, actualizada correctamente`;
    },
    setPhotoToActiveNote: (state, { payload }) => {
      const imageUrls = state.active.imagesUrls;
      state.active.imagesUrls = [...imageUrls, ...payload];
      state.isSaving = false;
    },
    deleteNoteById: (state, { payload }) => {
      state.notes = state.notes.filter( note => note.id !== payload );
      state.active = null;
      state.isSaving = false;
    },
    clearNotesLogout: (state) => {
      state.isSaving = false;
      state.messageSaved = '';
      state.notes = [];
      state.active = null;
    }
  },
})

// Action creators are generated for each case reducer function
export const { 
    addNewEmptyNote,
    clearNotesLogout,
    deleteNoteById,
    savingNewNote ,
    setActiveNote,
    setNotes,
    setPhotoToActiveNote,
    setSaving,
    updateNote
  } = journalSlice.actions

export default journalSlice.reducer