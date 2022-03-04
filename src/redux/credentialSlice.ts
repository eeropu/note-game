import { createSlice, PayloadAction } from "@reduxjs/toolkit";

export interface ICredentialState {
    token: string,
    username: string
}

const initialState: ICredentialState  ={
    token: window.localStorage.getItem("note-game-token") || "",
    username: window.localStorage.getItem("note-game-username") || ""
}

export const credentialSlice = createSlice({
    name: "credentials",
    initialState,
    reducers: {
        setCredentials: (state, action: PayloadAction<ICredentialState>) => {
            window.localStorage.setItem("note-game-token", action.payload.token)
            window.localStorage.setItem("note-game-username", action.payload.username)
            state.token = action.payload.token
            state.username = action.payload.username
        }
    }
})

export const { setCredentials } = credentialSlice.actions

export default credentialSlice.reducer