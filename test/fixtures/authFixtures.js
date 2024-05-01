export const initialState = {
    status: 'checking', // not-authenticated, authenticated ---> status de autenticacion
    uid: null,
    email: null,
    displayName: null,
    photoUrl: null,
    errorMessage: null
}

export const authenticatedState = {
    status: 'authenticated', // not-authenticated, authenticated ---> status de autenticacion
    uid: '1233243254',
    email: 'algo@algo.com',
    displayName: 'Rosa Melcacho',
    photoUrl: 'http://goo.image.jpg',
    errorMessage: null
}

export const notAuthenticatedState = {
    status: 'not-authenticated', // not-authenticated, authenticated ---> status de autenticacion
    uid: null,
    email: null,
    displayName: null,
    photoUrl: null,
    errorMessage: null
}

export const demoUser = {
    uid: '12431412',
    email: 'algo@algo.com',
    displayName: 'Rosa Melcachoto',
    photoURL: 'http://goo.image.jpg',
    errorMessage: null
}