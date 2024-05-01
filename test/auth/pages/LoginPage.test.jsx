import { fireEvent, render, screen } from "@testing-library/react";
import { LoginPage } from "../../../src/auth/pages/LoginPage";
import { Provider } from "react-redux";
import { MemoryRouter } from "react-router-dom";
import { authSlice } from "../../../src/store/auth";
import { configureStore } from "@reduxjs/toolkit";
import { notAuthenticatedState } from "../../fixtures/authFixtures";

const mockStartGooglesingIn = jest.fn();
const mockStartLoginWithEmailPassword = jest.fn();
const mockUseDispatch = jest.fn(({email, password}) => {});

//mocks personalizados
jest.mock("../../../src/store/auth", () => {
    const originalModule = jest.requireActual('../../../src/store/auth');
    return {
        ...originalModule,
        startGoogleSignIn: () => mockStartGooglesingIn, //mock de startGoogleSignIn
        // mock de startLoginWithEmailPassword con argumentos email, password
        startLoginWithEmailPassword: ({email, password}) => {
            return () => mockStartLoginWithEmailPassword({email,password})
        }
    }
});

jest.mock('react-redux', () => ({
    ...jest.requireActual('react-redux'),
    // mock useDispatch que simula psarle una funcion y luego retonar esa funcion
    useDispatch: () => (fn) => fn() 
}));

const storeMock = configureStore({
    reducer: {
        auth: authSlice.reducer
    },
    preloadedState: {
        auth: notAuthenticatedState
    }
});

describe('Pruebas de <LoginPage />', () => {

    // importante poner esta linea si se usa mocks
    beforeEach(() => jest.clearAllMocks()); //limpia los mocks antes de cada test

    test('Debe mostrar el componente correctamente', () => {
        render(
            <Provider store={storeMock}>
                <MemoryRouter>
                    <LoginPage />
                </MemoryRouter>
            </Provider>
        );

        // screen.debug();
        //espera a que el render por lo menos renderice una palabra login
        expect(screen.getAllByText('Login').length).toBeGreaterThanOrEqual(1);
    });

    test('boton de google debe de llamar el startGoogleSingIn', () => {
        render(
            <Provider store={storeMock}>
                <MemoryRouter>
                    <LoginPage />
                </MemoryRouter>
            </Provider>
        );

        // screen.debug();
        const googleBtn = screen.getByLabelText('google-btn');
        fireEvent.click(googleBtn);
        expect(mockStartGooglesingIn).toHaveBeenCalled();
    });

    test('submit debe de llamar el startLoginWithEmailPassword', () => {
        
        const email = 'algo@algo.com';
        const password = '12345678';
        render(
            <Provider store={storeMock}>
                <MemoryRouter>
                    <LoginPage/>
                </MemoryRouter>
            </Provider>
        );

        const emailField = screen.getByRole('textbox', { name: 'Correo' }); //obtiene el <Textfiel/> Correo
        fireEvent.change(emailField, { target: { name:'email', value: email } }); //lanza un evento change de <TextFiel/>

        const passwordField = screen.getByTestId('password', {name: 'Contraseña'}); //obtiene el <TextField/> por inputProps
        fireEvent.change(passwordField, { target: { name: 'password', value: password } }); //lanza un evento change de <TextFiel/>

        const loginForm = screen.getByLabelText('submit-form'); //obtiene el <form/>
        fireEvent.submit(loginForm); //lanza el evento submit de <form/>

        expect(mockStartLoginWithEmailPassword).toHaveBeenCalledWith({
            email,
            password
        });
    });

});