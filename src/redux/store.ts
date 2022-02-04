import { configureStore } from '@reduxjs/toolkit'
import keysReducer from './keySlice'

export const store = configureStore({
    reducer: {
        key: keysReducer
    }
})

export type RootState = ReturnType<typeof store.getState>
export type AppDispatch = typeof store.dispatch