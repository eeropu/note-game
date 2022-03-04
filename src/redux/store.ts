import { configureStore } from '@reduxjs/toolkit'
import credentialReducer from './credentialSlice'
import keysReducer from './keySlice'
import settingsReducer from './settingsSlice'

export const store = configureStore({
    reducer: {
        key: keysReducer,
        settings: settingsReducer,
        credentials: credentialReducer
    }
})

export type RootState = ReturnType<typeof store.getState>
export type AppDispatch = typeof store.dispatch