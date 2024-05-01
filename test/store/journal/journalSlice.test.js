import journalSlice, { addNewEmptyNote, clearNotesLogout, deleteNoteById, savingNewNote, setActiveNote, setNotes, setPhotoToActiveNote, setSaving, updateNote } from "../../../src/store/journal/journalSlice";
import { activeNote, initialState, newEmptyNote, newNote, newState } from "../../fixtures/journalFixtures";

describe('Pruebas de journalSlice', () => {
    test('deberia de regresar el estado inicial y llamarse journal', () => {
        const state = journalSlice(initialState, {});
        expect(state).toEqual(initialState);
    });

    test('debe de cambiar el estatus de guardado de una nota - savingNewNote', () => {
        const state = journalSlice(initialState, savingNewNote());
        expect(state.isSaving).toEqual(true);
    });

    test('debe de agregar una nueva nota - addNewEmptyNote', () => {
        const state = journalSlice(initialState, addNewEmptyNote(newEmptyNote));
        expect(state.notes).toEqual([newEmptyNote]);
    });

    test('debe de activar una nota - setActiveNote', () => {
        const state = journalSlice(initialState, setActiveNote(activeNote));
        expect(state.active).toEqual(activeNote);
    });

    test('debe de actualizar las notas - setNotes', () => {
        const state = journalSlice(initialState, setNotes());
        expect(state.notes).toEqual([]);
    });

    test('debe de actualizar notas con argumento - setNotes', () => {
        const state = journalSlice(initialState, setNotes([newNote]));
        expect(state.notes).toEqual([newNote]);
    });

    test('debe setear el setsaving - setSaving ', () => {
        const state = journalSlice(initialState, setSaving());
        expect(state.isSaving).toEqual(true);
        expect(state.messageSaved).toEqual('');
    });

    test('debe actualizar una nota - updateNote ', () => {
        const note = {
            date: 1712900744051,
            body: 'Hola vatos locos',
            id: 'epOl20CWNvqCh3WZqlRP',
            imagesUrls: [
                'https://res.cloudinary.com/dopas30zb/image/upload/v1712900754/journal/fzmvfuw8oz4tftiy4uuz.jpg'
            ],
            title: 'Saludo perruno'
        }
        const state = journalSlice({
            ...initialState,
            notes: [newNote]
        }, updateNote(note));
        expect(state.isSaving).toEqual(false);
        expect(state.messageSaved).toEqual(`${note.title}, actualizada correctamente`);
    });

    test('deberia añadir una foto a la nota activa - setPhotoToActiveNote', () => {
        const state = journalSlice({
            ...initialState,
            active: { ...activeNote, imagesUrls: [] }
        }, setPhotoToActiveNote("https://image.jpg"));
        expect(state.active.imagesUrls).toBeTruthy();
        expect(state.active.imagesUrls.length).toBeGreaterThan(0);
        expect(state.isSaving).toEqual(false);
    });

    test('debe eliminar una nota por id- deleteNoteById', () => {
        const state = journalSlice({
            ...initialState,
            notes: [newNote]
        }, deleteNoteById(newNote.id));
        const hasNote = state.notes.some(note => note.id === newNote.id);
        expect(state.isSaving).toEqual(false);
        expect(hasNote).toEqual(false);
    });

    test('debe de limpiar el state al cerrar sesión - clearNotesLogout', () => {
        const state = journalSlice(newState, clearNotesLogout());
        expect(state).toEqual(initialState);
    });
});