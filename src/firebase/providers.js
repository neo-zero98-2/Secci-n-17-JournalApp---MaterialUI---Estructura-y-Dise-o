import { getAuth, signInWithPopup, GoogleAuthProvider, createUserWithEmailAndPassword, updateProfile, signInWithEmailAndPassword } from "firebase/auth";
import { FirebaseAuth } from "./config";

const googleProvider = new GoogleAuthProvider();

export const sigInWithGoogle = async () => {
    try {
        const result = await signInWithPopup(FirebaseAuth, googleProvider);
        const credentials = GoogleAuthProvider.credentialFromResult(result);
        const { displayName, email, photoURL, uid } = result.user;

        return {
            ok: true,
            displayName,
            email,
            photoURL,
            uid
        }
    } catch (error) {
        const errorCode = error.code;
        const errorMessage = error.message;
        console.log(error);

        return {
            ok: false,
            errorMessage
        }
    }
}

export const registerUserWithEmail = async({ email, password, displayName }) => {
    try {
        const resp = await createUserWithEmailAndPassword(FirebaseAuth, email, password);
        const { uid, photoURL } = resp.user;
        // TODO: actualizar el displayName en firebase
        await updateProfile(FirebaseAuth.currentUser, { // funsión para actualizar el perfil del usuario
            displayName
        });

        return {
            ok: true,
            uid,
            photoURL,
            email,
            displayName
        }
    } catch (error) {
        console.log(error);
        return { ok: false, errorMessage: error.message }
    }
}

// loginWithEmailPassword 
export const loginWithEmailPassword = async({ email, password }) => {
    try {
        const resp = await signInWithEmailAndPassword(FirebaseAuth, email, password);
        const { uid, photoURL, displayName } = resp.user;
        console.log("resp", resp);
        return {
            ok: true,
            uid,
            photoURL,
            email,
            displayName
        }
    } catch (error) {
        console.log(error);
        return { ok: false, errorMessage: error.message }
    }
}

export const logoutFirebase = async() => await FirebaseAuth.signOut();
