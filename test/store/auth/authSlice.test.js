import authSlice, { checkingCredentials, login, logout } from "../../../src/store/auth/authSlice";
import { authenticatedState, demoUser, initialState, notAuthenticatedState } from "../../fixtures/authFixtures";

describe('Pruebas en el authSlice', () => {

    test('debe regresar el estado inicial y llamarse "auth"', () => {
        const state = authSlice(initialState, {});
        expect(state).toEqual(initialState);
    });

    test('debe de realizar la autenticación', () => {
        const state = authSlice(initialState, login(demoUser));

        expect(state).toEqual({
            status: 'authenticated', // not-authenticated, authenticated ---> status de autenticacion
            uid: demoUser.uid,
            email: demoUser.email,
            displayName: demoUser.displayName,
            photoUrl: demoUser.photoURL,
            errorMessage: null
        });
    });

    test('debe realizar el logout sin argumentos', () => {
        const state = authSlice(authenticatedState, logout());
        expect(state).toEqual(notAuthenticatedState);
    });

    test('debe de realizar el logout y mostrar un mensaje de error', () => {
        const errorMessage = 'Error';
        const state = authSlice(authenticatedState, logout({ errorMessage }));
        expect(state).toEqual({ ...notAuthenticatedState, errorMessage: 'Error' });
    });

    test('debe de cambiar el estado a checking', () => {
        const state = authSlice(authenticatedState, checkingCredentials());
        expect(state.status).toBe('checking');
    });
});