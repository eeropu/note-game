import { createSlice, PayloadAction } from "@reduxjs/toolkit";

export interface IKeyState {
    majorOrMinor: 'major' | 'minor',
    key: string,
    position: number
}

const initialState: IKeyState = {
    majorOrMinor: 'major',
    key: 'C',
    position: 1
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
        },
        setPosition: (state, action: PayloadAction<number>) => {
            state.position = action.payload
        }
    }
})

export const { setMajorOrMinor, setKey, setPosition } = keySlice.actions

export default keySlice.reducer