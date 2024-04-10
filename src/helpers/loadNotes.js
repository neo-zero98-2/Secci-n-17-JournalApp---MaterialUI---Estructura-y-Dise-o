import { collection, getDocs } from "firebase/firestore";
import { FirebaseDB } from "../firebase/config";

export const loadNotes = async (uid = '') => {
    if(!uid) throw new Error('El UID no existe');

    const docRef = collection(FirebaseDB, `${uid}/journal/notes`);
    const docs = await getDocs(docRef);
    const notes = [];
    docs.forEach((doc) => {
        notes.push({ ...doc.data(), id: doc.id });
    });
    return notes;
}