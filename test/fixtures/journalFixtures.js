export const initialState = {
    isSaving: false,
    messageSaved: '',
    notes: [],
    active: null
}

export const activeNote = {
    date: 1712900744051,
    body: 'Hola  jotos',
    id: 'epOl20CWNvqCh3WZqlRP',
    imagesUrls: [
        'https://res.cloudinary.com/dopas30zb/image/upload/v1712900754/journal/fzmvfuw8oz4tftiy4uuz.jpg'
    ],
    title: 'Saludo'
}

export const newNote = {
    date: 1712900744051,
    body: 'Hola  jotos',
    id: 'epOl20CWNvqCh3WZqlRP',
    imagesUrls: [
        'https://res.cloudinary.com/dopas30zb/image/upload/v1712900754/journal/fzmvfuw8oz4tftiy4uuz.jpg'
    ],
    title: 'Saludo'
}

export const newEmptyNote = {
    title: '',
    body: '',
    imagesUrls: [],
    date: new Date().getTime()
}

export const newState = {
    isSaving: false,
    messageSaved: '',
    notes: [
      {
        date: 1712900744051,
        body: 'Hola  jotos',
        id: 'epOl20CWNvqCh3WZqlRP',
        imagesUrls: [
          'https://res.cloudinary.com/dopas30zb/image/upload/v1712900754/journal/fzmvfuw8oz4tftiy4uuz.jpg'
        ],
        title: 'Saludo'
      }
    ],
    active: {
      date: 1712900744051,
      body: 'Hola  jotos',
      id: 'epOl20CWNvqCh3WZqlRP',
      imagesUrls: [
        'https://res.cloudinary.com/dopas30zb/image/upload/v1712900754/journal/fzmvfuw8oz4tftiy4uuz.jpg'
      ],
      title: 'Saludo'
    }
  }