import { checkingCredentials, login, logout } from "./authSlice";
import { loginWithEmailPassword, logoutFirebase, registerUserWithEmail, sigInWithGoogle } from "../../firebase/providers";

export const checkingAuthentication = ( email, password ) => {
    return async ( dispatch ) => {
        dispatch(login())
    }
}

export const startGoogleSignIn = () => {
    return async ( dispatch ) => {
        dispatch(checkingCredentials());
        const result = await sigInWithGoogle();

        (!result.ok) ? 
        dispatch(logout(result.errorMessage)) :
        dispatch(login(result))
    }
}

export const startCreatingUserWithEmailAndPassword = ({ email, password, displayName }) => {
    return async( dispatch ) => {
        dispatch(checkingCredentials());
        const { ok, uid, photoURL, errorMessage } = await registerUserWithEmail({ email, password, displayName });

        if(!ok) return dispatch(logout({ errorMessage }));
        dispatch(login({ uid, displayName, email, photoURL }));
    }
}

// startLoginWithEmailPassword
export const startLoginWithEmailPassword = ({ email, password }) => {
    return async (dispatch) => {
        dispatch(checkingCredentials());
        const { ok, displayName, errorMessage, photoURL, uid } = await loginWithEmailPassword({ email, password });

        if(!ok) return dispatch(logout({ errorMessage }));
        dispatch(login({ uid, displayName, email, photoURL }));
    }
}

export const startLogout = () => {
    return async (dispatch) => {
        await logoutFirebase();
        dispatch(logout());
    }
}