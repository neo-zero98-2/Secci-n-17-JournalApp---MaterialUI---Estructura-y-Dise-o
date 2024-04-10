import { collection, addDoc, doc, updateDoc, deleteDoc } from "firebase/firestore"; 
import { FirebaseDB } from "../../firebase/config";
import { addNewEmptyNote, deleteNoteById, savingNewNote, setActiveNote, setNotes, setPhotoToActiveNote, setSaving, updateNote } from "./journalSlice";
import { loadNotes, fileUpload } from "../../helpers";

export const startNewNote = () => {
    return async (dispatch, getState) => {
        const { uid } = getState().auth;

        const newNote = {
            title: '',
            body: '',
            imagesUrls: [],
            date: new Date().getTime()
        }

        dispatch(savingNewNote());

        try {
            const docRef = await addDoc(collection(FirebaseDB, `${ uid }/journal/notes`), newNote);
            newNote.id = docRef.id;
            dispatch(addNewEmptyNote(newNote));
            dispatch(setActiveNote(newNote));
        } catch (e) {
            console.error("Error adding document: ", e);
        }


    }
}

export const startLoadingNotes = () => {
    return async (dispatch, getState) => {
        const { uid } = getState().auth;
        if(!uid) throw new Error('El UID no existe');
        const notes = await loadNotes(uid);
        dispatch(setNotes(notes));
    }
}

export const currentNote = (note) => async (dispatch) => dispatch(setActiveNote(note));

export const startSaveNote = () => {
    return async (dispatch, getState) => {
        dispatch(setSaving());
        const { uid } = getState().auth;
        const { active:note } = getState().journal;
        const noteRef = doc(FirebaseDB, `${uid}/journal/notes/${note.id}`);
        await updateDoc(noteRef, {...note});
        dispatch(updateNote(note));
    }
}

export const startUploadFiles = (files = []) => {
    return async (dispatch) => {
        dispatch(setSaving());

        const fileUploadPromises = [];
        for(const file of files) {
            fileUploadPromises.push(fileUpload(file));
        }

        const photoUrls = (await Promise.all(fileUploadPromises)).map(item => item.secure_url);
        dispatch(setPhotoToActiveNote(photoUrls));

    }
}

export const startDeletingNote = () => {
    return async(dispatch, getState) => {
        dispatch(setSaving());
        const { uid } = getState().auth;
        const { active: note } = getState().journal; 
        if(!uid) throw new Error('El UID no existe');
        await deleteDoc(doc(FirebaseDB, `${ uid }/journal/notes/${ note.id }`));
        dispatch(deleteNoteById(note.id))
    }
}
    