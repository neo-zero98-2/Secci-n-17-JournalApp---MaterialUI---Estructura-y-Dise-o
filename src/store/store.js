import { configureStore } from '@reduxjs/toolkit'
import AuthReducer from './auth/authSlice'

export const store = configureStore({
  reducer: {
    auth: AuthReducer
  },
})