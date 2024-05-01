import { loginWithEmailPassword, logoutFirebase, registerUserWithEmail, sigInWithGoogle } from "../../../src/firebase/providers";
import { checkingCredentials, login, logout } from "../../../src/store/auth/authSlice";
import { checkingAuthentication, startCreatingUserWithEmailAndPassword, startGoogleSignIn, startLoginWithEmailPassword, startLogout } from "../../../src/store/auth/thunk";
import { clearNotesLogout } from "../../../src/store/journal";
import { demoUser } from "../../fixtures/authFixtures";

jest.mock('../../../src/firebase/providers'); // mock para simular una libreria o funsion, lo que hace es crear un mock para todas las exportaciones de providers.js

describe('Pruebas en AuthThunks', () => {
    const dispatch = jest.fn(); //se crea una funcion simulada
    beforeEach(() => jest.clearAllMocks()); //limpia los mocks después de cada test

    test('Debe de invocar el checkingAuthentication', async () => {
        await checkingAuthentication()(dispatch); //se manda a llamar el thunk
        // console.log("argumentos: ",dispatch.mock.calls);
        // console.log(checkingCredentials()) // imprime  { type: 'auth/checkingCredentials', payload: undefined }
        expect(dispatch).toHaveBeenCalledWith(checkingCredentials()); //espera que se llame el dispatch(funsion simulada) con el argumento { type: 'auth/checkingCredentials', payload: undefined }
    })

    test('startGoogleSignIn debe de llamar a checkingCredentials y login', async () => {
        const loginData = { ok: true, ...demoUser };
        await sigInWithGoogle.mockResolvedValue(loginData); // se simula la respuesta, haciendo que sigInWithGoogle sea igual a loginData

        await startGoogleSignIn()(dispatch);
        expect(dispatch).toHaveBeenCalledWith(checkingCredentials()); //espera a que dispatch se llame con checkingCredentials()
        expect(dispatch).toHaveBeenCalledWith(login(loginData)); // espera a que dispatch se llame con login(loginData)
    });

    test('startGoogleSignIn debe de llamar a checkingCredentials y logout - error', async() => {
        const loginData = { ok: false, errorMessage: 'Un Error de google' };
        await sigInWithGoogle.mockResolvedValue(loginData);
        
        await startGoogleSignIn()(dispatch);
        expect(dispatch).toHaveBeenCalledWith(checkingCredentials());
        expect(dispatch).toHaveBeenCalledWith(logout(loginData.errorMessage));
    });

    test('startCreatingUserWithEmailAndPassword debe de llamar a checkingCredentials y login - Exito', async() => { 
        const loginData = { ok: true, ...demoUser };
        const { uid, displayName, email, photoURL } = loginData;
        await registerUserWithEmail.mockResolvedValue(loginData);

        await startCreatingUserWithEmailAndPassword({
            email: demoUser.email,
            password: '123456',
            displayName: demoUser.displayName
        })(dispatch);

        expect(dispatch).toHaveBeenCalledWith(checkingCredentials());
        expect(dispatch).toHaveBeenCalledWith(login({ uid, displayName, email, photoURL }));
    });

    test('startCreatingUserWithEmailAndPassword debe de llamar a checkingCredentials y logout - error', async() => { 
        const loginData = {ok: false, errorMessage: 'Un Error de google' };
        await registerUserWithEmail.mockResolvedValue(loginData);
        await startCreatingUserWithEmailAndPassword({
            email: demoUser.email,
            password: '123456',
            displayName: demoUser.displayName
        })(dispatch);
        
        expect(dispatch).toHaveBeenCalledWith(checkingCredentials());
        expect(dispatch).toHaveBeenCalledWith(logout({ errorMessage: loginData.errorMessage }));
    });

    test('startLoginWithEmailPassword debe de llamar a checkingCredentials y login - Exito', async() => {
        const loginData = { ok: true, ...demoUser };
        const { uid, displayName, email, photoURL } = loginData;
        const formData = {
            email: demoUser.email,
            password: '123456',
        }

        await loginWithEmailPassword.mockResolvedValue(loginData);
        await startLoginWithEmailPassword(formData)(dispatch);

        expect(dispatch).toHaveBeenCalledWith(checkingCredentials());
        expect(dispatch).toHaveBeenCalledWith(login({uid, displayName, email, photoURL}));
    });

    test('startLogout debe de llamar logoutFirebase, clearNotesLogout ylogout', async() => { 
        await startLogout()(dispatch);
        expect(logoutFirebase).toHaveBeenCalled();
        expect(dispatch).toHaveBeenCalledWith(clearNotesLogout());
        expect(dispatch).toHaveBeenCalledWith(logout());
    });

});