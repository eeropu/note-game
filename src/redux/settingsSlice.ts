import { createSlice, PayloadAction } from '@reduxjs/toolkit'

export interface ISettingsState {
    clarityThreshold: number,
    displayType: string
}

const initialState: ISettingsState = {
    clarityThreshold: 95,
    displayType: "text"
}

export const settingsSlice = createSlice({
    name: 'settings',
    initialState,
    reducers: {
        setClarityThreshold: (state, action: PayloadAction<number>) => {
            state.clarityThreshold = action.payload
        },
        setDisplayType: (state, action: PayloadAction<string>) => {
            state.displayType = action.payload
        }
    }
})

export const { setClarityThreshold, setDisplayType } = settingsSlice.actions

export default settingsSlice.reducer