import { collection, addDoc, doc, updateDoc, deleteDoc } from "firebase/firestore";
import { currentNote, startDeletingNote, startLoadingNotes, startNewNote, startSaveNote } from "../../../src/store/journal/thunks";
import { addNewEmptyNote, deleteNoteById, savingNewNote, setActiveNote, setNotes, setSaving, updateNote } from "../../../src/store/journal/journalSlice";
import { loadNotes } from "../../../src/helpers";
import { activeNote } from "../../fixtures/journalFixtures";

jest.mock('firebase/firestore');
jest.mock('../../../src/helpers');

describe('Pruebas en Journal Thunks', () => {
    const dispatch = jest.fn();
    const getState = jest.fn();
    const uid = 'TEST-UID';

    beforeEach(() => {
        jest.clearAllMocks();
    });

    test('startNewNote debe de crear una nueva nota en blanco', async () => {

        const newNote = {
            title: '',
            body: '',
            imagesUrls: [],
            date: new Date().getTime()
        }

        const reqAddDoc = { id: 'epOl20CWNvqCh3WZqlRP' };

        getState.mockReturnValue({ auth: { uid } });
        await addDoc.mockResolvedValue({ id: 'epOl20CWNvqCh3WZqlRP' });
        await startNewNote()(dispatch, getState);

        expect(dispatch.mock.calls).toHaveLength(3);
        expect(dispatch.mock.calls[0][0]).toEqual(savingNewNote());
        expect(dispatch.mock.calls[1][0])
            .toEqual(addNewEmptyNote({ ...newNote, id: reqAddDoc.id }));
        expect(dispatch.mock.calls[2][0])
            .toEqual(setActiveNote({ ...newNote, id: reqAddDoc.id }));
    });

    test('startLoadingNotes debe de obtener las notas de firebase', async () => {
        const notes = [
            {
                date: 1712900744051,
                body: 'Hola  jotos',
                id: 'epOl20CWNvqCh3WZqlRP',
                imagesUrls: [
                    'https://res.cloudinary.com/dopas30zb/image/upload/v1712900754/journal/fzmvfuw8oz4tftiy4uuz.jpg'
                ],
                title: 'Saludo'
            }
        ]
        getState.mockReturnValue({ auth: { uid } });
        await loadNotes.mockResolvedValue(notes);
        await startLoadingNotes()(dispatch, getState);
        expect(dispatch).toHaveBeenCalledWith(setNotes(notes));
    });

    test('startLoadingNotes debe retornar un throw new Error si el uid no existe', async () => {
        const notes = [];
        getState.mockReturnValue({ auth: {} });

        await loadNotes.mockResolvedValue(notes);
        //espera que arroje un error que contenga el mensaje 'El UID no existe'
        await expect(startLoadingNotes()(dispatch, getState))
            .rejects
            .toHaveProperty('message', 'El UID no existe')
    });

    test('currentNote debe activar una nota', async () => {
        await currentNote(activeNote)(dispatch);
        expect(dispatch).toHaveBeenCalledWith(setActiveNote(activeNote));
    });

    test('startSaveNote debe actualizar una nota', async () => {
        getState.mockReturnValue({ auth: { uid }, journal: { active: activeNote } });
        await updateDoc.mockResolvedValue();
        await startSaveNote()(dispatch, getState);
        expect(dispatch.mock.calls).toHaveLength(2);
        expect(dispatch.mock.calls[0][0]).toEqual(setSaving());
        expect(dispatch.mock.calls[1][0]).toEqual(updateNote(activeNote));
    });

    test('startDeletingNote debe de eliminar la nota activa', async () => {
        getState.mockReturnValue({
            auth: { uid },
            journal: { active: activeNote }
        });
        await deleteDoc.mockResolvedValue({});
        await startDeletingNote()(dispatch, getState);
        expect(dispatch.mock.calls).toHaveLength(2);
        expect(dispatch.mock.calls[0][0]).toEqual(setSaving());
        expect(dispatch.mock.calls[1][0]).toEqual(deleteNoteById(activeNote.id));
    });

    test('startDeletingNote debe retornar un error si no encuentra el uid', async() => { 
        getState.mockReturnValue({ 
            auth: {},
            journal:{}
         });

         await expect(startDeletingNote()(dispatch, getState))
            .rejects
            .toHaveProperty('message', 'El UID no existe')
    });


});