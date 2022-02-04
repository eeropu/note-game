import { createSlice, PayloadAction } from "@reduxjs/toolkit";

export interface IKeyState {
    majorOrMinor: 'major' | 'minor',
    key: string
}

const initialState: IKeyState = {
    majorOrMinor: 'major',
    key: ''
}

export const keySlice = createSlice({
    name: 'key',
    initialState,
    reducers: {
        setMajorOrMinor: (state, action: PayloadAction<'major' | 'minor'>) => {
            state.majorOrMinor = action.payload
        },
        setKey: (state, action: PayloadAction<string>) => {
            state.key = action.payload
        }
    }
})

export const { setMajorOrMinor, setKey } = keySlice.actions

export default keySlice.reducer